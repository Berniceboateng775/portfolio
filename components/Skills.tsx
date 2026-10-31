'use client';

import ScrollReveal from './ScrollReveal';
import SectionHeading from './SectionHeading';

type Skill = string | { name: string; learning?: boolean };

const skillCategories: { title: string; icon: string; skills: Skill[] }[] = [
  {
    title: 'AI & Machine Learning',
    icon: 'AI',
    skills: ['PyTorch', 'TensorFlow', 'Hugging Face', 'XGBoost', 'LightGBM', 'Scikit-learn', 'GPT-2 Fine-Tuning'],
  },
  {
    title: 'Languages',
    icon: '</>',
    skills: ['Python', 'JavaScript', 'TypeScript', 'SQL', 'HTML/CSS'],
  },
  {
    title: 'Frameworks & APIs',
    icon: 'Fx',
    skills: ['FastAPI', 'Django', 'Flask', 'React.js', 'Node.js', 'Express'],
  },
  {
    title: 'Databases & Storage',
    icon: 'DB',
    skills: ['PostgreSQL', 'MongoDB', 'Supabase'],
  },
  {
    title: 'Tools & Cloud',
    icon: '>>',
    skills: ['Docker', 'Git', 'Vercel', 'Render', 'Postman', 'Figma'],
  },
];

export default function Skills() {
  return (
    <section className="section" id="skills">
      <div className="container">
        <SectionHeading>What I <em>work with</em></SectionHeading>

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
