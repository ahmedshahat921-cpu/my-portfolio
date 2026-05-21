/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const projectsData = [
  {
    id: 'teamup',
    title: 'TeamUp Platform',
    category: 'Full-Stack Web App',
    shortDesc: 'A comprehensive academic portal that digitizes and streamlines university graduation project selections, approvals, and collaboration.',
    longDesc: 'TeamUp solves the coordination and communication gap between students and professors. By providing a unified, real-time workspace, it completely eliminates traditional paperwork, double-bookings, and redundant project ideas.',
    challenge: 'University graduation projects were managed via offline paper forms, leading to massive coordination delays, duplicate project topics, and lack of direct communication channels between students and academic supervisors.',
    solution: 'We built a secure, real-time collaboration environment with automated booking validations, role-based workflows, and a public "Idea Vault" for supervisors to publish research opportunities.',
    vercelUrl: 'https://my-portfolio-two-iota-13.vercel.app',
    githubUrl: 'https://github.com/ahmedshahat921',
    techStack: ['React.js', 'Tailwind CSS', 'Supabase', 'PostgreSQL', 'Socket.io'],
    coverImage: '/ideaproject_teamup/img/Screenshot 2026-05-16 221008.png',
    screenshots: [
      '/ideaproject_teamup/img/Screenshot 2026-05-16 221008.png',
      '/ideaproject_teamup/img/Screenshot 2026-05-16 221141.png',
      '/ideaproject_teamup/img/Screenshot 2026-05-16 221303.png',
      '/ideaproject_teamup/img/Screenshot 2026-05-16 221314.png',
      '/ideaproject_teamup/img/Screenshot 2026-05-16 221525.png',
      '/ideaproject_teamup/img/Screenshot 2026-05-16 221229.png',
      '/ideaproject_teamup/img/Screenshot 2026-05-16 222019.png',
      '/ideaproject_teamup/img/Screenshot 2026-05-16 221756.png'
    ],
    features: [
      {
        title: 'Multi-Role RBAC Dashboards',
        desc: 'Implemented strict Role-Based Access Control securing specific dashboards, actions, and features for Admins, Professors, and Students.'
      },
      {
        title: 'Dynamic Filtering & Search',
        desc: 'Developed advanced real-time client-side filtering matching student academic departments (CS, IT, AI, CyberSecurity) and tech categories.'
      },
      {
        title: 'Intelligent Booking Constraints',
        desc: 'Engineered strict business validations on Postgres to block double-bookings and automate historical archiving of past projects.'
      },
      {
        title: 'WebSocket Real-time Sync',
        desc: 'Integrated real-time sockets to push instant join requests, approval alerts, and notifications directly to the user dashboard without page reloads.'
      }
    ],
    accentColor: 'from-violet-600 to-indigo-600',
    glowColor: 'shadow-violet-500/20'
  },
  {
    id: 'placeholder1',
    title: 'Smart Crop Health Analyzer',
    category: 'AI & Mobile Application',
    shortDesc: 'A computer vision crop health analyzer enabling farmers to detect crop diseases and suggest immediate treatments. Coming soon.',
    longDesc: 'Coming soon...',
    vercelUrl: '',
    githubUrl: '',
    techStack: ['React Native', 'Node.js', 'PyTorch', 'Supabase', 'PostgreSQL'],
    coverImage: '/wall2.webp',
    screenshots: [],
    features: [],
    accentColor: 'from-blue-600 to-cyan-600',
    glowColor: 'shadow-blue-500/20',
    isPlaceholder: true
  },
  {
    id: 'placeholder2',
    title: 'Islamic Remembrance App',
    category: 'Cross-Platform Mobile App',
    shortDesc: 'A lightweight daily remembrance (Azkar) application compatible with iOS and Android. Coming soon.',
    longDesc: 'Coming soon...',
    vercelUrl: '',
    githubUrl: '',
    techStack: ['HTML5', 'CSS3', 'JavaScript', 'Cordova'],
    coverImage: '/wall4.webp',
    screenshots: [],
    features: [],
    accentColor: 'from-emerald-600 to-teal-600',
    glowColor: 'shadow-emerald-500/20',
    isPlaceholder: true
  }
];

