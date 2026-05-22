import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const certificates = [
  {
    title: 'Introduction to Data Analytics',
    issuer: 'Simplilearn SkillUp',
    date: 'September 8, 2025',
    code: '8938822',
    image: '/assets/certificates/simplilearn_data_analytics.jpg',
    glow: 'from-orange-500/30 to-amber-500/10',
    borderColor: 'group-hover:border-orange-500/30',
    description: 'Covers core data analysis methodologies, descriptive statistics, visualization techniques, and quantitative decision-making frameworks.'
  },
  {
    title: 'Academic Excellence & Progress (1st Semester)',
    issuer: 'Arab Academy for Science, Technology & Maritime Transport (AASTMT)',
    date: 'Academic Year 2024-2025',
    code: 'Dean\'s List Recognition',
    image: '/assets/certificates/aastmt_excellence_first_semester.jpg',
    glow: 'from-blue-500/30 to-indigo-500/10',
    borderColor: 'group-hover:border-blue-500/30',
    description: 'Awarded by the College Dean of Computing and Information Technology in recognition of outstanding academic performance and GPA standing.'
  },
  {
    title: 'Academic Excellence & Progress (2nd Semester)',
    issuer: 'Arab Academy for Science, Technology & Maritime Transport (AASTMT)',
    date: 'Academic Year 2024-2025',
    code: 'Dean\'s List Recognition',
    image: '/assets/certificates/aastmt_excellence_second_semester.jpg',
    glow: 'from-blue-500/30 to-indigo-500/10',
    borderColor: 'group-hover:border-blue-500/30',
    description: 'Awarded by the College Dean of Computing and Information Technology for exceptional scholastic progress in the Computer Science department.'
  }
];

