'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function LoadingScreen({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(true);
  const [loadingText, setLoadingText] = useState('Initializing');

  useEffect(() => {
    const states = ['Loading dataset', 'Fitting model', 'Rendering'];
    let i = 0;
    const interval = setInterval(() => {
      i = (i + 1) % states.length;
      setLoadingText(states[i]);
    }, 800);

    const timer = setTimeout(() => {
      setIsLoading(false);
      clearInterval(interval);
    }, 2500);

    return () => {
      clearInterval(interval);
      clearTimeout(timer);
    };
  }, []);

  return (
    <>
      <AnimatePresence>
        {isLoading && (
          <motion.div
            key="loader"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: 'easeInOut' }}
            className="loading-screen"
          >
            <div className="loader-content">
              {/* Mini "model fitting" plot: points pop in, then a line fits them */}
              <div className="loader-plot">
                <svg viewBox="0 0 200 120" fill="none" aria-hidden="true">
                  <line className="lp-axis" x1="26" y1="14" x2="26" y2="100" />
                  <line className="lp-axis" x1="26" y1="100" x2="182" y2="100" />
                  <line className="lp-fit" x1="40" y1="84" x2="166" y2="32" />
                  <g className="lp-pts">
                    <circle cx="44" cy="86" r="3.4" />
                    <circle cx="62" cy="76" r="3.4" />
                    <circle cx="80" cy="81" r="3.4" />
                    <circle cx="98" cy="64" r="3.4" />
                    <circle cx="118" cy="56" r="3.4" />
                    <circle cx="140" cy="44" r="3.4" />
                    <circle cx="160" cy="34" r="3.4" />
                  </g>
                  <circle className="lp-head" cx="166" cy="32" r="4" />
                </svg>
              </div>

              <motion.p
                key={loadingText}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                className="loader-text"
              >
                {loadingText}<b>_</b>
              </motion.p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoading ? 0 : 1 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        {children}
      </motion.div>
    </>
  );
}
