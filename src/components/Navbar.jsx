import React, { useState, useEffect } from 'react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Monitor scroll to add deeper background drop-shadow / background color for optimal readability
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e, selector) => {
    e.preventDefault();
    setIsOpen(false);

    if (window.lenis) {
      window.lenis.scrollTo(selector, { offset: -80 });
    } else {
      const element = document.querySelector(selector);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const navItems = [
    { label: 'Home', href: '#home' },
    { label: 'About', href: '#about' },
    { label: 'Skills', href: '#skills' },
    { label: 'Projects', href: '#projects' },
    { label: 'Contact Us', href: '#footer' },
  ];

  return (
    <nav
      className={`absolute top-0 left-0 w-full z-50 transition-all duration-500 ease-in-out ${
        scrolled
          ? 'bg-transparent py-4'
          : 'bg-transparent py-6'
      }`}
    >
      <div className="w-full px-6 md:px-12 lg:px-16 flex items-center justify-between">
        
        {/* Left: Clean Logo / Name */}
        <a
          href="#home"
          onClick={(e) => handleNavClick(e, '#home')}
          className="text-white font-syne font-bold text-lg md:text-xl tracking-widest uppercase hover:opacity-80 transition-opacity"
        >
          Ahmed Shahat
        </a>

        {/* Right: Desktop Navigation Links + CV Button */}
        <div className="hidden md:flex items-center gap-8 font-satoshi text-xs uppercase tracking-widest">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={(e) => handleNavClick(e, item.href)}
              className="relative text-white/60 hover:text-white transition-colors duration-300 font-medium py-2 group"
            >
              {item.label}
              <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-white transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
          
          {/* Glassmorphic Download CV button in Navbar */}
          <a
            href="/assets/Ahmed_Shahat_CV.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-2.5 bg-white/10 backdrop-blur-md border border-white/15 text-white font-bold rounded-full hover:bg-white/20 hover:scale-105 active:scale-95 transition-all duration-300 shadow-[0_4px_12px_rgba(0,0,0,0.3)] hover:shadow-[0_0_15px_rgba(255,255,255,0.1)] normal-case"
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            Download CV
          </a>
        </div>

        {/* Right: Hamburger Button (Mobile) */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden flex flex-col justify-between w-6 h-3 z-50 text-white focus:outline-none relative group"
          aria-label="Toggle navigation menu"
        >
          <span
            className={`w-full h-[1.5px] bg-white transition-all duration-300 transform origin-left ${
              isOpen ? 'rotate-[42deg] translate-y-[-1px]' : ''
            }`}
          />
          <span
            className={`w-full h-[1.5px] bg-white transition-all duration-300 ${
              isOpen ? 'opacity-0 translate-x-3' : ''
            }`}
          />
          <span
            className={`w-full h-[1.5px] bg-white transition-all duration-300 transform origin-left ${
              isOpen ? '-rotate-[42deg] translate-y-[1px]' : ''
            }`}
          />
        </button>
      </div>

      {/* Mobile Menu Panel */}
      <div
        className={`fixed inset-0 bg-black/95 backdrop-blur-2xl z-40 flex flex-col items-center justify-center gap-8 transition-all duration-500 md:hidden ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="flex flex-col items-center gap-6 font-syne text-xl uppercase tracking-widest">
          {navItems.map((item, index) => (
            <a
              key={item.label}
              href={item.href}
              onClick={(e) => handleNavClick(e, item.href)}
              style={{
                transitionDelay: isOpen ? `${index * 75}ms` : '0ms',
                transform: isOpen ? 'translateY(0)' : 'translateY(20px)',
              }}
              className={`text-white/60 hover:text-white transition-all duration-500 font-bold ${
                isOpen ? 'opacity-100' : 'opacity-0'
              }`}
            >
              {item.label}
            </a>
          ))}
        </div>

        {/* Mobile Download CV Button */}
        <a
          href="/assets/Ahmed_Shahat_CV.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className={`inline-flex items-center gap-2 px-5 py-2.5 bg-white/10 backdrop-blur-md border border-white/15 text-white font-bold rounded-full hover:bg-white/20 transition-all duration-300 shadow-[0_4px_12px_rgba(0,0,0,0.3)] text-sm tracking-wide ${
            isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
          style={{
            transitionDelay: isOpen ? `${navItems.length * 75}ms` : '0ms',
            transform: isOpen ? 'translateY(0)' : 'translateY(20px)',
            fontFamily: 'Satoshi, sans-serif'
          }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="7 10 12 15 17 10" />
            <line x1="12" y1="15" x2="12" y2="3" />
          </svg>
          Download CV
        </a>

        {/* Social Icons inside Mobile Menu */}
        <div 
          className={`flex gap-6 mt-4 transition-all duration-500 delay-300 ${
            isOpen ? 'opacity-85 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          {/* LinkedIn */}
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 transition-all duration-300"
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
            className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 transition-all duration-300"
            aria-label="Instagram"
          >
            <svg className="w-4.5 h-4.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
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
            className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 transition-all duration-300"
            aria-label="Facebook"
          >
            <svg className="w-4.5 h-4.5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/>
            </svg>
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