const CertificationsShowcase = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const openLightbox = (index) => {
    setCurrentIndex(index);
    setModalOpen(true);
  };

  const closeLightbox = () => {
    setModalOpen(false);
  };

  const handleNext = (e) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev + 1) % certificates.length);
  };

  const handlePrev = (e) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev - 1 + certificates.length) % certificates.length);
  };

  return (
    <section id="certificates" className="bg-black py-20 px-4 md:px-8 lg:px-12 relative z-20 overflow-hidden border-b border-white/10">
      {/* Background glow effects */}
      <div className="absolute top-1/2 left-1/3 w-[600px] h-[300px] bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-[400px] h-[200px] bg-orange-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] font-bold uppercase tracking-widest text-white/50 mb-3" style={{ fontFamily: 'Satoshi, sans-serif' }}>
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-orange-400">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
            Achievements
          </span>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white font-syne uppercase">
            Certificates
          </h2>
          <p className="text-white/50 text-sm mt-3 max-w-lg mx-auto font-satoshi">
            Academic milestones and specialized certifications verifying technical expertise and continuous learning.
          </p>
        </div>

        {/* Certificates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {certificates.map((cert, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              onClick={() => openLightbox(index)}
              className={`group relative overflow-hidden rounded-3xl bg-white/5 backdrop-blur-md border border-white/10 hover:border-white/20 p-5 flex flex-col justify-between h-[420px] transition-all duration-500 cursor-pointer hover:shadow-2xl hover:-translate-y-1.5`}
            >
              {/* Brand glow behind card */}
              <div className={`absolute -inset-px bg-gradient-to-br ${cert.glow} opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-xl pointer-events-none`} />

              {/* Certificate Image Thumbnail Box */}
              <div className="relative w-full h-[180px] rounded-2xl overflow-hidden bg-black/40 border border-white/5 flex items-center justify-center">
                <img
                  src={cert.image}
                  alt={cert.title}
                  className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
                />
                
                {/* Expand Overlay */}
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2">
                  <div className="w-10 h-10 rounded-full bg-white text-black flex items-center justify-center shadow-lg transform translate-y-2 group-hover:translate-y-0 transition-all duration-300 delay-75">
                    <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                      <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
                    </svg>
                  </div>
                  <span className="text-xs text-white font-bold tracking-wider font-satoshi uppercase">View Large</span>
                </div>
              </div>

              {/* Info Details */}
              <div className="mt-4 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] text-white/40 uppercase tracking-widest font-bold font-satoshi">
                      {cert.issuer}
                    </span>
                    <span className="text-[9px] text-white/55 font-bold uppercase tracking-wider font-satoshi px-2 py-0.5 rounded bg-white/5 border border-white/10">
                      {cert.date}
                    </span>
                  </div>
                  
                  <h3 className="text-md font-bold text-white font-syne line-clamp-2 leading-tight group-hover:text-white transition-colors">
                    {cert.title}
                  </h3>
                  
                  <p className="text-white/60 text-xs mt-2 line-clamp-3 leading-relaxed font-satoshi">
                    {cert.description}
                  </p>
                </div>

                <div className="border-t border-white/5 pt-3 mt-4 flex items-center justify-between">
                  <span className="text-[9px] text-white/30 uppercase tracking-widest font-bold font-satoshi">
                    ID: {cert.code}
                  </span>
                  <span className="text-[10px] text-white/70 font-bold uppercase tracking-widest font-satoshi flex items-center gap-1 group-hover:text-white transition-colors">
                    Expand
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="transform group-hover:translate-x-0.5 transition-transform">
                      <polyline points="9 18 15 12 9 6" />
                    </svg>
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {modalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeLightbox}
            className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-xl flex items-center justify-center p-4 select-none cursor-zoom-out"
          >
            {/* Top Bar with Title and Close Button */}
            <div className="absolute top-0 inset-x-0 p-4 md:p-6 flex items-center justify-between z-50 bg-gradient-to-b from-black/80 to-transparent">
              <div className="text-left max-w-xl">
                <span className="text-[9px] text-white/40 uppercase tracking-widest font-bold font-satoshi block">
                  {certificates[currentIndex].issuer} · {certificates[currentIndex].date}
                </span>
                <h4 className="text-sm md:text-lg font-bold text-white font-syne truncate">
                  {certificates[currentIndex].title}
                </h4>
              </div>
              
              <button
                onClick={closeLightbox}
                className="w-10 h-10 rounded-full bg-white/5 border border-white/10 text-white hover:bg-white/10 hover:border-white/20 transition-all flex items-center justify-center cursor-pointer"
                aria-label="Close"
              >
                <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Main Lightbox Content */}
            <div className="relative w-full max-w-5xl max-h-[80vh] flex items-center justify-center" onClick={(e) => e.stopPropagation()}>
              
              {/* Previous Button */}
              <button
                onClick={handlePrev}
                className="absolute left-2 md:-left-16 w-11 h-11 md:w-14 md:h-14 rounded-full bg-white/5 border border-white/10 text-white hover:bg-white/10 hover:border-white/25 transition-all flex items-center justify-center z-50 cursor-pointer"
                aria-label="Previous"
              >
                <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path d="M15 19l-7-7 7-7" />
                </svg>
              </button>

              {/* Certificate Image Frame */}
              <motion.div
                key={currentIndex}
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                className="relative overflow-hidden rounded-2xl border border-white/10 shadow-2xl max-w-full max-h-[70vh] bg-zinc-950 flex items-center justify-center"
              >
                <img
                  src={certificates[currentIndex].image}
                  alt={certificates[currentIndex].title}
                  className="max-w-full max-h-[70vh] object-contain select-none pointer-events-none"
                />
              </motion.div>

              {/* Next Button */}
              <button
                onClick={handleNext}
                className="absolute right-2 md:-right-16 w-11 h-11 md:w-14 md:h-14 rounded-full bg-white/5 border border-white/10 text-white hover:bg-white/10 hover:border-white/25 transition-all flex items-center justify-center z-50 cursor-pointer"
                aria-label="Next"
              >
                <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>

            {/* Bottom Caption Info */}
            <div className="absolute bottom-4 inset-x-0 text-center text-white/50 text-xs px-6 py-2">
              <span className="font-satoshi font-semibold tracking-wider">
                {currentIndex + 1} / {certificates.length}
              </span>
              <p className="max-w-md mx-auto mt-1 text-[11px] leading-relaxed hidden md:block">
                {certificates[currentIndex].description}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default CertificationsShowcase;
