'use client';

import { useEffect, useRef, useState } from 'react';
import { SiSpotify } from 'react-icons/si';

/* ---------------------------------------------------------------
   Three layered cards — what's playing, what I'm reading, what's
   running in the terminal. Edit the constants below to keep them
   current. Cards drift on a slow float and lean toward the cursor.
---------------------------------------------------------------- */

// Paste a Spotify playlist/album/track link into `embed` to show the real,
// playable Spotify player instead of the styled card.
const SPOTIFY = {
  embed: 'https://open.spotify.com/playlist/5MQsIkcWjkXuCJI4HUJGa2',
  link: 'https://open.spotify.com/playlist/5MQsIkcWjkXuCJI4HUJGa2',
  title: 'Late-night focus mix',
  subtitle: 'On repeat while I code',
  elapsed: '1:24',
  length: '3:52',
};

const toEmbedUrl = (url: string) =>
  url.replace('open.spotify.com/', 'open.spotify.com/embed/').split('?')[0] + '?utm_source=generator&theme=0';

// Rotates through the shelf. Covers live in /public/images/books.
const BOOKS = [
  { title: 'Fourth Wing', author: 'Rebecca Yarros', cover: 'fourth-wing' },
  { title: 'God of Malice', author: 'Rina Kent', cover: 'god-of-malice' },
  { title: 'Ruthless People', author: 'J.J. McAvoy', cover: 'ruthless-people' },
  { title: 'The Stopover', author: 'T.L. Swan', cover: 'the-stopover' },
  { title: 'Mile High', author: 'Liz Tomforde', cover: 'mile-high' },
  { title: 'Bound by Honor', author: 'Cora Reilly', cover: 'bound-by-honor' },
  { title: 'Vicious', author: 'L.J. Shen', cover: 'vicious' },
  { title: 'Gothikana', author: 'RuNyx', cover: 'gothikana' },
  { title: 'Stepbrother Dearest', author: 'Penelope Ward', cover: 'stepbrother-dearest' },
  { title: 'Iron Flame', author: 'Rebecca Yarros', cover: 'iron-flame' },
];

const TERMINAL = [
  { k: 'cmd', t: 'python train.py --cv loco' },
  { k: 'out', t: 'fold 6/6 · roc_auc 0.82' },
  { k: 'ok', t: '✓ model served → /api/v1' },
];

export default function HeroDesk() {
  const ref = useRef<HTMLDivElement>(null);
  const [book, setBook] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setBook((b) => (b + 1) % BOOKS.length), 3800);
    return () => clearInterval(id);
  }, []);

  const onMove = (e: React.PointerEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty('--mx', ((e.clientX - r.left) / r.width - 0.5).toFixed(3));
    el.style.setProperty('--my', ((e.clientY - r.top) / r.height - 0.5).toFixed(3));
  };
  const onLeave = () => {
    ref.current?.style.setProperty('--mx', '0');
    ref.current?.style.setProperty('--my', '0');
  };

  return (
    <div className="desk" ref={ref} onPointerMove={onMove} onPointerLeave={onLeave}>
      <div className="desk-slot slot-music" style={{ '--depth': 18 } as React.CSSProperties}>
        {SPOTIFY.embed ? (
          <iframe
            className="desk-card spotify-embed"
            src={toEmbedUrl(SPOTIFY.embed)}
            title="Spotify player"
            height="152"
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
          />
        ) : (
          <a className="desk-card card-music" href={SPOTIFY.link} target="_blank" rel="noopener noreferrer">
            <div className="vinyl" aria-hidden="true">
              <span />
            </div>
            <div className="music-body">
              <p className="desk-kicker spotify-kicker">
                <SiSpotify aria-hidden="true" />
                Listening on Spotify
                <span className="eq" aria-hidden="true"><i /><i /><i /><i /></span>
              </p>
              <h3 className="desk-title">{SPOTIFY.title}</h3>
              <p className="desk-sub">{SPOTIFY.subtitle}</p>
              <div className="track">
                <span className="track-fill" />
              </div>
              <div className="track-times">
                <span>{SPOTIFY.elapsed}</span>
                <span>{SPOTIFY.length}</span>
              </div>
            </div>
          </a>
        )}
      </div>

      <div className="desk-slot slot-book" style={{ '--depth': -14 } as React.CSSProperties}>
        <article className="desk-card card-book">
          <div className="cover-stack">
            {BOOKS.map((bk, i) => (
              <img
                key={bk.cover}
                className={`mini-cover${i === book ? ' is-active' : ''}`}
                src={`/images/books/${bk.cover}.jpg`}
                alt={i === book ? `${bk.title} cover` : ''}
              />
            ))}
          </div>
          <div className="book-meta">
            <p className="desk-kicker">On my shelf</p>
            <div key={book} className="book-swap">
              <h3 className="desk-title">{BOOKS[book].title}</h3>
              <p className="desk-sub">{BOOKS[book].author}</p>
            </div>
            <div className="shelf-dots" aria-hidden="true">
              {BOOKS.map((bk, i) => (
                <span key={bk.cover} className={i === book ? 'on' : undefined} />
              ))}
            </div>
          </div>
        </article>
      </div>

      <div className="desk-slot slot-term" style={{ '--depth': 26 } as React.CSSProperties}>
        <article className="desk-card card-term">
          <div className="term-head">
            <span className="term-dots" aria-hidden="true"><i /><i /><i /></span>
            <span>~/research/pad-severity</span>
          </div>
          <div className="term-body">
            {TERMINAL.map((line, i) => (
              <p key={i} className={`term-line term-${line.k}`} style={{ animationDelay: `${0.6 + i * 0.9}s` }}>
                {line.k === 'cmd' && <b>$ </b>}
                {line.t}
              </p>
            ))}
            <span className="term-caret" aria-hidden="true" />
          </div>
        </article>
      </div>
    </div>
  );
}
