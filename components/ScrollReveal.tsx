'use client';

import React, { useEffect, useRef, useState } from 'react';

interface ScrollRevealProps {
  children: React.ReactNode;
  direction?: 'up' | 'left' | 'right' | 'fade';
  delay?: number;
  className?: string;
}

export default function ScrollReveal({
  children,
  direction = 'up',
  delay = 0,
  className = '',
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' },
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const getTransform = () => {
    switch (direction) {
      case 'left':  return 'translateX(-32px)';
      case 'right': return 'translateX(32px)';
      case 'fade':  return 'translateY(12px)';
      default:      return 'translateY(36px)';
    }
  };

  return (
    <div
      ref={ref}
      className={className}
      style={{
        transform: isVisible ? 'none' : getTransform(),
        opacity: isVisible ? 1 : 0,
        filter: isVisible ? 'none' : 'blur(4px)',
        transition: `transform 1s cubic-bezier(0.22, 1, 0.36, 1) ${delay}ms, opacity 1s ease ${delay}ms, filter 1s ease ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}
