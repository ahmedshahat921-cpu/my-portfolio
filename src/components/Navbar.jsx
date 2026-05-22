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
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <nav
      className={`absolute top-0 left-0 w-full z-50 transition-all duration-500 ease-in-out ${
        scrolled
          ? 'bg-transparent py-4'
          : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
        
        {/* Left: Clean Logo / Name */}
        <a
          href="#home"
          onClick={(e) => handleNavClick(e, '#home')}
          className="text-white font-syne font-bold text-lg md:text-xl tracking-widest uppercase hover:opacity-80 transition-opacity"
        >
          Ahmed Shahat
        </a>

        {/* Right: Desktop Navigation Links */}
        <div className="hidden md:flex items-center gap-10 font-satoshi text-xs uppercase tracking-widest">
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
      </div>
    </nav>
  );
};

export default Navbar;
