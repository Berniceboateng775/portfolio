'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

/* ---------------------------------------------------------------
   The book's cover as a real sheet of paper, drawn with WebGL.

   A finely divided plane is hinged at the spine. Every frame the
   vertex shader rotates it around the spine and bends it as one
   continuous surface: a curl that grows toward the free edge, a
   diagonal lead so the top corner turns first, and a slow wave
   that travels across the sheet as air moves under it. Shading
   comes from the bent surface itself, so the ripple catches light.

   The parent owns the motion: it passes refs it updates each frame
   (turn 0→1, wind 0→1, lift in px) and the DOM element whose box is
   the closed cover, which this canvas tracks.
---------------------------------------------------------------- */

export type PaperState = { turn: number; wind: number; lift: number };

const vertex = /* glsl */ `
  uniform float uTurn;
  uniform float uWind;
  uniform float uLift;
  uniform float uTime;
  uniform float uW;
  uniform float uH;
  varying vec2 vUv;
  varying vec3 vPos;

  void main() {
    vUv = uv;
    float u = uv.x;               // 0 at the spine, 1 at the free edge
    float v = uv.y - 0.5;         // -0.5 bottom, 0.5 top
    float air = sin(3.14159265 * uTurn);

    // how much air is moving the sheet: some whenever it is off the page,
    // a lot while it is being turned quickly
    float gust = air * 0.55 + uWind;
    float t = uTime;

    // the top corner leads the turn, and flaps while the air is moving
    float flap = sin(t * 2.3 + u * 1.7) * 0.5 + sin(t * 3.7 - u * 2.3) * 0.25;
    float theta = uTurn * 3.14159265 + v * u * (air * 0.55 + flap * gust * 0.45);

    // bend away from the turn, strongest at the free edge; the bend itself
    // swells and eases as the sheet catches the air
    float swell = 1.0 + 0.35 * sin(t * 1.4 + v * 2.0) * gust;
    float bend = (air * 0.46 + uLift + uWind * 0.35 * air) * u * u * swell;

    // soft paper: three waves at different speeds and angles, so the sheet
    // ripples like water rather than swinging as a board
    float w1 = sin(t * 2.4 - u * 5.2 + v * 3.1);
    float w2 = sin(t * 3.3 - u * 7.6 - v * 4.4) * 0.55;
    float w3 = sin(t * 1.5 + v * 6.2 - u * 2.4) * 0.7;
    float rippleAmp = 0.006 + gust * 0.085;
    float wave = (w1 + w2 + w3) * u * rippleAmp;
    // a fold that travels down the sheet near the free edge
    wave += sin(t * 2.0 - v * 5.0) * smoothstep(0.55, 1.0, u) * gust * 0.05;
    // a gentle breath while it rests shut
    wave += sin(t * 0.9 - u * 2.0) * u * u * 0.006 * (1.0 - uTurn);

    float x = u * uW;
    float z = (bend + wave) * uW;

    vec3 p;
    p.x = x * cos(theta) - z * sin(theta);
    p.z = x * sin(theta) + z * cos(theta);
    // the free edge draws in slightly as the sheet billows
    p.y = v * uH * (1.0 - 0.04 * gust * u * u);
    vPos = p;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
  }
`;

const fragment = /* glsl */ `
  uniform sampler2D uFront;
  uniform sampler2D uBack;
  varying vec2 vUv;
  varying vec3 vPos;

  void main() {
    vec3 n = normalize(cross(dFdx(vPos), dFdy(vPos)));
    if (!gl_FrontFacing) n = -n;
    vec4 col = gl_FrontFacing
      ? texture2D(uFront, vUv)
      : texture2D(uBack, vec2(1.0 - vUv.x, vUv.y));
    vec3 L = normalize(vec3(-0.35, 0.45, 1.0));
    float diff = max(dot(n, L), 0.0);
    float light = gl_FrontFacing ? 0.55 + 0.5 * diff : 0.86 + 0.2 * diff;
    float spec = pow(max(dot(reflect(-L, n), vec3(0.0, 0.0, 1.0)), 0.0), 24.0) * 0.12;
    // a soft shadow along the spine
    float spine = smoothstep(0.0, 0.06, vUv.x);
    col.rgb *= light * mix(0.82, 1.0, spine);
    col.rgb += spec;
    gl_FragColor = col;
  }
`;

