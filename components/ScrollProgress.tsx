'use client';

import { motion, useScroll, useSpring } from 'framer-motion';

/**
 * Thin lime rail pinned to the top of the viewport that fills as the page
 * scrolls — a live "progress / data loaded" meter. Spring-smoothed so it
 * glides rather than tracking scroll 1:1.
 */
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      className="scroll-progress"
      style={{ scaleX }}
      aria-hidden="true"
    />
  );
}
