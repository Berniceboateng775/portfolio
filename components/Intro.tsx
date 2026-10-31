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
   romance novels stacked under the lamp. The scene lights up piece
   by piece, the name reveals, then a two-layer curtain lifts.

   Plays once per browser session. The inline script in layout.tsx
   sets <html data-intro="play|skip"> before first paint so returning
   visitors (and reduced-motion users) never see a flash of it.
---------------------------------------------------------------- */

const CURTAIN = [0.76, 0, 0.24, 1] as const;
const SOFT = [0.22, 1, 0.36, 1] as const;
const PLAY_MS = 8200;

const FIRST = 'Bernice Animwaa';
const LAST = 'Boateng';
const STATUS = ['Turning on the lamp', 'Waking the monitor', 'Queueing the playlist', 'Opening a new chapter', 'Compiling the portfolio'];

// Night skyline in the window: [x, width, height]; lit windows picked deterministically.
const BUILDINGS = [[32, 22, 70], [54, 18, 112], [72, 26, 86], [98, 16, 132], [114, 24, 96], [138, 20, 122], [158, 14, 78]];
const CITY_LIGHTS = BUILDINGS.flatMap(([x, w, h], b) => {
  const out: [number, number][] = [];
  for (let y = 230 - h + 6; y < 226; y += 7) {
    for (let cx = x + 3; cx < x + w - 3; cx += 5) {
      if ((b * 7 + cx * 13 + y * 3) % 5 === 0) out.push([cx, y]);
    }
  }
  return out;
}).map(([x, y], i) => [x, y, i] as const);

// Curls around the edge of her puff and the back of her head, so the hair
// reads as textured rather than a flat shape.
const ring = (cx: number, cy: number, r: number, n: number, size: number, from = 0, to = 360) =>
  Array.from({ length: n }, (_, i) => {
    const a = ((from + ((to - from) * i) / (n - 1)) * Math.PI) / 180;
    return [
      Math.round((cx + Math.cos(a) * r) * 100) / 100,
      Math.round((cy + Math.sin(a) * r) * 100) / 100,
      size + ((i * 7) % 3) * 0.6,
    ];
  });
const CURLS = [...ring(360, 203, 20, 18, 4.6, 0, 340), ...ring(360, 246, 28.5, 14, 4.2, -10, 190)];