function cssVar(name: string) {
  return getComputedStyle(document.documentElement).getPropertyValue(name).trim();
}

async function drawFront(W: number, H: number) {
  const c = document.createElement('canvas');
  c.width = W;
  c.height = H;
  const g = c.getContext('2d')!;
  await document.fonts?.ready;
  const display = cssVar('--font-display') || 'sans-serif';
  const mono = cssVar('--font-mono') || 'monospace';
  const ink = '#141414';
  const paper = '#efe9df';
  const accent = '#ff5a1f';
  const pad = W * 0.06;

  g.fillStyle = paper;
  g.fillRect(0, 0, W, H);
  // paper tooth
  const tooth = g.getImageData(0, 0, W, H);
  for (let i = 0; i < tooth.data.length; i += 4) {
    const n = (Math.random() - 0.5) * 10;
    tooth.data[i] += n;
    tooth.data[i + 1] += n;
    tooth.data[i + 2] += n;
  }
  g.putImageData(tooth, 0, 0);

  // name
  g.fillStyle = ink;
  g.textBaseline = 'alphabetic';
  const fs = W * 0.098;
  g.font = `800 ${fs}px ${display}`;
  (g as CanvasRenderingContext2D & { letterSpacing?: string }).letterSpacing = `${-fs * 0.045}px`;
  ['BERNICE', 'ANIMWAA', 'BOATENG'].forEach((line, i) => {
    g.fillStyle = i === 2 ? accent : ink;
    g.fillText(line, pad, pad + fs * 0.82 + i * fs * 0.92);
  });
  const nameBottom = pad + fs * 0.82 + 2 * fs * 0.92;

  // volume tag
  (g as CanvasRenderingContext2D & { letterSpacing?: string }).letterSpacing = '0px';
  const tagH = W * 0.065;
  const tagW = W * 0.19;
  g.fillStyle = ink;
  g.fillRect(W - pad - tagW, pad, tagW, tagH);
  g.fillStyle = paper;
  g.font = `600 ${W * 0.034}px ${mono}`;
  g.textAlign = 'center';
  g.fillText('VOL. 01', W - pad - tagW / 2, pad + tagH * 0.68);
  g.textAlign = 'left';

  // subtitle
  g.fillStyle = ink;
  g.font = `500 ${W * 0.036}px ${display}`;
  const subY = nameBottom + W * 0.07;
  g.fillText('Selected work · 2025–2026', pad, subY);

  // the panel
  const footH = W * 0.085;
  const top = subY + W * 0.045;
  const ph = H - top - footH - pad * 0.4;
  const pw = W - pad * 2;
  const img = new Image();
  img.src = '/book/cover-art.webp';
  await img.decode().catch(() => undefined);
  g.save();
  g.beginPath();
  g.rect(pad, top, pw, ph);
  g.clip();
  g.fillStyle = '#111';
  g.fillRect(pad, top, pw, ph);
  if (img.naturalWidth) {
    const s = Math.max(pw / img.naturalWidth, ph / img.naturalHeight);
    const dw = img.naturalWidth * s;
    const dh = img.naturalHeight * s;
    g.drawImage(img, pad + (pw - dw) / 2, top + (ph - dh) * 0.6, dw, dh);
  }
  g.restore();
  g.lineWidth = W * 0.005;
  g.strokeStyle = ink;
  g.strokeRect(pad, top, pw, ph);

  // footer
  g.fillStyle = ink;
  g.font = `500 ${W * 0.03}px ${mono}`;
  const fy = H - pad * 0.4 - footH * 0.32;
  g.fillText('AI/ML ENGINEER · SOFTWARE DEVELOPER', pad, fy);
  g.textAlign = 'right';
  g.fillStyle = accent;
  g.fillText('ACCRA, GH', W - pad, fy);
  return c;
}

