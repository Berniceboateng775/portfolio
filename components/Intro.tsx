'use client';

import { useCallback, useEffect, useState } from 'react';
import {
  AnimatePresence,
  animate,
  motion,
  useMotionValue,
  useTransform,
  type MotionValue,
} from 'framer-motion';

/* ---------------------------------------------------------------
   Opening sequence.
   Night-time desk setup, seen from behind: she's in headphones in
   front of a monitor full of code, Spotify playing on the laptop,
   romance novels stacked under the lamp. The illustration fades up
   from dark with a slow push-in while lights, steam and music notes
   animate on top; the name reveals, then the whole intro dissolves
   (fade, slight zoom, blur) into the page underneath.

   Plays once per browser session. The inline script in layout.tsx
   sets <html data-intro="play|skip"> before first paint so returning
   visitors (and reduced-motion users) never see a flash of it.
---------------------------------------------------------------- */

const DISSOLVE = [0.65, 0, 0.35, 1] as const;
const SOFT = [0.22, 1, 0.36, 1] as const;
const PLAY_MS = 8200;

const FIRST = 'Bernice Animwaa';
const LAST = 'Boateng';
const STATUS = ['Turning on the lamp', 'Waking the monitor', 'Queueing the playlist', 'Opening a new chapter', 'Compiling the portfolio'];

// New code she types on the right half of her monitor, in image pixels.
// Each token is [width, colour]; lines start typing TYPE_START seconds in.
const TYPED: { x: number; y: number; tokens: [number, string][] }[] = [
  { x: 966, y: 436, tokens: [[16, '#f472b6'], [38, '#93c5fd'], [12, '#e4e4e7']] },
  { x: 976, y: 446, tokens: [[28, '#e4e4e7'], [6, '#71717a'], [34, '#86efac']] },
  { x: 976, y: 456, tokens: [[16, '#f472b6'], [24, '#fcd34d'], [22, '#93c5fd']] },
  { x: 966, y: 466, tokens: [[42, '#86efac'], [10, '#e4e4e7']] },
];
const TYPE_START = 2.4;
const TYPE_LINE = 1.1;
const lineWidth = (tokens: [number, string][]) => tokens.reduce((w, [tw]) => w + tw + 3, -3);
const CARET = TYPED.flatMap((l) => [
  { x: l.x, y: l.y },
  { x: l.x + lineWidth(l.tokens) + 2, y: l.y },
]);

const enter = (delay: number, y = 10, duration = 1.4) => ({
  initial: { opacity: 0, y },
  animate: { opacity: 1, y: 0 },
  transition: { duration, delay, ease: SOFT },
});

