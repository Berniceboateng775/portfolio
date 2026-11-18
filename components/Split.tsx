'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';

gsap.registerPlugin(ScrollTrigger, SplitText);

type Mode = 'rise' | 'read';

/**
 * rise: lines slide up out of a mask when the heading enters the screen.
 * read: words start faint and brighten one by one as you scroll through,
 *       the way your eye moves along a line.
 */
export default function Split({
  as = 'p',
  mode = 'rise',
  className,
  children,
}: {
  as?: 'h1' | 'h2' | 'h3' | 'p';
  mode?: Mode;
  className?: string;
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let ctx: gsap.Context | undefined;
    const run = () => {
      ctx = gsap.context(() => {
        if (mode === 'rise') {
          const split = SplitText.create(el, { type: 'lines', mask: 'lines', linesClass: 'split-line' });
          gsap.from(split.lines, {
            yPercent: 110,
            duration: 1.1,
            ease: 'expo.out',
            stagger: 0.09,
            scrollTrigger: { trigger: el, start: 'top 88%', once: true },
          });
        } else {
          const split = SplitText.create(el, { type: 'words', wordsClass: 'split-word' });
          gsap.fromTo(
            split.words,
            { opacity: 0.16 },
            {
              opacity: 1,
              ease: 'none',
              stagger: 0.12,
              scrollTrigger: { trigger: el, start: 'top 78%', end: 'bottom 45%', scrub: true },
            },
          );
        }
      }, el);
    };
    // wait for web fonts so line breaks are measured on the real font
    if (document.fonts?.status === 'loaded') run();
    else document.fonts?.ready.then(run);
    return () => ctx?.revert();
  }, [mode]);

  const Tag = as as 'p';
  return (
    <Tag ref={ref as React.RefObject<HTMLParagraphElement>} className={className}>
      {children}
    </Tag>
  );
}
