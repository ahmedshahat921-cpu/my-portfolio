import React from 'react';
import useLenis from './hooks/useLenis';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import BentoGrid from './components/BentoGrid';
import SkillsShowcase from './components/SkillsShowcase';
import ProjectsShowcase from './components/ProjectsShowcase';
import CertificationsShowcase from './components/CertificationsShowcase';
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
      <CertificationsShowcase />
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
          <a
            href="https://wa.me/201152012098"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2.5 text-white/60 hover:text-white transition-colors duration-300 group"
          >
            <svg 
              className="w-4 h-4 text-white/30 group-hover:text-green-400 transition-colors duration-300" 
              fill="currentColor" 
              viewBox="0 0 24 24"
            >
              <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.006 5.284 5.292.001 11.784.001c3.148 0 6.106 1.228 8.327 3.454 2.222 2.226 3.443 5.187 3.44 8.34-.006 6.504-5.292 11.788-11.784 11.788-2.001 0-3.966-.51-5.713-1.48L0 24zm6.49-4.22c1.523.904 3.013 1.38 4.613 1.387 5.296.002 9.603-4.3 9.608-9.593.002-2.562-1.002-4.97-2.825-6.793C16.12 3.037 13.722 2.03 11.792 2.03c-5.293 0-9.605 4.3-9.608 9.599-.001 1.737.472 3.42 1.372 4.908l-.943 3.447 3.53-.926zm12.302-5.41c-.326-.162-1.924-.95-2.222-1.057-.297-.11-.514-.162-.73.162-.217.324-.838 1.056-1.027 1.274-.19.216-.379.243-.705.082-.326-.162-1.378-.508-2.625-1.622-.97-.866-1.936-1.815-2.26-.19-.324-.02-.5-.183-.66-.147-.146-.326-.378-.49-.567-.162-.19-.216-.324-.324-.54-.109-.217-.055-.407-.027-.57.027-.162.217-.513.324-.756.109-.243.162-.405.243-.567.082-.162.04-.324-.013-.486-.054-.162-.514-1.242-.704-1.702-.186-.447-.372-.387-.514-.394-.132-.007-.284-.008-.436-.008a.84.84 0 00-.608.283c-.207.227-.79.773-.79 1.885 0 1.112.808 2.186.92 2.338.11.152 1.59 2.43 3.85 3.407.537.233.957.372 1.284.476.54.172 1.03.148 1.417.09.431-.065 1.924-.787 2.195-1.547.27-.76.27-1.408.19-1.547-.08-.14-.298-.22-.623-.38z"/>
            </svg>
            <span className="tracking-wide">WhatsApp</span>
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
