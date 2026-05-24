import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import emailjs from '@emailjs/browser';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

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
      className="bg-black py-16 md:py-24 px-4 md:px-8 lg:px-12 relative z-20 overflow-hidden"
    >
      {/* Decorative glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-indigo-500/5 rounded-full blur-[120px] pointer-events-none z-0" />

      <div className="max-w-3xl mx-auto contact-card relative z-10 bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-6 md:p-10 shadow-xl hover:shadow-indigo-500/5 hover:border-white/20 transition-all duration-500">
        <div className="text-center mb-8">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] font-bold uppercase tracking-widest text-white/50 mb-3" style={{ fontFamily: 'Satoshi, sans-serif' }}>
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse" />
            Connect
          </span>
          <h2 
            className="text-3xl md:text-4xl font-bold text-white tracking-wide"
            style={{ fontFamily: 'Syne, sans-serif' }}
          >
            Let's Start a Conversation
          </h2>
          <p 
            className="text-white/60 text-sm md:text-base mt-2 max-w-lg mx-auto"
            style={{ fontFamily: 'Satoshi, sans-serif' }}
          >
            Have a project in mind or want to say hello? Send a message directly to my inbox!
          </p>
        </div>

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
    </section>
  );
};

export default ContactForm;
