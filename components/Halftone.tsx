'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import type { Plate } from '@/lib/works';

/* ---------------------------------------------------------------
   A screenshot printed as halftone: ember dots on cream, big where
   the screen is dark, small where it is light. Scrolling inks it up
   until the real screen shows through; under the cursor a loupe
   shows the finished image.

   `progress` lets a parent drive it (the opening book); otherwise it
   scrubs itself as it passes through the viewport.
---------------------------------------------------------------- */

const PAPER = '#efe9df';
const INK = '#ff5a1f';

export default function Halftone({
  plate,
  progress,
  trigger,
  label,
}: {
  plate: Plate;
  progress?: React.RefObject<number>;
  trigger?: React.RefObject<HTMLElement | null>;
  label?: string;
}) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const img = new Image();
    img.decoding = 'async';
    img.src = plate.src;

    let w = 0;
    let h = 0;
    let cell = 9;
    let lum: Float32Array | null = null;
    let cols = 0;
    let rows = 0;
    let p = reduce ? 1 : 0;
    let raf = 0;
    const loupe = { x: 0, y: 0, on: false, a: 0 };

    // cover-fit the screenshot, anchored top-left like a screen
    const fit = () => {
      const s = Math.max(w / img.naturalWidth, h / img.naturalHeight);
      return { dw: img.naturalWidth * s, dh: img.naturalHeight * s };
    };

    const sample = () => {
      if (!img.complete || !img.naturalWidth || !w) return;
      cols = Math.ceil(w / cell);
      rows = Math.ceil(h / cell);
      const off = document.createElement('canvas');
      off.width = cols;
      off.height = rows;
      const o = off.getContext('2d', { willReadFrequently: true })!;
      const { dw, dh } = fit();
      o.drawImage(img, 0, 0, (dw / w) * cols, (dh / h) * rows);
      const data = o.getImageData(0, 0, cols, rows).data;
      lum = new Float32Array(cols * rows);
      for (let i = 0; i < cols * rows; i++) {
        lum[i] = (0.299 * data[i * 4] + 0.587 * data[i * 4 + 1] + 0.114 * data[i * 4 + 2]) / 255;
      }
    };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const r = canvas.getBoundingClientRect();
      w = r.width;
      h = r.height;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      cell = w < 500 ? 7 : 9;
      sample();
      request();
    };

    const smooth = (a: number, b: number, x: number) => {
      const t = Math.min(Math.max((x - a) / (b - a), 0), 1);
      return t * t * (3 - 2 * t);
    };

    const draw = () => {
      raf = 0;
      if (progress) p = reduce ? 1 : progress.current;
      ctx.fillStyle = PAPER;
      ctx.fillRect(0, 0, w, h);
      if (!lum) return;

      const reveal = smooth(0.62, 1, p);
      const grow = 0.45 + smooth(0, 0.7, p) * 0.75;
      if (reveal < 1) {
        ctx.globalAlpha = 1 - reveal;
        ctx.fillStyle = INK;
        ctx.beginPath();
        for (let y = 0; y < rows; y++) {
          for (let x = 0; x < cols; x++) {
            const dark = 1 - lum[y * cols + x];
            const r = Math.sqrt(dark) * cell * 0.62 * grow;
            if (r < 0.35) continue;
            const cx = x * cell + cell / 2;
            const cy = y * cell + cell / 2;
            ctx.moveTo(cx + r, cy);
            ctx.arc(cx, cy, r, 0, Math.PI * 2);
          }
        }
        ctx.fill();
        ctx.globalAlpha = 1;
      }
      if (reveal > 0) {
        const { dw, dh } = fit();
        ctx.globalAlpha = reveal;
        ctx.drawImage(img, 0, 0, dw, dh);
        ctx.globalAlpha = 1;
      }

      // the loupe: finished print under the cursor
      loupe.a += ((loupe.on && reveal < 0.98 ? 1 : 0) - loupe.a) * 0.2;
      if (loupe.a > 0.02) {
        const R = Math.min(96, w * 0.16) * loupe.a;
        const { dw, dh } = fit();
        const z = 1.35;
        ctx.save();
        ctx.beginPath();
        ctx.arc(loupe.x, loupe.y, R, 0, Math.PI * 2);
        ctx.clip();
        ctx.fillStyle = PAPER;
        ctx.fillRect(loupe.x - R, loupe.y - R, R * 2, R * 2);
        ctx.drawImage(img, loupe.x - loupe.x * z, loupe.y - loupe.y * z, dw * z, dh * z);
        ctx.restore();
        ctx.beginPath();
        ctx.arc(loupe.x, loupe.y, R, 0, Math.PI * 2);
        ctx.strokeStyle = INK;
        ctx.lineWidth = 2;
        ctx.stroke();
        if (Math.abs((loupe.on ? 1 : 0) - loupe.a) > 0.01) request();
      }
      if (progress && !reduce) request();
    };
    function request() {
      if (!raf) raf = requestAnimationFrame(draw);
    }

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') return;
      const r = canvas.getBoundingClientRect();
      loupe.x = e.clientX - r.left;
      loupe.y = e.clientY - r.top;
      loupe.on = true;
      request();
    };
    const onLeave = () => {
      loupe.on = false;
      request();
    };

    img.onload = () => {
      sample();
      request();
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    canvas.addEventListener('pointermove', onMove);
    canvas.addEventListener('pointerleave', onLeave);

    let visible = true;
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      if (visible) request();
      else if (raf) {
        cancelAnimationFrame(raf);
        raf = 0;
      }
    });
    io.observe(canvas);

    const st =
      !progress && !reduce
        ? ScrollTrigger.create({
            trigger: trigger?.current && window.matchMedia('(min-width: 901px)').matches ? trigger.current : canvas,
            start: trigger?.current && window.matchMedia('(min-width: 901px)').matches ? 'top top' : 'top 85%',
            end: trigger?.current && window.matchMedia('(min-width: 901px)').matches ? 'bottom bottom' : 'center 35%',
            scrub: 0.5,
            onUpdate: (self) => {
              p = gsap.parseEase('power1.inOut')(self.progress);
              if (visible) request();
            },
          })
        : null;

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      st?.kill();
      canvas.removeEventListener('pointermove', onMove);
      canvas.removeEventListener('pointerleave', onLeave);
    };
  }, [plate.src, progress, trigger]);

  return (
    <figure className="halftone">
      <canvas ref={ref} role="img" aria-label={plate.caption} />
      {label && <figcaption>{label}</figcaption>}
    </figure>
  );
}
