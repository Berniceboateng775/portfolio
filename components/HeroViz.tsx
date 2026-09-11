'use client';

import React, { useEffect, useState } from 'react';

/* ---------------------------------------------------------------
   Self-cycling data-viz figure.
   Three deterministic charts rotate on a timer, each replaying its
   entrance animation on mount. No random values → SSR-stable.
---------------------------------------------------------------- */

const PLOT = { l: 52, r: 416, t: 30, b: 238 };
const H_GRID = [82, 134, 186];
const V_GRID = [143, 234, 325];

// Chart A — scatter + regression
const SCATTER: [number, number][] = [
  [70, 212], [98, 200], [124, 206], [150, 188], [176, 192],
  [202, 172], [228, 178], [254, 158], [280, 162], [306, 140],
  [332, 146], [358, 122], [384, 116], [404, 96],
];

// Chart B — feature weights (from her churn model)
const BARS = [
  { label: 'tenure', v: 0.94 },
  { label: 'charges', v: 0.71 },
  { label: 'contract', v: 0.80 },
  { label: 'txns', v: 0.52 },
  { label: 'support', v: 0.63 },
  { label: 'plan', v: 0.37 },
];
const SLOT = (PLOT.r - PLOT.l) / BARS.length;
const BAR_W = 32;
const BAR_MAX = 188;

// Chart C — signal over time
const LINE: [number, number][] = [
  [52, 208], [85, 190], [118, 198], [151, 168], [184, 178],
  [217, 146], [250, 154], [283, 126], [316, 116], [349, 122],
  [382, 96], [416, 82],
];
const LINE_PATH = LINE.map((p, i) => `${i ? 'L' : 'M'}${p[0]} ${p[1]}`).join(' ');
const AREA_PATH =
  `M${PLOT.l} ${PLOT.b} ` +
  LINE.map((p) => `L${p[0]} ${p[1]}`).join(' ') +
  ` L${PLOT.r} ${PLOT.b} Z`;

const CHARTS = [
  { kind: 'scatter', title: 'fig.01 — model fit', foot: 'n = 14 · linear regression', stat: 'R² = 0.87', live: false },
  { kind: 'bars', title: 'fig.02 — feature weights', foot: 'churn model · top drivers', stat: '6 features', live: false },
  { kind: 'line', title: 'fig.03 — signal / time', foot: 'rolling window · 12 steps', stat: 'live', live: true },
] as const;

const ARIA: Record<string, string> = {
  scatter: 'Scatter plot with an upward-fitted regression line.',
  bars: 'Bar chart of model feature weights, tenure the strongest.',
  line: 'Line chart of a signal rising over time with a moving marker.',
};

function Frame() {
  return (
    <>
      {H_GRID.map((y) => (
        <line key={`h${y}`} className="viz-grid" x1={PLOT.l} y1={y} x2={PLOT.r} y2={y} />
      ))}
      {V_GRID.map((x) => (
        <line key={`v${x}`} className="viz-grid" x1={x} y1={PLOT.t} x2={x} y2={PLOT.b} />
      ))}
      <line className="viz-axis" x1={PLOT.l} y1={PLOT.t} x2={PLOT.l} y2={PLOT.b} />
      <line className="viz-axis" x1={PLOT.l} y1={PLOT.b} x2={PLOT.r} y2={PLOT.b} />
    </>
  );
}

export default function HeroViz() {
  const [i, setI] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setI((v) => (v + 1) % CHARTS.length), 4200);
    return () => clearInterval(t);
  }, []);

  const chart = CHARTS[i];
  const lastLine = LINE[LINE.length - 1];

  return (
    <div className="hero-figure">
      <div className="figure-head">
        <span className="figure-title">{chart.title}</span>
        <span className="figure-dots" aria-hidden="true">
          {CHARTS.map((_, k) => (
            <span key={k} className={k === i ? 'on' : ''} />
          ))}
        </span>
      </div>

      <div className="figure-body">
        <svg key={chart.kind} className="viz" viewBox="0 0 440 296" role="img" aria-label={ARIA[chart.kind]}>
          <Frame />

          {/* ---- A: scatter + regression ---- */}
          {chart.kind === 'scatter' && (
            <>
              <line className="viz-trend" x1="58" y1="208" x2="410" y2="78" />
              {SCATTER.map(([cx, cy], k) => (
                <circle
                  key={k}
                  className="viz-pt"
                  cx={cx}
                  cy={cy}
                  r="3.6"
                  style={{ animationDelay: `${0.25 + k * 0.05}s` }}
                />
              ))}
              <circle className="viz-live" cx={SCATTER[SCATTER.length - 1][0]} cy={SCATTER[SCATTER.length - 1][1]} r="4" />
              <line className="viz-scan" x1={PLOT.l + 1} y1={PLOT.t} x2={PLOT.l + 1} y2={PLOT.b} />
            </>
          )}

          {/* ---- B: feature-weight bars ---- */}
          {chart.kind === 'bars' && (
            <>
              {BARS.map((d, k) => {
                const h = d.v * BAR_MAX;
                const cx = PLOT.l + SLOT * (k + 0.5);
                return (
                  <g key={d.label}>
                    <rect
                      className={`viz-bar${k === 0 ? ' viz-bar-accent' : ''}`}
                      x={cx - BAR_W / 2}
                      y={PLOT.b - h}
                      width={BAR_W}
                      height={h}
                      style={{ animationDelay: `${0.08 + k * 0.08}s` }}
                    />
                    <text className="viz-bar-label" x={cx} y={PLOT.b + 15}>{d.label}</text>
                  </g>
                );
              })}
            </>
          )}

          {/* ---- C: signal / time ---- */}
          {chart.kind === 'line' && (
            <>
              <path className="viz-area" d={AREA_PATH} />
              <path id="vizLine" className="viz-line" d={LINE_PATH} />
              <circle className="viz-live" cx={lastLine[0]} cy={lastLine[1]} r="4" />
              <circle className="viz-runner" r="4">
                <animateMotion dur="3.2s" repeatCount="indefinite" keyPoints="0;1" keyTimes="0;1" calcMode="linear">
                  <mpath href="#vizLine" />
                </animateMotion>
              </circle>
            </>
          )}

          {/* Axis labels */}
          <text className="viz-label" x={PLOT.l} y="284">
            {chart.kind === 'line' ? 'time →' : 'features →'}
          </text>
          <text className="viz-label" x="14" y="34" transform="rotate(-90 14 34)">signal</text>
        </svg>
      </div>

      <div className="figure-foot">
        <span>{chart.foot}</span>
        <span className={chart.live ? 'r2 r2-live' : 'r2'}>
          {chart.live && <i className="foot-dot" />}
          {chart.stat}
        </span>
      </div>
    </div>
  );
}
