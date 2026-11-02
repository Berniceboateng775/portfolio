'use client';

import ScrollReveal from './ScrollReveal';
import SectionHeading from './SectionHeading';

type ExperiencePoint = string | { text: string; subPoints: string[] };

interface ExperienceEntry {
  role: string;
  company: string;
  location: string;
  period: string;
  type: string;
  points: ExperiencePoint[];
}

const experiences: ExperienceEntry[] = [
  {
    role: 'AI/ML Engineer and Data Analyst (National Service)',
    company: 'Really Great Tech',
    location: 'Accra, Ghana',
    period: 'Dec 2025 — Sep 2026',
    type: 'past',
    points: [
      {
        text: 'Semler Scientific — Peripheral Artery Disease (PAD) Severity:',
        subPoints: [
          'Built and benchmarked XGBoost and PyTorch models that classify peripheral artery disease severity from arterial PPG waveforms, validated with 6-fold Leave-One-Clinic-Out across 6 clinics (346+ limbs) so each clinic is tested as unseen data.',
          'Engineered and evaluated 111 pulse-waveform biomarkers (pyPPG), used Kernel PCA and metaheuristic feature selection (zoofs) to find compact feature sets, and calibrated thresholds on training folds only, reaching about 80% sensitivity and 79% specificity (ROC AUC 0.82) on unseen clinics.',
          'Built interactive dashboards showing performance sweeps, confusion matrices, 95% confidence intervals and per-clinic results.',
          'Earlier on Semler, worked on XGBoost regression predicting myocardial strain from PPG, with feature extraction, recursive feature elimination and leakage-safe hyperparameter tuning scripts.',
        ],
      },
      {
        text: 'AppWork VoiceAI — Inbound Call Distress Detection:',
        subPoints: [
          'Helped build an AI system for a property management company that flags distress in inbound calls.',
          'Benchmarked Hugging Face speech emotion models, labelled distress ground truth from a 911 calls dataset, and worked on a pipeline that fuses audio and text signals.',
        ],
      },
    ],
  },
  {
    role: 'Software Engineer and IT Intern',
    company: 'Cocoa Clinic',
    location: 'Accra, Ghana',
    period: 'Apr 2025 — Aug 2025',
    type: 'past',
    points: [
      'Helped maintain and update the hospital’s electronic health record (EHR) systems',
      'Worked with the IT team on digital transformation projects and internal reporting tools',
      'Handled technical support for software and hardware issues',
    ],
  },
];

export default function Experience() {
  return (
    <section className="section" id="experience">
      <div className="container">
        <SectionHeading>Where I&apos;ve <em>worked</em></SectionHeading>
        
        <div className="exp-grid">
          {experiences.map((exp, index) => (
            <ScrollReveal key={index} delay={index * 200}>
              <div className={`exp-card ${exp.type === 'current' ? 'exp-card-active' : ''}`}>
                <div className="exp-card-glow" />
                
                <div className="exp-card-header">
                  <div className="exp-card-info">
                    <h3 className="exp-role">{exp.role}</h3>
                    <p className="exp-company">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                        <circle cx="12" cy="7" r="4" />
                      </svg>
                      {exp.company}
                    </p>
                  </div>
                  {exp.type === 'current' && (
                    <span className="exp-badge">
                      <span className="exp-badge-dot" />
                      CURRENT
                    </span>
                  )}
                </div>

                <div className="exp-meta">
                  <span className="exp-meta-item">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                      <circle cx="12" cy="10" r="3" />
                    </svg>
                    {exp.location}
                  </span>
                  <span className="exp-meta-item">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                      <line x1="16" y1="2" x2="16" y2="6" />
                      <line x1="8" y1="2" x2="8" y2="6" />
                      <line x1="3" y1="10" x2="21" y2="10" />
                    </svg>
                    {exp.period}
                  </span>
                </div>
                
                <div className="exp-points">
                  {exp.points.map((point, i) => (
                    <div key={i}>
                      <div className="exp-point">
                        <span className="exp-point-arrow">▹</span>
                        <span>{typeof point === 'string' ? point : <strong>{point.text}</strong>}</span>
                      </div>
                      {typeof point !== 'string' && point.subPoints && (
                        <div className="exp-subpoints">
                          {point.subPoints.map((sub, j) => (
                            <div key={j} className="exp-subpoint">
                              <span className="exp-subpoint-arrow">▸</span>
                              <span>{sub}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
