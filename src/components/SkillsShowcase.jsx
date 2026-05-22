/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// SVG Icons for all skills
const Icons = {
  web: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
    </svg>
  ),
  react: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="2" />
      <path d="M12 7c3.866 0 7-2.239 7-5s-3.134-5-7-5-7 2.239-7 5 3.134 5 7 5z" transform="rotate(30 12 12)" />
      <path d="M12 7c3.866 0 7-2.239 7-5s-3.134-5-7-5-7 2.239-7 5 3.134 5 7 5z" transform="rotate(90 12 12)" />
      <path d="M12 7c3.866 0 7-2.239 7-5s-3.134-5-7-5-7 2.239-7 5 3.134 5 7 5z" transform="rotate(150 12 12)" />
    </svg>
  ),
  springboot: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v18M3 12h18M12 3a9 9 0 019 9v1a9 9 0 01-9 9m0-19a9 9 0 00-9 9v1a9 9 0 009 9" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c1.5 0 3 .5 3 2.5s-1.5 3-3 3-3-1-3-3 1.5-2.5 3-2.5z" />
    </svg>
  ),
  php: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6M12 9v6M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
    </svg>
  ),
  tailwind: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l9-5-9-5-9 5 9 5z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
    </svg>
  ),
  supabase: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
    </svg>
  ),
  figma: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.53 16.122a3 3 0 00-3.059-3.059H4.86a3 3 0 00-3.059 3.059v1.609a3 3 0 003.06 3.06h1.608a3 3 0 003.059-3.06v-1.609zM9.53 7.53a3 3 0 00-3.059-3.059H4.86a3 3 0 00-3.059 3.059v1.608a3 3 0 003.06 3.06h1.608a3 3 0 003.059-3.06V7.53zM17.53 7.53a3 3 0 00-3.059-3.059h-1.608a3 3 0 00-3.059 3.059v1.608a3 3 0 003.059 3.06h1.608a3 3 0 003.06-3.06V7.53zM17.53 16.122a3 3 0 00-3.059-3.059h-1.608a3 3 0 00-3.059 3.059v1.609a3 3 0 003.059 3.06h1.608a3 3 0 003.06-3.06v-1.609z" />
    </svg>
  ),
  mobile: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
      <path d="M12 18h.01" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  java: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 2c-.53 0-1.039.211-1.414.586L4.222 8.95c-.78.78-.78 2.047 0 2.828l6.364 6.364a2 2 0 002.828 0l6.364-6.364c.78-.78.78-2.047 0-2.828l-6.364-6.364A1.996 1.996 0 0012 2z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6" />
    </svg>
  ),
  python: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 15a3 3 0 100-6 3 3 0 000 6z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12a7.5 7.5 0 00-13.5-4.5M4.5 12a7.5 7.5 0 0013.5 4.5" />
    </svg>
  ),
  cpp: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
  ),
  dsa: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <circle cx="12" cy="5" r="3" />
      <circle cx="6" cy="18" r="3" />
      <circle cx="18" cy="18" r="3" />
      <path d="M12 8v7M6 15l6-7 6 7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  problemsolving: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
    </svg>
  ),
  dataanalysis: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
    </svg>
  ),
  git: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6a3 3 0 110-6 3 3 0 010 6zm0 12a3 3 0 110-6 3 3 0 010 6zm0-9v3" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 12c-2.5 0-4 1.5-4 4" />
      <circle cx="8" cy="16" r="1" />
    </svg>
  ),
  mysql: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
    </svg>
  ),
  testing: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
    </svg>
  ),
  vercel: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 3l10 17H2L12 3z" />
    </svg>
  )
};

