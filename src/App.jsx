import React from 'react';
import { motion, useScroll } from 'framer-motion';
import useLenis from './hooks/useLenis';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import BentoGrid from './components/BentoGrid';
import SkillsShowcase from './components/SkillsShowcase';
import ProjectsShowcase from './components/ProjectsShowcase';
import CertificationsShowcase from './components/CertificationsShowcase';
import ContactForm from './components/ContactForm';
import BackToTop from './components/BackToTop';

function App() {
  useLenis();
  const { scrollYProgress } = useScroll();

  return (
    <div className="bg-black min-h-screen">
      {/* Neon Scroll Progress Indicator */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 origin-left z-[100] shadow-[0_0_10px_rgba(99,102,241,0.6)]"
        style={{ scaleX: scrollYProgress }}
      />
      <Navbar />
      <Hero />
      <BentoGrid />
      <SkillsShowcase />
      <ProjectsShowcase />
      <CertificationsShowcase />
      <ContactForm />
      <BackToTop />
      <footer className="py-8 border-t border-white/5 bg-zinc-950/20 text-center" style={{ fontFamily: 'Satoshi, sans-serif' }}>
        <p className="text-white/20 text-xs">© 2026 Ahmed Shahat · Web Developer</p>
      </footer>
    </div>
  );
}

export default App;
