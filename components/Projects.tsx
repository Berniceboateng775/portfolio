import Image from 'next/image';

const projects = [
  {
    title: 'MedMate DDI — Drug Interaction Checker',
    description: 'Full-stack healthcare application for detecting drug-drug interactions using custom-trained ML models. Features transformer-based interaction prediction, AI-driven drug substitution recommendations, and secure authentication with JWT and WebAuthn/Passkeys.',
    tech: ['Python', 'React', 'Django', 'TensorFlow', 'PostgreSQL'],
    liveUrl: 'https://medmate-ddi.vercel.app',
    githubUrl: null,
    mlUrl: 'https://huggingface.co/spaces/Bernice775/drug-interaction-prediction',
    videoUrl: 'https://youtu.be/3Hjd1kbrc1A',
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
    videoUrl: 'https://youtu.be/8AguS4kIdXQ',
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
    images: ['/images/mvc1.png', '/images/mvc2.png', '/images/mvc3.png'],
  },
  {
    title: 'Hubtel Clone',
    description: 'Functional clone of the Hubtel mobile application featuring mobile money transactions, bill payments, and user authentication linked to the original Hubtel web app.',
    tech: ['React', 'Node.js', 'API Integration', 'Auth'],
    liveUrl: null,
    githubUrl: 'https://github.com/Berniceboateng775/Hubtel-Clone',
    status: 'completed',
    images: [],
  },
  {
    title: 'Smart Dustbin System — IoT Prototype',
    description: 'Smart dustbin prototype using Arduino and IoT concepts with sensor-based automation. Features ultrasonic sensor-triggered automatic lid mechanism for touchless operation and improved hygiene.',
    tech: ['Arduino', 'IoT', 'Embedded Systems'],
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
    tech: ['HTML', 'CSS', 'JavaScript', 'Backend'],
    liveUrl: null,
    githubUrl: 'https://github.com/Berniceboateng775/Project1-E-ccomerce',
    status: 'completed',
    images: ['/images/ecom-sign.png', '/images/ecom-log.png', '/images/ecom-home.png'],
  },
];

export default function Projects() {
  return (
    <section className="py-24 relative bg-[#0a0a0c]" id="projects">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Premium Header */}
        <div className="text-center mb-16">
          <h2 className="text-gray-500 font-semibold tracking-[0.3em] uppercase text-xs mb-4">My Portfolio</h2>
          <h1 className="text-4xl md:text-5xl font-black tracking-tight text-white drop-shadow-lg">
            Featured <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-rose-500">Projects</span>
          </h1>
          <div className="h-1 w-16 bg-gradient-to-r from-transparent via-purple-500 to-transparent mx-auto mt-6"></div>
        </div>
        
        {/* Premium Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div key={index} className="bg-[#121215] rounded-2xl border border-white/5 overflow-hidden flex flex-col transition-all duration-500 hover:-translate-y-2 hover:border-purple-500/40 hover:shadow-[0_20px_40px_rgba(0,0,0,0.5),0_0_20px_rgba(176,38,255,0.15)] group relative">
              
              {/* Cinematic Image Banner */}
              <div className="w-full h-52 relative overflow-hidden bg-[#1a1a1e]">
                {project.images && project.images.length > 0 ? (
                  <img 
                    src={project.images[0]} 
                    alt={project.title} 
                    className="w-full h-full object-cover object-top group-hover:scale-110 transition-transform duration-700 ease-out"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-800 to-black">
                    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="2">
                      <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
                    </svg>
                  </div>
                )}
                
                {/* Dark fade over the image */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#121215] pointer-events-none"></div>

                {/* Neon Status Badge */}
                {project.status === 'in-progress' ? (
                  <div className="absolute top-4 right-4 px-3 py-1 rounded-full text-[10px] font-bold tracking-wider flex items-center gap-2 border border-purple-500/30 bg-purple-500/10 text-purple-300 backdrop-blur-md uppercase z-10">
                    <span className="w-1.5 h-1.5 rounded-full bg-purple-400 shadow-[0_0_8px_#c084fc] animate-pulse"></span> In Progress
                  </div>
                ) : project.status === 'live' ? (
                  <div className="absolute top-4 right-4 px-3 py-1 rounded-full text-[10px] font-bold tracking-wider flex items-center gap-2 border border-emerald-500/30 bg-emerald-500/10 text-emerald-300 backdrop-blur-md uppercase z-10">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399] animate-pulse"></span> Live
                  </div>
                ) : (
                  <div className="absolute top-4 right-4 px-3 py-1 rounded-full text-[10px] font-bold tracking-wider flex items-center gap-2 border border-blue-500/30 bg-blue-500/10 text-blue-300 backdrop-blur-md uppercase z-10">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-400 shadow-[0_0_8px_#60a5fa]"></span> Completed
                  </div>
                )}
              </div>
              
              {/* Project Content Area */}
              <div className="p-6 flex-grow flex flex-col">
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-purple-300 transition-colors duration-300 line-clamp-2">
                  {project.title}
                </h3>
                <p className="text-sm text-gray-400 leading-relaxed mb-6 line-clamp-3 group-hover:text-gray-300 transition-colors">
                  {project.description}
                </p>
                
                {/* Sleek Glossy Tech Pills */}
                <div className="flex flex-wrap gap-2 mt-auto">
                  {project.tech.map((tech, i) => (
                    <span key={i} className="text-xs px-3 py-1.5 rounded-lg bg-white/5 text-gray-400 border border-white/10 font-semibold transition-all duration-300 group-hover:border-white/20 group-hover:text-white">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Floating Action Bar (Links) */}
              <div className="p-4 px-6 bg-black/20 border-t border-white/5 flex items-center gap-3 transition-colors duration-300 group-hover:bg-purple-500/5">
                {project.githubUrl && (
                  <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 text-gray-400 flex items-center justify-center transition-all hover:bg-purple-500 hover:text-white hover:border-purple-500 hover:-translate-y-1 hover:shadow-[0_5px_15px_rgba(176,38,255,0.3)]" aria-label="GitHub">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                    </svg>
                  </a>
                )}
                {project.liveUrl && (
                  <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 text-gray-400 flex items-center justify-center transition-all hover:bg-emerald-500 hover:text-white hover:border-emerald-500 hover:-translate-y-1 hover:shadow-[0_5px_15px_rgba(16,185,129,0.3)]" aria-label="Live Demo">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3" />
                    </svg>
                  </a>
                )}
                {project.mlUrl && (
                  <a href={project.mlUrl} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 text-gray-400 flex items-center justify-center transition-all hover:bg-sky-500 hover:text-white hover:border-sky-500 hover:-translate-y-1 hover:shadow-[0_5px_15px_rgba(14,165,233,0.3)]" aria-label="ML Model" title="View ML Model">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="3" />
                      <path d="M12 1v6M12 17v6M4.22 4.22l4.24 4.24M15.54 15.54l4.24 4.24M1 12h6M17 12h6M4.22 19.78l4.24-4.24M15.54 8.46l4.24-4.24" />
                    </svg>
                  </a>
                )}
                {project.videoUrl && (
                  <a href={project.videoUrl} target="_blank" rel="noopener noreferrer" className="w-auto px-5 h-10 rounded-full flex items-center justify-center gap-2 bg-purple-500/10 text-purple-300 border border-purple-500/30 font-semibold text-xs ml-auto transition-all hover:bg-purple-500 hover:text-white hover:-translate-y-1 hover:shadow-[0_5px_15px_rgba(176,38,255,0.3)]">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M5 3l14 9-14 9V3z" />
                    </svg>
                    <span>Watch Demo</span>
                  </a>
                )}
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
