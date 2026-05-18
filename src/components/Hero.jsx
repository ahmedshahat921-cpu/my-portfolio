import React, { useEffect, useRef, useState, useLayoutEffect, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// 192 frames @ 24fps from 8s video – confirmed via FFmpeg output
const FRAME_COUNT = 192;
const INITIAL_BATCH = 30;
const BATCH_SIZE = 30;

const Hero = () => {
  const canvasRef       = useRef(null);
  const containerRef    = useRef(null);
  const imagesRef       = useRef([]);           // index-based frame store
  const scrollLockedRef = useRef(true);         // unlock scroll after first batch
  const animObjRef      = useRef({ frame: 0 }); // shared GSAP target
  const [batchReady, setBatchReady]   = useState(false);  // first 30 loaded?
  const [totalLoaded, setTotalLoaded] = useState(0);

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
        <div className="absolute inset-0 z-30 flex flex-col justify-between p-8 md:p-12 text-white">

          {/* Top-right: email + phone */}
          <div className="flex flex-col items-end gap-1 text-sm md:text-base opacity-80" style={{ fontFamily: 'Satoshi, sans-serif' }}>
            <a
              href="mailto:ahmedshahat921@gmail.com"
              className="hover:text-white/60 transition-colors tracking-wide"
            >
              ahmedshahat921@gmail.com
            </a>
            <a
              href="tel:01152012098"
              className="hover:text-white/60 transition-colors tracking-wide"
            >
              01152012098
            </a>
          </div>

          {/* Bottom section */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">

            {/* Bottom-left: Title */}
            <div>
              <h1
                className="text-5xl md:text-7xl font-bold leading-none tracking-tighter uppercase"
                style={{ fontFamily: 'Syne, sans-serif' }}
              >
                Web<br />Developer
              </h1>
            </div>

            {/* Bottom-right: description + scroll indicator + CV */}
            <div className="max-w-xs md:max-w-sm flex flex-col gap-5">
              <p
                className="text-base md:text-lg text-white/60 leading-relaxed"
                style={{ fontFamily: 'Satoshi, sans-serif' }}
              >
                Web Developer with 2+ years of experience building responsive web
                applications and backend systems.
              </p>

              {/* Scroll indicator */}
              <div className="opacity-50">
                {/* Desktop: animated arrow */}
                <svg
                  className="hidden md:block animate-bounce"
                  width="28" height="28" viewBox="0 0 24 24"
                  fill="none" stroke="currentColor" strokeWidth="2"
                >
                  <path d="M12 5v14M19 12l-7 7-7-7" />
                </svg>
                {/* Mobile: mouse icon */}
                <div className="md:hidden flex flex-col items-center gap-1">
                  <div className="w-6 h-9 border-2 border-white/50 rounded-full flex justify-center pt-1.5">
                    <div className="w-1 h-2 bg-white/50 rounded-full animate-bounce" />
                  </div>
                </div>
              </div>

              {/* Download CV */}
              <a
                href="/assets/Ahmed_Shahat_CV.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-white text-black font-bold rounded-full hover:scale-105 hover:bg-white/90 active:scale-95 transition-all duration-200 w-fit"
                style={{ fontFamily: 'Satoshi, sans-serif' }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="7 10 12 15 17 10" />
                  <line x1="12" y1="15" x2="12" y2="3" />
                </svg>
                Download CV
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
