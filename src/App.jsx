import React from 'react';
import useLenis from './hooks/useLenis';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import BentoGrid from './components/BentoGrid';
import SkillsShowcase from './components/SkillsShowcase';
import ProjectsShowcase from './components/ProjectsShowcase';
import BackToTop from './components/BackToTop';

function App() {
  useLenis();

  return (
    <div className="bg-black min-h-screen">
      <Navbar />
      <Hero />
      <BentoGrid />
      <SkillsShowcase />
      <ProjectsShowcase />
      <BackToTop />
      <footer className="py-12 border-t border-white/5 bg-zinc-950/20 text-center flex flex-col items-center gap-6" style={{ fontFamily: 'Satoshi, sans-serif' }}>
        {/* Contact info links with premium styles */}
        <div className="flex flex-col sm:flex-row gap-6 sm:gap-10 text-sm">
          <a
            href="mailto:ahmedshahat921@gmail.com"
            className="flex items-center justify-center gap-2.5 text-white/60 hover:text-white transition-colors duration-300 group"
          >
            <svg 
              className="w-4 h-4 text-white/30 group-hover:text-white transition-colors duration-300" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor" 
              strokeWidth="2"
            >
              <rect width="20" height="16" x="2" y="4" rx="2" />
              <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
            </svg>
            <span className="tracking-wide">ahmedshahat921@gmail.com</span>
          </a>
          <a
            href="tel:01152012098"
            className="flex items-center justify-center gap-2.5 text-white/60 hover:text-white transition-colors duration-300 group"
          >
            <svg 
              className="w-4 h-4 text-white/30 group-hover:text-white transition-colors duration-300" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor" 
              strokeWidth="2"
            >
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
            </svg>
            <span className="tracking-wide">01152012098</span>
          </a>
        </div>
        <p className="text-white/20 text-xs">© 2026 Ahmed Shahat · Web Developer</p>
      </footer>
    </div>
  );
}

export default App;
