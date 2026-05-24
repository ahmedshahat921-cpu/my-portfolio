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
      className="bg-black py-16 md:py-24 px-6 md:px-12 lg:px-16 relative z-20 overflow-hidden"
    >
      {/* Decorative glows */}
      <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-blue-500/5 rounded-full blur-[100px] pointer-events-none z-0" />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-indigo-500/5 rounded-full blur-[120px] pointer-events-none z-0" />

      <div className="max-w-6xl mx-auto contact-card relative z-10 bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-8 md:p-12 shadow-2xl hover:shadow-indigo-500/5 hover:border-white/15 transition-all duration-500">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 md:gap-16">
          
          {/* Left Side: Contact details and Socials */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] font-bold uppercase tracking-widest text-white/50 mb-4" style={{ fontFamily: 'Satoshi, sans-serif' }}>
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse" />
                Contact Info
              </span>
              <h2 
                className="text-3xl md:text-4xl lg:text-5xl font-bold text-white tracking-wide uppercase font-syne mb-6"
                style={{ fontFamily: 'Syne, sans-serif' }}
              >
                Let's Start a Conversation
              </h2>
              <p 
                className="text-white/60 text-sm md:text-base leading-relaxed mb-8 max-w-md"
                style={{ fontFamily: 'Satoshi, sans-serif' }}
              >
                Have an idea, project, or opportunity you'd like to discuss? Feel free to reach out directly through the form, or use any of the channels below.
              </p>
            </div>

            {/* Direct Links */}
            <div className="flex flex-col gap-5 mb-8 md:mb-12">
              <a
                href="mailto:ahmedshahat921@gmail.com"
                className="flex items-center gap-3.5 text-white/65 hover:text-white transition-colors duration-300 group text-sm md:text-base w-fit"
                style={{ fontFamily: 'Satoshi, sans-serif' }}
              >
                <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/40 group-hover:text-white group-hover:bg-white/10 transition-all duration-300">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <rect width="20" height="16" x="2" y="4" rx="2" />
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                  </svg>
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] text-white/30 uppercase font-bold tracking-widest">Email</span>
                  <span className="font-semibold tracking-wide">ahmedshahat921@gmail.com</span>
                </div>
              </a>

              <a
                href="tel:01152012098"
                className="flex items-center gap-3.5 text-white/65 hover:text-white transition-colors duration-300 group text-sm md:text-base w-fit"
                style={{ fontFamily: 'Satoshi, sans-serif' }}
              >
                <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/40 group-hover:text-white group-hover:bg-white/10 transition-all duration-300">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] text-white/30 uppercase font-bold tracking-widest">Phone</span>
                  <span className="font-semibold tracking-wide">01152012098</span>
                </div>
              </a>

              <a
                href="https://wa.me/201152012098"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3.5 text-white/65 hover:text-white transition-colors duration-300 group text-sm md:text-base w-fit"
                style={{ fontFamily: 'Satoshi, sans-serif' }}
              >
                <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/40 group-hover:text-emerald-400 group-hover:bg-emerald-500/10 group-hover:border-emerald-500/20 transition-all duration-300">
                  <svg className="w-4.5 h-4.5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.006 5.284 5.292.001 11.784.001c3.148 0 6.106 1.228 8.327 3.454 2.222 2.226 3.443 5.187 3.44 8.34-.006 6.504-5.292 11.788-11.784 11.788-2.001 0-3.966-.51-5.713-1.48L0 24zm6.49-4.22c1.523.904 3.013 1.38 4.613 1.387 5.296.002 9.603-4.3 9.608-9.593.002-2.562-1.002-4.97-2.825-6.793C16.12 3.037 13.722 2.03 11.792 2.03c-5.293 0-9.605 4.3-9.608 9.599-.001 1.737.472 3.42 1.372 4.908l-.943 3.447 3.53-.926zm12.302-5.41c-.326-.162-1.924-.95-2.222-1.057-.297-.11-.514-.162-.73.162-.217.324-.838 1.056-1.027 1.274-.19.216-.379.243-.705.082-.326-.162-1.378-.508-2.625-1.622-.97-.866-1.936-1.815-2.26-.19-.324-.02-.5-.183-.66-.147-.146-.326-.378-.49-.567-.162-.19-.216-.324-.324-.54-.109-.217-.055-.407-.027-.57.027-.162.217-.513.324-.756.109-.243.162-.405.243-.567.082-.162.04-.324-.013-.486-.054-.162-.514-1.242-.704-1.702-.186-.447-.372-.387-.514-.394-.132-.007-.284-.008-.436-.008a.84.84 0 00-.608.283c-.207.227-.79.773-.79 1.885 0 1.112.808 2.186.92 2.338.11.152 1.59 2.43 3.85 3.407.537.233.957.372 1.284.476.54.172 1.03.148 1.417.09.431-.065 1.924-.787 2.195-1.547.27-.76.27-1.408.19-1.547-.08-.14-.298-.22-.623-.38z"/>
                  </svg>
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] text-white/30 uppercase font-bold tracking-widest">WhatsApp</span>
                  <span className="font-semibold tracking-wide text-green-400">Message on WhatsApp</span>
                </div>
              </a>
            </div>

            {/* Social Icons */}
            <div className="flex gap-4">
              {/* LinkedIn */}
              <Magnetic>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/50 hover:text-white hover:bg-white/10 hover:border-white/30 hover:shadow-lg hover:shadow-white/5 hover:scale-105 active:scale-95 transition-all duration-300 group"
                  aria-label="LinkedIn"
                >
                  <svg className="w-4.5 h-4.5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                  </svg>
                </a>
              </Magnetic>
              {/* Instagram */}
              <Magnetic>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/50 hover:text-white hover:bg-white/10 hover:border-white/30 hover:shadow-lg hover:shadow-white/5 hover:scale-105 active:scale-95 transition-all duration-300 group"
                  aria-label="Instagram"
                >
                  <svg className="w-4.5 h-4.5" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                  </svg>
                </a>
              </Magnetic>
              {/* Facebook */}
              <Magnetic>
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/50 hover:text-white hover:bg-white/10 hover:border-white/30 hover:shadow-lg hover:shadow-white/5 hover:scale-105 active:scale-95 transition-all duration-300 group"
                  aria-label="Facebook"
                >
                  <svg className="w-4.5 h-4.5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/>
                  </svg>
                </a>
              </Magnetic>
            </div>
          </div>

          {/* Right Side: Message form */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-white/50 text-[10px] font-bold uppercase tracking-widest px-1" style={{ fontFamily: 'Satoshi, sans-serif' }}>Your Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    disabled={sending}
                    required
                    placeholder="What should I call you?"
                    className="bg-white/5 border border-white/10 rounded-2xl px-5 py-3.5 text-white placeholder:text-white/20 focus:outline-none focus:bg-zinc-950/80 focus:border-indigo-500/50 focus:shadow-[0_0_20px_rgba(99,102,241,0.2)] transition-all duration-300 text-sm disabled:opacity-50 caret-indigo-400"
                    style={{ fontFamily: 'Satoshi, sans-serif' }}
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-white/50 text-[10px] font-bold uppercase tracking-widest px-1" style={{ fontFamily: 'Satoshi, sans-serif' }}>Your Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    disabled={sending}
                    required
                    placeholder="Where should I reply?"
                    className="bg-white/5 border border-white/10 rounded-2xl px-5 py-3.5 text-white placeholder:text-white/20 focus:outline-none focus:bg-zinc-950/80 focus:border-indigo-500/50 focus:shadow-[0_0_20px_rgba(99,102,241,0.2)] transition-all duration-300 text-sm disabled:opacity-50 caret-indigo-400"
                    style={{ fontFamily: 'Satoshi, sans-serif' }}
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-white/50 text-[10px] font-bold uppercase tracking-widest px-1" style={{ fontFamily: 'Satoshi, sans-serif' }}>Your Message</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  disabled={sending}
                  required
                  rows={5}
                  placeholder="Tell me about your project, idea, or questions..."
                  className="bg-white/5 border border-white/10 rounded-2xl px-5 py-3.5 w-full text-white placeholder:text-white/20 focus:outline-none focus:bg-zinc-950/80 focus:border-indigo-500/50 focus:shadow-[0_0_20px_rgba(99,102,241,0.2)] transition-all duration-300 text-sm disabled:opacity-50 caret-indigo-400 resize-none"
                  style={{ fontFamily: 'Satoshi, sans-serif' }}
                />
              </div>

              <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-2 min-h-[46px]">
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
                  className="w-full sm:w-auto bg-white text-black hover:bg-zinc-200 rounded-full px-8 py-3.5 font-bold text-sm hover:scale-105 active:scale-95 transition-all duration-300 flex-shrink-0 disabled:opacity-50 disabled:scale-100 disabled:bg-white flex items-center justify-center gap-2 shadow-lg shadow-white/5"
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