// Wraps text into lines that fit `max` px; returns the lines.
function wrap(g: CanvasRenderingContext2D, text: string, max: number) {
  const words = text.split(' ');
  const lines: string[] = [];
  let line = '';
  for (const w of words) {
    const test = line ? `${line} ${w}` : w;
    if (g.measureText(test).width > max && line) {
      lines.push(line);
      line = w;
    } else line = test;
  }
  if (line) lines.push(line);
  return lines;
}

// The inside of the cover: the preface, so it can be read while the
// sheet is still in the air. Matches the left page laid out in Opening.
async function drawBack(W: number, H: number) {
  const c = document.createElement('canvas');
  c.width = W;
  c.height = H;
  const g = c.getContext('2d')!;
  await document.fonts?.ready;
  const display = cssVar('--font-display') || 'sans-serif';
  const body = cssVar('--font-body') || 'sans-serif';
  const mono = cssVar('--font-mono') || 'monospace';
  const ink = '#141414';
  const soft = '#37332f';
  const mute = '#5c5650';
  const accent = '#ff5a1f';
  const padX = W * 0.085;
  const padTop = W * 0.08;
  const padBot = W * 0.065;
  const inner = W - padX * 2;

  g.fillStyle = '#efe9df';
  g.fillRect(0, 0, W, H);
  // a soft shadow toward the spine (the right edge, once it lands)
  const sh = g.createLinearGradient(W, 0, W - W * 0.12, 0);
  sh.addColorStop(0, 'rgba(0,0,0,0.18)');
  sh.addColorStop(1, 'rgba(0,0,0,0)');
  g.fillStyle = sh;
  g.fillRect(0, 0, W, H);

  // running head
  g.font = `400 ${W * 0.024}px ${mono}`;
  g.fillStyle = mute;
  g.textBaseline = 'alphabetic';
  g.fillText('PREFACE', padX, padTop + W * 0.02);
  g.fillStyle = accent;
  g.textAlign = 'right';
  g.fillText('ii', W - padX, padTop + W * 0.02);
  g.textAlign = 'left';
  g.fillStyle = 'rgba(20,20,20,0.35)';
  g.fillRect(padX, padTop + W * 0.042, inner, Math.max(1, W * 0.0018));

  // footer
  const footY = H - padBot;
  g.fillStyle = 'rgba(20,20,20,0.35)';
  g.fillRect(padX, footY - W * 0.05, inner, Math.max(1, W * 0.0018));
  g.font = `400 ${W * 0.026}px ${mono}`;
  g.fillStyle = ink;
  g.fillText('WRITE TO ME', padX, footY - W * 0.012);
  g.textAlign = 'right';
  g.fillText('RÉSUMÉ (PDF)', W - padX, footY - W * 0.012);
  g.textAlign = 'left';

  // body, set from the bottom up so it sits above the footer
  const paras = [
    'I’m a machine learning engineer and software developer in Accra. I like the whole journey: cleaning the data, training the model, then building the app around it so someone can actually use it.',
    'The pages that follow are things I’ve built. When I’m not building, I’m usually halfway through a romance novel with a playlist on repeat.',
  ];
  const fs = W * 0.031;
  const lh = fs * 1.62;
  g.font = `400 ${fs}px ${body}`;
  const blocks = paras.map((t, i) => wrap(g, t, inner - (i === 0 ? 0 : 0)));
  const signH = W * 0.075;
  const bodyH = blocks.reduce((h, l) => h + l.length * lh, 0) + lh * 0.4;
  const headFs = W * 0.1;
  const blockBottom = footY - W * 0.11;
  let y = blockBottom - signH - bodyH - headFs * 0.45;

  g.font = `700 ${headFs}px ${display}`;
  g.fillStyle = ink;
  (g as CanvasRenderingContext2D & { letterSpacing?: string }).letterSpacing = `${-headFs * 0.05}px`;
  g.fillText('Hi, I’m Bernice.', padX, y);
  (g as CanvasRenderingContext2D & { letterSpacing?: string }).letterSpacing = '0px';
  y += headFs * 0.45 + lh * 0.7;

  g.font = `400 ${fs}px ${body}`;
  g.fillStyle = soft;
  blocks.forEach((lines, bi) => {
    lines.forEach((ln) => {
      g.fillText(ln, padX, y);
      y += lh;
    });
    if (bi === 0) y += lh * 0.4;
  });
  g.font = `italic 400 ${W * 0.03}px ${body}`;
  g.fillStyle = accent;
  g.fillText('— Bernice Animwaa Boateng', padX, y + W * 0.03);
  return c;
}

