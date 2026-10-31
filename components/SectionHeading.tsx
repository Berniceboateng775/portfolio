import ScrollReveal from './ScrollReveal';

export default function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <ScrollReveal>
      <header className="section-head">
        <h2 className="section-title">{children}</h2>
      </header>
    </ScrollReveal>
  );
}
