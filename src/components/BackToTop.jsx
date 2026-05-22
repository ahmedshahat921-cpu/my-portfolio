import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const BackToTop = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      // Toggle visibility
      if (window.scrollY > 400) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }

      // Calculate progress percentage
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        const progress = (window.scrollY / totalScroll) * 100;
        setScrollProgress(progress);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    if (window.lenis) {
      window.lenis.scrollTo(0);
    } else {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    }
  };

  // SVG Circular progress math
  const radius = 20;
  const strokeWidth = 2.5;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (scrollProgress / 100) * circumference;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.5, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.5, y: 20 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-50 flex items-center justify-center w-14 h-14 rounded-full bg-zinc-950/90 text-white border border-white/10 hover:border-white/30 hover:scale-105 active:scale-95 transition-all duration-300 shadow-[0_4px_24px_rgba(0,0,0,0.6)] group hover:shadow-[0_0_20px_rgba(255,255,255,0.15)] cursor-pointer"
          style={{ backdropFilter: 'blur(12px)' }}
          aria-label="Back to top"
        >
          {/* Radial Scroll Progress Ring */}
          <svg className="w-14 h-14 transform -rotate-90 absolute" viewBox="0 0 50 50">
            {/* Background track */}
            <circle
              cx="25"
              cy="25"
              r={radius}
              fill="transparent"
              stroke="rgba(255, 255, 255, 0.08)"
              strokeWidth={strokeWidth}
            />
            {/* Animated progress circle */}
            <motion.circle
              cx="25"
              cy="25"
              r={radius}
              fill="transparent"
              stroke="white"
              strokeWidth={strokeWidth}
              strokeDasharray={circumference}
              animate={{ strokeDashoffset }}
              transition={{ duration: 0.05, ease: 'easeOut' }}
              strokeLinecap="round"
            />
          </svg>

          {/* Up arrow icon */}
          <svg
            className="w-5 h-5 text-white/80 group-hover:text-white group-hover:-translate-y-[2px] transition-all duration-300 relative z-10"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
          </svg>

          {/* Hover Tooltip Label */}
          <span className="absolute right-16 top-1/2 -translate-y-1/2 bg-zinc-950 border border-white/10 text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 pointer-events-none transition-all duration-300 translate-x-2 group-hover:translate-x-0 shadow-xl" style={{ fontFamily: 'Satoshi, sans-serif' }}>
            Back to Top
          </span>
        </motion.button>
      )}
    </AnimatePresence>
  );
};

export default BackToTop;
