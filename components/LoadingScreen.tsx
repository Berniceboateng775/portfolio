'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function LoadingScreen({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(true);
  const [loadingText, setLoadingText] = useState('Initializing');

  useEffect(() => {
    const states = ['Loading...', 'Building Portfolio...', 'Almost There...'];
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
              {/* Spinner */}
              <div className="loader-spinner">
                {/* Base Glow */}
                <div className="loader-glow" />
                {/* Outer Dashed Ring */}
                <div className="loader-ring loader-ring-outer" />
                {/* Main Arc */}
                <div className="loader-ring loader-ring-main" />
                {/* Reverse Arc */}
                <div className="loader-ring loader-ring-reverse" />
                {/* Inner Fast Ring */}
                <div className="loader-ring loader-ring-inner" />
                {/* Orbital Dot */}
                <div className="loader-orbit">
                  <div className="loader-orbit-dot" />
                </div>
                {/* Center Core */}
                <div className="loader-core" />
              </div>

              {/* Text */}
              <motion.p
                key={loadingText}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="loader-text"
              >
                {loadingText}
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
