import { useEffect } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function useLenis() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothTouch: false,
      touchMultiplier: 2,
    });

    // Sync Lenis scroll with GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    // Hook lenis RAF into GSAP ticker so ScrollTrigger gets accurate scroll values
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    // Prevent GSAP ticker from lagging behind
    gsap.ticker.lagSmoothing(0);

    // Expose lenis instance globally for smooth scroll links
    window.lenis = lenis;

    return () => {
      lenis.destroy();
      gsap.ticker.remove((time) => lenis.raf(time * 1000));
      window.lenis = null;
    };
  }, []);
}
