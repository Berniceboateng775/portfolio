'use client';

import { useEffect, useRef } from 'react';

/**
 * Ambient backdrop: faint motes drifting upward, plus a
 * soft glow that trails the cursor. Kept deliberately faint so it reads as
 * atmosphere, not decoration. Paints a single static frame when the user
 * prefers reduced motion.
 */
export default function Ambient() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const ROSE = '244,114,182';
    const WHITE = '255,255,255';

    let w = 0;
    let h = 0;
    let raf = 0;
    const mouse = { x: -1000, y: -1000 };
    const glow = { x: -1000, y: -1000 };

    type Mote = { x: number; y: number; r: number; vy: number; vx: number; a: number; phase: number; rose: boolean };
    let motes: Mote[] = [];

    function seed() {
      const count = Math.round(Math.min(70, (w * h) / 22000));
      motes = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        r: 0.4 + Math.random() * 1.4,
        vy: 0.08 + Math.random() * 0.22,
        vx: (Math.random() - 0.5) * 0.08,
        a: 0.12 + Math.random() * 0.35,
        phase: Math.random() * Math.PI * 2,
        rose: Math.random() < 0.3,
      }));
    }

    function resize() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = window.innerWidth;
      h = window.innerHeight;
      canvas!.width = Math.floor(w * dpr);
      canvas!.height = Math.floor(h * dpr);
      canvas!.style.width = `${w}px`;
      canvas!.style.height = `${h}px`;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
      seed();
    }

    function frame(t: number) {
      ctx!.clearRect(0, 0, w, h);

      glow.x += (mouse.x - glow.x) * 0.06;
      glow.y += (mouse.y - glow.y) * 0.06;
      if (glow.x > -500) {
        const g = ctx!.createRadialGradient(glow.x, glow.y, 0, glow.x, glow.y, 380);
        g.addColorStop(0, `rgba(${ROSE},0.07)`);
        g.addColorStop(1, `rgba(${ROSE},0)`);
        ctx!.fillStyle = g;
        ctx!.fillRect(0, 0, w, h);
      }

      for (const m of motes) {
        if (!reduce) {
          m.y -= m.vy;
          m.x += m.vx + Math.sin(t / 2400 + m.phase) * 0.12;
          if (m.y < -10) {
            m.y = h + 10;
            m.x = Math.random() * w;
          }
        }
        const twinkle = 0.65 + 0.35 * Math.sin(t / 900 + m.phase);
        ctx!.beginPath();
        ctx!.arc(m.x, m.y, m.r, 0, Math.PI * 2);
        ctx!.fillStyle = `rgba(${m.rose ? ROSE : WHITE},${(m.a * twinkle).toFixed(3)})`;
        ctx!.fill();
      }

      if (!reduce) raf = requestAnimationFrame(frame);
    }

    const onMove = (e: PointerEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      if (glow.x < -500) {
        glow.x = mouse.x;
        glow.y = mouse.y;
      }
    };

    resize();
    raf = requestAnimationFrame(frame);
    window.addEventListener('resize', resize);
    window.addEventListener('pointermove', onMove, { passive: true });

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
      window.removeEventListener('pointermove', onMove);
    };
  }, []);

  return <canvas ref={canvasRef} className="ambient" aria-hidden="true" />;
}
