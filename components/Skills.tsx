const skillCategories = [
  {
    title: 'Languages',
    skills: ['Python', 'JavaScript', 'TypeScript', 'MATLAB', 'HTML/CSS', 'SQL'],
  },
  {
    title: 'Frameworks & Libraries',
    skills: ['React.js', 'Node.js', 'Express', 'Flask', 'Django', 'TensorFlow'],
  },
  {
    title: 'Databases',
    skills: ['MongoDB', 'PostgreSQL', 'Supabase'],
  },
  {
    title: 'Cloud & DevOps',
    skills: ['AWS EC2', 'AWS Elastic Beanstalk', 'Git', 'Docker', 'Hugging Face'],
  },
  {
    title: 'Tools & Other',
    skills: ['Figma', 'Pandas', 'NumPy', 'Scikit-learn', 'Matplotlib', 'Seaborn'],
  },
];

export default function Skills() {
  return (
    <section className="section" id="skills" style={{ background: 'var(--bg-secondary)' }}>
      <div className="container">
        <h2 className="section-title">Technical Skills</h2>
        
        <div className="skills-container">
          {skillCategories.map((category, index) => (
            <div key={index} className="skill-category glass-card">
              <h3 className="skill-category-title">{category.title}</h3>
              <div className="skill-list">
                {category.skills.map((skill, i) => (
                  <span key={i} className="skill-item">{skill}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
