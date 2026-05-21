/* eslint-disable no-unused-vars */
import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// ─────────────────────────────────────────────────────────
// Shared Card wrapper
// ─────────────────────────────────────────────────────────
const Card = ({ children, className = '', style = {}, ...props }) => (
  <div
    className={`
      bento-card
      relative overflow-hidden rounded-3xl
      bg-white/5 backdrop-blur-md border border-white/10
      shadow-lg hover:shadow-blue-500/20 hover:border-white/20
      transition-all duration-500 flex flex-col group
      ${className}
    `}
    style={style}
    {...props}
  >
    {/* Subtle hover shimmer */}
    <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-0" />
    <div className="relative z-10 h-full w-full flex flex-col">
      {children}
    </div>
  </div>
);

// ─────────────────────────────────────────────────────────
// 1. Wallpaper Gallery
// ─────────────────────────────────────────────────────────
const WallpaperGallery = () => {
  const wallpapers = [
    '/wall1.webp', '/wall2.webp', '/wall3.webp', '/wall4.webp',
    '/wall5.webp', '/wall6.webp', '/wall7.webp',
    '/wall1.webp', '/wall2.webp', '/wall3.webp', '/wall4.webp',
    '/wall5.webp', '/wall6.webp', '/wall7.webp',
  ];

  return (
    <div className="flex items-center h-full relative overflow-hidden">
      <div className="flex gap-3 animate-slide-horizontal w-max grayscale group-hover:grayscale-0 transition-all duration-700">
        {wallpapers.map((src, i) => (
          <img
            key={i}
            src={src}
            className="h-56 md:h-72 aspect-[9/16] object-cover rounded-xl flex-shrink-0"
            alt={`Wallpaper ${(i % 7) + 1}`}
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
  const [message, setMessage] = useState('');
  const [sent, setSent]       = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!message.trim()) return;
    setSent(true);
    setMessage('');
    setTimeout(() => setSent(false), 3500);
  };

  return (
    <div className="p-7 md:p-10 flex flex-col justify-between h-full">
      <div>
        <h2
          className="text-3xl md:text-4xl font-bold mb-4 text-white"
          style={{ fontFamily: 'Syne, sans-serif' }}
        >
          Hi, I'm Ahmed Shahat
        </h2>
        <p className="text-white/60 text-base md:text-lg leading-relaxed max-w-lg" style={{ fontFamily: 'Satoshi, sans-serif' }}>
          I am a Web Developer with 2+ years of experience building responsive web applications
          and backend systems. Proficient in HTML, CSS, JavaScript, and Java with expertise in
          OOP design patterns. Successfully delivered 10+ projects including mobile apps and
          scalable backend solutions.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="mt-6 md:mt-8 relative">
        {/* Success toast */}
        {sent && (
          <motion.div
            initial={{ x: -30, opacity: 0 }}
            animate={{ x: 0,   opacity: 1 }}
            exit={{   x: -30, opacity: 0 }}
            className="absolute -top-10 left-0 text-green-400 text-sm font-medium"
            style={{ fontFamily: 'Satoshi, sans-serif' }}
          >
            ✓ Message sent!
          </motion.div>
        )}
        <div className="flex gap-2">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Say hello…"
            className="bg-white/10 border border-white/10 rounded-full px-5 py-3 w-full text-white placeholder:text-white/30 focus:outline-none focus:bg-white/15 focus:border-white/30 transition-all text-sm"
            style={{ fontFamily: 'Satoshi, sans-serif' }}
          />
          <button
            type="submit"
            className="bg-white text-black rounded-full px-6 py-3 font-bold text-sm hover:scale-105 active:scale-95 transition-transform flex-shrink-0"
            style={{ fontFamily: 'Satoshi, sans-serif' }}
          >
            Send
          </button>
        </div>
      </form>
    </div>
  );
};

// ─────────────────────────────────────────────────────────
// 3. Tools Marquee  (skills from build.txt)
// ─────────────────────────────────────────────────────────
const ToolsMarquee = () => {
  const logoTools = [
    { name: 'Framer',      src: '/framer_logo_icon_169149.webp' },
    { name: 'Spline',      src: '/spline_logo.webp' },
    { name: 'Ollama',      src: '/ollama-icon.webp',  invert: true },
    { name: 'Groq',        src: '/groq_logo.webp' },
    { name: 'Antigravity', src: '/antigravity.webp' },
  ];

  // Text-based skill badges
  const skills = [
    'HTML5', 'CSS3', 'JavaScript (ES6+)', 'React', 'Tailwind CSS',
    'Bootstrap', 'Figma', 'Java (OOP)', 'PHP', 'Python',
    'C/C++', 'Git', 'GitHub', 'MySQL', 'Vercel', 'Netlify',
  ];

  // Interleave logos and skill text, then duplicate for seamless loop
  const items = [
    ...logoTools.map((t) => ({ type: 'logo', ...t })),
    ...skills.map((s) => ({ type: 'text', name: s })),
    ...logoTools.map((t) => ({ type: 'logo', ...t })),
    ...skills.map((s) => ({ type: 'text', name: s })),
  ];

  return (
    <div className="flex items-center h-full relative overflow-hidden">
      <div className="flex gap-6 md:gap-10 items-center animate-marquee whitespace-nowrap py-2">
        {items.map((item, i) =>
          item.type === 'logo' ? (
            <div key={i} className="flex flex-col items-center gap-1.5 opacity-70 hover:opacity-100 transition-opacity flex-shrink-0">
              <img
                src={item.src}
                alt={item.name}
                className={`h-8 w-8 md:h-10 md:w-10 object-contain ${item.invert ? 'invert' : ''}`}
              />
              <span className="text-[9px] md:text-[10px] uppercase tracking-wider text-white/50" style={{ fontFamily: 'Satoshi, sans-serif' }}>
                {item.name}
              </span>
            </div>
          ) : (
            <span
              key={i}
              className="text-xs md:text-sm text-white/50 hover:text-white/90 transition-colors px-3 py-1 rounded-full border border-white/10 hover:border-white/30 flex-shrink-0"
              style={{ fontFamily: 'Satoshi, sans-serif' }}
            >
              {item.name}
            </span>
          )
        )}
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────────────────
// 4. Profile Picture
// ─────────────────────────────────────────────────────────
const ProfileCard = () => (
  <div className="h-full w-full relative overflow-hidden">
    <img
      src="/mine_pic.webp"
      alt="Ahmed Shahat"
      className="w-full h-full object-cover transition-all duration-700 scale-100 group-hover:scale-110"
    />
    {/* Dark overlay + vignette */}
    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
    <div
      className="absolute inset-0"
      style={{ background: 'radial-gradient(circle, transparent 40%, rgba(0,0,0,0.45) 100%)' }}
    />
    {/* Hover: reveal gradient */}
    <div className="absolute inset-0 bg-gradient-to-t from-blue-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    {/* Status badge */}
    <div className="absolute bottom-4 left-4 text-white">
      <p className="text-[10px] uppercase tracking-widest text-white/40 mb-1" style={{ fontFamily: 'Satoshi, sans-serif' }}>Status</p>
      <div className="flex items-center gap-2">
        <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
        <span className="text-sm font-semibold" style={{ fontFamily: 'Satoshi, sans-serif' }}>Available</span>
      </div>
    </div>
  </div>
);

// ─────────────────────────────────────────────────────────
// 5. Video & Projects Card
// ─────────────────────────────────────────────────────────
const VideoCard = () => {
  const videoRef = useRef(null);
  const [muted, setMuted] = useState(true);

  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = !video.muted;
    setMuted(video.muted);
  };

  return (
    <div className="h-full w-full relative overflow-hidden">
      <video
        ref={videoRef}
        src="/carchase.mp4"
        className="w-full h-full object-cover opacity-70 group-hover:opacity-100 transition-opacity duration-500"
        autoPlay
        loop
        muted
        playsInline
      />
      {/* Blue tint overlay */}
      <div className="absolute inset-0 bg-blue-500/10 mix-blend-overlay pointer-events-none" />
      {/* Bottom gradient + project text */}
      <div className="absolute bottom-0 inset-x-0 h-48 bg-gradient-to-t from-black/90 to-transparent flex flex-col justify-end p-5 gap-2">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          viewport={{ once: true }}
        >
          <p className="text-[10px] uppercase tracking-widest text-white/40 mb-2" style={{ fontFamily: 'Satoshi, sans-serif' }}>Featured Projects</p>
          <p className="text-sm text-white/80 font-medium leading-snug" style={{ fontFamily: 'Satoshi, sans-serif' }}>
            Educational Center Management System
            <span className="text-white/40 text-xs ml-1">(Java OOP)</span>
          </p>
          <p className="text-sm text-white/80 font-medium leading-snug mt-1" style={{ fontFamily: 'Satoshi, sans-serif' }}>
            Islamic Remembrance (Azkar) App
          </p>
        </motion.div>
      </div>
      {/* Mute / Unmute button */}
      <button
        onClick={toggleMute}
        className="absolute bottom-4 right-4 bg-black/50 backdrop-blur-sm p-2.5 rounded-full hover:bg-white/20 transition-colors z-10"
        aria-label={muted ? 'Unmute' : 'Mute'}
      >
        {muted ? (
          <svg width="18" height="18" fill="none" stroke="white" strokeWidth="2" viewBox="0 0 24 24">
            <path d="M11 5L6 9H2v6h4l5 4V5z"/>
            <line x1="23" y1="9" x2="17" y2="15"/>
            <line x1="17" y1="9" x2="23" y2="15"/>
          </svg>
        ) : (
          <svg width="18" height="18" fill="none" stroke="white" strokeWidth="2" viewBox="0 0 24 24">
            <path d="M11 5L6 9H2v6h4l5 4V5z"/>
            <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"/>
          </svg>
        )}
      </button>
    </div>
  );
};

// ─────────────────────────────────────────────────────────
// 6. Music Player
// ─────────────────────────────────────────────────────────
const MusicPlayer = () => {
  const [playing, setPlaying] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    audioRef.current = new Audio('/NEFFEX_-_Best_of_Me_(mp3.pm).mp3');
    audioRef.current.loop = true;
    const audio = audioRef.current;
    return () => {
      audio.pause();
      audio.src = '';
    };
  }, []);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) {
      audio.pause();
    } else {
      audio.play().catch(() => {});
    }
    setPlaying((p) => !p);
  };

  // 16 bars with 3 animation classes cycling
  const barAnimations = ['animate-music-bar-1','animate-music-bar-2','animate-music-bar-3'];
  const bars = Array.from({ length: 16 }, (_, i) => barAnimations[i % 3]);

  return (
    <div className="h-full flex items-center gap-5 px-6 md:px-8 relative overflow-hidden">
      {/* Blurred album-art background */}
      <div className="absolute inset-0 overflow-hidden">
        <img src="/songpic.webp" className="w-full h-full object-cover blur-3xl opacity-25 scale-150" alt="" />
      </div>

      <div className="relative z-10 flex items-center gap-5 w-full">
        {/* Album art + play/pause */}
        <div className="relative flex-shrink-0">
          <img
            src="/songpic.webp"
            className={`w-16 h-16 md:w-20 md:h-20 rounded-xl shadow-2xl object-cover ${playing ? 'animate-[spin_8s_linear_infinite]' : ''}`}
            alt="Album Art"
          />
          <button
            onClick={togglePlay}
            className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-xl opacity-0 group-hover:opacity-100 hover:opacity-100 transition-opacity"
            aria-label={playing ? 'Pause' : 'Play'}
          >
            {playing ? (
              <svg fill="white" width="22" height="22" viewBox="0 0 24 24">
                <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z"/>
              </svg>
            ) : (
              <svg fill="white" width="22" height="22" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z"/>
              </svg>
            )}
          </button>
        </div>

        {/* Song info */}
        <div className="flex-1 min-w-0">
          <h3 className="text-lg md:text-xl font-bold text-white truncate" style={{ fontFamily: 'Syne, sans-serif' }}>
            Best of Me
          </h3>
          <p className="text-white/50 text-sm truncate" style={{ fontFamily: 'Satoshi, sans-serif' }}>NEFFEX</p>
        </div>

        {/* Music bars visualiser (12–20 bars) */}
        <div className="flex gap-[3px] items-end h-8 flex-shrink-0 pr-1">
          {bars.map((cls, i) => (
            <div
              key={i}
              className={`w-1 md:w-1.5 rounded-full bg-gradient-to-t from-green-500 to-emerald-300 ${playing ? cls : 'h-1'}`}
              style={{ animationDelay: `${(i * 0.05).toFixed(2)}s` }}
            />
          ))}
        </div>

        {/* Play button (visible always, not just on hover) */}
        <button
          onClick={togglePlay}
          className="flex-shrink-0 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 border border-white/10 hover:border-white/30 flex items-center justify-center transition-all md:hidden"
        >
          {playing ? (
            <svg fill="white" width="18" height="18" viewBox="0 0 24 24">
              <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z"/>
            </svg>
          ) : (
            <svg fill="white" width="18" height="18" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z"/>
            </svg>
          )}
        </button>
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
      className="bg-black py-16 md:py-24 px-4 md:px-8 lg:px-12 relative z-20"
    >


      {/*
        Grid layout (12 cols):
          Row 1–2 : Wallpaper (5) | Intro (7)
          Row 3   : Tools (6) | Profile (2) | Video (4)
          Row 4   : Music (6) | Profile cont | Video cont
      */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-5">

        {/* Row 1–2 */}
        <Card className="md:col-span-5 md:row-span-2 min-h-[300px] md:min-h-0" style={{ height: 'auto' }}>
          <WallpaperGallery />
        </Card>

        <Card id="contact" className="md:col-span-7 md:row-span-2 min-h-[320px] md:min-h-0">
          <IntroCard />
        </Card>

        {/* Row 3–4 (Profile & Video span 2 rows) */}
        <Card className="md:col-span-6 min-h-[100px] md:min-h-0" style={{ minHeight: '90px' }}>
          <ToolsMarquee />
        </Card>

        <Card className="md:col-span-2 md:row-span-2 min-h-[260px] md:min-h-0" style={{ padding: 0 }}>
          <ProfileCard />
        </Card>

        <Card
          className="md:col-span-4 md:row-span-2 min-h-[280px] md:min-h-0 cursor-pointer"
          style={{ padding: 0 }}
          onClick={() => {
            if (window.lenis) {
              window.lenis.scrollTo('#projects', { offset: -80 });
            } else {
              const el = document.querySelector('#projects');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }
          }}
        >
          <VideoCard />
        </Card>

        {/* Row 4 */}
        <Card className="md:col-span-6 min-h-[100px] md:min-h-0" style={{ minHeight: '90px' }}>
          <MusicPlayer />
        </Card>

      </div>
    </section>
  );
};

export default BentoGrid;
