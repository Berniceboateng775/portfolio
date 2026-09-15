'use client';

import { useEffect, useRef } from 'react';

/**
 * Ambient "data lab" backdrop.
 *
 * A grid-anchored dot matrix that reacts to the cursor like an analysis
 * surface, with two slow signal lines drifting behind it. Grid-anchored
 * (not a free-floating particle field) so it reads as ordered DATA rather
 * than a generic plexus effect — the point is that it screams "analyst".
 *
 * Lime = primary highlight, cyan = the "signal" tethers/second series.
 * Honors prefers-reduced-motion by painting a single static frame.
 */
export default function DataField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const LIME: number[] = [198, 244, 50];
    const CYAN: number[] = [58, 215, 229];
    const BASE: number[] = [242, 244, 234];
    const GAP = 40; // matrix spacing (px)
    const SPOT = 170; // cursor influence radius (px)

    let w = 0;
    let h = 0;
    let cols = 0;
    let rows = 0;
    let raf = 0;
    let t = 0;

    const mouse = { x: -9999, y: -9999 };
    const eased = { x: -9999, y: -9999 };
    let scrollY = window.scrollY || 0;

    const rgba = (c: number[], a: number) => `rgba(${c[0]},${c[1]},${c[2]},${a})`;

    function resize() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = window.innerWidth;
      h = window.innerHeight;
      canvas!.width = Math.floor(w * dpr);
      canvas!.height = Math.floor(h * dpr);
      canvas!.style.width = `${w}px`;
      canvas!.style.height = `${h}px`;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
      cols = Math.ceil(w / GAP) + 2;
      rows = Math.ceil(h / GAP) + 2;
    }

    // A slow waveform drifting across the field — the ambient "signal".
    function drawSignal(
      phase: number,
      amp: number,
      yBase: number,
      color: number[],
      alpha: number,
      speed: number,
    ) {
      ctx!.beginPath();
      for (let x = 0; x <= w; x += 14) {
        const y =
          yBase +
          Math.sin(x * 0.006 + t * speed + phase) * amp +
          Math.sin(x * 0.013 - t * speed * 0.7 + phase) * (amp * 0.4);
        if (x === 0) ctx!.moveTo(x, y);
        else ctx!.lineTo(x, y);
      }
      ctx!.strokeStyle = rgba(color, alpha);
      ctx!.lineWidth = 1.5;
      ctx!.stroke();
    }

    function frame() {
      t += 0.016;
      eased.x += (mouse.x - eased.x) * 0.08;
      eased.y += (mouse.y - eased.y) * 0.08;

      ctx!.clearRect(0, 0, w, h);

      drawSignal(0, 26, h * 0.34, LIME, 0.06, 0.5);
      drawSignal(2.1, 20, h * 0.66, CYAN, 0.05, 0.42);

      const par = scrollY * 0.04; // subtle parallax drift on scroll

      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          const x = i * GAP;
          const breathe = Math.sin(t * 0.9 + (i + j) * 0.35) * 0.6;
          const y = j * GAP - (par % GAP) + breathe;

          const dist = Math.hypot(x - eased.x, y - eased.y);
          let r = 1.1;
          let a = 0.05;
          let col = BASE;

          if (dist < SPOT) {
            const k = 1 - dist / SPOT; // 0..1, strongest at cursor
            r = 1.1 + k * 2;
            a = 0.05 + k * 0.55;
            col = LIME;
            if (k > 0.25) {
              ctx!.beginPath();
              ctx!.moveTo(x, y);
              ctx!.lineTo(eased.x, eased.y);
              ctx!.strokeStyle = rgba(CYAN, (k - 0.25) * 0.22);
              ctx!.lineWidth = 1;
              ctx!.stroke();
            }
          }

          ctx!.beginPath();
          ctx!.arc(x, y, r, 0, Math.PI * 2);
          ctx!.fillStyle = rgba(col, a);
          ctx!.fill();
        }
      }

      raf = requestAnimationFrame(frame);
    }

    function drawStatic() {
      ctx!.clearRect(0, 0, w, h);
      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          ctx!.beginPath();
          ctx!.arc(i * GAP, j * GAP, 1.1, 0, Math.PI * 2);
          ctx!.fillStyle = rgba(BASE, 0.05);
          ctx!.fill();
        }
      }
    }

    const onMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };
    const onScroll = () => {
      scrollY = window.scrollY || 0;
    };
    const onVisibility = () => {
      if (document.hidden) cancelAnimationFrame(raf);
      else raf = requestAnimationFrame(frame);
    };

    resize();

    if (reduce) {
      drawStatic();
      const onResize = () => {
        resize();
        drawStatic();
      };
      window.addEventListener('resize', onResize);
      return () => window.removeEventListener('resize', onResize);
    }

    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', onMove, { passive: true });
    window.addEventListener('scroll', onScroll, { passive: true });
    document.addEventListener('visibilitychange', onVisibility);
    raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('scroll', onScroll);
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, []);

  return <canvas ref={canvasRef} className="data-field" aria-hidden="true" />;
}
