'use client';

import ScrollReveal from './ScrollReveal';

export default function About() {
  return (
    <section className="section" id="about">
      <div className="container">
        <ScrollReveal>
          <h2 className="section-title">About Me</h2>
        </ScrollReveal>
        
        <div className="about-content">
          <ScrollReveal direction="left">
            <div className="about-text">
              <h3>Building Technology That Matters</h3>
              <p>
                I&apos;m a passionate Software Engineer and Data Analyst who loves transforming complex datasets into powerful, user-friendly applications. 
                My expertise bridges the gap between machine learning models and robust full-stack web development.
              </p>
              <p>
                From building intelligent drug-interaction checkers to fine-tuning generative models for natural language analysis, I focus on creating technology that makes a tangible impact. 
                I thrive on architecting end-to-end solutions, combining deep analytical thinking with scalable cloud deployments on platforms like AWS, Vercel, and Render.
              </p>
            </div>
          </ScrollReveal>
          
          <ScrollReveal direction="right">
            <div className="about-right">
              <div className="about-education glass-card">
                <p className="education-label">Education</p>
                <h4 className="education-degree">BSc. Computer Engineering</h4>
                <p className="education-school">University of Ghana</p>
                <p className="education-date">Sep 2021 — Nov 2025</p>
              </div>

              <div className="focus-areas">
                <div className="focus-item">
                  <span className="focus-icon">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>
                  </span>
                  <div>
                    <h4 className="focus-title">Full-Stack Development</h4>
                    <p className="focus-desc">End-to-end web applications with React, Django, Node.js, and cloud deployment</p>
                  </div>
                </div>
                <div className="focus-item">
                  <span className="focus-icon">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="3"/><path d="M12 1v6M12 17v6M4.22 4.22l4.24 4.24M15.54 15.54l4.24 4.24M1 12h6M17 12h6M4.22 19.78l4.24-4.24M15.54 8.46l4.24-4.24"/></svg>
                  </span>
                  <div>
                    <h4 className="focus-title">Machine Learning & AI</h4>
                    <p className="focus-desc">Custom model training, fine-tuning transformers, and intelligent prediction systems</p>
                  </div>
                </div>
                <div className="focus-item">
                  <span className="focus-icon">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>
                  </span>
                  <div>
                    <h4 className="focus-title">Data Engineering</h4>
                    <p className="focus-desc">Data pipelines, analysis, and visualization to drive real business decisions</p>
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
