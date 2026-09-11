'use client';

import ScrollReveal from './ScrollReveal';

type Skill = string | { name: string; learning?: boolean };

const skillCategories: { title: string; icon: string; skills: Skill[] }[] = [
  {
    title: 'Languages',
    icon: '</>',
    skills: ['Python', 'SQL', 'JavaScript', 'TypeScript', 'MATLAB', 'HTML/CSS'],
  },
  {
    title: 'Data & Analytics',
    icon: '#',
    skills: ['Excel', 'Power BI', 'Pandas', 'NumPy', 'Scikit-learn', 'Matplotlib', 'Seaborn'],
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
    title: 'Tools & Cloud',
    icon: '>>',
    skills: ['Git', 'Docker', 'Vercel', 'Render', 'Hugging Face', 'Figma'],
  },
];

export default function Skills() {
  return (
    <section className="section" id="skills">
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
                  {category.skills.map((skill, i) => {
                    const name = typeof skill === 'string' ? skill : skill.name;
                    const learning = typeof skill !== 'string' && skill.learning;
                    return (
                      <span key={i} className={`skill-item${learning ? ' skill-item-learning' : ''}`}>
                        {name}
                        {learning && <em className="skill-flag">learning</em>}
                      </span>
                    );
                  })}
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
