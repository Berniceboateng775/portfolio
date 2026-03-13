const experiences = [
  {
    role: 'Software Engineer and Data Analyst',
    company: 'Really Great Tech',
    location: 'Accra, Ghana',
    period: 'Dec 2025 — Present',
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
    points: [
      'Assisted with maintaining and updating the hospital\'s electronic health record (EHR) systems',
      'Collaborated with the IT team on digital transformation initiatives and internal reporting tools',
      'Provided technical support for internal software and hardware issues',
    ],
  },
];

export default function Experience() {
  return (
    <section className="section" id="experience" style={{ background: 'var(--bg-secondary)' }}>
      <div className="container">
        <h2 className="section-title">Experience</h2>
        
        <div className="experience-timeline">
          {experiences.map((exp, index) => (
            <div key={index} className="experience-item">
              <div className="experience-header">
                <h3 className="experience-role">{exp.role}</h3>
                <p className="experience-company">{exp.company}</p>
                <div className="experience-meta">
                  <span>{exp.location}</span>
                  <span>{exp.period}</span>
                </div>
              </div>
              <ul className="experience-list">
                {exp.points.map((point, i) => (
                  <li key={i}>{point}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