const TOKEN: Record<string, string> = {
  kw: '#f472b6',
  fn: '#93c5fd',
  st: '#86efac',
  nm: '#fcd34d',
  tx: '#d4d4d8',
  pn: '#71717a',
  cm: '#3f3f46',
};
// [indent, [width, token][]] — reads like a short training script.
const CODE: [number, [number, string][]][] = [
  [0, [[14, 'kw'], [30, 'fn'], [12, 'kw'], [20, 'tx']]],
  [0, [[14, 'kw'], [26, 'fn'], [12, 'kw'], [30, 'tx']]],
  [0, []],
  [0, [[12, 'kw'], [30, 'fn'], [40, 'tx']]],
  [10, [[24, 'tx'], [6, 'pn'], [36, 'fn']]],
  [10, [[14, 'kw'], [18, 'tx'], [12, 'kw'], [30, 'fn']]],
  [20, [[22, 'tx'], [6, 'pn'], [28, 'fn'], [12, 'nm']]],
  [20, [[30, 'tx'], [6, 'pn'], [42, 'st']]],
  [20, [[64, 'cm']]],
  [10, [[16, 'kw'], [22, 'tx'], [6, 'pn'], [16, 'nm']]],
  [0, []],
  [0, [[24, 'tx'], [6, 'pn'], [34, 'fn'], [22, 'st']]],
  [0, [[20, 'fn'], [48, 'st']]],
  [0, [[14, 'kw'], [24, 'tx']]],
];
const CODE_X = 296;
const CODE_Y = 117;
const LINE_H = 7.6;
const CODE_START = 2.2;

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
    // Let the hero start animating while the curtain is still lifting.
    setTimeout(() => {
      document.documentElement.dataset.intro = 'done';
    }, 400);
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
          key="curtain"
          className="intro-curtain"
          aria-hidden="true"
          exit={{ y: '-100%' }}
          transition={{ duration: 1.2, delay: 0.14, ease: CURTAIN }}
        />
      )}
      {show && (
        <motion.div
          key="intro"
          className="intro"
          role="dialog"
          aria-label="Opening animation"
          exit={{ y: '-100%' }}
          transition={{ duration: 1.15, ease: CURTAIN }}
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

function Scene({ progress }: { progress: MotionValue<number> }) {
  return (
    <svg
      className="intro-scene"
      viewBox="0 0 640 400"
      role="img"
      aria-label="Seen from behind, a girl in headphones sits at her desk; code fills her monitor, Spotify plays on her laptop and romance novels are stacked under the lamp"
    >
      <defs>
        <linearGradient id="wall" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#141317" />
          <stop offset="1" stopColor="#0c0c0e" />
        </linearGradient>
        <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#0b1022" />
          <stop offset="1" stopColor="#24162c" />
        </linearGradient>
        <linearGradient id="deskTop" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#2c2220" />
          <stop offset="1" stopColor="#1a1412" />
        </linearGradient>
        <linearGradient id="hair" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#2a2024" />
          <stop offset="1" stopColor="#0d0a0b" />
        </linearGradient>
        <linearGradient id="hoodie" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#2b2730" />
          <stop offset="1" stopColor="#121116" />
        </linearGradient>
        <linearGradient id="skin" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#4a2c1e" />
          <stop offset="1" stopColor="#6b412b" />
        </linearGradient>
        <linearGradient id="lampCone" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ffd9a8" stopOpacity="0.38" />
          <stop offset="1" stopColor="#ffd9a8" stopOpacity="0.04" />
        </linearGradient>
        <linearGradient id="album" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#f472b6" />
          <stop offset="1" stopColor="#7c3aed" />
        </linearGradient>
        <radialGradient id="spill" cx="0.5" cy="0.45" r="0.5">
          <stop offset="0" stopColor="#fbcfe8" stopOpacity="0.16" />
          <stop offset="1" stopColor="#fbcfe8" stopOpacity="0" />
        </radialGradient>
        <filter id="blurXL" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="26" />
        </filter>
        <filter id="blurM" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="6" />
        </filter>
        <filter id="blurS" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="1.2" />
        </filter>
        <clipPath id="windowClip">
          <rect x="30" y="40" width="140" height="190" rx="3" />
        </clipPath>
        <clipPath id="screenClip">
          <rect x="251" y="101" width="218" height="127" rx="2" />
        </clipPath>
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

      {/* room */}
      <motion.g {...enter(0, 0, 1.6)}>
        <rect width="640" height="300" fill="url(#wall)" />

        {/* window onto the city */}
        <g clipPath="url(#windowClip)">
          <rect x="30" y="40" width="140" height="190" fill="url(#sky)" />
          <circle cx="140" cy="76" r="22" fill="#f5efe6" opacity="0.08" filter="url(#blurM)" />
          <circle cx="140" cy="76" r="9" fill="#f5efe6" />
          {BUILDINGS.map(([x, w, h], i) => (
            <rect key={i} x={x} y={230 - h} width={w} height={h} fill={i % 2 ? '#0d0d14' : '#11111a'} />
          ))}
          {CITY_LIGHTS.map(([x, y, i]) => (
            <rect
              key={i}
              className={i % 6 === 0 ? 'sc-city blink' : 'sc-city'}
              x={x}
              y={y}
              width="2"
              height="2.6"
              style={{ animationDelay: `${(i % 7) * 0.9}s` }}
            />
          ))}
        </g>
        <rect x="30" y="40" width="140" height="190" rx="3" fill="none" stroke="#25232b" strokeWidth="5" />
        <path d="M100,40 V230 M30,140 H170" stroke="#25232b" strokeWidth="3" />

        {/* shelf: novels and a record */}
        <rect x="488" y="120" width="134" height="5" rx="1" fill="#2a211d" />
        <rect x="498" y="86" width="8" height="34" rx="1" fill="#be185d" />
        <rect x="507" y="90" width="7" height="30" rx="1" fill="#f9a8d4" />
        <rect x="515" y="84" width="9" height="36" rx="1" fill="#4a1d3a" />
        <rect x="525" y="92" width="6" height="28" rx="1" fill="#e0684a" />
        <rect x="532" y="88" width="8" height="32" rx="1" transform="rotate(8 536 120)" fill="#831843" />
        <circle cx="578" cy="102" r="18" fill="#0d0d10" stroke="#232328" />
        <circle cx="578" cy="102" r="12" fill="none" stroke="#18181c" />
        <circle cx="578" cy="102" r="5.5" fill="#f472b6" />
        <circle cx="578" cy="102" r="1" fill="#0d0d10" />
      </motion.g>

      {/* monitor backlight + light spilling on the wall */}
      <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.4, duration: 2 }}>
        <ellipse className="sc-backlight" cx="360" cy="170" rx="170" ry="92" fill="#f472b6" opacity="0.28" filter="url(#blurXL)" />
        <rect x="80" y="20" width="560" height="320" fill="url(#spill)" />
      </motion.g>

      {/* desk */}
      <motion.g {...enter(0.3, 0, 1.4)}>
        <path d="M18,282 H622 L640,300 H0 Z" fill="url(#deskTop)" />
        <rect y="300" width="640" height="100" fill="#0e0b0a" />
        <rect y="300" width="640" height="1.5" fill="#3a2e2a" opacity="0.6" />
      </motion.g>

      {/* desk lamp and its warm pool of light */}
      <motion.g {...enter(0.6, 6)}>
        <ellipse cx="92" cy="291" rx="20" ry="4.5" fill="#1f1f24" />
        <path d="M92,289 L82,214 L136,190" stroke="#2c2c33" strokeWidth="4" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="82" cy="214" r="3.5" fill="#3a3a42" />
        <path d="M126,180 L162,196 L152,212 L118,197 Z" fill="#2c2c33" />
      </motion.g>
      <motion.g initial={{ opacity: 0 }} animate={{ opacity: [0, 1, 0.4, 1] }} transition={{ delay: 0.9, duration: 0.9, times: [0, 0.3, 0.5, 1] }}>
        <path className="sc-lamp" d="M120,201 L156,213 L262,292 L96,292 Z" fill="url(#lampCone)" filter="url(#blurM)" />
        <circle cx="140" cy="207" r="5" fill="#ffe4c2" />
        <circle cx="140" cy="207" r="16" fill="#ffd9a8" opacity="0.35" filter="url(#blurM)" />
      </motion.g>

      {/* romance novels under the lamp, Fourth Wing propped up */}
      <motion.g {...enter(1.0, 8)}>
        <rect x="146" y="279" width="88" height="12" rx="1.5" fill="#9d174d" />
        <rect x="229" y="280" width="3" height="10" fill="#efe6da" opacity="0.8" />
        <rect x="152" y="268" width="78" height="11" rx="1.5" fill="#4a1d3a" />
        <rect x="225" y="269" width="3" height="9" fill="#efe6da" opacity="0.8" />
        <rect x="144" y="258" width="82" height="10" rx="1.5" fill="#e48aa9" />
        <rect x="221" y="259" width="3" height="8" fill="#efe6da" opacity="0.8" />
        <rect x="176" y="283" width="24" height="3" rx="1" fill="#f5d0a9" opacity="0.7" />
        <rect x="178" y="272" width="22" height="3" rx="1" fill="#f5d0a9" opacity="0.6" />
        <rect x="172" y="261" width="24" height="3" rx="1" fill="#7a1d3f" opacity="0.7" />
        <g transform="rotate(-9 254 291)">
          <rect x="237" y="236" width="36" height="55" rx="1.5" fill="#1a1412" />
          <image href="/images/books/fourth-wing.jpg" x="238" y="237" width="34" height="53" preserveAspectRatio="xMidYMid slice" />
          <rect x="237" y="236" width="3" height="55" fill="#000" opacity="0.25" />
        </g>
      </motion.g>

      {/* monitor */}
      <motion.g {...enter(0.8, 8)}>
        <rect x="350" y="238" width="20" height="48" fill="#232328" />
        <ellipse cx="360" cy="288" rx="42" ry="5" fill="#1d1d22" />
        <rect x="245" y="95" width="230" height="145" rx="6" fill="#0a0a0c" stroke="#2a2a30" />
      </motion.g>

      {/* screen powers on, then the code types itself out */}
      <motion.g
        clipPath="url(#screenClip)"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0.9, 0.3, 1] }}
        transition={{ delay: 1.4, duration: 0.8, times: [0, 0.25, 0.45, 1] }}
      >
        <rect x="251" y="101" width="218" height="127" fill="#0f1117" />
        <rect x="251" y="101" width="218" height="8" fill="#16181f" />
        <rect x="282" y="102" width="34" height="7" rx="1" fill="#0f1117" />
        <rect x="286" y="104.5" width="22" height="2" rx="1" fill="#d4d4d8" opacity="0.7" />
        <rect x="320" y="104.5" width="22" height="2" rx="1" fill="#71717a" opacity="0.6" />
        <rect x="251" y="109" width="28" height="119" fill="#12141a" />
        {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
          <rect
            key={i}
            x={i % 3 === 0 ? 255 : 259}
            y={115 + i * 7}
            width={i % 3 === 0 ? 18 : 15}
            height="2.2"
            rx="1"
            fill={i === 3 ? '#f472b6' : '#52525b'}
            opacity="0.8"
          />
        ))}
        {CODE.map(([indent, tokens], i) => {
          let x = CODE_X + indent;
          return (
            <g key={i}>
              <rect x="285" y={CODE_Y + i * LINE_H} width="5" height="2.4" rx="1" fill="#3f3f46" />
              <g className="sc-line" style={{ animationDelay: `${CODE_START + i * 0.3}s` }}>
                {tokens.map(([w, k], j) => {
                  const rect = (
                    <rect key={j} x={x} y={CODE_Y + i * LINE_H} width={w} height="2.6" rx="1.2" fill={TOKEN[k]} />
                  );
                  x += w + 4;
                  return rect;
                })}
              </g>
            </g>
          );
        })}
        <rect className="sc-cursor" x={CODE_X + 42} y={CODE_Y + 13 * LINE_H - 1} width="1.6" height="5" fill="#f472b6" />
      </motion.g>

      {/* laptop playing Spotify */}
      <motion.g {...enter(1.1, 8)}>
        <path d="M482,284 L578,284 L588,292 L472,292 Z" fill="#2a2a30" />
        <rect x="488" y="228" width="84" height="56" rx="3" fill="#0c0c0e" stroke="#2a2a30" />
        <rect x="492" y="232" width="76" height="48" rx="1.5" fill="#121212" />
        <rect x="496" y="236" width="20" height="20" rx="1.5" fill="url(#album)" />
        <rect x="520" y="238" width="34" height="3" rx="1.5" fill="#fafafa" opacity="0.85" />
        <rect x="520" y="244" width="22" height="2.4" rx="1.2" fill="#a1a1aa" opacity="0.7" />
        <circle cx="562" cy="239" r="3" fill="#1ed760" />
        <rect x="496" y="264" width="68" height="2" rx="1" fill="#fafafa" opacity="0.2" />
        <motion.rect x="496" y="264" width="68" height="2" rx="1" fill="#1ed760" style={{ scaleX: progress, originX: 0 }} />
        <circle cx="530" cy="273" r="3.6" fill="#fafafa" />
        <path d="M516,271 v4 M545,271 v4" stroke="#a1a1aa" strokeWidth="1.2" />
        <rect x="474" y="292" width="112" height="2" fill="#000" opacity="0.4" />
      </motion.g>

      {/* mug + plant */}
      <motion.g {...enter(1.2, 6)}>
        <rect x="446" y="272" width="16" height="19" rx="3" fill="#f1ece6" />
        <path d="M462,277 q7,0 7,5 q0,5 -7,5" stroke="#f1ece6" strokeWidth="2.6" fill="none" />
        <path className="sc-steam" d="M451,266 q-4,-6 0,-12 q4,-6 0,-12" />
        <path className="sc-steam s2" d="M457,266 q-4,-6 0,-12 q4,-6 0,-12" />
        <path d="M598,270 L626,270 L622,292 L602,292 Z" fill="#3a2f2a" />
        <g className="sc-plant">
          <path d="M612,270 C604,252 600,238 606,226 C612,240 614,254 612,270 Z" fill="#3f6b4a" />
          <path d="M612,270 C622,254 632,248 640,248 C632,258 622,266 612,270 Z" fill="#4d7f58" />
          <path d="M612,270 C600,262 590,258 584,250 C596,250 606,258 612,270 Z" fill="#35593e" />
          <path d="M612,270 C616,250 624,236 632,232 C628,246 620,260 612,270 Z" fill="#5a8f64" />
        </g>
      </motion.g>

      {/* her, from behind — nodding along to the music */}
      <motion.g {...enter(1.8, 24, 1.6)}>
        <path
          d="M266,400 C268,352 280,316 310,302 C326,295 342,293 360,293 C378,293 394,295 410,302 C440,316 452,352 454,400 Z"
          fill="url(#hoodie)"
        />
        <path d="M310,302 C326,295 342,293 360,293 C378,293 394,295 410,302" fill="none" stroke="#fbcfe8" strokeOpacity="0.22" strokeWidth="1.5" filter="url(#blurS)" />
        <path d="M328,300 Q360,318 392,300 Q384,290 360,291 Q336,290 328,300 Z" fill="#1b1920" />
        <rect x="348" y="266" width="24" height="32" rx="6" fill="url(#skin)" />

        <g className="sc-head">
          <ellipse cx="360" cy="246" rx="30" ry="33" fill="url(#hair)" />
          <ellipse cx="360" cy="246" rx="30" ry="33" fill="none" stroke="#fbcfe8" strokeOpacity="0.18" strokeWidth="1.5" filter="url(#blurS)" />
          <circle cx="360" cy="203" r="22" fill="url(#hair)" />
          <circle cx="360" cy="203" r="22" fill="none" stroke="#fbcfe8" strokeOpacity="0.22" strokeWidth="1.5" filter="url(#blurS)" />
          {CURLS.map(([x, y, r], i) => (
            <circle key={i} cx={x} cy={y} r={r} fill={i % 3 ? '#1a1416' : '#241b1f'} />
          ))}
          <path d="M346,190 q6,-6 14,-4 M352,198 q8,-5 15,0 M344,206 q7,-4 12,1" stroke="#3a2c31" strokeWidth="1.4" fill="none" strokeLinecap="round" />
          <path d="M342,232 q8,-5 16,-2 M362,236 q8,-4 14,1 M348,252 q7,-3 13,1" stroke="#2e2327" strokeWidth="1.4" fill="none" strokeLinecap="round" />
          <ellipse cx="360" cy="222" rx="11" ry="3.5" fill="#f472b6" />
          <path d="M329,250 C324,210 396,210 391,250" stroke="#18181c" strokeWidth="7" fill="none" strokeLinecap="round" />
          <path d="M331,236 C334,214 386,214 389,236" stroke="#f472b6" strokeOpacity="0.55" strokeWidth="1.2" fill="none" />
          <ellipse cx="329" cy="254" rx="8.5" ry="13.5" fill="#18181c" />
          <ellipse cx="391" cy="254" rx="8.5" ry="13.5" fill="#18181c" />
          <ellipse cx="327" cy="254" rx="3" ry="8" fill="#f472b6" opacity="0.7" />
          <ellipse cx="393" cy="254" rx="3" ry="8" fill="#f472b6" opacity="0.7" />
        </g>

        <rect x="294" y="338" width="132" height="80" rx="20" fill="#121216" stroke="#26262c" />
        <path d="M306,352 H414 M306,366 H414 M306,380 H414" stroke="#1c1c22" strokeWidth="1.5" />
      </motion.g>

      {/* music drifting out of the headphones */}
      <motion.g fill="#f472b6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.8, duration: 1 }}>
        <g className="sc-note n1"><use href="#note" x="306" y="226" width="18" height="24" /></g>
        <g className="sc-note n2"><use href="#notes" x="396" y="218" width="26" height="26" /></g>
        <g className="sc-note n3"><use href="#note" x="300" y="240" width="18" height="24" /></g>
        <g className="sc-note n4"><use href="#notes" x="402" y="236" width="26" height="26" /></g>
      </motion.g>
    </svg>
  );
}
