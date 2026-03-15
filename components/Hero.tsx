'use client';

import { useEffect, useState } from 'react';

const roles = [
  'Software Engineer',
  'Data Analyst',
  'ML Engineer',
  'Full Stack Developer',
];

export default function Hero() {
  const [currentRole, setCurrentRole] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const role = roles[currentRole];
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        if (displayText.length < role.length) {
          setDisplayText(role.slice(0, displayText.length + 1));
        } else {
          setTimeout(() => setIsDeleting(true), 2000);
        }
      } else {
        if (displayText.length > 0) {
          setDisplayText(displayText.slice(0, -1));
        } else {
          setIsDeleting(false);
          setCurrentRole((prev) => (prev + 1) % roles.length);
        }
      }
    }, isDeleting ? 50 : 100);

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, currentRole]);

  return (
    <section className="hero" id="home">
      <div className="hero-bg" />
      
      <div className="container hero-container">
        
        {/* Left Side: Your Text Content */}
        <div className="hero-content">
          <p className="hero-greeting">Hi, I am</p>
          <h1 className="hero-name">Bernice Animwaa Boateng</h1>
          <p className="hero-title">
            <span className="typed-text">{displayText}</span>
          </p>
          
          <div className="hero-cta">
            <a href="#projects" className="btn btn-primary">
              View My Work
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </a>
            <a href="#contact" className="btn btn-secondary">
              Get In Touch
            </a>
          </div>
        </div>

        {/* Right Side: Tech Girl Animation */}
        <div className="hero-visual">
          <div className="tech-girl-wrapper">
            
            {/* Floating Music Notes */}
            <div className="music-note note-1">♪</div>
            <div className="music-note note-2">♫</div>
            <div className="music-note note-3">♪</div>

            {/* Now Playing Glass Widget */}
            <div className="now-playing-widget">
              <div className="equalizer">
                <span className="bar bar-1"></span>
                <span className="bar bar-2"></span>
                <span className="bar bar-3"></span>
                <span className="bar bar-4"></span>
              </div>
              <div className="track-info">
                <span className="track-name">End of Beginning</span>
                <span className="artist-name">Djo</span>
              </div>
            </div>

            {/* Tech Girl SVG Art */}
            <svg viewBox="0 0 500 500" className="coder-girl-svg">
              <defs>
                <linearGradient id="screenGlow" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="#ff1e56" stopOpacity="0.1" />
                </linearGradient>
              </defs>

              {/* Desk */}
              <rect x="50" y="400" width="400" height="8" rx="4" fill="var(--border-color)" />
              
              {/* Laptop Screen & Glow */}
              <g className="laptop-screen">
                <polygon points="120,240 260,240 230,390 90,390" fill="var(--bg-secondary)" stroke="var(--accent)" strokeWidth="4" />
                <polygon points="120,240 260,240 230,390 90,390" fill="url(#screenGlow)" />
                {/* Code lines on screen */}
                <line x1="140" y1="270" x2="220" y2="270" stroke="var(--text-primary)" strokeWidth="3" opacity="0.6" strokeDasharray="10, 5, 20, 5" />
                <line x1="135" y1="300" x2="200" y2="300" stroke="var(--accent)" strokeWidth="3" opacity="0.8" strokeDasharray="15, 10, 5, 5" />
                <line x1="130" y1="330" x2="230" y2="330" stroke="var(--text-primary)" strokeWidth="3" opacity="0.4" strokeDasharray="5, 5, 30, 5" />
              </g>
              
              {/* Laptop Base */}
              <polygon points="90,390 230,390 280,410 70,410" fill="var(--text-muted)" />
              
              {/* Girl Body */}
              <path d="M 280 280 C 280 240, 380 240, 380 280 L 400 400 L 250 400 Z" fill="var(--text-primary)" />
              
              {/* Girl Head & Bun */}
              <circle cx="340" cy="200" r="45" fill="var(--text-primary)" />
              <circle cx="390" cy="165" r="25" fill="var(--text-primary)" />
              
              {/* Glowing Headphones */}
              <path d="M 295 200 C 295 130, 385 130, 385 200" fill="none" stroke="var(--accent)" strokeWidth="8" strokeLinecap="round" className="headphone-band" />
              <rect x="285" y="180" width="15" height="40" rx="5" fill="var(--bg-primary)" stroke="var(--accent)" strokeWidth="4" className="headphone-earcup" />
              <rect x="380" y="180" width="15" height="40" rx="5" fill="var(--bg-primary)" stroke="var(--accent)" strokeWidth="4" className="headphone-earcup" />
            </svg>
            
          </div>
        </div>

      </div>

      <div className="scroll-indicator">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 5v14M19 12l-7 7-7-7" />
        </svg>
      </div>
    </section>
  );
}
