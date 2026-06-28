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
import DecryptedText from './components/DecryptedText';
import './components/DecryptedText.css';

const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest('a');

      if (anchor && anchor.hash && anchor.hash.startsWith('#') && anchor.origin === window.location.origin) {
        e.preventDefault();
        const elementId = anchor.hash.substring(1);
        const element = document.getElementById(elementId);

        if (element) {
          const offset = 80;
          const bodyRect = document.body.getBoundingClientRect().top;
          const elementRect = element.getBoundingClientRect().top;
          const elementPosition = elementRect - bodyRect;
          const offsetPosition = elementPosition - offset;

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth',
          });
        }
      }
    };

    document.addEventListener('click', handleAnchorClick);
    return () => document.removeEventListener('click', handleAnchorClick);
  }, []);

  return (
    <div className="bg-space-black min-h-screen text-text-primary selection:bg-neon-cyan selection:text-space-black relative">
      <AnimatePresence mode="wait">
        {isLoading && (
          <LoadingScreen
            onComplete={() => {
              setIsLoading(false);
            }}
          />
        )}
      </AnimatePresence>

      {!isLoading && (
        <>
          <Navbar />
          <main className="relative w-full">
            <div id="hero" className="relative z-10">
              <Hero />
            </div>

            <div id="experience" className="relative z-20">
              <Profile />
            </div>

            <div id="capabilities" className="relative z-30">
              <Skills />
            </div>

            <div id="projects" className="relative z-40">
              <VinylProjects />
            </div>

            <div id="contact" className="relative z-50">
              <Contact />
            </div>
          </main>

          <ScrollToTop />

          <motion.footer
            id="contact-footer"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1.5, ease: 'easeOut' }}
            viewport={{ once: true, margin: '-50px' }}
            className="relative z-[60] py-32 bg-black flex flex-col items-center justify-center overflow-hidden"
          >
            <div className="absolute inset-0 bg-black z-0" />
            <div className="relative z-10 flex flex-col items-center gap-12">
              <motion.div
                initial={{ y: 40, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 1, delay: 0.2 }}
                className="flex flex-col items-center"
              >
                <h2 className="text-[12vw] md:text-[10vw] font-albert-black leading-none tracking-tighter text-white/10 select-none">
                  LET&apos;S TALK
                </h2>
                <div className="mt-[-4vw] flex flex-col items-center gap-4">
                  <p className="text-white/45 font-albert-light tracking-[0.5em] uppercase text-sm md:text-base">
                    LOOK FORWARD TO YOUR CALL
                  </p>
                  <a
                    href="mailto:1973886674@qq.com"
                    className="font-albert-black text-2xl md:text-4xl tracking-tight text-white border-b border-white/20 pb-2"
                  >
                    <DecryptedText
                      text="1973886674@qq.com"
                      speed={36}
                      sequential={true}
                      revealDirection="center"
                      className="nav-decrypt"
                      encryptedClassName="nav-decrypt-encrypted"
                    />
                  </a>
                </div>
              </motion.div>

              <div className="flex gap-8 text-white/30 font-mono text-xs tracking-widest uppercase mt-8">
                <a href="#" className="hover:text-white transition-colors">
                  Instagram
                </a>
                <a href="#" className="hover:text-white transition-colors">
                  Behance
                </a>
                <a href="#" className="hover:text-white transition-colors">
                  Dribbble
                </a>
              </div>

              <p className="text-white/20 font-mono text-[10px] mt-12 uppercase tracking-tighter">
                漏 2026 AURELIA PORTFOLIO 鈥?ALL RIGHTS RESERVED
              </p>
            </div>
          </motion.footer>
        </>
      )}
    </div>
  );
};

export default App;
