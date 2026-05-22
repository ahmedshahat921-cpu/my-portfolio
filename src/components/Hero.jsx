/* eslint-disable no-unused-vars */
import React, { useEffect, useRef, useState, useLayoutEffect, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// 192 frames @ 24fps from 8s video – confirmed via FFmpeg output
const FRAME_COUNT = 192;
const INITIAL_BATCH = 30;
const BATCH_SIZE = 30;

const WORDS = ['Web Developer', 'Full-Stack Engineer', 'Open Source Contributor'];

const Hero = () => {
  const canvasRef       = useRef(null);
  const containerRef    = useRef(null);
  const imagesRef       = useRef([]);           // index-based frame store
  const scrollLockedRef = useRef(true);         // unlock scroll after first batch
  const animObjRef      = useRef({ frame: 0 }); // shared GSAP target
  const [batchReady, setBatchReady]   = useState(false);  // first 30 loaded?
  const [totalLoaded, setTotalLoaded] = useState(0);

  // ── Typewriter state ───────────────────────────────────────────────────
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  // ── Draw a specific frame onto the canvas ──────────────────────────────
  const drawFrame = useCallback((index) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const img = imagesRef.current[index];
    if (!img) return;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
  }, []);

  // ── Load a single frame, return a promise ─────────────────────────────
  const loadFrame = useCallback((i) => {
    return new Promise((resolve) => {
      if (imagesRef.current[i]) return resolve(); // already loaded
      const img = new Image();
      img.src = `/frames/frame_${String(i + 1).padStart(4, '0')}.jpg?v=1`;
      img.onload = () => {
        imagesRef.current[i] = img;
        setTotalLoaded((p) => p + 1);
        resolve();
      };
      img.onerror = () => resolve(); // never block on missing frame
    });
  }, []);

  // ── Progressive batch loading ──────────────────────────────────────────
  useEffect(() => {
    let cancelled = false;

    const run = async () => {
      // ── BATCH 1: first 30 frames ──
      const first = Array.from({ length: Math.min(INITIAL_BATCH, FRAME_COUNT) }, (_, i) => loadFrame(i));
      await Promise.all(first);
      if (cancelled) return;
      setBatchReady(true);
      drawFrame(0);                        // Show first frame immediately

      // ── Remaining frames in chunks ──
      for (let start = INITIAL_BATCH; start < FRAME_COUNT; start += BATCH_SIZE) {
        if (cancelled) return;
        const chunk = Array.from(
          { length: Math.min(BATCH_SIZE, FRAME_COUNT - start) },
          (_, j) => loadFrame(start + j)
        );
        await Promise.all(chunk);
        // Yield to browser between batches to prevent UI freeze
        await new Promise((r) => setTimeout(r, 0));
      }
    };

    run();
    return () => { cancelled = true; };
  }, [loadFrame, drawFrame]);

  // ── GSAP ScrollTrigger animation (mount once) ──────────────────────────
  useLayoutEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.width  = 1920;
    canvas.height = 1080;

    // Set initial frame drawn state via gsap.set to prevent FOUC
    gsap.set(animObjRef.current, { frame: 0 });

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.5,
          onUpdate: (self) => {
            const frameIndex = Math.round(self.progress * (FRAME_COUNT - 1));
            drawFrame(Math.min(frameIndex, imagesRef.current.length - 1));
          },
        },
      });
      // Dummy tween to give ScrollTrigger a timeline to animate
      tl.to(animObjRef.current, { frame: FRAME_COUNT - 1, ease: 'none', duration: 1 });
    }, containerRef);

    return () => ctx.revert();
  }, [drawFrame]);

  // ── Ignore mobile height-only resize (address bar jitter) ────────────
  useEffect(() => {
    let lastWidth = window.innerWidth;
    const handleResize = () => {
      const newWidth = window.innerWidth;
      if (newWidth !== lastWidth) {
        lastWidth = newWidth;
        ScrollTrigger.refresh();
      }
      // Height-only change (mobile address bar) → ignore
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // ── Typewriter effect for developer titles ──────────────────────────────
  useEffect(() => {
    const currentWord = WORDS[currentWordIndex];
    let timer;

    if (!isDeleting) {
      if (displayedText !== currentWord) {
        timer = setTimeout(() => {
          setDisplayedText(currentWord.substring(0, displayedText.length + 1));
        }, 50 + Math.random() * 30);
      } else {
        timer = setTimeout(() => {
          setIsDeleting(true);
        }, 1200);
      }
    } else {
      if (displayedText !== '') {
        timer = setTimeout(() => {
          setDisplayedText(currentWord.substring(0, displayedText.length - 1));
        }, 25);
      } else {
        setIsDeleting(false);
        setCurrentWordIndex((prev) => (prev + 1) % WORDS.length);
      }
    }

    return () => clearTimeout(timer);
  }, [displayedText, isDeleting, currentWordIndex]);

  return (
    <div id="home" ref={containerRef} className="relative bg-black" style={{ height: '800vh' }}>
      <div className="sticky top-0 h-screen w-full overflow-hidden">

        {/* ── Poster / Loading overlay ── */}
        <div
          className="absolute inset-0 z-20 flex items-center justify-center bg-black transition-opacity duration-700"
          style={{ opacity: batchReady ? 0 : 1, pointerEvents: batchReady ? 'none' : 'auto' }}
        >
          <img
            src="/video-poster.jpg"
            className="w-full h-full object-cover opacity-60"
            alt="Loading…"
            onError={(e) => { e.target.style.display = 'none'; }} // gracefully hide if missing
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="flex flex-col items-center gap-3 text-white/40">
              <div className="w-8 h-8 border-2 border-white/20 border-t-white/80 rounded-full animate-spin" />
              <span className="text-xs tracking-widest uppercase" style={{ fontFamily: 'Satoshi, sans-serif' }}>Loading…</span>
            </div>
          </div>
        </div>

        {/* ── Canvas (filter: saturate 1.25) ── */}
        <div className="absolute inset-0" style={{ filter: 'saturate(1.25)' }}>
          <canvas
            ref={canvasRef}
            className="w-full h-full"
            style={{ display: 'block', objectFit: 'cover' }}
          />
        </div>

        {/* ── Overlay: global darken ── */}
        <div className="absolute inset-0 bg-black/10 z-10 pointer-events-none" />

        {/* ── Overlay: vignette ── */}
        <div
          className="absolute inset-0 z-10 pointer-events-none"
          style={{ background: 'radial-gradient(circle, transparent 50%, rgba(0,0,0,0.4) 100%)' }}
        />

        {/* ── Overlay: bottom gradient ── */}
        <div className="absolute bottom-0 inset-x-0 h-64 bg-gradient-to-t from-black/60 to-transparent z-10 pointer-events-none" />

        {/* ── Content layer ── */}
        <div className="absolute inset-0 z-30 flex flex-col justify-end p-8 md:p-16 text-white">

          {/* Left-Aligned Stack */}
          <div className="flex flex-col items-start gap-5 max-w-lg mb-8 md:mb-4">
            <div className="min-h-[40px] sm:min-h-[48px] md:min-h-[56px] flex items-center">
              <h1
                className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight uppercase"
                style={{ fontFamily: 'Syne, sans-serif' }}
              >
                <span className="text-white">{displayedText}</span>
                <span className="inline-block ml-1.5 w-[3px] h-[0.85em] bg-green-400 align-middle animate-pulse" />
              </h1>
            </div>
          </div>

          {/* Centered Scroll Indicator at the bottom */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 opacity-40 hover:opacity-85 transition-opacity duration-300 pointer-events-none">
            {/* Desktop: animated arrow */}
            <svg
              className="hidden md:block animate-bounce"
              width="20" height="20" viewBox="0 0 24 24"
              fill="none" stroke="currentColor" strokeWidth="2.5"
            >
              <path d="M12 5v14M19 12l-7 7-7-7" />
            </svg>
            {/* Mobile: mouse icon */}
            <div className="md:hidden flex flex-col items-center gap-1">
              <div className="w-5 h-8 border-2 border-white/60 rounded-full flex justify-center pt-1">
                <div className="w-1.5 h-1.5 bg-white/60 rounded-full animate-bounce" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