const skillsData = [
  // WEB DEVELOPMENT
  {
    name: 'HTML5, CSS3 & JS',
    category: 'web',
    desc: 'Core languages for structured, modern, and interactive responsive web design.',
    level: 'Expert',
    pct: 95,
    icon: Icons.web,
    glow: 'from-orange-500/20 to-yellow-500/20'
  },
  {
    name: 'React.js',
    category: 'web',
    desc: 'State management, custom hooks, and dynamic rendering for advanced single page apps.',
    level: 'Advanced',
    pct: 90,
    icon: Icons.react,
    glow: 'from-cyan-500/20 to-blue-500/20'
  },
  {
    name: 'Java Spring Boot',
    category: 'web',
    desc: 'Building highly scalable, secure, and production-ready microservices & REST APIs.',
    level: 'Advanced',
    pct: 85,
    icon: Icons.springboot,
    glow: 'from-green-500/20 to-emerald-500/20'
  },
  {
    name: 'PHP',
    category: 'web',
    desc: 'Server-side scripting, relational queries, dynamic templates, and database sync.',
    level: 'Proficient',
    pct: 80,
    icon: Icons.php,
    glow: 'from-purple-500/20 to-indigo-500/20'
  },
  {
    name: 'Tailwind CSS & Bootstrap',
    category: 'web',
    desc: 'Rapid UI layouts using modern utility classes, flexboxes, and responsive grids.',
    level: 'Expert',
    pct: 95,
    icon: Icons.tailwind,
    glow: 'from-sky-400/20 to-teal-400/20'
  },
  {
    name: 'Supabase',
    category: 'web',
    desc: 'Backend-as-a-service leveraging Postgres, real-time sync, auth, and secure storage.',
    level: 'Proficient',
    pct: 80,
    icon: Icons.supabase,
    glow: 'from-emerald-400/20 to-teal-500/20'
  },
  {
    name: 'Figma',
    category: 'web',
    desc: 'UX/UI wireframing, component-driven design systems, and developer-handoff handiness.',
    level: 'Proficient',
    pct: 75,
    icon: Icons.figma,
    glow: 'from-pink-500/20 to-rose-500/20'
  },
  {
    name: 'Mobile App Development',
    category: 'web',
    desc: 'Cross-platform app compiles, native device features, responsive wrappers.',
    level: 'Proficient',
    pct: 75,
    icon: Icons.mobile,
    glow: 'from-violet-500/20 to-purple-600/20'
  },

  // PROGRAMMING LANGUAGES
  {
    name: 'Java (OOP & Patterns)',
    category: 'languages',
    desc: 'Expertise in OOP design principles, abstraction, interfaces, polymorphism, and algorithms.',
    level: 'Expert',
    pct: 92,
    icon: Icons.java,
    glow: 'from-red-500/20 to-amber-600/20'
  },
  {
    name: 'Problem Solving (C++)',
    category: 'languages',
    desc: 'Strong algorithmic mindset with solutions on competitive coding platforms.',
    level: 'Advanced',
    pct: 88,
    icon: Icons.problemsolving,
    glow: 'from-yellow-400/20 to-orange-500/20'
  },
  {
    name: 'Data Structures & Algorithms',
    category: 'languages',
    desc: 'Proficient in trees, graphs, sorting, searching, caching, and time complexity analysis.',
    level: 'Advanced',
    pct: 85,
    icon: Icons.dsa,
    glow: 'from-emerald-500/20 to-blue-500/20'
  },
  {
    name: 'Python',
    category: 'languages',
    desc: 'Automation, data parsing, machine learning scripts, and back-end integration.',
    level: 'Advanced',
    pct: 85,
    icon: Icons.python,
    glow: 'from-yellow-500/20 to-green-500/20'
  },
  {
    name: 'C/C++',
    category: 'languages',
    desc: 'Low-level memory management, pointers, fast performance execution routines.',
    level: 'Proficient',
    pct: 80,
    icon: Icons.cpp,
    glow: 'from-blue-600/20 to-cyan-500/20'
  },
  {
    name: 'Data Analysis (Excel / Python)',
    category: 'languages',
    desc: 'Data transformations, charts generation, stats, formulas, and pandas/numpy scripts.',
    level: 'Proficient',
    pct: 80,
    icon: Icons.dataanalysis,
    glow: 'from-emerald-500/20 to-teal-400/20'
  },

  // TOOLS & SYSTEMS
  {
    name: 'Git & GitHub',
    category: 'tools',
    desc: 'Branch management, pull requests, version logs, conflict resolutions, and CI setups.',
    level: 'Expert',
    pct: 90,
    icon: Icons.git,
    glow: 'from-orange-600/20 to-rose-500/20'
  },
  {
    name: 'MySQL',
    category: 'tools',
    desc: 'Relational data modeling, indexing, foreign keys, database joins, and speed profiling.',
    level: 'Advanced',
    pct: 88,
    icon: Icons.mysql,
    glow: 'from-blue-500/20 to-indigo-600/20'
  },
  {
    name: 'Software Testing & QA',
    category: 'tools',
    desc: 'Unit testing, API validations, responsive validation, manual and automated QA tests.',
    level: 'Proficient',
    pct: 80,
    icon: Icons.testing,
    glow: 'from-teal-500/20 to-emerald-600/20'
  },
  {
    name: 'Vercel & Netlify',
    category: 'tools',
    desc: 'Continuous cloud deployment, custom domain routes, serverless functions setup.',
    level: 'Advanced',
    pct: 90,
    icon: Icons.vercel,
    glow: 'from-neutral-200/20 to-neutral-400/10'
  }
];