export default function Intro() {
  const [show, setShow] = useState(true);
  const [status, setStatus] = useState(0);
  const progress = useMotionValue(0);
  const pct = useTransform(progress, (v) => Math.round(v));
  const bar = useTransform(progress, [0, 100], [0, 1]);

  const dismiss = useCallback(() => {
    setShow(false);
    try {
      sessionStorage.setItem('bb-intro', '1');
    } catch {}
    // The page underneath starts its entrance while the intro dissolves.
    document.documentElement.dataset.intro = 'done';
  }, []);

  useEffect(() => {
    // When skipped, CSS keeps the overlay display:none — nothing to run.
    if (document.documentElement.dataset.intro !== 'play') return;

    const counter = animate(progress, 100, {
      duration: PLAY_MS / 1000 - 0.6,
      ease: [0.45, 0, 0.25, 1],
    });
    const ticker = setInterval(() => setStatus((s) => Math.min(s + 1, STATUS.length - 1)), 1600);
    const timer = setTimeout(dismiss, PLAY_MS);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' || e.key === 'Enter') dismiss();
    };
    window.addEventListener('keydown', onKey);

    return () => {
      counter.stop();
      clearInterval(ticker);
      clearTimeout(timer);
      window.removeEventListener('keydown', onKey);
    };
  }, [dismiss, progress]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="intro"
          className="intro"
          role="dialog"
          aria-label="Opening animation"
          exit={{ opacity: 0, scale: 1.06, filter: 'blur(12px)' }}
          transition={{ duration: 1.3, ease: DISSOLVE }}
        >
          <motion.div
            className="intro-top"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            <span>Bernice Boateng</span>
            <button type="button" className="intro-skip" onClick={dismiss}>
              Skip intro
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </button>
          </motion.div>

          <div className="intro-stage">
            <Scene progress={bar} />

            <div className="intro-name" aria-label={`${FIRST} ${LAST}`}>
              <Letters text={FIRST} delay={3.6} />
              <Letters text={LAST} delay={3.6 + FIRST.length * 0.045} italic />
            </div>

            <motion.p className="intro-tagline" {...enter(4.8, 8, 1.2)}>
              Reads <em>books</em>, listens to <em>music</em>, writes <em>code</em>.
            </motion.p>
          </div>

          <div className="intro-bottom">
            <AnimatePresence mode="wait">
              <motion.span
                key={status}
                className="intro-status"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.4 }}
              >
                {STATUS[status]}…
              </motion.span>
            </AnimatePresence>
            <span className="intro-count">
              <motion.span>{pct}</motion.span>
              <sup>%</sup>
            </span>
          </div>
          <div className="intro-bar">
            <motion.div style={{ scaleX: bar }} />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function Letters({ text, delay, italic }: { text: string; delay: number; italic?: boolean }) {
  return (
    <span className={`intro-line${italic ? ' italic' : ''}`} aria-hidden="true">
      {Array.from(text).map((ch, i) => (
        <span key={i} className="intro-mask">
          <motion.span
            initial={{ y: '110%' }}
            animate={{ y: '0%' }}
            transition={{ duration: 1, delay: delay + i * 0.045, ease: SOFT }}
          >
            {ch === ' ' ? ' ' : ch}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

// Overlay coordinates are in the illustration's own pixel space (1536 × 864).
function Scene({ progress }: { progress: MotionValue<number> }) {
  return (
    <motion.div
      className="intro-scene"
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1.6, ease: SOFT }}
    >
      <motion.div
        className="intro-art"
        initial={{ scale: 1.14, filter: 'brightness(0.12) saturate(0.6)' }}
        animate={{ scale: 1, filter: 'brightness(1) saturate(1)' }}
        transition={{
          scale: { duration: PLAY_MS / 1000 + 1, ease: [0.25, 0.1, 0.25, 1] },
          filter: { duration: 2.6, delay: 0.4, ease: 'easeOut' },
        }}
      >
        {/* Her head moves by warping the pixels in place: head-map.png is
            strongest at the top of her puff and fades to zero at the neck,
            so the displacement reads as a tilt from the neck. Red channel
            carries the weight; blue is a neutral 0.5 for the unused axis. */}
        <svg
          viewBox="0 0 1536 864"
          preserveAspectRatio="xMidYMid slice"
          role="img"
          aria-label="Seen from behind, a girl in headphones codes at her desk at night, nodding along to music, romance novels stacked under the lamp and Spotify playing on her laptop"
        >
          <defs>
            <filter id="headMove" filterUnits="userSpaceOnUse" x="0" y="0" width="1536" height="864" colorInterpolationFilters="sRGB">
              <feImage href="/images/intro/head-map.png" x="0" y="0" width="1536" height="864" preserveAspectRatio="none" result="map" />
              <feDisplacementMap in="SourceGraphic" in2="map" scale="0" xChannelSelector="R" yChannelSelector="B" result="sway">
                <animate attributeName="scale" values="-20;20;-20" keyTimes="0;0.5;1" dur="3.8s" calcMode="spline" keySplines="0.45 0 0.55 1;0.45 0 0.55 1" repeatCount="indefinite" />
              </feDisplacementMap>
              <feDisplacementMap in="sway" in2="map" scale="0" xChannelSelector="B" yChannelSelector="R">
                <animate attributeName="scale" values="0;-16;0" keyTimes="0;0.35;1" dur="0.95s" calcMode="spline" keySplines="0.3 0 0.4 1;0.5 0 0.6 1" repeatCount="indefinite" />
              </feDisplacementMap>
            </filter>
          </defs>
          <image href="/images/intro/desk.webp" width="1536" height="864" filter="url(#headMove)" />
        </svg>

        {/* fresh code typing out on her monitor, caret leading the way */}
        <svg className="intro-type" viewBox="0 0 1536 864" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
          <rect x="958" y="428" width="160" height="46" rx="2" fill="#131c28" />
          {TYPED.map((line, i) => {
            let x = line.x;
            return (
              <g key={i} className="ty-line" style={{ animationDelay: `${TYPE_START + i * TYPE_LINE}s` }}>
                {line.tokens.map(([w, c], j) => {
                  const rect = <rect key={j} x={x} y={line.y} width={w} height="3.4" rx="1.2" fill={c} />;
                  x += w + 3;
                  return rect;
                })}
              </g>
            );
          })}
          <motion.rect
            className="ty-caret"
            width="2.2"
            height="6"
            fill="#f472b6"
            initial={{ x: CARET[0].x, y: CARET[0].y - 1.3 }}
            animate={{ x: CARET.map((c) => c.x), y: CARET.map((c) => c.y - 1.3) }}
            transition={{
              delay: TYPE_START,
              duration: TYPED.length * TYPE_LINE,
              times: CARET.map((_, k) => (Math.floor(k / 2) + (k % 2) * 0.9) / TYPED.length),
              ease: 'linear',
            }}
          />
        </svg>

        <svg className="intro-fx" viewBox="0 0 1536 864" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
          <defs>
            <radialGradient id="fxWarm">
              <stop offset="0" stopColor="#ffc98a" stopOpacity="0.55" />
              <stop offset="1" stopColor="#ffc98a" stopOpacity="0" />
            </radialGradient>
            <radialGradient id="fxPink">
              <stop offset="0" stopColor="#f472b6" stopOpacity="0.35" />
              <stop offset="1" stopColor="#f472b6" stopOpacity="0" />
            </radialGradient>
            <filter id="fxBlur" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="4" />
            </filter>
            <symbol id="note" viewBox="-6 -20 18 24" overflow="visible">
              <ellipse cx="0" cy="0" rx="4.4" ry="3.2" transform="rotate(-22)" />
              <rect x="2.9" y="-17" width="1.6" height="16.5" />
              <path d="M4.5,-17 q6,3 5,10 q-1.5,-4.5 -5,-5.6 z" />
            </symbol>
            <symbol id="notes" viewBox="-6 -22 26 26" overflow="visible">
              <ellipse cx="0" cy="0" rx="4.2" ry="3" transform="rotate(-22)" />
              <ellipse cx="13" cy="-3" rx="4.2" ry="3" transform="rotate(-22 13 -3)" />
              <rect x="2.8" y="-18" width="1.5" height="17.5" />
              <rect x="15.8" y="-21" width="1.5" height="17.5" />
              <path d="M2.8,-18 L17.3,-21 L17.3,-17.5 L2.8,-14.5 z" />
            </symbol>
          </defs>

          {/* lights come on, then breathe */}
          <motion.g
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0.5, 1] }}
            transition={{ delay: 1, duration: 1, times: [0, 0.3, 0.5, 1] }}
          >
            <ellipse className="fx-glow" cx="800" cy="380" rx="460" ry="250" fill="url(#fxPink)" />
            <circle className="fx-flicker" cx="335" cy="345" r="170" fill="url(#fxWarm)" />
            <circle className="fx-flicker slow" cx="1508" cy="612" r="60" fill="url(#fxWarm)" />
          </motion.g>

          {/* steam off the tea */}
          <g filter="url(#fxBlur)">
            <path className="fx-steam" d="M398,540 q-14,-26 0,-52 q14,-26 0,-52 q-14,-26 0,-52" />
            <path className="fx-steam s2" d="M418,540 q-14,-26 0,-52 q14,-26 0,-52 q-14,-26 0,-52" />
          </g>

          {/* music drifting out of the headphones */}
          <motion.g fill="#f9a8d4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.4, duration: 1 }}>
            <g className="sc-note n1"><use href="#note" x="600" y="300" width="54" height="72" /></g>
            <g className="sc-note n2"><use href="#notes" x="930" y="270" width="78" height="78" /></g>
            <g className="sc-note n3"><use href="#note" x="610" y="360" width="46" height="62" /></g>
            <g className="sc-note n4"><use href="#notes" x="940" y="330" width="66" height="66" /></g>
          </motion.g>

          {/* the track on her laptop plays along with the loader */}
          <rect x="1192" y="549" width="132" height="3" rx="1.5" fill="#fff" opacity="0.15" />
          <motion.rect x="1192" y="549" width="132" height="3" rx="1.5" fill="#f472b6" style={{ scaleX: progress, originX: 0 }} />
        </svg>
      </motion.div>
      <div className="intro-vignette" aria-hidden="true" />
    </motion.div>
  );
}
