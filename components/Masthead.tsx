'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { PROFILES } from '@/lib/site';
import { works } from '@/lib/works';
import { Arrow } from './icons';

const NAV = [
  { href: '/#work', label: 'Work' },
  { href: '/#record', label: 'Record' },
  { href: '/#contact', label: 'Contact' },
];

function Pulse() {
  return (
    <svg className="mark" viewBox="0 0 40 16" aria-hidden="true">
      <path d="M0 9h11l3-6 4 12 3-9 2 3h17" />
    </svg>
  );
}

export default function Masthead() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    window.__lenis?.stop();
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => {
      window.__lenis?.start();
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [open]);

  const close = () => setOpen(false);

  return (
    <>
      <header className={`masthead${scrolled ? ' scrolled' : ''}`}>
        <div className="wrap masthead-row">
          <Link href="/" className="wordmark" aria-label="Bernice Animwaa Boateng, home">
            <Pulse />
            Bernice Boateng
          </Link>
          <nav className="nav" aria-label="Main">
            {NAV.map((n) => (
              <Link key={n.href} href={n.href}>
                {n.label}
              </Link>
            ))}
            <a className="nav-cta" href="/Boateng_Bernice_Resume.pdf" target="_blank" rel="noopener noreferrer">
              Résumé <Arrow />
            </a>
          </nav>
          <button type="button" className="menu-btn" aria-expanded={open} aria-controls="menu" onClick={() => setOpen(true)}>
            Menu
          </button>
        </div>
      </header>

      <div id="menu" className={`menu${open ? ' open' : ''}`} role="dialog" aria-modal="true" aria-label="Menu" inert={!open}>
        <div className="wrap menu-row">
          <span className="wordmark">
            <Pulse />
            Bernice Boateng
          </span>
          <button type="button" className="menu-btn" onClick={close}>
            Close
          </button>
        </div>
        <div className="wrap menu-body">
          <ol className="menu-list">
            {works.map((w, i) => (
              <li key={w.slug} style={{ '--i': i } as React.CSSProperties}>
                <Link href={`/work/${w.slug}`} onClick={close}>
                  <span>{w.no}</span>
                  {w.title}
                </Link>
              </li>
            ))}
          </ol>
          <div className="menu-side">
            {NAV.map((n) => (
              <Link key={n.href} href={n.href} onClick={close}>
                {n.label}
              </Link>
            ))}
            <a href="/Boateng_Bernice_Resume.pdf" target="_blank" rel="noopener noreferrer">
              Résumé <Arrow />
            </a>
            {PROFILES.map((p) => (
              <a key={p.label} href={p.href} target="_blank" rel="noopener noreferrer">
                {p.label} <Arrow />
              </a>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
