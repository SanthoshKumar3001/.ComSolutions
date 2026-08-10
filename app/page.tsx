"use client";
import React, { useState, useEffect } from 'react';
import { motion, Variants } from 'framer-motion';
import Image from "next/image";
import Link from 'next/link';

export default function PortfolioHome() {
  // Updated state to reflect the new structure: 'projects' vs 'products'
  const [section, setSection] = useState('projects'); 
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isContactOpen, setIsContactOpen] = useState(false);

  // --- NEW: FLIP CARD STATE & TEAM DATA ---
  const [flippedCards, setFlippedCards] = useState<{ [key: number]: boolean }>({});
  
  const handleCardFlip = (index: number) => {
    setFlippedCards(prev => ({ ...prev, [index]: !prev[index] }));
  };

  const teamMembers = [
    {
      name: "Vignesh Mariyappan",
      role: "Founder",
      image: "/founder.jpeg", 
      bio: "Coming together is a beginning. Keeping together is progress. Working together is success"
    },
    {
      name: "Santhosh Kumar",
      role: "Co-Founder",
      image: "/cofounder.jpeg",
      bio: "You have to let your team get all the credit for all the good stuff that happens, and you take responsibility for the bad stuff."
    },
    {
      name: "Sagesh",
      role: "Digital Partner",
      image: "/partner.jpeg",
      bio: "Bridging the gap between cutting-edge technology and intuitive user experiences."
    }
  ];
  // ----------------------------------------

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', updateMousePosition);
    return () => window.removeEventListener('mousemove', updateMousePosition);
  }, []);

  const isProjects = section === 'projects';

  const fadeUp: Variants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  return (
    <div className={`min-h-screen w-full relative transition-colors duration-700 font-sans ${isProjects ? 'text-white' : 'text-black'}`}>
      
      <motion.div
        className={`fixed top-0 left-0 w-8 h-8 rounded-full pointer-events-none z-50 hidden md:block shadow-lg ${isProjects ? 'bg-white' : 'bg-blue-600'}`}
        animate={{ x: mousePosition.x - 16, y: mousePosition.y - 16 }}
        transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      />
      
      <div className="fixed inset-0 z-[-1] transition-all duration-700">
        <div 
          className="absolute inset-0 bg-cover bg-bottom bg-no-repeat"
          style={{ backgroundImage: "url('/logo.jpeg')" }}
        />
        <div className={`absolute inset-0 bg-black/50 transition-opacity duration-700 ${isProjects ? 'opacity-100' : 'opacity-0'}`} />
        <div className={`absolute inset-0 bg-white/70 transition-opacity duration-700 ${!isProjects ? 'opacity-100' : 'opacity-0'}`} />
      </div>

      <div className="flex flex-col items-center w-full max-w-5xl mx-auto px-6 py-12">
        <nav className="w-full flex justify-between items-center mb-24 z-10">
          
          {/* Logo Section wrapped in a Link to Home */}
          <Link href="/" className="flex items-center group cursor-pointer">
            <Image 
              src="/logo.jpeg" 
              alt=".Com Solutions Logo" 
              width={60} 
              height={60} 
              className="object-contain rounded-xl shadow-lg border border-gray-500/20 group-hover:opacity-90 transition-opacity"
              priority
            />
            <span className="ml-4 font-bold tracking-tight text-xl hidden sm:block group-hover:text-blue-500 transition-colors">
              .Com Solutions
            </span>
          </Link>
        
          {/* Right Side: Toggles & Contact Link combined into ONE frosted pill */}
          <div className={`flex items-center gap-1 p-1 rounded-full backdrop-blur-md hidden md:flex ${isProjects ? 'bg-white/10 border border-white/5' : 'bg-white/50 border border-gray-300'}`}>
            
            <button
              onClick={() => setSection('projects')}
              className={`px-6 py-2 rounded-full transition-all duration-500 font-medium ${
                isProjects ? 'bg-white text-black shadow-lg' : 'text-gray-400 hover:text-white'
              }`}
            >
              Client Projects
            </button>
            
            <button
              onClick={() => setSection('products')}
              className={`px-6 py-2 rounded-full transition-all duration-500 font-medium ${
                !isProjects ? 'bg-blue-600 text-white shadow-lg' : 'text-gray-500 hover:text-black'
              }`}
            >
              Our Products
            </button>
            
            {/* Contact Link integrated directly into the pill container */}
            <Link 
              href="/contact" 
              className={`px-6 py-2 rounded-full transition-all duration-500 font-medium ${
                isProjects 
                  ? 'text-gray-400 hover:text-white hover:bg-white/10' 
                  : 'text-gray-500 hover:text-black hover:bg-black/5'
              }`}
            >
              Contact
            </Link>

          </div>
        </nav>
      </div> 

      <main className="max-w-7xl mx-auto px-8 pt-32 pb-20 flex flex-col items-center text-center relative z-10">
        
        <div className="overflow-hidden mb-6">
          <motion.h1 
            key={section}
            initial="hidden" 
            animate="visible" 
            variants={fadeUp}
            className="text-6xl md:text-8xl font-bold leading-tight tracking-tight"
          >
            Digital experiences <br />
            <span className={isProjects ? 'italic font-light text-neutral-400' : 'text-blue-700 drop-shadow-sm'}>
              engineered for growth.
            </span>
          </motion.h1>
        </div>

        <motion.p
          key={`desc-${section}`}
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0, transition: { delay: 0.2, duration: 0.8 } }
          }}
          className={`text-xl max-w-2xl mb-12 ${isProjects ? 'text-gray-300' : 'text-black font-semibold'}`}
        >
          {isProjects
            ? "Building intuitive educational platforms and high-converting retail environments for modern businesses."
            : "Developing powerful, standalone desktop and web applications engineered to streamline workflows and automate complex tasks."}
        </motion.p>

        <a href="mailto:dotcomsolutionss@gmail.com">
          <motion.button
          onClick={() => setIsContactOpen(true)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={`px-10 py-5 rounded-full text-lg font-medium transition-colors ${
            isProjects 
              ? 'bg-white text-black hover:bg-neutral-200' 
              : 'bg-blue-600 text-white hover:bg-blue-700 shadow-lg'
          }`}
        >
          Build Your Project
        </motion.button>
        </a>

        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1 }}
          className="w-full mt-40"
        >
          <div className={`flex justify-between items-end mb-12 border-b pb-4 ${isProjects ? 'border-gray-500/30' : 'border-gray-400'}`}>
            <h2 className="text-4xl font-bold tracking-tight drop-shadow-sm">
              {isProjects ? 'Our Projects' : 'Our Products'}
            </h2>
            <p className={`text-sm uppercase tracking-widest ${isProjects ? 'text-gray-400' : 'text-black font-bold'}`}>2026</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* --- CLIENT PROJECTS TAB (Dark Theme) --- */}
            {isProjects && (
              <>
                <a href="https://vigneshvic200.github.io/QUANTUM/index.html" target="_blank" rel="noopener noreferrer" className="block">
                  <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }} whileHover={{ y: -8 }} className="group cursor-pointer flex flex-col h-full">
                    <div className="w-full h-96 bg-neutral-900/70 backdrop-blur-md border border-white/10 rounded-2xl mb-6 overflow-hidden relative shadow-lg">
                       <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10 flex flex-col items-center justify-center backdrop-blur-sm">
                          <span className="text-white font-bold tracking-wide border border-white/50 px-6 py-2 rounded-full mb-3 shadow-md">Visit Live Site</span>
                          <span className="text-gray-200 text-xs flex gap-2 font-semibold"><span>HTML</span> • <span>Tailwind</span> • <span>JS</span></span>
                       </div>
                       <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden rounded-2xl transition-transform duration-700 group-hover:scale-105 bg-white">
                          <iframe src="https://vigneshvic200.github.io/QUANTUM/index.html" title="QUANTUM Educational Institution" className="w-[120%] h-[120%] border-0 transform scale-[0.85] origin-top-left" scrolling="no" />
                       </div>
                    </div>
                    <h3 className="text-2xl font-bold mb-2 text-white drop-shadow-md">Quantum Educational Institution</h3>
                    <p className="text-gray-100 font-medium text-sm leading-relaxed mb-4 drop-shadow-md">A complete digital campus designed for a modern educational institute. Features structured course navigation, a dedicated faculty directory, and a streamlined admissions funnel.</p>
                  </motion.div>
                </a>

                <a href="https://vigneshvic200.github.io/RenoEngineering/projects.html" target="_blank" rel="noopener noreferrer" className="block">
                  <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }} whileHover={{ y: -8 }} className="group cursor-pointer flex flex-col h-full">
                    <div className="w-full h-96 bg-neutral-900/70 backdrop-blur-md border border-white/10 rounded-2xl mb-6 overflow-hidden relative shadow-lg">
                       <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10 flex flex-col items-center justify-center backdrop-blur-sm">
                          <span className="text-white font-bold tracking-wide border border-white/50 px-6 py-2 rounded-full mb-3 shadow-md">Visit Live Site</span>
                          <span className="text-gray-200 text-xs flex gap-2 font-semibold"><span>Engineering</span> • <span>Web Solutions</span></span>
                       </div>
                       <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden rounded-2xl transition-transform duration-700 group-hover:scale-105 bg-white">
                          <iframe src="https://vigneshvic200.github.io/RenoEngineering/projects.html" title="RenoEngineering" className="w-[120%] h-[120%] border-0 transform scale-[0.85] origin-top-left" scrolling="no" />
                       </div>
                    </div>
                    <h3 className="text-2xl font-bold mb-2 text-white drop-shadow-md">RenoEngineering</h3>
                    <p className="text-gray-100 font-medium text-sm leading-relaxed mb-4 drop-shadow-md">A professional engineering project web page showcasing structural and technical solutions.</p>
                  </motion.div>
                </a>

                <div className="block">
                  <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }} whileHover={{ y: -8 }} className="group cursor-pointer flex flex-col h-full opacity-80">
                    <div className="w-full h-96 bg-neutral-900/70 backdrop-blur-md border border-white/10 rounded-2xl mb-6 overflow-hidden relative shadow-lg flex items-center justify-center bg-neutral-950">
                       <div className="text-center p-6">
                          <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4 border border-white/10">
                            <span className="text-xl font-bold text-gray-400">03</span>
                          </div>
                          <p className="text-gray-300 font-semibold tracking-wider uppercase text-sm">Upcoming Project</p>
                          <p className="text-gray-500 text-xs mt-1">In Development / Coming Soon</p>
                       </div>
                    </div>
                    <h3 className="text-2xl font-bold mb-2 text-white drop-shadow-md">Upcoming Project </h3>
                    <p className="text-gray-100 font-medium text-sm leading-relaxed mb-4 drop-shadow-md">Next-generation enterprise architecture currently being engineered by our team.</p>
                  </motion.div>
                </div>

                <div className="block">
                  <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }} whileHover={{ y: -8 }} className="group cursor-pointer flex flex-col h-full opacity-80">
                    <div className="w-full h-96 bg-neutral-900/70 backdrop-blur-md border border-white/10 rounded-2xl mb-6 overflow-hidden relative shadow-lg flex items-center justify-center bg-neutral-950">
                       <div className="text-center p-6">
                          <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4 border border-white/10">
                            <span className="text-xl font-bold text-gray-400">04</span>
                          </div>
                          <p className="text-gray-300 font-semibold tracking-wider uppercase text-sm">Upcoming Project</p>
                          <p className="text-gray-500 text-xs mt-1">Planning Phase</p>
                       </div>
                    </div>
                    <h3 className="text-2xl font-bold mb-2 text-white drop-shadow-md">Upcoming Project 

                    </h3>
                    <p className="text-gray-100 font-medium text-sm leading-relaxed mb-4 drop-shadow-md">Future release planned for advanced digital infrastructure and automation.</p>
                  </motion.div>
                </div>
              </>
            )}

            {/* --- PRODUCTS TAB (Light Theme) --- */}
            {!isProjects && (
              <>
                {/* Application 1: Custom Screen Recorder */}
                <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }} whileHover={{ y: -8 }} className="group cursor-pointer flex flex-col h-full">
                  <div className="w-full h-96 bg-white/70 backdrop-blur-md border border-gray-300 rounded-2xl mb-6 overflow-hidden relative shadow-lg flex items-center justify-center p-8">
                     <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10 flex items-center justify-center backdrop-blur-sm">
                        <span className="text-white font-bold tracking-wide border border-white/50 px-6 py-2 rounded-full shadow-md">View Application</span>
                     </div>
                     
                     {/* --- LOGO IMAGE --- */}
                     <div className="relative w-[70%] h-[70%] transition-transform duration-700 group-hover:scale-105">
                         <Image 
                           src="/screen-recorder-logo.png" /* <-- REPLACE WITH YOUR ACTUAL FILE NAME */
                           alt="Custom Screen Recorder Logo"
                           fill
                           className="object-contain drop-shadow-xl"
                         />
                     </div>
                  </div>
                  <h3 className="text-2xl font-bold mb-2 text-black drop-shadow-md">Custom Screen Recorder</h3>
                  <p className="text-black font-semibold text-sm leading-relaxed mb-4 drop-shadow-md">An internal screen recording engine developed with Python and Eel. A screen recording tool with precise audio-video synchronization and streamline company data capture.</p>
                </motion.div>

                {/* Application 2: Desktop Lens */}
                <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5, delay: 0.1 }} whileHover={{ y: -8 }} className="group cursor-pointer flex flex-col h-full mt-0 md:mt-24">
                  <div className="w-full h-96 bg-white/70 backdrop-blur-md border border-gray-300 rounded-2xl mb-6 overflow-hidden relative shadow-lg flex items-center justify-center p-8">
                     <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10 flex items-center justify-center backdrop-blur-sm">
                        <span className="text-white font-bold tracking-wide border border-white/50 px-6 py-2 rounded-full shadow-md">View Application</span>
                     </div>
                     
                     {/* --- LOGO IMAGE --- */}
                     <div className="relative w-[70%] h-[70%] transition-transform duration-700 group-hover:scale-105">
                         <Image 
                           src="/desktop-lens-logo.ico" /* <-- REPLACE WITH YOUR ACTUAL FILE NAME */
                           alt="Desktop Lens Logo"
                           fill
                           className="object-contain drop-shadow-xl"
                         />
                     </div>
                  </div>
                  <h3 className="text-2xl font-bold mb-2 text-black drop-shadow-md">Desktop Lens</h3>
                  <p className="text-black font-semibold text-sm leading-relaxed mb-4 drop-shadow-md">A web-based tool designed to converts low-quality mobile photos of raw data into professional PDFs using auto-boundary detection and image-straightening algorithms.</p>
                </motion.div>

                 {/* Application 3: Video Downloader Pro */}
                <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5, delay: 0.2 }} whileHover={{ y: -8 }} className="group cursor-pointer flex flex-col h-full">
                  <div className="w-full h-96 bg-white/70 backdrop-blur-md border border-gray-300 rounded-2xl mb-6 overflow-hidden relative shadow-lg flex items-center justify-center p-8">
                     <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10 flex items-center justify-center backdrop-blur-sm">
                        <span className="text-white font-bold tracking-wide border border-white/50 px-6 py-2 rounded-full shadow-md">View Application</span>
                     </div>
                     
                     {/* --- LOGO IMAGE --- */}
                     <div className="relative w-[70%] h-[70%] transition-transform duration-700 group-hover:scale-105">
                         <Image 
                           src="/video-downloader-logo.ico" /* <-- REPLACE WITH YOUR ACTUAL FILE NAME */
                           alt="Video Downloader Pro Logo"
                           fill
                           className="object-contain drop-shadow-xl"
                         />
                     </div>
                  </div>
                  <h3 className="text-2xl font-bold mb-2 text-black drop-shadow-md">Video Downloader Pro</h3>
                  <p className="text-black font-semibold text-sm leading-relaxed mb-4 drop-shadow-md">A purpose-built application specifically designed for high-performance capturing and processing of live video streams and offline data extractions.</p>
                </motion.div>

                {/* Application 4: Launching Soon Placeholder */}
                <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5, delay: 0.3 }} whileHover={{ y: -8 }} className="group cursor-pointer flex flex-col h-full mt-0 md:mt-24">
                  <div className="w-full h-96 bg-white/40 backdrop-blur-md border-2 border-dashed border-gray-400 rounded-2xl mb-6 overflow-hidden relative shadow-sm flex items-center justify-center p-8">
                     <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10 flex items-center justify-center backdrop-blur-sm">
                        <span className="text-white font-bold tracking-wide border border-white/50 px-6 py-2 rounded-full shadow-md">Coming Soon</span>
                     </div>
                     
                     {/* Keep this as a text placeholder since it's unreleased, or replace with an icon */}
                     <div className="flex flex-col items-center justify-center text-center transition-transform duration-700 group-hover:scale-105 opacity-60">
                         <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center mb-4 border border-gray-400">
                            <span className="text-gray-700 font-bold tracking-widest text-lg">04</span>
                         </div>
                         <span className="font-mono text-sm tracking-widest uppercase mb-2 text-black font-bold">Launching Soon</span>
                     </div>
                  </div>
                  <h3 className="text-2xl font-bold mb-2 text-black drop-shadow-md">Upcoming Release</h3>
                  <p className="text-black font-semibold text-sm leading-relaxed mb-4 drop-shadow-md">Our next standalone application is currently in the engineering phase. Stay tuned for upcoming feature reveals and launch details.</p>
                </motion.div>
                
              </>
            )}

          </div>
        </motion.div>
      </main>

      {/* --- MEET THE TEAM SECTION (NEW FLIPPING CARDS) --- */}
      <section className={`w-full max-w-7xl mx-auto px-6 py-24 border-t mt-12 z-10 relative ${isProjects ? 'border-white/10' : 'border-gray-300'}`}>
        <div className="mb-16 text-center">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className={`text-4xl md:text-5xl font-bold mb-4 drop-shadow-sm ${isProjects ? 'text-white' : 'text-black'}`}
          >
            Meet The <span className="text-blue-500">Team</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className={`text-lg max-w-2xl mx-auto ${isProjects ? 'text-black-400' : 'text-black-600 font-medium'}`}
          >
            The minds behind .Com Solutions. We combine engineering excellence with digital strategy to bring your vision to life.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <div 
                key={index}
                className="group h-[420px] [perspective:1000px] cursor-pointer"
                onClick={() => handleCardFlip(index)}
              >
                <div className={`relative w-full h-full duration-700 [transform-style:preserve-3d] ${flippedCards[index] ? '[transform:rotateY(180deg)]' : ''}`}>
                  
                  {/* FRONT OF CARD */}
                  <div className="absolute inset-0 w-full h-full bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 shadow-2xl flex flex-col justify-between [backface-visibility:hidden]">
                    
                    {/* Top Role Badge (Placed in the top space) */}
                    <div className="flex justify-center mb-4">
                      <div className="bg-black/70 backdrop-blur-md border border-white/10 px-5 py-1.5 rounded-full shadow-lg">
                        <span className="text-xs font-bold tracking-wider text-blue-400 uppercase">{member.role}</span>
                      </div>
                    </div>
                    {/* Image Container with Conditional Scaling */}
                    <div className="flex-grow w-full rounded-2xl overflow-hidden relative">
                      <img 
                        src={member.image} 
                        alt={member.name} 
                        className={`w-full h-full object-contain grayscale group-hover:grayscale-0 transition-all duration-700 ${
                          index === 0 || index === 2 
                            ? 'scale-[1.20] group-hover:scale-[1.25]' // Boosts width for Vignesh & Sagesh
                            : 'scale-100 group-hover:scale-105'     // Keeps Santhosh at normal size
                        }`}
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = "https://via.placeholder.com/400x500/1f2937/4b5563?text=Photo+Coming+Soon";
                        }}
                      />
                    </div>

                    {/* Name at the Bottom */}
                    <div className="mt-4 text-center">
                      <h3 className={`text-2xl font-bold ${isProjects ? 'text-white' : 'text-black'}`}>{member.name}</h3>
                      <p className="text-xs text-gray-500 mt-1">Flip</p>
                    </div>
                  </div>

                  {/* BACK OF CARD */}
                  <div className="absolute inset-0 w-full h-full bg-neutral-900 border border-blue-500/30 rounded-3xl p-8 shadow-2xl flex flex-col justify-center text-center [transform:rotateY(180deg)] [backface-visibility:hidden]">
                    {/* Small Circular Profile Picture (High-Res) */}
                    <div className="w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden border-2 border-blue-500/30 shadow-[0_0_15px_rgba(59,130,246,0.2)] bg-neutral-800">
                      <Image 
                        src={member.image} 
                        alt={member.name} 
                        width={200} 
                        height={200} 
                        quality={100}
                        className="w-full h-full object-cover object-top"
                      />
                    </div>

                    <h3 className="text-2xl font-bold text-white mb-4">{member.name}</h3>

                    {/* CONDITIONAL BACK CONTENT: Sagesh gets Contact info, you & Santhosh get quotes */}
                    {index === 2 ? (
                      <div className="space-y-4">
                        <p className="text-gray-400 text-sm">Get in touch with our Digital Partner:</p>
                        <div className="bg-white/5 border border-white/10 rounded-xl p-3 text-sm text-blue-400">
                          📧 dotcomsolutionss@gmail.com
                        </div>
                        <div className="bg-white/5 border border-white/10 rounded-xl p-3 text-sm text-green-400">
                          📱 WhatsApp: +91 89400 81358
                        </div>
                      </div>
                    ) : (
                      <p className="text-gray-300 text-lg italic leading-relaxed px-4">
                        &ldquo;{member.bio}&rdquo;
                      </p>
                    )}

                    <span className="text-xs text-gray-500 mt-8 block">Flip back</span>
                  </div>

                </div>
              </div>
            ))}
          </div>
      </section>

      {/* --- NEW: INTERACTIVE CONTACT MODAL --- */}
      {isContactOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
          
          {/* Blur Background (clicking this closes the popup) */}
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            className="absolute inset-0 bg-black/60 backdrop-blur-md"
            onClick={() => setIsContactOpen(false)}
          />
          
          {/* The Actual Popup Card */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 20 }} 
            animate={{ opacity: 1, scale: 1, y: 0 }} 
            className="relative w-full max-w-lg bg-white rounded-3xl p-8 shadow-2xl z-10 flex flex-col"
          >
            {/* Close 'X' Button */}
            <button 
              onClick={() => setIsContactOpen(false)}
              className="absolute top-6 right-6 text-gray-400 hover:text-black transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            
            <h3 className="text-3xl font-bold text-black mb-2 tracking-tight">Let&apos;s build your dreams.</h3>
            <p className="text-gray-600 mb-8 font-medium">Ready to bring your vision to life? Reach out to us directly through any of the channels below.</p>
            
            <div className="space-y-4">
              
              {/* Email Button (Upgraded to Gmail Web Link) */}
              <a 
                href="https://mail.google.com/mail/?view=cm&fs=1&to=dotcomsolutionss@gmail.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex items-center gap-4 p-4 rounded-2xl bg-gray-50 hover:bg-blue-50 transition-colors border border-gray-100 group"
              >
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors shadow-sm">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm text-gray-500 font-semibold tracking-wide uppercase">Email Us</p>
                  <p className="text-black font-bold text-lg">dotcomsolutionss@gmail.com</p>
                </div>
              </a>

              {/* WhatsApp/Phone Button */}
              <a href="https://wa.me/918940081358" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 p-4 rounded-2xl bg-gray-50 hover:bg-green-50 transition-colors border border-gray-100 group">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center text-green-600 group-hover:bg-green-600 group-hover:text-white transition-colors shadow-sm">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm text-gray-500 font-semibold tracking-wide uppercase">Call or WhatsApp</p>
                  <p className="text-black font-bold text-lg">+91 8940081358</p>
                </div>
              </a>

            </div>
          </motion.div>
        </div>
      )}

    </div>
  );
}