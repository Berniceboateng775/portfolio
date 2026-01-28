export default function About() {
  return (
    <section className="section" id="about">
      <div className="container">
        <h2 className="section-title">About Me</h2>
        
        <div className="about-content">
          <div className="about-text">
            <h3>Building Technology That Matters</h3>
            <p>
              I&apos;m a passionate Software Engineer and Data Analyst with expertise in 
              developing full-stack applications and machine learning solutions. 
              Currently, I focus on creating impactful healthcare technology and 
              data-driven applications that solve real-world problems.
            </p>
            <p>
              My work spans from building ML-powered drug interaction checkers to 
              developing customer churn prediction models. I thrive at the intersection 
              of software engineering and data science, leveraging both to deliver 
              innovative solutions.
            </p>
            
            <div className="about-stats">
              <div className="stat-item glass-card">
                <span className="stat-number">3+</span>
                <span className="stat-label">Projects Deployed</span>
              </div>
              <div className="stat-item glass-card">
                <span className="stat-number">5+</span>
                <span className="stat-label">Technologies</span>
              </div>
              <div className="stat-item glass-card">
                <span className="stat-number">82%</span>
                <span className="stat-label">ML Accuracy</span>
              </div>
            </div>
          </div>
          
          <div className="about-education glass-card">
            <p className="education-label">Education</p>
            <h4 className="education-degree">BSc. Computer Engineering</h4>
            <p className="education-school">University of Ghana</p>
            <p className="education-date">Sep 2021 — Nov 2025</p>
          </div>
        </div>
      </div>
    </section>
  );
}
