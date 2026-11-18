import { PROFILES } from '@/lib/site';

export default function Colophon() {
  return (
    <footer className="footer" data-tone="ink">
      <div className="wrap footer-row">
        <span>© {new Date().getFullYear()} Bernice Animwaa Boateng · Accra</span>
        <span className="footer-links">
          {PROFILES.map((p) => (
            <a key={p.label} href={p.href} target="_blank" rel="noopener noreferrer">
              {p.label}
            </a>
          ))}
          <a href="mailto:berniceboateng775@gmail.com">Email</a>
        </span>
      </div>
    </footer>
  );
}
