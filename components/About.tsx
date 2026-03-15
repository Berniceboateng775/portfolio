export default function About() {
  return (
    <section className="section" id="about">
      <div className="container">
        <h2 className="section-title">About Me</h2>
        
        <div className="about-content">
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
