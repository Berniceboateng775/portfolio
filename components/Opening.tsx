'use client';

import Link from 'next/link';
import { useCallback, useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { works } from '@/lib/works';
import PaperCover, { type PaperState } from './PaperCover';

/* ---------------------------------------------------------------
   The first thing you see: a printed book. The cover is one sheet
   of paper drawn in WebGL (see PaperCover). This component owns the
   motion: the turn follows a soft spring that chases the scroll
   position, and "wind" builds with speed and fades slowly, so the
   sheet drifts and settles like paper in moving air.
   The DOM cover underneath is the click target, and the fallback
   if WebGL is unavailable.
---------------------------------------------------------------- */

function CoverArt() {
  return (
    <div className="cv-art">
      <div className="cv-title">
        <h2 className="cv-name">
          Bernice
          <br />
          Animwaa
          <br />
          <span>Boateng</span>
        </h2>
        <span className="cv-vol">Vol. 01</span>
      </div>
      <p className="cv-sub">Selected work · 2025–2026</p>
      <div className="cv-panel">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/book/cover-art.webp" alt="" draggable={false} />
      </div>
      <p className="cv-foot">
        <span>AI/ML Engineer · Software Developer</span>
        <span>Accra, GH</span>
      </p>
    </div>
  );
}

export default function Opening() {
  const section = useRef<HTMLElement>(null);
  const cover = useRef<HTMLDivElement>(null);
  const paper = useRef<PaperState>({ turn: 0, wind: 0, lift: 0 });
  const [gl, setGl] = useState(false);
  const onReady = useCallback((ok: boolean) => setGl(ok), []);

  useEffect(() => {
    const sec = section.current;
    const cv = cover.current;
    if (!sec || !cv) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const ease = gsap.parseEase('power2.inOut');

    let target = 0;
    let turn = 0;
    let wind = 0; // how much air is moving the sheet
    let lift = 0;
    let liftTarget = 0;
    let raf = 0;
    let visible = true;

    let vel = 0;
    let last = 0;

    const frame = (t: number) => {
      raf = 0;
      const dt = Math.min(last ? (t - last) / 16.7 : 1, 3); // frames elapsed, so motion is frame-rate independent
      last = t;

      // the page is a soft spring chasing the scroll position: it lags,
      // accelerates and eases in, rather than snapping to it
      const accel = (target - turn) * 0.018 - vel * 0.16;
      vel += accel * dt;
      turn += vel * dt;
      lift += (liftTarget - lift) * 0.06 * dt;

      // wind builds with speed and dies away slowly, so the sheet keeps
      // moving for a moment after you stop scrolling
      const speed = Math.min(Math.abs(vel) * 45, 1);
      wind += (speed - wind) * (speed > wind ? 0.12 : 0.018) * dt;

      const e = ease(Math.min(Math.max(turn, 0), 1));
      sec.style.setProperty('--open', e.toFixed(4));
      paper.current.turn = e;
      paper.current.wind = reduce ? 0 : wind;
      paper.current.lift = lift;

      if (visible && !reduce) raf = requestAnimationFrame(frame);
    };
    const request = () => {
      if (!raf) raf = requestAnimationFrame(frame);
    };

    const st = ScrollTrigger.create({
      trigger: sec,
      start: 'top top',
      end: 'bottom bottom',
      onUpdate: (self) => {
        target = Math.min(self.progress / 0.5, 1);
        request();
      },
    });

    const onEnter = (ev: PointerEvent) => {
      if (ev.pointerType !== 'mouse') return;
      liftTarget = 0.12;
      request();
    };
    const onLeave = () => {
      liftTarget = 0;
      request();
    };
    cv.addEventListener('pointerenter', onEnter);
    cv.addEventListener('pointerleave', onLeave);

    const io = new IntersectionObserver(([en]) => {
      visible = en.isIntersecting;
      if (visible) request();
    });
    io.observe(sec);
    request();

    return () => {
      cancelAnimationFrame(raf);
      st.kill();
      io.disconnect();
      cv.removeEventListener('pointerenter', onEnter);
      cv.removeEventListener('pointerleave', onLeave);
    };
  }, []);

  const openBook = () => {
    const sec = section.current;
    if (!sec) return;
    const top = sec.offsetTop + (sec.offsetHeight - window.innerHeight) * 0.55;
    if (window.__lenis) window.__lenis.scrollTo(top, { duration: 1.8 });
    else window.scrollTo({ top, behavior: 'smooth' });
  };

  return (
    <section ref={section} className="opening" data-tone="ink" style={{ '--open': 0 } as React.CSSProperties}>
      <div className="op-sticky">
        <div className="op-book">
          {/* left page: a short preface */}
          <div className="op-left pg">
            <p className="pg-run">
              <span>Preface</span>
              <span>ii</span>
            </p>
            <div className="pg-body">
              <h1 className="pf-hello">Hi, I’m Bernice.</h1>
              <p className="pf-text">
                I’m a machine learning engineer and software developer in Accra. I like the whole journey: cleaning the
                data, training the model, then building the app around it so someone can actually use it.
              </p>
              <p className="pf-text">
                The pages that follow are things I’ve built. When I’m not building, I’m usually halfway through a romance
                novel with a playlist on repeat.
              </p>
              <p className="pf-sign">— Bernice Animwaa Boateng</p>
            </div>
            <p className="pg-foot">
              <a href="#contact">Write to me</a>
              <a href="/Boateng_Bernice_Resume.pdf" target="_blank" rel="noopener noreferrer">
                Résumé (PDF)
              </a>
            </p>
          </div>

          {/* right page: contents, every line a link */}
          <nav className="op-page pg" aria-label="Contents">
            <p className="pg-run">
              <span>Contents</span>
              <span>iii</span>
            </p>
            <ol className="toc">
              {works.map((w, i) => (
                <li key={w.slug}>
                  <Link href={`/work/${w.slug}`}>
                    <span className="toc-no">{w.no}</span>
                    <span className="toc-title">
                      {w.title}
                      <small>{w.kind}</small>
                    </span>
                    <span className="toc-dots" aria-hidden="true" />
                    <span className="toc-page">{String(i * 12 + 1).padStart(2, '0')}</span>
                  </Link>
                </li>
              ))}
              <li>
                <a href="#record">
                  <span className="toc-no">—</span>
                  <span className="toc-title">
                    Where I’ve worked
                    <small>Really Great Tech, Cocoa Clinic</small>
                  </span>
                  <span className="toc-dots" aria-hidden="true" />
                  <span className="toc-page">61</span>
                </a>
              </li>
            </ol>
            <a className="pg-next" href="#work">
              Begin reading ↓
            </a>
          </nav>

          {/* the cover */}
          <div
            ref={cover}
            className={`op-cover${gl ? ' is-gl' : ''}`}
            role="button"
            tabIndex={0}
            aria-label="Open the book: Bernice Animwaa Boateng, Vol. 01"
            onClick={openBook}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                openBook();
              }
            }}
          >
            <CoverArt />
          </div>
          <PaperCover state={paper} anchor={cover} onReady={onReady} />
        </div>
      </div>
    </section>
  );
}
