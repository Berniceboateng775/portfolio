'use client';

import { useEffect, useState } from 'react';
import ScrollReveal from './ScrollReveal';
import SectionHeading from './SectionHeading';

interface Project {
  title: string;
  description: string;
  tech: string[];
  liveUrl: string | null;
  githubUrl: string | null;
  mlUrl?: string;
  videoUrl?: string;
  status: string;
  images: string[];
}

const projects: Project[] = [
  {
    title: 'MedMate DDI — Drug Interaction Checker',
    description: 'Full-stack drug interaction checker trained on DrugBank and PubChem data. An XGBoost classifier rates each pair as mild, moderate or severe, and a T5 sequence-to-sequence model writes the interaction description, both served from Hugging Face Spaces. Gemini adds an extended explanation, safer alternatives and sources, and a clinician portal screens new prescriptions against each patient’s current medicines.',
    tech: ['Python', 'XGBoost', 'T5', 'Hugging Face', 'Gemini', 'React', 'Django', 'PostgreSQL'],
    liveUrl: 'https://medmate-ddi.vercel.app',
    githubUrl: null,
    mlUrl: 'https://huggingface.co/spaces/Bernice775/drug-interaction-prediction',
    videoUrl: 'https://youtu.be/3Hjd1kbrc1A',
    status: 'live',
    images: ['/images/medmate-home.png', '/images/medmate-checker.png', '/images/medmate-report.png', '/images/medmate-models.png', '/images/medmate-signin.png'],
  },
  {
    title: 'Vellichor AI — Emotion & Theme Analysis',
    description: 'End-to-end fine-tuned GPT-2 model classifying emotion and subtext of written dialogue into 7 categories, served via a FastAPI backend. Features context-aware engineering and dropout to capture nuanced subtext instead of surface keywords.',
    tech: ['FastAPI', 'GPT-2', 'Hugging Face', 'React', 'Docker'],
    liveUrl: 'https://vellichor-ai.vercel.app',
    githubUrl: null,
    mlUrl: 'https://vellichor.onrender.com',
    videoUrl: 'https://youtu.be/8AguS4kIdXQ',
    status: 'live',
    images: ['/images/vellichor.jpg'],
  },
  {
    title: 'Limerence',
    description: 'A social home for readers. Browse 80+ genres and romance tropes by mood, see what everyone is shelving this week, join book clubs, earn badges, and chat with friends, complete with stories, stickers and book shares.',
    tech: ['React', 'Backend APIs', 'Database Design'],
    liveUrl: null,
    githubUrl: null,
    status: 'in-progress',
    images: ['/images/limerence-genres.png', '/images/limerence-tropes.png', '/images/limerence-explore.png', '/images/limerence-chat.png'],
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
    title: 'Smart Dustbin System — IoT Prototype',
    description: 'Smart dustbin prototype using Arduino and IoT concepts with sensor-based automation. Features ultrasonic sensor-triggered automatic lid mechanism for touchless operation and improved hygiene.',
    tech: ['Arduino', 'IoT', 'Embedded Systems', 'Sensors'],
    liveUrl: null,
    githubUrl: null,
    status: 'completed',
    images: ['/images/bin1.jpg'],
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

const STATUS_LABEL: Record<string, string> = {
  live: 'Live',
  completed: 'Completed',
  'in-progress': 'In progress',
};

// Cross-fades through a project's screenshots while the card is hovered.
function Gallery({ images, title }: { images: string[]; title: string }) {
  const [active, setActive] = useState(0);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    if (!hovered || images.length < 2) return;
    const id = setInterval(() => setActive((a) => (a + 1) % images.length), 1600);
    return () => clearInterval(id);
  }, [hovered, images.length]);

  return (
    <div
      className="project-media"
      onMouseEnter={() => {
        setHovered(true);
        if (images.length > 1) setActive(1);
      }}
      onMouseLeave={() => {
        setHovered(false);
        setActive(0);
      }}
    >
      {images.map((src, i) => (
        <img
          key={src}
          src={src}
          alt={i === 0 ? title : ''}
          loading="lazy"
          className={`project-shot${i === active ? ' is-active' : ''}`}
        />
      ))}
      {images.length > 1 && (
        <div className="project-dots" aria-hidden="true">
          {images.map((src, i) => (
            <span key={src} className={i === active ? 'on' : undefined} />
          ))}
        </div>
      )}
    </div>
  );
}

export default function Projects() {
  return (
    <section className="section" id="projects">
      <div className="container">
        <SectionHeading>Things I&apos;ve <em>built</em></SectionHeading>

        <div className="projects-grid">
          {projects.map((project, index) => (
            <ScrollReveal key={project.title} delay={(index % 2) * 120} direction="up">
              <article className="project-card">
                <div className="project-frame">
                  <Gallery images={project.images} title={project.title} />
                  <span className={`project-status status-${project.status}`}>
                    <span className="status-dot" />
                    {STATUS_LABEL[project.status] ?? project.status}
                  </span>
                </div>

                <div className="project-content">
                  <h3 className="project-title">{project.title}</h3>
                  <p className="project-description">{project.description}</p>
                  <div className="project-tech">
                    {project.tech.map((tech) => (
                      <span key={tech} className="tech-tag">{tech}</span>
                    ))}
                  </div>
                </div>

                {(project.liveUrl || project.githubUrl || project.mlUrl || project.videoUrl) && (
                  <div className="project-footer">
                    {project.liveUrl && (
                      <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="project-link">
                        Live site
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M7 17L17 7M8 7h9v9" /></svg>
                      </a>
                    )}
                    {project.mlUrl && (
                      <a href={project.mlUrl} target="_blank" rel="noopener noreferrer" className="project-link">
                        Model
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M7 17L17 7M8 7h9v9" /></svg>
                      </a>
                    )}
                    {project.githubUrl && (
                      <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="project-link">
                        Code
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M7 17L17 7M8 7h9v9" /></svg>
                      </a>
                    )}
                    {project.videoUrl && (
                      <a href={project.videoUrl} target="_blank" rel="noopener noreferrer" className="project-link project-link-play">
                        <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor"><path d="M6 4l14 8-14 8V4z" /></svg>
                        Watch demo
                      </a>
                    )}
                  </div>
                )}
              </article>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