const SkillsShowcase = () => {
  const webSkills = skillsData.filter((s) => s.category === 'web');
  const langSkills = skillsData.filter((s) => s.category === 'languages');
  const toolSkills = skillsData.filter((s) => s.category === 'tools');

  // Helper to ensure enough duplication for continuous loop
  const duplicate = (arr) => {
    if (arr.length < 8) {
      return [...arr, ...arr, ...arr, ...arr, ...arr, ...arr];
    }
    return [...arr, ...arr, ...arr, ...arr];
  };

  const renderMarqueeRow = (skills, direction = 'left', duration = '25s') => {
    const animatedClass = direction === 'left' ? 'animate-marquee' : 'animate-marquee-reverse';
    const items = duplicate(skills);
    return (
      <div className="relative w-full overflow-hidden flex items-center py-2 md:py-3">
        <div 
          className={`flex items-center ${animatedClass} whitespace-nowrap hover:[animation-play-state:paused]`}
          style={{ animationDuration: duration }}
        >
          {items.map((skill, idx) => (
            <div
              key={idx}
              className="inline-flex items-center gap-4 bg-white/5 border border-white/10 rounded-2xl px-6 py-3.5 hover:border-white/20 hover:bg-white/10 transition-all duration-300 backdrop-blur-md shadow-lg group select-none cursor-default mx-3 relative overflow-hidden min-w-[220px]"
            >
              {/* Custom hover glow */}
              <div className={`absolute -right-6 -top-6 w-16 h-16 rounded-full bg-gradient-to-br ${skill.glow} blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none`} />
              
              <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white/70 group-hover:text-white group-hover:bg-white/10 group-hover:scale-110 transition-all duration-500 flex-shrink-0 relative z-10">
                {skill.icon}
              </div>
              <div className="text-left relative z-10">
                <span className="text-[9px] uppercase font-bold tracking-widest text-white/40 block font-satoshi">
                  {skill.level}
                </span>
                <span className="text-sm font-bold text-white font-syne group-hover:text-white transition-colors font-semibold">
                  {skill.name}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <section id="skills" className="bg-black py-20 px-4 relative z-20 overflow-hidden border-b border-white/10">
      {/* Decorative ambient background glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-indigo-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 0.5, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-[11px] uppercase tracking-widest text-white/50 mb-3 font-semibold font-satoshi"
          >
            Technical Stack
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold tracking-tight text-white font-syne"
          >
            Skills & Expertise
          </motion.h2>
        </div>

        {/* Interactive Marquees Container */}
        <div className="relative space-y-4 md:space-y-6 mt-8">
          {/* Gradient Fade Overlays */}
          <div className="absolute left-0 top-0 bottom-0 w-20 md:w-32 bg-gradient-to-r from-black via-black/75 to-transparent pointer-events-none z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-20 md:w-32 bg-gradient-to-l from-black via-black/75 to-transparent pointer-events-none z-10" />

          {/* Row 1: Web Dev (Left) - 32 items */}
          {renderMarqueeRow(webSkills, 'left', '25s')}

          {/* Row 2: Languages & DSA (Right) - 36 items (duration scaled to match speed) */}
          {renderMarqueeRow(langSkills, 'right', '28.125s')}

          {/* Row 3: Tools & Systems (Left) - 24 items (duration scaled to match speed) */}
          {renderMarqueeRow(toolSkills, 'left', '18.75s')}
        </div>
      </div>
    </section>
  );
};

export default SkillsShowcase;
