import React, { useRef, useState } from 'react';
import { motion, useMotionValue, useScroll, useSpring, useTransform } from 'framer-motion';
import GLSLHills from '../components/GLSLHills';

const HERO_ACCENT = '#9EDBFF';
const HERO_ACCENT_DIM = '#79C8F2';

const HERO_SCALE = 0.86;
const DEPTHS = { TEXT: 10 };

const ImageRevealHeroTitle: React.FC = () => {
  const [isHovered, setIsHovered] = useState(false);
  return (
  <div className={`hero-title mx-auto flex max-w-[1100px] flex-col items-center px-5 text-center ${isHovered ? 'is-hovered' : ''}`}>
    <motion.div
      className="hero-title-kicker font-space-grotesk text-[clamp(2.2rem,5.4vw,5.7rem)] font-light italic leading-[0.95] tracking-[-0.045em] text-white/85"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
    >
      Welcome To
    </motion.div>
    <motion.div
      className="hero-title-main relative mt-1 flex items-center justify-center font-space-grotesk text-[clamp(3.3rem,9.5vw,10rem)] font-bold leading-[0.86] tracking-[-0.065em] text-white"
      initial={{ opacity: 0, y: 42 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.05, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.span
        className="hero-title-word mr-[0.08em]"
        animate={{ x: isHovered ? '-0.22em' : 0 }}
        transition={{ type: 'spring', stiffness: 180, damping: 16 }}
      >
        My
      </motion.span>
      <span className="hero-title-photo-slot relative h-0 w-0 shrink-0" aria-hidden="true" />
      <motion.span
        className="hero-title-word ml-[0.08em]"
        animate={{ x: isHovered ? '0.22em' : 0 }}
        transition={{ type: 'spring', stiffness: 180, damping: 16 }}
      >
        Portfolio
      </motion.span>
    </motion.div>
  </div>
  );
};

const PulsingSlogan: React.FC = () => (
  <div className="flex flex-col items-center gap-3 text-center">
    <div className="flex items-center gap-4 font-albert-light text-lg text-white/80 md:text-xl">
      <span className="tracking-widest">视觉叙事</span>
      <div
        className="h-1 w-1 rounded-full"
        style={{
          backgroundColor: HERO_ACCENT_DIM,
          boxShadow: '0 0 8px rgba(121, 200, 242, 0.3)',
        }}
      />
      <span className="tracking-widest">品牌表达</span>
      <div
        className="h-1 w-1 rounded-full"
        style={{
          backgroundColor: HERO_ACCENT_DIM,
          boxShadow: '0 0 8px rgba(121, 200, 242, 0.3)',
        }}
      />
      <span className="tracking-widest">AIGC 实验</span>
    </div>

    <p className="max-w-[760px] px-6 font-albert-light text-sm leading-relaxed text-white/54 md:text-[15px]">
      聚焦品牌视觉、电商内容与生成式设计实践，持续探索图像、动效与工具链之间的高效协同。
    </p>
  </div>
);

const Hero: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const floorY = useTransform(scrollYProgress, [0, 1], ['0%', '-40%']);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x, { stiffness: 40, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 40, damping: 20 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const w = window.innerWidth;
    const h = window.innerHeight;
    x.set(clientX / w - 0.5);
    y.set(clientY / h - 0.5);
  };

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['35deg', '20deg']);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-15deg', '15deg']);
  const translateX = useTransform(mouseXSpring, [-0.5, 0.5], ['-8%', '8%']);

  return (
    <section
      ref={containerRef}
      className="theme-hero-surface relative w-full overflow-hidden bg-black"
      onMouseMove={handleMouseMove}
      style={{ height: '112vh' }}
    >
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="hero-solid-backdrop absolute inset-0 bg-[#05070a]" />
        <GLSLHills className="z-[1] opacity-90" speed={0.26} opacity={0.5} />
        <div className="pointer-events-none absolute inset-0 z-[2] bg-gradient-to-b from-black/5 via-transparent to-black/35" />
      </div>

      <div className="hero-bottom-fade pointer-events-none absolute inset-0 z-[1] bg-gradient-to-b from-transparent from-50% via-black/20 via-75% to-black" />

      <motion.div
        className="sticky top-0 z-10 flex h-screen w-full items-center justify-center overflow-hidden will-change-transform"
      >
        <div className="absolute inset-0 flex items-center justify-center perspective-2000">
          <motion.div
            className="relative w-full max-w-[1400px] transform-gpu will-change-transform"
            style={{
              scale: HERO_SCALE,
              rotateX,
              rotateY,
              x: translateX,
              y: floorY,
              aspectRatio: '16/9',
              transformStyle: 'preserve-3d',
            }}
          >
            <div
              className="pointer-events-none absolute left-0 top-[24%] w-full text-center"
              style={{ transform: `translateZ(${DEPTHS.TEXT}px)` }}
            >
              <motion.div
                className="pointer-events-auto inline-block"
                initial={{ opacity: 0, y: 150 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
                viewport={{ once: true }}
              >
                <ImageRevealHeroTitle />
              </motion.div>

                            <motion.div
                                className="mt-8 flex flex-col items-center gap-5 drop-shadow-[0_0_15px_rgba(123,215,255,0.22)]"
                                initial={{ opacity: 0, y: 80 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 1.2, ease: 'easeOut', delay: 0.4 }}
                                viewport={{ once: true }}
                            >
                                <PulsingSlogan />

                                <div className="mt-2 flex items-center gap-4">
                  <div className="font-jetbrains-mono text-xs uppercase tracking-widest text-white/40 md:text-sm">
                    Visual Narrative
                  </div>
                  <div className="h-[1px] w-8" style={{ backgroundColor: 'rgba(158, 219, 255, 0.34)' }} />
                  <div className="font-jetbrains-mono text-xs uppercase tracking-widest text-white/40 md:text-sm">
                    Brand Expression & AIGC
                  </div>
                </div>
              </motion.div>
            </div>

          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
