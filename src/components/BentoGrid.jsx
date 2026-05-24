/* eslint-disable no-unused-vars */
import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// ─────────────────────────────────────────────────────────
// Shared Card wrapper
// ─────────────────────────────────────────────────────────
const Card = ({ children, className = '', style = {}, ...props }) => {
  const cardRef = useRef(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [glow, setGlow] = useState({ x: 0, y: 0, opacity: 0 });

  const handleMouseMove = (e) => {
    const card = cardRef.current;
    if (!card) return;
    const { left, top, width, height } = card.getBoundingClientRect();
    const x = e.clientX - left;
    const y = e.clientY - top;
    
    const normalizedX = (x / width) - 0.5;
    const normalizedY = (y / height) - 0.5;
    
    const maxTilt = 5; // Subtle 5-degree tilt
    setTilt({
      x: -normalizedY * maxTilt,
      y: normalizedX * maxTilt,
    });
    
    setGlow({
      x,
      y,
      opacity: 1,
    });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
    setGlow((prev) => ({ ...prev, opacity: 0 }));
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`
        bento-card
        relative overflow-hidden rounded-3xl
        bg-white/5 backdrop-blur-md border border-white/10
        shadow-lg hover:shadow-blue-500/20 hover:border-white/20
        transition-all duration-300 flex flex-col group
        ${className}
      `}
      style={{
        ...style,
        transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
        transition: tilt.x === 0 && tilt.y === 0 ? 'transform 0.5s ease, border-color 0.5s ease, box-shadow 0.5s ease' : 'border-color 0.5s ease, box-shadow 0.5s ease',
      }}
      {...props}
    >
      {/* Spotlight Cursor-Tracking Radial Glow */}
      <div
        className="absolute inset-0 pointer-events-none z-0 transition-opacity duration-300"
        style={{
          background: `radial-gradient(350px circle at ${glow.x}px ${glow.y}px, rgba(59, 130, 246, 0.12), transparent 80%)`,
          opacity: glow.opacity,
        }}
      />
      {/* Subtle hover shimmer */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-0" />
      <div className="relative z-10 h-full w-full flex flex-col">
        {children}
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────────────────
// 1. Wallpaper Gallery
// ─────────────────────────────────────────────────────────
const WallpaperGallery = () => {
  const photos = [
    { src: '/about1.jpg' },
    { src: '/about2.jpg' },
    { src: '/about3.jpg' },
    { src: '/about4.jpg' },
    { src: '/about5.jpg' },
    { src: '/about6.jpg' }
  ];
  
  // Duplicate 4 times to ensure it spans enough width for a seamless infinite scroll loop
  const items = [...photos, ...photos, ...photos, ...photos];

  return (
    <div className="flex items-center h-full relative overflow-hidden group/gallery">
      {/* Title Overlay */}
      <div className="absolute top-4 left-4 z-20">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-[9px] font-bold uppercase tracking-widest text-white/90" style={{ fontFamily: 'Satoshi, sans-serif' }}>
          <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
          CREATIVA Team & Training
        </span>
      </div>

      <div 
        className="flex gap-3 w-max grayscale group-hover/gallery:grayscale-0 transition-all duration-700"
        style={{ animation: 'slide-horizontal 18s linear infinite' }}
      >
        {items.map((item, i) => (
          <img
            key={i}
            src={item.src}
            className="h-56 md:h-72 w-48 md:w-64 object-cover rounded-xl flex-shrink-0"
            alt={`About Photo ${(i % 6) + 1}`}
          />
        ))}
      </div>
      {/* Top/bottom gradient overlays */}
      <div className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-black/60 to-transparent pointer-events-none z-10" />
      <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/60 to-transparent pointer-events-none z-10" />
    </div>
  );
};

// ─────────────────────────────────────────────────────────
// 2. Intro Card
// ─────────────────────────────────────────────────────────
const IntroCard = () => {
  return (
    <div className="p-7 md:p-10 flex flex-col justify-center h-full">
      <div>
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] font-bold uppercase tracking-widest text-white/50 mb-4" style={{ fontFamily: 'Satoshi, sans-serif' }}>
          <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
          About Me
        </span>
        <h2
          className="text-3xl md:text-4xl font-bold mb-4 text-white"
          style={{ fontFamily: 'Syne, sans-serif' }}
        >
          Hi, I'm Ahmed Shahat
        </h2>
        <p className="text-white/70 text-base md:text-lg leading-relaxed max-w-2xl" style={{ fontFamily: 'Satoshi, sans-serif' }}>
          I am a <span className="text-white font-semibold">Web Developer</span> dedicated to building seamless, interactive responsive web applications. While my core expertise lies in crafting modern frontend experiences with <span className="text-blue-400 font-semibold">React.js</span> and <span className="text-sky-400 font-semibold">Tailwind CSS</span>, my capabilities extend deeply into robust <span className="text-indigo-400 font-semibold">backend engineering</span> and relational database systems. I focus on turning complex business logic into clean, efficient, and beautifully structured code.
        </p>
      </div>
    </div>
  );
};



// ─────────────────────────────────────────────────────────
// 6. Status & Clock Card (Option 1) - Full Width Premium Bar
// ─────────────────────────────────────────────────────────
const StatusCard = () => {
  const [time, setTime] = useState('');

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      const formatted = now.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
      });
      setTime(formatted);
    };

    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-full px-6 md:px-8 py-5 md:py-0 flex flex-col md:flex-row md:items-center justify-between relative overflow-hidden select-none gap-5">
      {/* Decorative gradient light blur in background */}
      <div className="absolute -right-10 -bottom-10 w-40 h-40 rounded-full bg-blue-500/10 blur-3xl pointer-events-none z-0" />
      <div className="absolute -left-10 -top-10 w-40 h-40 rounded-full bg-green-500/5 blur-3xl pointer-events-none z-0" />

      {/* Left side: Location and Availability Info */}
      <div className="relative z-10 flex flex-wrap items-center justify-center md:justify-start gap-3">
        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-[10px] font-bold uppercase tracking-widest text-white/70" style={{ fontFamily: 'Satoshi, sans-serif' }}>
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-blue-400">
            <path d="M12 2a8 8 0 0 0-8 8c0 5.25 8 12 8 12s8-6.75 8-12a8 8 0 0 0-8-8z" />
            <circle cx="12" cy="10" r="3" />
          </svg>
          Cairo, Egypt
        </span>
        
        <span className="inline-flex items-center gap-2 text-[10px] uppercase tracking-wider text-green-400 font-bold px-3 py-1.5 rounded-full bg-green-500/5 border border-green-500/10" style={{ fontFamily: 'Satoshi, sans-serif' }}>
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
          </span>
          Available for Work
        </span>
      </div>

      {/* Center text: "Freelance & Fulltime · Let's Build Something" */}
      <div className="relative z-10 hidden lg:flex items-center justify-center gap-2 text-white/40 uppercase tracking-widest font-bold text-[10px]" style={{ fontFamily: 'Satoshi, sans-serif' }}>
        <span>Freelance & Fulltime</span>
        <span className="text-white/20">•</span>
        <span className="text-white/70 hover:text-white transition-colors flex items-center gap-1 cursor-default">
          Let's Build Something
          <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
            <line x1="5" y1="12" x2="19" y2="12" />
            <polyline points="12 5 19 12 12 19" />
          </svg>
        </span>
      </div>

      {/* Right side: Live Digital Clock */}
      <div className="relative z-10 flex items-center justify-center md:justify-end gap-4">
        <div className="flex flex-col items-center md:items-end">
          <span className="text-white/40 text-[9px] uppercase tracking-widest font-bold" style={{ fontFamily: 'Satoshi, sans-serif' }}>
            Local Time
          </span>
          <div 
            className="text-2xl md:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-white/70 tracking-tight font-mono leading-none mt-1"
            style={{ textShadow: '0 0 20px rgba(255,255,255,0.05)' }}
          >
            {time || '00:00:00 AM'}
          </div>
        </div>
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────────────────
// Main BentoGrid
// ─────────────────────────────────────────────────────────
const BentoGrid = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Set initial hidden state via gsap.set to avoid FOUC
      gsap.set('.bento-card', { opacity: 0, y: 40 });

      ScrollTrigger.batch('.bento-card', {
        onEnter: (batch) =>
          gsap.to(batch, {
            opacity: 1,
            y: 0,
            stagger: 0.12,
            duration: 0.85,
            ease: 'power2.out',
          }),
        start: 'top 85%',
        once: true,
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      id="about"
      className="bg-black py-16 md:py-24 px-4 md:px-8 lg:px-12 relative z-20 overflow-hidden"
    >
      {/* Ambient background floating glows */}
      <div className="absolute top-1/4 left-1/4 w-[450px] h-[450px] bg-blue-500/5 rounded-full blur-[100px] pointer-events-none animate-float-glow-1 z-0" />
      <div className="absolute bottom-1/4 right-1/4 w-[550px] h-[550px] bg-indigo-500/5 rounded-full blur-[120px] pointer-events-none animate-float-glow-2 z-0" />


      {/*
        Grid layout (12 cols):
          Row 1   : Wallpaper (5) | Intro (7)
          Row 2   : Music (5)     | Status / Clock (7)
      */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-5">

        {/* Row 1 */}
        <Card className="md:col-span-5 min-h-[300px] md:min-h-[360px]" style={{ height: 'auto' }}>
          <WallpaperGallery />
        </Card>

        <Card id="contact" className="md:col-span-7 min-h-[320px] md:min-h-[360px]">
          <IntroCard />
        </Card>

        {/* Row 2 */}
        <Card className="md:col-span-12 h-auto md:h-[90px] py-1">
          <StatusCard />
        </Card>

      </div>
    </section>
  );
};

export default BentoGrid;
