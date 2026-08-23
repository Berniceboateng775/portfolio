'use client';

import ScrollReveal from './ScrollReveal';

const skillCategories = [
  {
    title: 'Languages',
    icon: '</>',
    skills: ['Python', 'JavaScript', 'TypeScript', 'MATLAB', 'HTML/CSS', 'SQL'],
  },
  {
    title: 'Frameworks & Libraries',
    icon: 'Fx',
    skills: ['React.js', 'Node.js', 'Express', 'Flask', 'Django', 'TensorFlow'],
  },
  {
    title: 'Databases',
    icon: 'DB',
    skills: ['MongoDB', 'PostgreSQL', 'Supabase'],
  },
  {
    title: 'Cloud & DevOps',
    icon: '>>',
    skills: ['AWS EC2', 'AWS Elastic Beanstalk', 'Git', 'Docker', 'Vercel', 'Render', 'Hugging Face'],
  },
  {
    title: 'Tools & Other',
    icon: './.',
    skills: ['Figma', 'Pandas', 'NumPy', 'Scikit-learn', 'Matplotlib', 'Seaborn'],
  },
];

export default function Skills() {
  return (
    <section className="section" id="skills" style={{ background: 'var(--bg-secondary)' }}>
      <div className="container">
        <ScrollReveal>
          <h2 className="section-title">Technical Skills</h2>
        </ScrollReveal>
        
        <div className="skills-container">
          {skillCategories.map((category, index) => (
            <ScrollReveal key={index} delay={index * 100} direction="up">
              <div className="skill-category glass-card">
                <div className="skill-category-header">
                  <span className="skill-icon">{category.icon}</span>
                  <h3 className="skill-category-title">{category.title}</h3>
                </div>
                <div className="skill-list">
                  {category.skills.map((skill, i) => (
                    <span key={i} className="skill-item">{skill}</span>
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
