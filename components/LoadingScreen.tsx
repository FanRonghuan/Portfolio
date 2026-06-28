import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import SplitText from './SplitText';

interface LoadingScreenProps {
  onComplete: () => void;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete }) => {
  useEffect(() => {
    const duration = 2000;

    const completeTimeout = setTimeout(() => {
      onComplete();
    }, duration + 500);

    return () => {
      clearTimeout(completeTimeout);
    };
  }, [onComplete]);

  const particles = Array.from({ length: 20 }).map((_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 4 + 1,
    duration: Math.random() * 2 + 3,
  }));

  return (
    <motion.div
      className="fixed inset-0 z-[9999] bg-white flex flex-col items-center justify-center overflow-hidden"
      exit={{ y: '-100%' }}
      transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
    >
      <div className="absolute inset-0 pointer-events-none">
        {particles.map((p) => (
          <motion.div
            key={p.id}
            className="absolute bg-gray-200 rounded-full opacity-50"
            style={{
              left: `${p.x}%`,
              top: `${p.y}%`,
              width: p.size,
              height: p.size,
            }}
            animate={{
              y: [0, -50, 0],
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
              duration: p.duration,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>

      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="relative flex flex-col items-center gap-10 px-6">
          <div className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-gradient-to-r from-transparent via-black/10 to-transparent" />
          <div className="absolute left-1/2 top-1/2 h-36 w-36 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-100/40 blur-3xl" />

          <SplitText
            tag="h1"
            text="HELLO,IT'S ROH.F"
            className="relative text-4xl md:text-7xl font-space-grotesk font-bold tracking-[-0.04em] md:tracking-[-0.02em] text-[#111827] uppercase"
            delay={70}
            duration={1.05}
            ease="power3.out"
            from={{ opacity: 0, y: 42, filter: 'blur(10px)', rotateX: -75 }}
            to={{ opacity: 1, y: 0, filter: 'blur(0px)', rotateX: 0 }}
            textAlign="center"
          />
        </div>
      </div>
    </motion.div>
  );
};

export default LoadingScreen;
