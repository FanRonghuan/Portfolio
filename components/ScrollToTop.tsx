import React, { useState } from 'react';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';
import LiquidIconButton from './LiquidIconButton';

const ScrollToTop: React.FC = () => {
  const { scrollY } = useScroll();
  const [isVisible, setIsVisible] = useState(false);

  useMotionValueEvent(scrollY, 'change', (latest) => {
    setIsVisible(latest > 500);
  });

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial="hidden"
          animate="idle"
          whileHover="hover"
          whileTap="tap"
          exit="hidden"
          variants={{
            hidden: {
              opacity: 0,
              scale: 0.5,
              y: 20,
              filter: 'blur(10px)',
            },
            idle: {
              opacity: 0.96,
              scale: 1,
              y: 0,
              filter: 'blur(0px)',
              transition: { duration: 0.5, ease: 'easeInOut' },
            },
            hover: {
              opacity: 1,
              scale: 1.12,
              y: 0,
              filter: 'blur(0px)',
              transition: { duration: 0.3, ease: 'easeOut' },
            },
            tap: { scale: 0.92, filter: 'blur(0px)' },
          }}
          className="fixed bottom-10 right-10 z-[100]"
        >
          <LiquidIconButton
            onClick={scrollToTop}
            className="h-16 w-16 text-black/90"
            glowClassName="bg-cyan-100/20"
            label="Scroll to top"
          >
            <svg
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M18 15l-6-6-6 6" />
            </svg>
          </LiquidIconButton>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ScrollToTop;
