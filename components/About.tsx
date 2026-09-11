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
              <h3>What I do</h3>
              <p>
                I&apos;m a data analyst and software developer. I work across the whole
                pipeline &mdash; cleaning and exploring data, engineering features,
                training and evaluating models, then shipping them inside <b>full-stack
                apps people actually use</b>.
              </p>
              <p>
                Recent work: a drug-interaction checker backed by a custom-trained model,
                a fine-tuned GPT-2 service for text emotion analysis, and a churn model
                deployed as a containerized API on AWS. I care about models that <b>hold
                up outside the notebook</b>.
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
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 3v18h18"/><path d="m7 14 3-3 3 2 5-6"/></svg>
                  </span>
                  <div>
                    <h4 className="focus-title">Data Analysis & Visualization</h4>
                    <p className="focus-desc">Exploratory analysis, dashboards, and clear charts that turn raw numbers into decisions people can act on</p>
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
