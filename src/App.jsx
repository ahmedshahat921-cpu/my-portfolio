import React from 'react';
import useLenis from './hooks/useLenis';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import BentoGrid from './components/BentoGrid';

function App() {
  useLenis();

  return (
    <div className="bg-black min-h-screen">
      <Navbar />
      <Hero />
      <BentoGrid />
      <footer className="py-10 text-center text-white/20 text-xs flex flex-col gap-2" style={{ fontFamily: 'Satoshi, sans-serif' }}>
        <p>© 2026 Ahmed Shahat · Web Developer</p>
      </footer>
    </div>
  );
}

export default App;
