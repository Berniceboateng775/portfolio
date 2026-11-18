import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Colophon from '@/components/Colophon';
import Split from '@/components/Split';
import { Arrow } from '@/components/icons';
import { getWork, works } from '@/lib/works';

export const dynamicParams = false;

export function generateStaticParams() {
  return works.map((w) => ({ slug: w.slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const work = getWork((await params).slug);
  if (!work) return {};
  return {
    title: work.title,
    description: work.summary,
    openGraph: { title: `${work.title} — Bernice Animwaa Boateng`, description: work.summary, images: work.lead ? [work.lead.src] : [] },
  };
}

function Block({ eyebrow, title, children }: { eyebrow: string; title: React.ReactNode; children: React.ReactNode }) {
  return (
    <section className="case-block">
      <div className="wrap case-grid">
        <div className="case-side">
          <p className="eyebrow">{eyebrow}</p>
          <h2 className="case-h">{title}</h2>
        </div>
        <div data-reveal className="reveal">
          {children}
        </div>
      </div>
    </section>
  );
}

export default async function WorkPage({ params }: Props) {
  const work = getWork((await params).slug);
  if (!work) notFound();

  const i = works.indexOf(work);
  const next = works[(i + 1) % works.length];

  return (
    <>
      <main id="main" className="case" data-tone="ink">
        <section className="case-hero">
          <div className="wrap">
            <Link href="/#work" className="ghost back">
              <Arrow /> All work
            </Link>
            <p className="scene-kicker">
              <span>{work.no}</span>
              {work.kind}
              <em>{work.year}</em>
            </p>
            <Split as="h1" className="case-title">
              {work.title} <span>{work.tagline}</span>
            </Split>
            <div className="case-intro">
              <p className="case-summary">{work.summary}</p>
              <dl className="glass case-meta">
                <div>
                  <dt>Role</dt>
                  <dd>{work.role}</dd>
                </div>
                <div>
                  <dt>Context</dt>
                  <dd>{work.context}</dd>
                </div>
                <div>
                  <dt>Status</dt>
                  <dd>{work.status}</dd>
                </div>
                {work.links.length > 0 && (
                  <div className="case-links">
                    <dt>Links</dt>
                    <dd>
                      {work.links.map((l) => (
                        <a key={l.href} href={l.href} target="_blank" rel="noopener noreferrer">
                          {l.label} <Arrow />
                        </a>
                      ))}
                    </dd>
                  </div>
                )}
              </dl>
            </div>
          </div>
        </section>

        {work.lead && (
          <section className="case-lead">
            <div className="wrap">
              <div className="glass scene-visual">
                <span className="glass-bar" aria-hidden="true">
                  <i />
                  <i />
                  <i />
                  <b>{work.links[0]?.href.replace(/^https?:\/\//, '').replace(/\/$/, '') || work.slug}</b>
                </span>
                <Image className="lead-shot" src={work.lead.src} alt={work.lead.caption} width={work.lead.w} height={work.lead.h} sizes="(max-width: 1440px) 100vw, 1360px" priority />
              </div>
            </div>
          </section>
        )}

        <Block eyebrow="The problem" title="Why it exists">
          <div className="prose">
            {work.overview.map((p) => (
              <p key={p.slice(0, 24)}>{p}</p>
            ))}
          </div>
        </Block>

        <Block eyebrow="Architecture" title="How it works">
          <ol className="flow">
            {work.flow.map((f, k) => (
              <li key={f.step} className="glass">
                <span className="flow-no">{String(k + 1).padStart(2, '0')}</span>
                <h3>{f.step}</h3>
                <p className="flow-via">{f.via}</p>
                <p>{f.text}</p>
              </li>
            ))}
          </ol>
        </Block>

        {work.figures && (
          <Block eyebrow="In numbers" title="Figures">
            <dl className="figures">
              {work.figures.map((f) => (
                <div key={f.label} className="glass">
                  <dd>{f.value}</dd>
                  <dt>{f.label}</dt>
                </div>
              ))}
            </dl>
          </Block>
        )}

        <Block eyebrow="Built with" title="Stack">
          <div className="stack">
            {work.stack.map((g) => (
              <div key={g.group}>
                <h3>{g.group}</h3>
                <ul>
                  {g.items.map((it) => (
                    <li key={it}>{it}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Block>

        <Block eyebrow="Worth knowing" title="Decisions">
          <ul className="notes">
            {work.notes.map((n) => (
              <li key={n.title}>
                <h3>{n.title}</h3>
                <p>{n.text}</p>
              </li>
            ))}
          </ul>
        </Block>

        {work.plates.length > 0 && (
          <section className="case-block">
            <div className="wrap">
              <p className="eyebrow">Screens</p>
              <div className="gallery">
                {work.plates.map((pl) => (
                  <figure key={pl.src} className="glass shot" data-reveal>
                    <Image src={pl.src} alt={pl.caption} width={pl.w} height={pl.h} sizes="(max-width: 900px) 100vw, 50vw" />
                    <figcaption>{pl.caption}</figcaption>
                  </figure>
                ))}
              </div>
            </div>
          </section>
        )}

        <section className="wrap">
          <Link href={`/work/${next.slug}`} className="next">
            <span className="eyebrow">Next · {next.no}</span>
            <span className="next-title">
              {next.title} <Arrow />
            </span>
          </Link>
        </section>
      </main>
      <Colophon />
    </>
  );
}
