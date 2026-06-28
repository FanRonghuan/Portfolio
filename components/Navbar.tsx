import React, { useRef, useState } from 'react';
import { motion, useScroll, useMotionValueEvent, useMotionValue, useMotionTemplate } from 'framer-motion';
import Magnetic from './Magnetic';
import DecryptedText from './DecryptedText';
import './DecryptedText.css';

const SpotlightLink: React.FC<{
  text: string;
  href: string;
  isScrolled: boolean;
  onClick?: (e: React.MouseEvent) => void;
}> = ({ text, href, isScrolled, onClick }) => {
  const ref = useRef<HTMLAnchorElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const gradientBg = useMotionTemplate`radial-gradient(100px circle at ${mouseX}px ${mouseY}px, ${isScrolled ? 'rgba(0,0,0,0.05)' : 'rgba(255,255,255,0.1)'}, transparent 40%)`;

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  return (
    <Magnetic>
      <motion.a
        ref={ref}
        href={href}
        onClick={onClick}
        onMouseMove={handleMouseMove}
        className={`relative block cursor-pointer overflow-hidden rounded-lg px-4 py-2 text-[10px] font-bold tracking-widest transition-colors duration-500 ${isScrolled ? 'text-gray-600' : 'text-white/70'}`}
        whileHover={{ opacity: 1, color: isScrolled ? '#000000' : '#FFFFFF' }}
      >
        <motion.div
          className="pointer-events-none absolute -inset-px opacity-0 transition duration-300 group-hover:opacity-100"
          style={{ background: gradientBg }}
        />
        <span className="relative z-10 block">
          <DecryptedText
            text={text}
            speed={36}
            sequential={true}
            revealDirection="center"
            className="nav-decrypt"
            encryptedClassName="nav-decrypt-encrypted"
          />
        </span>
      </motion.a>
    </Magnetic>
  );
};

const Navbar: React.FC = () => {
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);

  useMotionValueEvent(scrollY, 'change', (latest) => {
    const shouldBeScrolled = latest > 300;
    if (isScrolled !== shouldBeScrolled) {
      setIsScrolled(shouldBeScrolled);
    }
  });

  const navLinks = [
    { name: 'ABOUT ME', id: '#experience' },
    { name: 'CAPABILITIES', id: '#capabilities' },
    { name: 'PROJECTS', id: '#projects-deck' },
  ];

  const handleScroll = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    const element = document.querySelector(id);
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
  };

  return (
    <motion.nav
      className="pointer-events-none fixed left-0 top-0 z-50 flex w-full items-center justify-between px-8 py-6 transition-all duration-500"
      initial={{ opacity: 1 }}
      animate={{
        backgroundColor: isScrolled ? 'rgba(255,255,255,0.01)' : 'transparent',
      }}
    >
      <div
        className="pointer-events-none absolute inset-0 z-[-1] transition-all duration-500"
        style={{
          opacity: isScrolled ? 0.2 : 1,
          backdropFilter: isScrolled ? 'blur(8px)' : 'blur(0px)',
        }}
      />

      <div
        className="pointer-events-auto flex w-full items-center justify-between transition-all duration-500"
        style={{ opacity: isScrolled ? 0.2 : 1 }}
        onMouseEnter={(e) => {
          e.currentTarget.style.opacity = '1';
        }}
        onMouseLeave={(e) => {
          if (isScrolled) e.currentTarget.style.opacity = '0.2';
        }}
      >
        <div className="flex items-center">
          <Magnetic strength={20}>
            <div className="font-albert-black text-xl tracking-tighter text-white/90">ROH.F</div>
          </Magnetic>
        </div>

        <div className="flex items-center space-x-4">
          {navLinks.map((link) => (
            <SpotlightLink
              key={link.name}
              text={link.name}
              href={link.id}
              isScrolled={isScrolled}
              onClick={(e) => handleScroll(e, link.id)}
            />
          ))}

          <Magnetic>
            <motion.a
              href="#contact"
              onClick={(e) => handleScroll(e, '#contact')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`ml-4 block rounded-full border px-6 py-2 text-[10px] font-bold tracking-widest backdrop-blur-md transition-all ${isScrolled ? 'border-black/10 bg-white/30 text-gray-600 hover:bg-white/50 hover:text-black' : 'border-white/20 bg-white/10 text-white/70 hover:bg-white/20 hover:text-white'}`}
            >
              <span>
                <DecryptedText
                  text="CONTACT"
                  speed={36}
                  sequential={true}
                  revealDirection="center"
                  className="nav-decrypt"
                  encryptedClassName="nav-decrypt-encrypted"
                />
              </span>
            </motion.a>
          </Magnetic>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
