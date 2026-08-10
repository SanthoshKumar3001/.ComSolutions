"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function ContactPage() {
  // --- STATE FOR THE CONTACT FORM ---
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // NEW: State to trigger the green checkmark success screen
  const [isSuccess, setIsSuccess] = useState(false);

  // --- STATE FOR THE CUSTOM CURSOR ---
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', updateMousePosition);
    return () => window.removeEventListener('mousemove', updateMousePosition);
  }, []);

  // --- FORM HANDLING FUNCTIONS ---
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); 
    setIsSubmitting(true);
    
    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: "f578352a-a50d-4132-8199-c638833e59ea", // <-- PASTE YOUR REAL KEY HERE
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          message: formData.message,
        }),
      });

      const result = await response.json();
      
      if (result.success) {
        // NEW: Show the checkmark UI instead of the browser alert
        setIsSuccess(true);
        setFormData({ name: '', email: '', subject: '', message: '' }); 
      } else {
        alert(`Failed to send: ${result.message}`);
      }
    } catch (error) {
      console.error(error);
      alert("Error sending message.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-neutral-900 text-white font-sans selection:bg-blue-500/30 relative overflow-hidden">
      
      {/* Custom Animated Cursor */}
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 rounded-full pointer-events-none z-50 hidden md:block shadow-lg bg-blue-600 mix-blend-screen"
        animate={{ x: mousePosition.x - 16, y: mousePosition.y - 16 }}
        transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      />

      {/* Subtle Background Glow */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-blue-600/10 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-purple-600/10 blur-[120px]" />
      </div>

      {/* RESTORED: max-w-7xl and px-6 */}
      <div className="relative z-10 flex flex-col min-h-screen max-w-[90rem] mx-auto px-6 lg:px-12 py-12">
        
        {/* Simple Navigation */}
        <nav className="w-full flex justify-between items-center mb-24">
          <Link href="/" className="flex items-center group">
            <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center mr-4 group-hover:bg-blue-600 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
              </svg>
            </div>
            <span className="font-bold tracking-tight text-lg text-gray-300 group-hover:text-white transition-colors">Back to Portfolio</span>
          </Link>
        </nav>

        {/* RESTORED: grid-cols-2 */}
        <main className="flex-grow grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Text & Details */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex flex-col lg:col-span-5"
          >
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6">
              Let&apos;s start a <br/>
              <span className="text-blue-500">conversation.</span>
            </h1>
            
            <p className="text-gray-400 text-lg max-w-md mb-12 leading-relaxed">
              Whether you need a complete digital campus, a high-converting retail environment, or custom enterprise software, our team is ready to engineer a solution tailored to your vision.
            </p>

            <div className="space-y-8">
              <div>
                <p className="text-sm uppercase tracking-widest text-gray-500 font-semibold mb-2">Location</p>
                <p className="text-xl font-medium">Tamil Nadu, India</p>
              </div>
              <div>
                <p className="text-sm uppercase tracking-widest text-gray-500 font-semibold mb-2">Direct Email</p>
                <a href="https://mail.google.com/mail/?view=cm&fs=1&to=dotcomsolutionss@gmail.com" target="_blank" rel="noopener noreferrer" className="text-xl font-medium hover:text-blue-400 transition-colors">dotcomsolutionss@gmail.com</a>
              </div>
              <div>
                <p className="text-sm uppercase tracking-widest text-gray-500 font-semibold mb-2">WhatsApp</p>
                <a href="https://wa.me/918940081358" target="_blank" rel="noopener noreferrer" className="text-xl font-medium hover:text-green-400 transition-colors block">
                  +91 89400 81358
                </a>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Contact Form OR Success State */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            whileHover={{ y: -8 }}
            className="bg-white/5 backdrop-blur-xl border border-white/10 p-8 md:p-12 rounded-3xl shadow-2xl flex flex-col justify-center min-h-[550px] transition-colors duration-500 hover:border-white/20 lg:col-span-7"
          >

            
            {/* Conditional Rendering: Show Success UI OR The Form */}
            {isSuccess ? (
              
              // --- THE SUCCESS UI ---
              <motion.div 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center text-center space-y-6"
              >
                {/* Thick Green Tick Mark */}
                <div className="w-24 h-24 bg-green-500/20 rounded-full flex items-center justify-center border-4 border-green-500 shadow-[0_0_30px_rgba(34,197,94,0.3)]">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={4}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                
                <div>
                  <h3 className="text-3xl font-bold text-white mb-3"> Message Sent</h3>
                  <p className="text-gray-400 max-w-xs mx-auto">Your inquiry has been successfully sent. We will review it and get back to you shortly.</p>
                </div>

                <button 
                  onClick={() => setIsSuccess(false)}
                  className="mt-4 text-blue-400 hover:text-blue-300 font-medium transition-colors"
                >
                  Send another message
                </button>
              </motion.div>

            ) : (

              // --- THE ORIGINAL FORM ---
              <form onSubmit={handleSubmit} className="flex flex-col space-y-6">
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="flex flex-col w-full space-y-2">
                    <label htmlFor="name" className="text-sm font-medium text-gray-400">Name</label>
                    <input 
                      type="text" 
                      id="name" 
                      value={formData.name}
                      onChange={handleChange}
                      required
                      placeholder="John Doe" 
                      className="bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 hover:border-blue-500/50 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 focus:shadow-[0_0_15px_rgba(59,130,246,0.5)] transition-all duration-300" 
                    />
                  </div>
                  <div className="flex flex-col w-full space-y-2">
                    <label htmlFor="email" className="text-sm font-medium text-gray-400">Email</label>
                    <input 
                      type="email" 
                      id="email" 
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="john@company.com" 
                      className="bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 hover:border-blue-500/50 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 focus:shadow-[0_0_15px_rgba(59,130,246,0.5)] transition-all duration-300" 
                    />
                  </div>
                </div>
                
                <div className="flex flex-col space-y-2">
                  <label htmlFor="subject" className="text-sm font-medium text-gray-400">Subject</label>
                  <input 
                    type="text" 
                    id="subject" 
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    placeholder="Project Inquiry" 
                    className="bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 hover:border-blue-500/50 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 focus:shadow-[0_0_15px_rgba(59,130,246,0.5)] transition-all duration-300" 
                  />
                </div>

                <div className="flex flex-col space-y-2">
                  <label htmlFor="message" className="text-sm font-medium text-gray-400">Message</label>
                  <textarea 
                    id="message" 
                    rows={5} 
                    value={formData.message}
                    onChange={handleChange}
                    required
                    placeholder="Tell me about your project..." 
                    className="bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 hover:border-blue-500/50 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 focus:shadow-[0_0_15px_rgba(59,130,246,0.5)] transition-all duration-300 resize-none"
                  ></textarea>
                </div>

                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full bg-blue-600 hover:bg-blue-700 hover:shadow-[0_0_20px_rgba(37,99,235,0.4)] text-white font-bold py-4 rounded-xl transition-all duration-300 mt-4 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            )}

          </motion.div>
        </main>
      </div>
    </div>
  );
}