'use client';

import React from 'react';
import HeroViz from './HeroViz';

const tags = ['Python', 'SQL', 'Excel', 'Power BI', 'Pandas', 'React'];

export default function Hero() {
  return (
    <section className="hero" id="home">
      <div className="container hero-container">

        {/* Left: text */}
        <div className="hero-content">
          <p className="hero-eyebrow">Data Analyst · Software Developer · Accra, GH</p>

          <h1 className="hero-name">
            Bernice Animwaa<br />
            <span className="accent">Boateng</span>
          </h1>

          <p className="hero-tagline">
            I dig through messy data to find what matters, then <b>build the
            apps</b> that put those answers in front of the people who need them.
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
        </div>

        {/* Right: coded, self-cycling data-viz figure */}
        <div className="hero-figure-wrap">
          <HeroViz />
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