export default function PaperCover({
  state,
  anchor,
  onReady,
}: {
  state: React.RefObject<PaperState>;
  anchor: React.RefObject<HTMLElement | null>;
  onReady: (ok: boolean) => void;
}) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    } catch {
      onReady(false);
      return;
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    // the textures are already display colours; pass them straight through
    renderer.outputColorSpace = THREE.LinearSRGBColorSpace;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(30, 1, 10, 10000);
    const uniforms = {
      uTurn: { value: 0 },
      uWind: { value: 0 },
      uLift: { value: 0 },
      uTime: { value: 0 },
      uW: { value: 300 },
      uH: { value: 420 },
      uFront: { value: null as THREE.Texture | null },
      uBack: { value: null as THREE.Texture | null },
    };
    const material = new THREE.ShaderMaterial({
      vertexShader: vertex,
      fragmentShader: fragment,
      uniforms,
      side: THREE.DoubleSide,
      transparent: false,
    });
    const geometry = new THREE.PlaneGeometry(1, 1, 96, 48);
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    let disposed = false;
    let raf = 0;
    let w = 0;
    let h = 0;
    let texW = 0;

    const resize = () => {
      const r = canvas.getBoundingClientRect();
      w = r.width;
      h = r.height;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      // put the camera where 1 world unit = 1 CSS pixel at z = 0
      camera.position.set(0, 0, h / 2 / Math.tan((camera.fov * Math.PI) / 360));
      camera.updateProjectionMatrix();
    };

    const loadTextures = async (pw: number) => {
      const W = Math.min(1400, Math.round(pw * Math.min(window.devicePixelRatio || 1, 2)));
      if (Math.abs(W - texW) < 60) return;
      texW = W;
      const H = Math.round(W * 1.42);
      const [front, back] = await Promise.all([drawFront(W, H), drawBack(W, H)]);
      if (disposed) return;
      const tf = new THREE.CanvasTexture(front);
      const tb = new THREE.CanvasTexture(back);
      for (const t of [tf, tb]) {
        t.colorSpace = THREE.NoColorSpace;
        t.anisotropy = renderer.capabilities.getMaxAnisotropy();
      }
      uniforms.uFront.value?.dispose();
      uniforms.uBack.value?.dispose();
      uniforms.uFront.value = tf;
      uniforms.uBack.value = tb;
      onReady(true);
    };

    const frame = (t: number) => {
      raf = requestAnimationFrame(frame);
      const a = anchor.current;
      if (!a || !w) return;
      const r = a.getBoundingClientRect();
      const cr = canvas.getBoundingClientRect();
      // the anchor is the closed cover; its left edge is the spine
      uniforms.uW.value = r.width;
      uniforms.uH.value = r.height;
      mesh.position.set(r.left - cr.left - w / 2, -(r.top - cr.top + r.height / 2 - h / 2), 0);
      const s = state.current;
      uniforms.uTurn.value = s.turn;
      uniforms.uWind.value = s.wind;
      uniforms.uLift.value = s.lift;
      uniforms.uTime.value = t / 1000;
      if (uniforms.uFront.value) renderer.render(scene, camera);
      if (r.width && Math.abs(Math.round(r.width * Math.min(window.devicePixelRatio || 1, 2)) - texW) > 120) loadTextures(r.width);
    };

    // geometry spans u,v in [0,1]; the shader places it
    geometry.translate(0.5, 0.5, 0);

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    const first = anchor.current?.getBoundingClientRect().width || 400;
    loadTextures(first).catch(() => onReady(false));
    raf = requestAnimationFrame(frame);

    return () => {
      disposed = true;
      cancelAnimationFrame(raf);
      ro.disconnect();
      uniforms.uFront.value?.dispose();
      uniforms.uBack.value?.dispose();
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, [anchor, onReady, state]);

  return <canvas ref={ref} className="paper-gl" aria-hidden="true" />;
}
