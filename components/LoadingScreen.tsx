
import React, { useEffect } from 'react';
import { motion } from 'framer-motion';

interface LoadingScreenProps {
  onComplete: () => void;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete }) => {
  // Timer logic for loading duration
  useEffect(() => {
    const duration = 2000; // 2 seconds animation time
    
    const completeTimeout = setTimeout(() => {
      onComplete();
    }, duration + 500); // 2.5s total time before unmount

    return () => {
      clearTimeout(completeTimeout);
    };
  }, [onComplete]);

  // Particle Generation (Keeping background atmosphere)
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
      exit={{ y: "-100%" }}
      transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }} 
    >
        {/* Background Particles */}
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
                        opacity: [0.2, 0.5, 0.2]
                    }}
                    transition={{
                        duration: p.duration,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                />
            ))}
        </div>

        {/* 简约开屏文本：替换原先的插画为中心文本 FRH. */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <motion.h1
            className="text-4xl md:text-6xl font-bold text-black tracking-tight"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          >
            FRH.
          </motion.h1>
        </div>

        {/* REMOVED: Progress Bar, Counter, and Loading Text */}
    </motion.div>
  );
};

export default LoadingScreen;
