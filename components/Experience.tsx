'use client';

import ScrollReveal from './ScrollReveal';

const experiences = [
  {
    role: 'Software Engineer and Data Analyst',
    company: 'Really Great Tech',
    location: 'Accra, Ghana',
    period: 'Dec 2025 — Present',
    type: 'current',
    points: [
      'Built Vellichor AI, a full-stack literary analysis platform powered by a custom fine-tuned GPT-2 model for emotion and subtext detection in text, deployed via FastAPI and Docker',
      'Developed an end-to-end customer churn prediction model using Logistic Regression, achieving 82% accuracy and 0.86 ROC AUC score by engineering features from 20+ customer attributes',
      'Deployed ML model as a RESTful Flask API containerized with Docker, implementing feature alignment logic and deploying to AWS Elastic Beanstalk for scalable cloud serving',
      'Built regression models for car price prediction and laptop price analysis using Python (Pandas, NumPy, Scikit-learn), performing comprehensive EDA and feature engineering',
      'Created interactive data visualizations using Matplotlib and Seaborn to analyze customer behavior patterns, identifying key churn drivers that informed business recommendations',
    ],
  },
  {
    role: 'Software Engineer and IT Intern',
    company: 'Cocoa Clinic',
    location: 'Accra, Ghana',
    period: 'Apr 2025 — Aug 2025',
    type: 'past',
    points: [
      'Assisted with maintaining and updating the hospital\'s electronic health record (EHR) systems',
      'Collaborated with the IT team on digital transformation initiatives and internal reporting tools',
      'Provided technical support for internal software and hardware issues',
    ],
  },
];

export default function Experience() {
  return (
    <section className="section" id="experience">
      <div className="container">
        <ScrollReveal>
          <h2 className="section-title">Experience</h2>
        </ScrollReveal>
        
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
                    <div key={i} className="exp-point">
                      <span className="exp-point-arrow">▹</span>
                      <span>{point}</span>
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
