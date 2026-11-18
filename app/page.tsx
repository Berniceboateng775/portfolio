import Link from 'next/link';
import Chapter from '@/components/Chapter';
import Colophon from '@/components/Colophon';
import Opening from '@/components/Opening';
import Letter from '@/components/Letter';
import Split from '@/components/Split';
import { Arrow } from '@/components/icons';
import { PROFILES } from '@/lib/site';
import { earlier, works } from '@/lib/works';

const record = [
  {
    when: 'Dec 2025 — Sep 2026',
    role: 'AI/ML Engineer & Data Analyst',
    org: 'Really Great Tech · National Service',
    work: [
      {
        title: 'Peripheral artery disease severity, for Semler Scientific',
        points: [
          'Built and benchmarked XGBoost and PyTorch models that classify PAD severity from arterial PPG waveforms, validated leave-one-clinic-out across 6 clinics and 346+ limbs so every clinic is tested as unseen data.',
          'Engineered 111 pulse-waveform biomarkers with pyPPG and searched for compact feature sets, reaching about 80% sensitivity and 79% specificity on unseen clinics.',
          'Built the evaluation dashboards: performance sweeps, confusion matrices, confidence intervals and per-clinic results.',
        ],
      },
      {
        title: 'Distress detection for inbound calls, AppWork VoiceAI',
        points: [
          'Benchmarked Hugging Face speech-emotion models, labelled distress ground truth from a 911 calls dataset, and worked on a pipeline fusing audio and text signals.',
        ],
      },
    ],
  },
  {
    when: 'Apr 2025 — Aug 2025',
    role: 'Software Engineer & IT Intern',
    org: 'Cocoa Clinic',
    work: [
      {
        title: '',
        points: [
          'Maintained and updated the hospital’s electronic health record system.',
          'Worked on digital transformation projects and internal reporting tools.',
        ],
      },
    ],
  },
  {
    when: 'Sep 2021 — Nov 2025',
    role: 'BSc Computer Engineering',
    org: 'University of Ghana',
    work: [{ title: '', points: ['Final-year project: MedMate, drug–drug interaction prediction with machine learning.'] }],
  },
];

const toolkit = [
  { group: 'Machine learning', items: ['PyTorch', 'Hugging Face Transformers', 'Fine-tuning T5, GPT-2', 'XGBoost, LightGBM', 'scikit-learn', 'UMAP, HDBSCAN', 'Biosignals (PPG)'] },
  { group: 'LLMs & retrieval', items: ['Gemini API', 'Sentence embeddings', 'ChromaDB, FAISS', 'Model Context Protocol'] },
  { group: 'Product', items: ['TypeScript', 'React, Next.js', 'Expo, React Native', 'Node.js, Express', 'FastAPI, Django REST', 'GSAP, canvas'] },
  { group: 'Data & delivery', items: ['PostgreSQL, MongoDB', 'Redis, BullMQ', 'Socket.IO', 'Docker', 'Render, Vercel, HF Spaces'] },
];

export default function Home() {
  return (
    <>
      <main id="main">
        <Opening />

        <div id="work" className="work-intro wrap" data-tone="ink">
          <p className="eyebrow">Selected work</p>
          <Split as="h2" className="section-title">
            Things I’ve built, <span>from the model to the app.</span>
          </Split>
        </div>

        {works.map((w, i) => (
          <Chapter key={w.slug} work={w} flip={i % 2 === 1} />
        ))}

        <section className="earlier" data-tone="ink">
          <div className="wrap earlier-grid">
            <p className="eyebrow">Also built</p>
            <ul>
              {earlier.map((e) => (
                <li key={e.title} data-reveal>
                  {e.href ? (
                    <a href={e.href} target="_blank" rel="noopener noreferrer">
                      <b>{e.title}</b>
                      <small>{e.note}</small>
                      <Arrow />
                    </a>
                  ) : (
                    <span>
                      <b>{e.title}</b>
                      <small>{e.note}</small>
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section id="record" className="block" data-tone="ink">
          <div className="wrap">
            <p className="eyebrow">Record</p>
            <Split as="h2" className="section-title">
              Where I’ve worked.
            </Split>
            <ol className="record">
              {record.map((r) => (
                <li key={r.org} className="glass record-card" data-reveal>
                  <div className="record-head">
                    <div>
                      <h3>{r.role}</h3>
                      <p className="record-org">{r.org}</p>
                    </div>
                    <p className="record-when">{r.when}</p>
                  </div>
                  {r.work.map((w, i) => (
                    <div key={i} className="record-part">
                      {w.title && <h4>{w.title}</h4>}
                      <ul>
                        {w.points.map((pt) => (
                          <li key={pt}>{pt}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="block" data-tone="ink">
          <div className="wrap">
            <p className="eyebrow">Toolkit</p>
            <Split as="h2" className="section-title">
              Tools I use, <span>every day.</span>
            </Split>
            <div className="toolkit">
              {toolkit.map((t) => (
                <div key={t.group} className="glass toolkit-card" data-reveal>
                  <h3>{t.group}</h3>
                  <ul>
                    {t.items.map((it) => (
                      <li key={it}>{it}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="contact" className="block contact" data-tone="ink">
          <div className="wrap contact-grid">
            <div>
              <p className="eyebrow">Contact</p>
              <Split as="h2" className="section-title big">
                Have something to build? <span>Let’s talk.</span>
              </Split>
              <a className="contact-mail" href="mailto:berniceboateng775@gmail.com">
                berniceboateng775@gmail.com <Arrow />
              </a>
              <p className="contact-note">
                Open to machine learning and front-end or full-stack roles, and to projects where a model has to work
                outside the notebook.
              </p>
              <ul className="contact-links">
                {PROFILES.map((p) => (
                  <li key={p.label}>
                    <a href={p.href} target="_blank" rel="noopener noreferrer">
                      {p.label} <Arrow />
                    </a>
                  </li>
                ))}
                <li>
                  <Link href="/Boateng_Bernice_Resume.pdf" target="_blank">
                    Résumé <Arrow />
                  </Link>
                </li>
              </ul>
            </div>
            <div className="glass contact-form">
              <Letter />
            </div>
          </div>
        </section>
      </main>
      <Colophon />
    </>
  );
}