const ProjectsShowcase = () => {
  const [selectedProject, setSelectedProject] = useState(null);
  const [activeSlide, setActiveSlide] = useState(0);
  const [direction, setDirection] = useState(0);

  // Close modal on escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setSelectedProject(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Lock/unlock body scroll when modal is open
  useEffect(() => {
    if (selectedProject) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [selectedProject]);

  const slideVariants = {
    enter: (dir) => ({
      x: dir > 0 ? 300 : -300,
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1
    },
    exit: (dir) => ({
      x: dir < 0 ? 300 : -300,
      opacity: 0
    })
  };

  const handleNextSlide = (screenshots) => {
    setDirection(1);
    setActiveSlide((prev) => (prev + 1) % screenshots.length);
  };

  const handlePrevSlide = (screenshots) => {
    setDirection(-1);
    setActiveSlide((prev) => (prev - 1 + screenshots.length) % screenshots.length);
  };

  return (
    <section id="projects" className="bg-black py-16 md:py-24 px-4 md:px-8 lg:px-12 relative z-20 overflow-hidden">
      {/* Decorative dynamic ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 0.5, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-[11px] uppercase tracking-widest text-white/50 mb-3 font-semibold font-satoshi"
          >
            Showcase
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold tracking-tight text-white font-syne"
          >
            Featured Works
          </motion.h2>
        </div>

        {/* Project Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {projectsData.map((project, idx) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              onClick={() => {
                if (!project.isPlaceholder) {
                  setSelectedProject(project);
                  setActiveSlide(0);
                }
              }}
              className={`group relative overflow-hidden rounded-3xl bg-white/5 border border-white/10 ${
                project.isPlaceholder ? 'cursor-not-allowed opacity-60' : 'cursor-pointer hover:border-white/20'
              } transition-all duration-500 flex flex-col h-[420px] shadow-lg hover:${project.glowColor}`}
            >
              {/* Cover Image Wrapper */}
              <div className="h-52 w-full overflow-hidden relative">
                <img
                  src={project.coverImage}
                  alt={project.title}
                  className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-80" />

                {/* Accent Gradient Glow overlay */}
                <div className={`absolute inset-0 bg-gradient-to-br ${project.accentColor} opacity-0 group-hover:opacity-20 transition-opacity duration-700`} />
              </div>

              {/* Text / Metadata */}
              <div className="p-6 md:p-8 flex flex-col justify-between flex-1 relative z-10">
                <div>
                  <span className="text-[10px] font-bold tracking-widest uppercase text-white/40 mb-2 block font-satoshi">
                    {project.category}
                  </span>
                  <h3 className="text-xl font-bold text-white mb-3 font-syne group-hover:text-white transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-white/50 text-sm leading-relaxed line-clamp-3 font-satoshi">
                    {project.shortDesc}
                  </p>
                </div>

                {/* Footer of the card */}
                <div className="mt-4 flex justify-between items-center">
                  {/* Tech stack names (limit to first 3) */}
                  <div className="flex gap-1.5 flex-wrap">
                    {project.techStack.slice(0, 3).map((tech) => (
                      <span key={tech} className="text-[9px] uppercase font-semibold text-white/40 bg-white/5 px-2.5 py-1 rounded-full border border-white/5">
                        {tech}
                      </span>
                    ))}
                    {project.techStack.length > 3 && (
                      <span className="text-[9px] uppercase font-semibold text-white/30 bg-white/5 px-2.5 py-1 rounded-full border border-white/5">
                        +{project.techStack.length - 3}
                      </span>
                    )}
                  </div>

                  {!project.isPlaceholder && (
                    <span className="w-9 h-9 rounded-full bg-white/5 border border-white/10 group-hover:bg-white group-hover:text-black flex items-center justify-center text-white/70 transition-all duration-300 transform group-hover:translate-x-1">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <line x1="5" y1="12" x2="19" y2="12" />
                        <polyline points="12 5 19 12 12 19" />
                      </svg>
                    </span>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Full-Screen Case Study Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 bg-black/95 backdrop-blur-2xl overflow-y-auto"
          >
            {/* Modal Container */}
            <motion.div
              initial={{ scale: 0.9, y: 50, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.9, y: 50, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 220 }}
              className="bg-zinc-950 border border-white/10 w-full max-w-6xl rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row max-h-[90vh] md:max-h-[85vh] relative"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-5 right-5 z-40 bg-black/60 hover:bg-white text-white hover:text-black w-10 h-10 rounded-full flex items-center justify-center border border-white/10 hover:border-white transition-colors duration-300 focus:outline-none"
                aria-label="Close modal"
              >
                <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>

              {/* LEFT COLUMN: Screenshot Carousel (cinematic look) */}
              <div className="w-full md:w-3/5 bg-black flex flex-col relative h-[300px] md:h-auto min-h-[300px] md:min-h-0 border-b md:border-b-0 md:border-r border-white/10 justify-between">
                {selectedProject.screenshots && selectedProject.screenshots.length > 0 ? (
                  <>
                    {/* Main Image Slider */}
                    <div className="relative flex-1 flex items-center justify-center overflow-hidden p-4 group/slider">
                      <AnimatePresence initial={false} custom={direction} mode="wait">
                        <motion.img
                          key={activeSlide}
                          custom={direction}
                          variants={slideVariants}
                          initial="enter"
                          animate="center"
                          exit="exit"
                          transition={{
                            x: { type: 'spring', stiffness: 300, damping: 30 },
                            opacity: { duration: 0.2 }
                          }}
                          src={selectedProject.screenshots[activeSlide]}
                          alt={`${selectedProject.title} slide ${activeSlide + 1}`}
                          className="max-w-full max-h-[40vh] md:max-h-[50vh] object-contain rounded-xl shadow-2xl"
                        />
                      </AnimatePresence>

                      {/* Navigation Arrows */}
                      <button
                        onClick={() => handlePrevSlide(selectedProject.screenshots)}
                        className="absolute left-4 bg-zinc-900/80 hover:bg-white text-white hover:text-black w-10 h-10 rounded-full flex items-center justify-center border border-white/10 transition-all opacity-0 group-hover/slider:opacity-100 focus:opacity-100"
                        aria-label="Previous screenshot"
                      >
                        <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                          <polyline points="15 18 9 12 15 6" />
                        </svg>
                      </button>
                      <button
                        onClick={() => handleNextSlide(selectedProject.screenshots)}
                        className="absolute right-4 bg-zinc-900/80 hover:bg-white text-white hover:text-black w-10 h-10 rounded-full flex items-center justify-center border border-white/10 transition-all opacity-0 group-hover/slider:opacity-100 focus:opacity-100"
                        aria-label="Next screenshot"
                      >
                        <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                          <polyline points="9 18 15 12 9 6" />
                        </svg>
                      </button>
                    </div>

                    {/* Horizontal Thumbnail Dock */}
                    <div className="p-4 bg-zinc-950/80 border-t border-white/5 overflow-x-auto no-scrollbar flex gap-2 justify-center">
                      {selectedProject.screenshots.map((shot, idx) => (
                        <button
                          key={idx}
                          onClick={() => {
                            setDirection(idx > activeSlide ? 1 : -1);
                            setActiveSlide(idx);
                          }}
                          className={`w-14 h-9 rounded-md overflow-hidden border transition-all flex-shrink-0 ${
                            activeSlide === idx ? 'border-white scale-105 shadow-md shadow-white/10' : 'border-white/10 hover:border-white/40'
                          }`}
                        >
                          <img src={shot} className="w-full h-full object-cover object-top" alt={`Thumbnail ${idx + 1}`} />
                        </button>
                      ))}
                    </div>
                  </>
                ) : (
                  <div className="flex-1 flex items-center justify-center text-white/30 text-sm font-satoshi">
                    No screenshots available
                  </div>
                )}
              </div>

              {/* RIGHT COLUMN: Case Study details */}
              <div className="w-full md:w-2/5 p-6 md:p-10 overflow-y-auto max-h-[50vh] md:max-h-full">
                <div className="mb-6">
                  <span className="text-[10px] font-bold tracking-widest uppercase text-white/40 mb-1.5 block font-satoshi">
                    {selectedProject.category}
                  </span>
                  <h3 className="text-2xl md:text-3xl font-bold text-white mb-4 font-syne">
                    {selectedProject.title}
                  </h3>

                  {/* Tech stack badges */}
                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {selectedProject.techStack.map((tech) => (
                      <span key={tech} className="text-[9px] uppercase font-bold text-white/60 bg-white/5 px-2.5 py-1.5 rounded-full border border-white/5">
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Overview */}
                  <div className="mb-6 font-satoshi">
                    <h4 className="text-xs uppercase font-bold tracking-wider text-white/40 mb-2">Overview</h4>
                    <p className="text-white/80 text-sm leading-relaxed">{selectedProject.longDesc}</p>
                  </div>

                  {/* Challenge & Solution */}
                  <div className="grid grid-cols-1 gap-4 mb-6 font-satoshi">
                    <div className="bg-red-500/5 border border-red-500/10 rounded-2xl p-4">
                      <h4 className="text-xs uppercase font-bold tracking-wider text-red-400 mb-1.5">The Challenge</h4>
                      <p className="text-white/70 text-xs leading-relaxed">{selectedProject.challenge}</p>
                    </div>
                    <div className="bg-emerald-500/5 border border-emerald-500/10 rounded-2xl p-4">
                      <h4 className="text-xs uppercase font-bold tracking-wider text-emerald-400 mb-1.5">The Solution</h4>
                      <p className="text-white/70 text-xs leading-relaxed">{selectedProject.solution}</p>
                    </div>
                  </div>

                  {/* Key Features */}
                  {selectedProject.features && selectedProject.features.length > 0 && (
                    <div className="mb-8 font-satoshi">
                      <h4 className="text-xs uppercase font-bold tracking-wider text-white/40 mb-3">Key Implementations</h4>
                      <div className="space-y-3">
                        {selectedProject.features.map((feat) => (
                          <div key={feat.title} className="bg-white/5 border border-white/10 rounded-2xl p-4 hover:border-white/20 transition-all">
                            <h5 className="text-xs font-bold text-white mb-1">{feat.title}</h5>
                            <p className="text-white/50 text-xs leading-relaxed">{feat.desc}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Project Call to Action buttons */}
                  <div className="flex gap-3 mt-4">
                    {selectedProject.vercelUrl && (
                      <a
                        href={selectedProject.vercelUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3.5 bg-white text-black font-bold text-xs uppercase tracking-wider rounded-full hover:scale-103 hover:bg-white/90 active:scale-97 transition-all duration-200"
                        style={{ fontFamily: 'Satoshi, sans-serif' }}
                      >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                          <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                          <polyline points="15 3 21 3 21 9" />
                          <line x1="10" y1="14" x2="21" y2="3" />
                        </svg>
                        Live Demo
                      </a>
                    )}
                    {selectedProject.githubUrl && (
                      <a
                        href={selectedProject.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3.5 bg-white/5 hover:bg-white/10 text-white font-bold text-xs uppercase tracking-wider rounded-full border border-white/10 hover:border-white/25 active:scale-97 transition-all duration-200"
                        style={{ fontFamily: 'Satoshi, sans-serif' }}
                      >
                        <svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24">
                          <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482C19.138 20.193 22 16.44 22 12.017 22 6.484 17.522 2 12 2z" />
                        </svg>
                        Source Code
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default ProjectsShowcase;
