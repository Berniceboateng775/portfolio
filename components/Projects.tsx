import Image from 'next/image';

const projects = [
  {
    title: 'MedMate DDI — Drug Interaction Checker',
    description: 'Full-stack healthcare application for detecting drug-drug interactions using custom-trained ML models. Features transformer-based interaction prediction, AI-driven drug substitution recommendations, and secure authentication with JWT and WebAuthn/Passkeys.',
    tech: ['Python', 'React', 'Django', 'TensorFlow', 'PostgreSQL'],
    liveUrl: 'https://medmate-ddi.vercel.app',
    githubUrl: null,
    mlUrl: 'https://huggingface.co/spaces/Bernice775/drug-interaction-prediction',
    status: 'live',
    images: ['/images/medmate-hero.png','/images/anonymous.png', '/images/medmate-result.png'],
  },
  {
    title: 'Vellichor AI — Emotion & Theme Analysis',
    description: 'Full-stack literary analysis platform powered by a custom fine-tuned GPT-2 model. It classifies the emotional vibe and subtext of written dialogue into 7 universal categories with 79% accuracy, using context-aware engineering and dropout regularization. Outperforms standard models in nuanced fiction analysis by reading subtext rather than surface-level keywords.',
    tech: ['HTML/CSS/JS', 'FastAPI', 'React', 'MongoDB', 'GPT-2', 'Docker'],
    liveUrl: 'https://vellichor-ai.vercel.app',
    githubUrl: null,
    mlUrl: 'https://vellichor.onrender.com',
    status: 'live',
    images: ['/images/vellichor.jpg'],
  },
  {
    title: 'Book Collection Management System',
    description: 'Web application following MVC architecture for managing book collections. Features include adding books with details, dynamic genre filtering, CRUD operations, and a responsive React frontend with MongoDB backend.',
    tech: ['React', 'Node.js', 'Express', 'MongoDB', 'MVC'],
    liveUrl: null,
    githubUrl: 'https://github.com/Berniceboateng775/Book-management-system-mvc',
    status: 'completed',
    images: [ '/images/mvc1.png', '/images/mvc2.png', '/images/mvc3.png'],
  },
  {
    title: 'Hubtel Clone',
    description: 'Functional clone of the Hubtel mobile application featuring mobile money transactions, bill payments, and user authentication linked to the original Hubtel web app.',
    tech: ['React', 'Node.js', 'API Integration', 'Authentication'],
    liveUrl: null,
    githubUrl: 'https://github.com/Berniceboateng775/Hubtel-Clone',
    status: 'completed',
    images: [],
  },
  {
    title: 'Smart Dustbin System — IoT Prototype',
    description: 'Smart dustbin prototype using Arduino and IoT concepts with sensor-based automation. Features ultrasonic sensor-triggered automatic lid mechanism for touchless operation and improved hygiene.',
    tech: ['Arduino', 'IoT', 'Embedded Systems', 'Sensors'],
    liveUrl: null,
    githubUrl: null,
    status: 'completed',
    images: [],
  },
  {
    title: 'Limerence',
    description: 'Book-centric application allowing users to discover books and connect within a reader-focused social community. Features user interaction, social engagement, and content sharing.',
    tech: ['React', 'Backend APIs', 'Database Design'],
    liveUrl: null,
    githubUrl: null,
    status: 'in-progress',
    images: ['/images/lim1.png', '/images/lim2.png', '/images/lim3.png', '/images/lim4.png', '/images/lim5.png'],
  },
  {
    title: 'E-commerce Website',
    description: 'E-commerce platform for product display, category management, and purchase flow. Features structured product listings and user-friendly navigation simulating real-world online shopping.',
    tech: ['HTML', 'CSS', 'JavaScript', 'Backend Integration'],
    liveUrl: null,
    githubUrl: 'https://github.com/Berniceboateng775/Project1-E-ccomerce',
    status: 'completed',
    images: ['/images/ecom-sign.png', '/images/ecom-log.png', '/images/ecom-home.png'],
  },
];

export default function Projects() {
  return (
    <section className="section" id="projects">
      <div className="container">
        <h2 className="section-title">Projects</h2>
        
        <div className="projects-grid">
          {projects.map((project, index) => (
            <div key={index} className="project-card glass-card">
              <div className="project-header">
                <div className="project-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
                  </svg>
                </div>
                <div className="project-links">
                  {project.githubUrl && (
                    <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                      </svg>
                    </a>
                  )}
                  {project.liveUrl && (
                    <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" aria-label="Live Demo">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3" />
                      </svg>
                    </a>
                  )}
                  {project.mlUrl && (
                    <a href={project.mlUrl} target="_blank" rel="noopener noreferrer" aria-label="ML Model">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="12" cy="12" r="3" />
                        <path d="M12 1v6M12 17v6M4.22 4.22l4.24 4.24M15.54 15.54l4.24 4.24M1 12h6M17 12h6M4.22 19.78l4.24-4.24M15.54 8.46l4.24-4.24" />
                      </svg>
                    </a>
                  )}
                </div>
              </div>
              
              {project.status === 'in-progress' && (
                <div className="project-status">
                  <span className="status-dot active"></span>
                  In Progress
                </div>
              )}
              
              {project.images && project.images.length > 0 && (
                <div className="project-images">
                  {project.images.map((img, i) => (
                    <Image
                      key={i}
                      src={img}
                      alt={`${project.title} screenshot ${i + 1}`}
                      width={120}
                      height={80}
                      className="project-image"
                      style={{ objectFit: 'cover' }}
                    />
                  ))}
                </div>
              )}
              
              <h3 className="project-title">{project.title}</h3>
              <p className="project-description">{project.description}</p>
              
              <div className="project-tech">
                {project.tech.map((tech, i) => (
                  <span key={i} className="tech-tag">{tech}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
