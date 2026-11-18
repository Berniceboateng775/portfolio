'use client';

import Link from 'next/link';
import { useRef } from 'react';
import type { Work } from '@/lib/works';
import Halftone from './Halftone';
import Split from './Split';
import { Arrow } from './icons';

/* One project as a full-screen scene. On wide screens the scene holds
   still while you scroll and the screenshot is read top to bottom. */
export default function Chapter({ work, flip }: { work: Work; flip: boolean }) {
  const scene = useRef<HTMLElement>(null);
  const stack = work.stack.flatMap((g) => g.items).slice(0, 5);

  return (
    <section ref={scene} className={`scene${flip ? ' flip' : ''}`} data-tone="ink" data-chapter={`${work.no} · ${work.title}`}>
      <div className="scene-sticky">
        <div className="wrap scene-grid">
          <div className="scene-copy">
            <p className="scene-kicker">
              <span>{work.no}</span>
              {work.kind}
              <em>{work.year}</em>
            </p>
            <Split as="h2" className="scene-title">
              {work.title} <span>{work.tagline}</span>
            </Split>
            <p className="scene-summary" data-reveal>
              {work.summary}
            </p>
            <ul className="scene-stack" data-reveal>
              {stack.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
            <div className="scene-actions" data-reveal>
              <Link href={`/work/${work.slug}`} className="btn">
                Read the case <Arrow />
              </Link>
              {work.links[0] && (
                <a className="ghost" href={work.links[0].href} target="_blank" rel="noopener noreferrer">
                  {work.links[0].label} <Arrow />
                </a>
              )}
            </div>
          </div>

          {work.lead && (
            <Link href={`/work/${work.slug}`} className="scene-visual glass" aria-label={`Open ${work.title}`}>
              <span className="glass-bar" aria-hidden="true">
                <i />
                <i />
                <i />
                <b>{work.links[0]?.href.replace(/^https?:\/\//, '').replace(/\/$/, '') || work.slug}</b>
              </span>
              <Halftone plate={work.lead} trigger={scene} />
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
