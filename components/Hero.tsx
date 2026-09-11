'use client';

import React from 'react';
import HeroViz from './HeroViz';

const stats = [
  { num: '82%', label: 'Model accuracy' },
  { num: '0.86', label: 'ROC-AUC' },
  { num: '6', label: 'Projects shipped' },
];

const tags = ['Python', 'SQL', 'TensorFlow', 'React', 'Pandas', 'AWS'];

export default function Hero() {
  return (
    <section className="hero" id="home">
      <div className="container hero-container">

        {/* Left: text */}
        <div className="hero-content">
          <p className="hero-eyebrow">Data Analyst · Data Scientist · Accra, GH</p>

          <h1 className="hero-name">
            Bernice Animwaa<br />
            <span className="accent">Boateng</span>
          </h1>

          <p className="hero-tagline">
            I find the signal in messy data, <b>train the models</b> that act on it,
            and <b>build the full-stack apps</b> that put them in people&apos;s hands.
          </p>

          <div className="hero-tags">
            {tags.map((t) => (
              <span key={t} className="hero-tag">{t}</span>
            ))}
          </div>

          <div className="hero-cta">
            <a href="#projects" className="btn btn-primary">
              View Work
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </a>
            <a href="#contact" className="btn btn-secondary">Get in Touch</a>
          </div>

          <div className="hero-stats">
            {stats.map((s) => (
              <div key={s.label} className="stat">
                <div className="stat-num">{s.num}</div>
                <div className="stat-label">{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: coded data-viz figure */}
        <div className="hero-figure-wrap">
          <div className="hero-figure">
            <div className="figure-head">
              <span className="figure-title">fig.01 — model fit</span>
              <span className="figure-dots"><span /><span /><span /></span>
            </div>
            <div className="figure-body">
              <HeroViz />
            </div>
            <div className="figure-foot">
              <span>n = 19 · linear regression</span>
              <span className="r2">R² = 0.87</span>
            </div>
          </div>
        </div>

      </div>

      <div className="scroll-indicator" aria-hidden="true">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 5v14M19 12l-7 7-7-7" />
        </svg>
      </div>
    </section>
  );
}
