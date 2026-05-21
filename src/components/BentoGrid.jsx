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
  const photos = [
    { src: '/about1.jpg' },
    { src: '/about2.jpg' },
    { src: '/about3.jpg' },
    { src: '/about4.jpg' }
  ];
  
  // Duplicate 4 times to ensure it spans enough width for a seamless infinite scroll loop
  const items = [...photos, ...photos, ...photos, ...photos];

  return (
    <div className="flex items-center h-full relative overflow-hidden">
      <div className="flex gap-3 animate-slide-horizontal w-max grayscale group-hover:grayscale-0 transition-all duration-700">
        {items.map((item, i) => (
          <img
            key={i}
            src={item.src}
            className="h-56 md:h-72 w-auto object-cover rounded-xl flex-shrink-0"
            alt={`About Photo ${(i % 4) + 1}`}
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
      <div className="absolute bottom-0 inset-x-0 h-28 bg-gradient-to-t from-black/95 via-black/70 to-transparent flex flex-col justify-end p-4 gap-1">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          viewport={{ once: true }}
        >
          <p className="text-[9px] uppercase tracking-widest text-white/45 mb-1.5 animate-pulse" style={{ fontFamily: 'Satoshi, sans-serif' }}>Featured Projects</p>
          <p className="text-xs text-white/90 font-medium leading-snug" style={{ fontFamily: 'Satoshi, sans-serif' }}>
            Educational Center Management System
            <span className="text-white/45 text-[10px] ml-1">(Java OOP)</span>
          </p>
          <p className="text-xs text-white/90 font-medium leading-snug mt-0.5" style={{ fontFamily: 'Satoshi, sans-serif' }}>
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
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(163);
  const audioRef = useRef(null);

  useEffect(() => {
    const audio = new Audio('/NEFFEX_-_Best_of_Me_(mp3.pm).mp3');
    audio.loop = true;
    audioRef.current = audio;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => {
      if (audio.duration && !isNaN(audio.duration)) {
        setDuration(audio.duration);
      }
    };

    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('loadedmetadata', updateDuration);

    return () => {
      audio.pause();
      audio.removeEventListener('timeupdate', updateTime);
      audio.removeEventListener('loadedmetadata', updateDuration);
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

  const handleSeek = (e) => {
    const audio = audioRef.current;
    if (!audio || !duration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const width = rect.width;
    const newTime = (clickX / width) * duration;
    audio.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const formatTime = (time) => {
    if (isNaN(time)) return '0:00';
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  return (
    <div className="h-full p-4 flex flex-col justify-between relative overflow-hidden select-none">
      {/* Album Art blurred background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <img src="/songpic.webp" className="w-full h-full object-cover blur-3xl opacity-20 scale-150" alt="" />
      </div>

      {/* Top Header Row */}
      <div className="relative z-10 flex items-center justify-between w-full">
        <span className="inline-flex items-center gap-2 text-[10px] uppercase tracking-wider text-green-400 font-bold" style={{ fontFamily: 'Satoshi, sans-serif' }}>
          {playing ? (
            <div className="flex items-end gap-[2px] h-3 w-4 pb-[1px]">
              <span className="w-[2px] bg-green-400 rounded-full animate-music-bar-sm-1" style={{ height: '3px' }} />
              <span className="w-[2px] bg-green-400 rounded-full animate-music-bar-sm-2" style={{ height: '6px' }} />
              <span className="w-[2px] bg-green-400 rounded-full animate-music-bar-sm-3" style={{ height: '2px' }} />
              <span className="w-[2px] bg-green-400 rounded-full animate-music-bar-sm-2" style={{ height: '5px' }} />
            </div>
          ) : (
            <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
          )}
          Now Playing
        </span>
        <svg className="w-4 h-4 text-green-400 opacity-80" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm4.586 14.424c-.18.295-.565.387-.86.207-2.377-1.454-5.37-1.783-8.893-.982-.336.075-.668-.135-.745-.47-.077-.337.135-.669.47-.747 3.847-.877 7.142-.5 9.82 1.138.297.18.387.563.208.854zm1.226-2.723c-.227.367-.707.487-1.074.26-2.72-1.672-6.87-2.157-10.076-1.184-.412.125-.845-.108-.97-.52-.124-.413.109-.847.522-.972 3.667-1.11 8.243-.564 11.338 1.34.368.226.488.706.26 1.076zm.106-2.833C14.39 8.84 8.6 8.65 5.253 9.667c-.512.155-1.054-.135-1.21-.647-.155-.512.135-1.053.647-1.21 3.84-1.165 10.24-.95 14.307 1.465.46.273.61.87.337 1.33-.273.46-.87.61-1.33.337z"/>
        </svg>
      </div>

      {/* Album Info & Controls Row */}
      <div className="relative z-10 flex items-center gap-4 w-full my-auto">
        <div className="relative group/album flex-shrink-0 cursor-pointer" onClick={togglePlay}>
          <img
            src="/songpic.webp"
            className={`w-11 h-11 md:w-12 md:h-12 rounded-xl shadow-2xl object-cover transition-transform duration-500 group-hover/album:scale-105 ${playing ? 'animate-[spin_10s_linear_infinite]' : ''}`}
            alt="Album Art"
          />
          <div
            className="absolute inset-0 flex items-center justify-center bg-black/60 rounded-xl opacity-0 group-hover/album:opacity-100 transition-opacity"
          >
            {playing ? (
              <svg fill="white" width="14" height="14" viewBox="0 0 24 24">
                <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z"/>
              </svg>
            ) : (
              <svg fill="white" width="14" height="14" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z"/>
              </svg>
            )}
          </div>
        </div>

        <div className="flex-1 min-w-0">
          <h3 className="text-xs md:text-sm font-bold text-white truncate" style={{ fontFamily: 'Syne, sans-serif' }}>
            Best of Me
          </h3>
          <p className="text-white/50 text-[10px] truncate" style={{ fontFamily: 'Satoshi, sans-serif' }}>NEFFEX</p>
        </div>

        {/* Player Action Buttons (Play/Pause, Prev, Next) */}
        <div className="flex items-center gap-2">
          {/* Dummy Prev Button */}
          <button className="text-white/40 hover:text-white transition-colors" aria-label="Previous">
            <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
              <path d="M6 6h2v12H6V6zm3.5 6l8.5 6V6l-8.5 6z"/>
            </svg>
          </button>
          
          <button
            onClick={togglePlay}
            className="w-7 h-7 rounded-full bg-white text-black flex items-center justify-center hover:scale-105 active:scale-95 transition-transform"
            aria-label={playing ? 'Pause' : 'Play'}
          >
            {playing ? (
              <svg fill="currentColor" width="10" height="10" viewBox="0 0 24 24">
                <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
              </svg>
            ) : (
              <svg fill="currentColor" width="10" height="10" viewBox="0 0 24 24" className="ml-0.5">
                <path d="M8 5v14l11-7z"/>
              </svg>
            )}
          </button>

          {/* Dummy Next Button */}
          <button className="text-white/40 hover:text-white transition-colors" aria-label="Next">
            <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
              <path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z"/>
            </svg>
          </button>
        </div>
      </div>

      {/* Progress Slider & Timeline */}
      <div className="relative z-10 w-full mt-1.5">
        <div 
          onClick={handleSeek}
          className="w-full h-1 bg-white/10 rounded-full cursor-pointer relative group/track overflow-hidden"
        >
          <div 
            className="h-full bg-green-400 rounded-full transition-all duration-100 relative"
            style={{ width: `${(currentTime / duration) * 100}%` }}
          >
            {/* Hover Glow on Progress */}
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-white opacity-0 group-hover/track:opacity-100 transition-opacity" />
          </div>
        </div>
        <div className="flex justify-between items-center mt-1 text-[9px] text-white/45 font-medium" style={{ fontFamily: 'Satoshi, sans-serif' }}>
          <span>{formatTime(currentTime)}</span>
          <span>{formatTime(duration)}</span>
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
      className="bg-black py-16 md:py-24 px-4 md:px-8 lg:px-12 relative z-20"
    >


      {/*
        Grid layout (12 cols):
          Row 1–2 : Wallpaper (5) | Intro (7)
          Row 3   : Tools (6) | Profile (2) | Video (4)
          Row 4   : Music (6) | Profile cont | Video cont
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
        <Card className="md:col-span-4 h-[135px] md:h-[145px]">
          <MusicPlayer />
        </Card>

        <Card
          className="md:col-span-8 h-[135px] md:h-[145px] cursor-pointer"
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

      </div>
    </section>
  );
};

export default BentoGrid;
