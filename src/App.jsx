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
      <footer id="footer" className="py-16 border-t border-white/5 bg-zinc-950/20 text-center flex flex-col items-center gap-8" style={{ fontFamily: 'Satoshi, sans-serif' }}>
        <div className="flex flex-col items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[9px] font-bold uppercase tracking-widest text-white/45">
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
            Get In Touch
          </span>
          <h2 className="text-2xl md:text-3xl font-bold font-syne text-white tracking-wider uppercase">Contact Us</h2>
        </div>

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

        {/* Social Media Links */}
        <div className="flex gap-5">
          {/* LinkedIn */}
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="w-11 h-11 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/55 hover:text-white hover:bg-white/10 hover:border-white/30 hover:shadow-lg hover:shadow-white/5 hover:scale-105 active:scale-95 transition-all duration-300 group"
            aria-label="LinkedIn"
          >
            <svg className="w-4.5 h-4.5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
            </svg>
          </a>
          {/* Instagram */}
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="w-11 h-11 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/55 hover:text-white hover:bg-white/10 hover:border-white/30 hover:shadow-lg hover:shadow-white/5 hover:scale-105 active:scale-95 transition-all duration-300 group"
            aria-label="Instagram"
          >
            <svg className="w-4.5 h-4.5" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
              <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
            </svg>
          </a>
          {/* Facebook */}
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="w-11 h-11 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/55 hover:text-white hover:bg-white/10 hover:border-white/30 hover:shadow-lg hover:shadow-white/5 hover:scale-105 active:scale-95 transition-all duration-300 group"
            aria-label="Facebook"
          >
            <svg className="w-4.5 h-4.5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/>
            </svg>
          </a>
        </div>

        <p className="text-white/20 text-xs">© 2026 Ahmed Shahat · Web Developer</p>
      </footer>
    </div>
  );
}

export default App;
