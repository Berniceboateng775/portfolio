import React from 'react';

// Fixed dataset (deterministic — stable across SSR/hydration).
// A positive-correlation scatter: as features increase, signal increases.
const POINTS: [number, number][] = [
  [62, 244], [80, 236], [98, 240], [116, 224], [134, 228],
  [154, 210], [172, 214], [190, 196], [210, 200], [228, 182],
  [248, 186], [266, 168], [286, 172], [306, 150], [326, 154],
  [348, 134], [370, 128], [392, 112], [406, 104],
];

const H_GRID = [90, 140, 190, 240];
const V_GRID = [110, 180, 250, 320, 390];

export default function HeroViz() {
  const last = POINTS[POINTS.length - 1];

  return (
    <svg
      className="viz"
      viewBox="0 0 440 290"
      role="img"
      aria-label="Scatter plot of model signal against engineered features, with a fitted regression line trending upward."
    >
      {/* Grid */}
      {H_GRID.map((y) => (
        <line key={`h${y}`} className="viz-grid" x1="44" y1={y} x2="416" y2={y} />
      ))}
      {V_GRID.map((x) => (
        <line key={`v${x}`} className="viz-grid" x1={x} y1="26" x2={x} y2="260" />
      ))}

      {/* Axes */}
      <line className="viz-axis" x1="44" y1="26" x2="44" y2="260" />
      <line className="viz-axis" x1="44" y1="260" x2="416" y2="260" />

      {/* Axis ticks */}
      {[260, 210, 160, 110].map((y) => (
        <line key={`ty${y}`} className="viz-tick" x1="39" y1={y} x2="44" y2={y} />
      ))}
      {[44, 137, 230, 323, 416].map((x) => (
        <line key={`tx${x}`} className="viz-tick" x1={x} y1="260" x2={x} y2="265" />
      ))}

      {/* Regression / trend line */}
      <line className="viz-trend" x1="48" y1="248" x2="412" y2="100" />

      {/* Data points */}
      {POINTS.map(([cx, cy], i) => (
        <circle
          key={i}
          className="viz-pt"
          cx={cx}
          cy={cy}
          r="3.6"
          style={{ animationDelay: `${0.35 + i * 0.05}s` }}
        />
      ))}

      {/* Live pulse on the latest datapoint */}
      <circle className="viz-live" cx={last[0]} cy={last[1]} r="4" />

      {/* Scan line */}
      <line className="viz-scan" x1="45" y1="26" x2="45" y2="260" />

      {/* Labels */}
      <text className="viz-label" x="44" y="282">features →</text>
      <text className="viz-label" x="14" y="30" transform="rotate(-90 14 30)">signal</text>
    </svg>
  );
}
