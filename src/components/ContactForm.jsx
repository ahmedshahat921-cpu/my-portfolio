import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import emailjs from '@emailjs/browser';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Magnetic from './Magnetic';

gsap.registerPlugin(ScrollTrigger);

const ContactForm = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [sent, setSent]       = useState(false);
  const [sending, setSending] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    
    gsap.fromTo(el.querySelector('.contact-card'),
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
          toggleActions: 'play none none none',
        }
      }
    );
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim() || sending) return;

    // Strict regex email validation to prevent email bounce daemon errors
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email.trim())) {
      alert("Please enter a valid email address (e.g., name@example.com).");
      return;
    }

    setSending(true);

    const serviceId = 'service_eizu7i9';
    const templateId = 'template_rndpr8f';
    const publicKey = 'Y7IKBnlXv-XTK4mYB';

    const templateParams = {
      name: formData.name,
      from_name: formData.name,
      email: formData.email,
      reply_to: formData.email,
      message: formData.message,
    };

    emailjs.send(serviceId, templateId, templateParams, publicKey)
      .then((response) => {
        console.log('SUCCESS!', response.status, response.text);
        setSending(false);
        setSent(true);
        setFormData({ name: '', email: '', message: '' });
        setTimeout(() => setSent(false), 3500);
      })
      .catch((err) => {
        console.error('FAILED...', err);
        setSending(false);
        alert('Failed to send message. Please try again later or contact me via WhatsApp/Email directly.');
      });
  };

  return (
    <section 
      ref={sectionRef}
      id="contact" 
      className="bg-black py-16 md:py-24 px-4 md:px-8 lg:px-12 relative z-20 overflow-hidden"
    >
      {/* Ambient background glows */}
      <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-blue-500/5 rounded-full blur-[100px] pointer-events-none z-0" />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-indigo-500/5 rounded-full blur-[120px] pointer-events-none z-0" />

      {/* Main glassmorphic container */}
      <div className="max-w-5xl mx-auto contact-card relative z-10 bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-6 md:p-8 lg:p-10 shadow-2xl hover:border-white/15 transition-all duration-500">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Panel: Call Card, Email Card, Socials */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-6">
            
            {/* Call Card */}
            <div className="bg-white/5 border border-purple-500/20 hover:border-purple-500/40 rounded-2xl p-5 flex flex-col gap-4 transition-all duration-300 hover:shadow-[0_0_20px_rgba(168,85,247,0.15)] group">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center shadow-[0_0_10px_rgba(168,85,247,0.1)]">
                    <svg className="w-5 h-5 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                    </svg>
                  </div>
                  <span className="text-white font-syne font-bold text-sm tracking-wider uppercase">Call Us</span>
                </div>
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 text-[8px] font-bold tracking-widest uppercase" style={{ fontFamily: 'Satoshi, sans-serif' }}>
                  <span className="w-1 h-1 rounded-full bg-green-400 animate-pulse" />
                  Active Now
                </span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-white/40 text-[9px] uppercase font-bold tracking-widest" style={{ fontFamily: 'Satoshi, sans-serif' }}>Contact Phone</span>
                <a href="tel:01152012098" className="text-white hover:text-purple-400 font-syne font-semibold text-lg md:text-xl transition-colors duration-300 w-fit">
                  01152012098
                </a>
              </div>
            </div>

            {/* Email Card */}
            <div className="bg-white/5 border border-cyan-500/20 hover:border-cyan-500/40 rounded-2xl p-5 flex flex-col gap-4 transition-all duration-300 hover:shadow-[0_0_20px_rgba(6,182,212,0.15)] group">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center shadow-[0_0_10px_rgba(6,182,212,0.1)]">
                  <svg className="w-5 h-5 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                    <rect width="20" height="16" x="2" y="4" rx="2" />
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                  </svg>
                </div>
                <span className="text-white font-syne font-bold text-sm tracking-wider uppercase">Email Us</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-white/40 text-[9px] uppercase font-bold tracking-widest" style={{ fontFamily: 'Satoshi, sans-serif' }}>General Inquiries</span>
                <a href="mailto:ahmedshahat921@gmail.com" className="text-white hover:text-cyan-400 font-syne font-semibold text-base md:text-lg break-all transition-colors duration-300 w-fit">
                  ahmedshahat921@gmail.com
                </a>
                <span className="text-white/30 text-[8px] uppercase tracking-widest font-bold mt-1" style={{ fontFamily: 'Satoshi, sans-serif' }}>Response within 12 Hours</span>
              </div>
            </div>

            {/* Social Icons row */}
            <div className="flex gap-3 px-1 mt-2">
              <Magnetic>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-11 h-11 rounded-xl bg-white/5 border border-white/10 hover:border-cyan-500/30 hover:shadow-[0_0_10px_rgba(6,182,212,0.15)] flex items-center justify-center text-white/50 hover:text-white hover:bg-white/10 transition-all duration-300"
                  aria-label="LinkedIn"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                  </svg>
                </a>
              </Magnetic>
              <Magnetic>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-11 h-11 rounded-xl bg-white/5 border border-white/10 hover:border-purple-500/30 hover:shadow-[0_0_10px_rgba(168,85,247,0.15)] flex items-center justify-center text-white/50 hover:text-white hover:bg-white/10 transition-all duration-300"
                  aria-label="Instagram"
                >
                  <svg className="w-4.5 h-4.5" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                  </svg>
                </a>
              </Magnetic>
              <Magnetic>
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-11 h-11 rounded-xl bg-white/5 border border-white/10 hover:border-blue-500/30 hover:shadow-[0_0_10px_rgba(59,130,246,0.15)] flex items-center justify-center text-white/50 hover:text-white hover:bg-white/10 transition-all duration-300"
                  aria-label="Facebook"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/>
                  </svg>
                </a>
              </Magnetic>
              <Magnetic>
                <a
                  href="https://wa.me/201152012098"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-11 h-11 rounded-xl bg-white/5 border border-white/10 hover:border-green-500/30 hover:shadow-[0_0_10px_rgba(34,197,94,0.15)] flex items-center justify-center text-white/50 hover:text-white hover:bg-white/10 transition-all duration-300"
                  aria-label="WhatsApp"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.006 5.284 5.292.001 11.784.001c3.148 0 6.106 1.228 8.327 3.454 2.222 2.226 3.443 5.187 3.44 8.34-.006 6.504-5.292 11.788-11.784 11.788-2.001 0-3.966-.51-5.713-1.48L0 24zm6.49-4.22c1.523.904 3.013 1.38 4.613 1.387 5.296.002 9.603-4.3 9.608-9.593.002-2.562-1.002-4.97-2.825-6.793C16.12 3.037 13.722 2.03 11.792 2.03c-5.293 0-9.605 4.3-9.608 9.599-.001 1.737.472 3.42 1.372 4.908l-.943 3.447 3.53-.926zm12.302-5.41c-.326-.162-1.924-.95-2.222-1.057-.297-.11-.514-.162-.73.162-.217.324-.838 1.056-1.027 1.274-.19.216-.379.243-.705.082-.326-.162-1.378-.508-2.625-1.622-.97-.866-1.936-1.815-2.26-.19-.324-.02-.5-.183-.66-.147-.146-.326-.378-.49-.567-.162-.19-.216-.324-.324-.54-.109-.217-.055-.407-.027-.57.027-.162.217-.513.324-.756.109-.243.162-.405.243-.567.082-.162.04-.324-.013-.486-.054-.162-.514-1.242-.704-1.702-.186-.447-.372-.387-.514-.394-.132-.007-.284-.008-.436-.008a.84.84 0 00-.608.283c-.207.227-.79.773-.79 1.885 0 1.112.808 2.186.92 2.338.11.152 1.59 2.43 3.85 3.407.537.233.957.372 1.284.476.54.172 1.03.148 1.417.09.431-.065 1.924-.787 2.195-1.547.27-.76.27-1.408.19-1.547-.08-.14-.298-.22-.623-.38z"/>
                  </svg>
                </a>
              </Magnetic>
            </div>
          </div>

          {/* Right Panel: Glassmorphic Message Composer */}
          <div className="lg:col-span-7 bg-zinc-950/40 border border-white/5 rounded-2xl p-6 md:p-8 flex flex-col justify-between">
            <h3 className="text-xl md:text-2xl font-bold text-white tracking-wide uppercase font-syne mb-6">
              Contact Us
            </h3>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              {/* Full Name */}
              <div className="flex flex-col gap-1.5">
                <label className="text-white/50 text-[10px] font-bold uppercase tracking-widest px-1" style={{ fontFamily: 'Satoshi, sans-serif' }}>
                  Your Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  disabled={sending}
                  required
                  placeholder="Name"
                  className="bg-transparent border border-purple-500/20 rounded-xl px-4 py-3 text-white placeholder:text-white/20 focus:outline-none focus:bg-zinc-950/80 focus:border-purple-500/60 focus:shadow-[0_0_15px_rgba(168,85,247,0.2)] transition-all duration-300 text-sm caret-purple-400 w-full"
                  style={{ fontFamily: 'Satoshi, sans-serif' }}
                />
              </div>

              {/* Email Address */}
              <div className="flex flex-col gap-1.5">
                <label className="text-white/50 text-[10px] font-bold uppercase tracking-widest px-1" style={{ fontFamily: 'Satoshi, sans-serif' }}>
                  Work Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  disabled={sending}
                  required
                  placeholder="Email Address"
                  className="bg-transparent border border-purple-500/20 rounded-xl px-4 py-3 text-white placeholder:text-white/20 focus:outline-none focus:bg-zinc-950/80 focus:border-purple-500/60 focus:shadow-[0_0_15px_rgba(168,85,247,0.2)] transition-all duration-300 text-sm caret-purple-400 w-full"
                  style={{ fontFamily: 'Satoshi, sans-serif' }}
                />
              </div>

              {/* Message */}
              <div className="flex flex-col gap-1.5">
                <label className="text-white/50 text-[10px] font-bold uppercase tracking-widest px-1" style={{ fontFamily: 'Satoshi, sans-serif' }}>
                  Your Message
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  disabled={sending}
                  required
                  rows={4}
                  placeholder="Your Message"
                  className="bg-transparent border border-purple-500/20 rounded-xl px-4 py-3 text-white placeholder:text-white/20 focus:outline-none focus:bg-zinc-950/80 focus:border-purple-500/60 focus:shadow-[0_0_15px_rgba(168,85,247,0.2)] transition-all duration-300 text-sm caret-purple-400 w-full resize-none"
                  style={{ fontFamily: 'Satoshi, sans-serif' }}
                />
              </div>

              {/* Action row / Alerts */}
              <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-3 min-h-[46px]">
                <div className="w-full sm:w-auto">
                  <AnimatePresence>
                    {sent && (
                      <motion.div
                        initial={{ y: -8, opacity: 0, scale: 0.96 }}
                        animate={{ y: 0,   opacity: 1, scale: 1 }}
                        exit={{   y: 8, opacity: 0, scale: 0.96 }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20 shadow-[0_0_15px_rgba(16,185,129,0.1)] text-emerald-400 text-[10px] font-bold uppercase tracking-widest w-full justify-center sm:w-auto"
                        style={{ fontFamily: 'Satoshi, sans-serif' }}
                      >
                        <span className="flex h-1.5 w-1.5 relative">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
                        </span>
                        Message Sent Successfully
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
                
                <button
                  type="submit"
                  disabled={sending || !formData.name.trim() || !formData.email.trim() || !formData.message.trim()}
                  className="w-full sm:w-auto bg-white text-black hover:bg-zinc-200 rounded-xl px-8 py-3.5 font-bold text-xs uppercase tracking-widest hover:scale-105 active:scale-95 transition-all duration-300 flex-shrink-0 disabled:opacity-50 disabled:scale-100 disabled:bg-white flex items-center justify-center gap-2 shadow-lg shadow-white/5"
                  style={{ fontFamily: 'Satoshi, sans-serif' }}
                >
                  {sending ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-black" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Sending...
                    </>
                  ) : (
                    "Send Message"
                  )}
                </button>
              </div>
            </form>
          </div>

        </div>
      </div>
    </section>
  );
};

export default ContactForm;
