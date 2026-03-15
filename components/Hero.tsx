'use client';

import React, { useEffect, useState } from 'react';

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

        {/* Right Side: PREMIUM Tech Girl Visuals */}
        <div className="hero-visual">
          <div className="tech-girl-wrapper">
            
            {/* Floating Music Notes */}
            <div className="music-note note-1">♪</div>
            <div className="music-note note-2">♫</div>
            <div className="music-note note-3">♪</div>

            {/* Gorgeous Glass Frame with High-Quality Aesthetic GIF */}
            <div className="premium-girl-frame">
              <img 
                src="https://media.giphy.com/media/L1R1tvI9svkIWwpVYr/giphy.gif" 
                alt="Aesthetic Girl Coding" 
                className="tech-girl-image"
              />
            </div>

            {/* Now Playing Glass Widget (Djo - End of Beginning) */}
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
