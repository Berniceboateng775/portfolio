import HeroDesk from './HeroDesk';

export default function Hero() {
  return (
    <section className="hero" id="home">
      <div className="container hero-container">
        <div className="hero-content">
          <p className="hero-eyebrow hero-anim" style={{ '--d': '0s' } as React.CSSProperties}>
            AI/ML Engineer &amp; Software Developer in Accra, Ghana
          </p>

          <h1 className="hero-name">
            <span className="hero-line">
              <span className="hero-anim" style={{ '--d': '0.08s' } as React.CSSProperties}>Bernice Animwaa</span>
            </span>
            <span className="hero-line">
              <em className="hero-anim" style={{ '--d': '0.18s' } as React.CSSProperties}>Boateng</em>
            </span>
          </h1>

          <p className="hero-tagline hero-anim" style={{ '--d': '0.32s' } as React.CSSProperties}>
            I build machine-learning models and the full-stack products around them, from
            language and speech AI to healthcare tools and social apps for readers. Usually
            with a book nearby and headphones on.
          </p>

          <div className="hero-cta hero-anim" style={{ '--d': '0.44s' } as React.CSSProperties}>
            <a href="#projects" className="btn btn-primary">
              View selected work
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </a>
            <a href="#contact" className="btn btn-ghost">Get in touch</a>
          </div>
        </div>

        <div className="hero-figure hero-anim" style={{ '--d': '0.3s' } as React.CSSProperties}>
          <HeroDesk />
        </div>
      </div>
    </section>
  );
}
