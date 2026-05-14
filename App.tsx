
import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Navbar from './components/Navbar';
import Hero from './sections/Hero';
import Profile from './sections/Profile';
import Skills from './sections/Skills';
import VinylProjects from './sections/VinylProjects';
import Contact from './sections/Contact';
import LoadingScreen from './components/LoadingScreen';
import ScrollToTop from './components/ScrollToTop';

const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);

  // Global Smooth Scroll Handler
  useEffect(() => {
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest('a');
      
      if (anchor && anchor.hash && anchor.hash.startsWith('#') && anchor.origin === window.location.origin) {
        e.preventDefault();
        const elementId = anchor.hash.substring(1);
        const element = document.getElementById(elementId);
        
        if (element) {
          const offset = 80; // Navbar height offset
          const bodyRect = document.body.getBoundingClientRect().top;
          const elementRect = element.getBoundingClientRect().top;
          const elementPosition = elementRect - bodyRect;
          const offsetPosition = elementPosition - offset;

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      }
    };

    document.addEventListener('click', handleAnchorClick);
    return () => document.removeEventListener('click', handleAnchorClick);
  }, []);

  return (
    <div className="bg-black min-h-screen text-white selection:bg-white selection:text-black relative">
      <AnimatePresence mode="wait">
        {isLoading && (
          <LoadingScreen onComplete={() => {
              setIsLoading(false);
          }} />
        )}
      </AnimatePresence>

      {!isLoading && (
        <>
          <Navbar />
          <main className="relative w-full">
            {/* 
              Z-INDEX STRATEGY:
              Increasing z-index for each section ensures the next section
              always sits conceptually "on top" of the previous one as it enters the viewport,
              preventing click-blocking or visual clipping issues.
            */}
            
            <div id="hero" className="relative z-10">
              <Hero />
            </div>
            
            <div id="experience" className="relative z-20">
                <Profile />
            </div>
            
            <div id="capabilities" className="relative z-30">
                <Skills />
            </div>
            
            {/* Projects follows immediately, higher z-index to interact properly */}
            <div id="projects" className="relative z-40">
                <VinylProjects />
            </div>
            
            {/* New Contact Section */}
            <div id="contact" className="relative z-50">
                <Contact />
            </div>
          </main>
          
          <ScrollToTop />

          <motion.footer 
            id="contact-footer" 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            viewport={{ once: true, margin: "-50px" }}
            className="relative z-[60] py-32 bg-black border-t border-white/5 flex flex-col items-center justify-center overflow-hidden"
          >
             {/* 
                🟢 CREATIVE DARK FOOTER 
                Large minimalist text with a subtle glow and the signature chalk figure
             */}
             <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-white/5 blur-[120px] rounded-full" />
             </div>

             <div className="relative z-10 flex flex-col items-center gap-12">
                <motion.div 
                    initial={{ y: 40, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ duration: 1, delay: 0.2 }}
                    className="flex flex-col items-center"
                >
                    <h2 className="text-[12vw] md:text-[10vw] font-albert-black leading-none tracking-tighter text-white/10 select-none">
                        LET'S TALK
                    </h2>
                    <div className="mt-[-4vw] flex flex-col items-center gap-4">
                        <p className="text-white/40 font-albert-light tracking-[0.5em] uppercase text-sm md:text-base">Available for new projects</p>
                        <a 
                            href="mailto:rachel.ahua7@gmail.com" 
                            className="text-white hover:text-white/70 transition-colors font-albert-black text-2xl md:text-4xl tracking-tight border-b border-white/20 pb-2"
                        >
                            rachel.ahua7@gmail.com
                        </a>
                    </div>
                </motion.div>

                <div 
                    className="opacity-30 grayscale hover:grayscale-0 transition-all duration-700 hover:opacity-100"
                    style={{
                        transform: "rotateX(40deg) rotateZ(-10deg) scale(0.4)", 
                        transformStyle: "preserve-3d",
                        perspective: "800px"
                    }}
                >
                    <svg width="300" height="400" viewBox="0 0 240 360" fill="none" xmlns="http://www.w3.org/2000/svg">
                         <defs>
                            <filter id="chalk-roughness-footer">
                                <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" result="noise" />
                                <feDisplacementMap in="SourceGraphic" in2="noise" scale="3" xChannelSelector="R" yChannelSelector="G" />
                            </filter>
                         </defs>

                         <path
                            d="M120 20 C140 20 155 35 155 55 C155 70 145 80 135 85 L170 95 L220 50 L230 60 L180 110 L185 210 L230 340 L200 350 L120 270 L40 350 L10 340 L55 210 L60 110 L10 60 L20 50 L70 95 L105 85 C95 80 85 70 85 55 C85 35 100 20 120 20 Z"
                            stroke="white"
                            strokeWidth="3"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            fill="transparent"
                            filter="url(#chalk-roughness-footer)"
                            opacity="0.8"
                        />
                        
                        <path
                            d="M120 20 C140 20 155 35 155 55 C155 70 145 80 135 85 L170 95 L220 50 L230 60 L180 110 L185 210 L230 340 L200 350 L120 270 L40 350 L10 340 L55 210 L60 110 L10 60 L20 50 L70 95 L105 85 C95 80 85 70 85 55 C85 35 100 20 120 20 Z"
                            stroke="white"
                            strokeWidth="1"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            fill="transparent"
                            opacity="0.4"
                            filter="url(#chalk-roughness-footer)"
                        />
                    </svg>
                </div>

                <div className="flex gap-8 text-white/30 font-mono text-xs tracking-widest uppercase mt-8">
                    <a href="#" className="hover:text-white transition-colors">Instagram</a>
                    <a href="#" className="hover:text-white transition-colors">Behance</a>
                    <a href="#" className="hover:text-white transition-colors">Dribbble</a>
                </div>
                
                <p className="text-white/20 font-mono text-[10px] mt-12 uppercase tracking-tighter">
                    © 2026 GLEI PORTFOLIO • ALL RIGHTS RESERVED
                </p>
             </div>
          </motion.footer>
        </>
      )}
    </div>
  );
};

export default App;
