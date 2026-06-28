import React, { useMemo, useRef, useState } from 'react';
import { motion, useMotionValue, useScroll, useSpring, useTransform } from 'framer-motion';
import Magnetic from '../components/Magnetic';
import PatternPlaceholder from '../components/PatternPlaceholder';
import Prism from '../components/Prism';
import Spotlight3D from '../components/Spotlight3D';

const ASSET_BASE = `${import.meta.env.BASE_URL}assets/`;
const HERO_ACCENT = '#9EDBFF';
const HERO_ACCENT_DIM = '#79C8F2';

const HERO_SCALE = 0.8;
const CARD_SIZE_CLASSES = 'w-[250px] md:w-[300px]';

const CARD_LAYOUT_CONFIG = [
  { left: '39%', top: '77%', zIndex: 32 },
  { left: '19%', top: '76%', zIndex: 35 },
  { left: '72%', top: '77%', zIndex: 30 },
  { left: '58%', top: '75%', zIndex: 25 },
  { left: '8%', top: '78%', zIndex: 37 },
  { left: '89%', top: '72%', zIndex: 36 },
  { left: '-7%', top: '82%', zIndex: 36 },
  { left: '79%', top: '88%', zIndex: 10 },
];

const heroCards = [
  { id: 1, color: '#7BD7FF', rotate: -2, scale: 1.4, img: `${ASSET_BASE}poster8.png` },
  { id: 2, color: '#00A2E8', rotate: 8, scale: 1.2, img: `${ASSET_BASE}poster1.png` },
  { id: 3, color: '#55FFFF', rotate: 24, scale: 1.15, img: `${ASSET_BASE}poster2.jpg` },
  { id: 4, color: '#E0221E', rotate: 12, scale: 1.1, img: `${ASSET_BASE}poster3.png` },
  { id: 5, color: '#E0221E', rotate: 2, scale: 1.0, img: `${ASSET_BASE}poster4.png` },
  { id: 6, color: '#0044BA', rotate: 15, scale: 0.9, img: `${ASSET_BASE}poster5.png` },
  { id: 7, color: '#AA88EE', rotate: -15, scale: 0.95, img: `${ASSET_BASE}poster6.png` },
  { id: 8, color: '#4ECDC4', rotate: -15, scale: 0.01, img: `${ASSET_BASE}poster7.png` },
];

const DEPTHS = {
  FLOOR: -300,
  PROPS: -290,
  CARDS: -50,
  TEXT: 10,
};

const ImageRevealHeroTitle: React.FC = () => {
  const [isHovered, setIsHovered] = useState(false);
  const revealImage = `${ASSET_BASE}hero-p1.jpg`;

  return (
    <div
      className="group relative flex h-[1.2em] w-full cursor-pointer select-none items-center justify-center"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.h1
        className="relative z-20 origin-right -skew-x-6 whitespace-nowrap font-space-grotesk text-[5.2vw] font-bold leading-none tracking-[-0.03em] drop-shadow-[0_0_20px_rgba(123,215,255,0.3)] md:text-[6.2vw]"
        animate={{
          x: isHovered ? '-15%' : '0%',
          color: isHovered ? '#8EE7FF' : '#FFFFFF',
        }}
        transition={{ type: 'spring', stiffness: 150, damping: 16 }}
      >
        Welcome To
      </motion.h1>

      <motion.div
        className="pointer-events-none absolute z-10 overflow-hidden rounded-[1rem] border-2 border-pulse-orange shadow-[0_0_30px_rgba(123,215,255,0.45)]"
        style={{
          width: '10vw',
          height: '14vw',
          top: '50%',
          left: '50%',
          marginTop: '-7vw',
          marginLeft: '-5vw',
        }}
        initial={{ scale: 0, rotate: -15, opacity: 0 }}
        animate={{
          scale: isHovered ? 1 : 0,
          rotate: isHovered ? 6 : -15,
          opacity: isHovered ? 1 : 0,
        }}
        transition={{
          type: 'spring',
          stiffness: 180,
          damping: 14,
          delay: isHovered ? 0.05 : 0,
        }}
      >
        <img
          src={revealImage}
          alt="Pulse Reveal"
          className="h-full w-full object-cover grayscale transition-all duration-500 hover:grayscale-0"
        />
      </motion.div>

      <motion.h1
        className="relative z-20 ml-[1vw] origin-left -skew-x-6 whitespace-nowrap font-space-grotesk text-[5.2vw] font-bold leading-none tracking-[-0.03em] drop-shadow-[0_0_20px_rgba(123,215,255,0.3)] md:text-[6.2vw]"
        animate={{
          x: isHovered ? '15%' : '0%',
          color: isHovered ? '#8EE7FF' : '#FFFFFF',
        }}
        transition={{ type: 'spring', stiffness: 150, damping: 16 }}
      >
        My Portfolio
      </motion.h1>
    </div>
  );
};

const FrequencyMeter: React.FC = () => (
  <div className="flex h-8 items-end gap-1 md:h-12">
    {[...Array(12)].map((_, i) => (
      <motion.div
        key={i}
        className="w-1 rounded-full md:w-1.5"
        style={{
          backgroundColor: 'rgba(158, 219, 255, 0.78)',
          boxShadow: '0 0 10px rgba(121, 200, 242, 0.18)',
        }}
        animate={{
          height: [`${20 + Math.random() * 80}%`, `${20 + Math.random() * 80}%`, `${20 + Math.random() * 80}%`],
        }}
        transition={{
          duration: 0.5 + Math.random() * 0.5,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
    ))}
  </div>
);

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

const FloatingHeroCard: React.FC<{ card: any; index: number; hasEntered: boolean }> = ({ card, index, hasEntered }) => {
  const layout = CARD_LAYOUT_CONFIG[index] || { left: '50%', top: '50%', zIndex: 1 };
  const [isHovered, setIsHovered] = useState(false);

  const randomDuration = useMemo(() => 3 + Math.random() * 2, []);
  const randomOffset = useMemo(() => 5 + Math.random() * 5, []);
  const randomHoverRotate = useMemo(() => Math.random() * 8 - 4, []);

  return (
    <motion.div
      className={`absolute cursor-pointer will-change-transform ${CARD_SIZE_CLASSES}`}
      style={{
        top: layout.top,
        left: layout.left,
        aspectRatio: '1/1',
        zIndex: layout.zIndex,
        transformStyle: 'preserve-3d',
        z: DEPTHS.CARDS,
      }}
      initial={{ opacity: 0, y: 1000 + Math.random() * 400, rotate: card.rotate + (Math.random() * 40 - 20) }}
      animate={hasEntered ? { opacity: 1, y: 0, rotate: card.rotate } : {}}
      transition={{
        duration: 1.5,
        delay: 0.1 + Math.random() * 0.4,
        type: 'spring',
        stiffness: 45,
        damping: 16,
        mass: 1.1,
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div
        animate={{
          y: isHovered ? -60 : [0, -randomOffset, 0],
          scale: isHovered ? (card.scale || 1) * 1.1 : card.scale || 1,
          rotate: isHovered ? card.rotate + randomHoverRotate : card.rotate,
        }}
        transition={{
          y: {
            duration: isHovered ? 0.3 : randomDuration,
            repeat: isHovered ? 0 : Infinity,
            repeatType: 'mirror',
            ease: 'easeInOut',
          },
          scale: {
            type: 'spring',
            stiffness: 200,
            damping: 15,
          },
          rotate: {
            type: 'spring',
            stiffness: 150,
            damping: 20,
          },
        }}
        className="relative h-full w-full origin-bottom"
      >
        <Magnetic strength={40}>
          <Spotlight3D
            className="h-full w-full rounded-[2.5rem] border border-white/30 bg-white/10 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.15)] backdrop-blur-md"
            color={card.color}
            enableElasticScale={false}
            spotlightColor="rgba(255,255,255,0.5)"
          >
            <motion.div
              className="absolute inset-4 z-0 rounded-[2rem] opacity-0 blur-2xl transition-opacity duration-500"
              animate={{ opacity: isHovered ? 0.6 : 0 }}
              style={{ backgroundColor: card.color }}
            />

            <div className="relative h-full w-full p-3">
              <div className="relative h-full w-full overflow-hidden rounded-[2rem] bg-white shadow-inner">
                {card.img ? (
                  <div className="group relative h-full w-full">
                    <img src={card.img} alt={`Card ${card.id}`} className="h-full w-full object-cover" decoding="async" />
                    <motion.div
                      className="pointer-events-none absolute inset-0 z-10 mix-blend-overlay"
                      animate={{ opacity: isHovered ? 0.4 : 0 }}
                      transition={{ duration: 0.3 }}
                      style={{ backgroundColor: card.color }}
                    />
                    <div className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/5" />
                  </div>
                ) : (
                  <PatternPlaceholder color={card.color} number={card.id} />
                )}
              </div>
            </div>
          </Spotlight3D>
        </Magnetic>
      </motion.div>
    </motion.div>
  );
};

const Hero: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hasEntered, setHasEntered] = useState(false);

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
      className="relative w-full overflow-hidden bg-black"
      onMouseMove={handleMouseMove}
      style={{ height: '140vh' }}
    >
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_18%,rgba(255,255,255,0.08),transparent_24%),linear-gradient(180deg,#0a0911_0%,#08070e_42%,#030304_100%)]" />
        <div className="absolute inset-0 opacity-80">
          <Prism
            animationType="rotate"
            timeScale={0.42}
            height={3.05}
            baseWidth={5.5}
            scale={3.45}
            hueShift={-0.08}
            colorFrequency={0.78}
            noise={0}
            glow={0.82}
            bloom={1.55}
            offset={{ x: 0, y: 18 }}
            suspendWhenOffscreen
          />
        </div>
        <div className="absolute left-1/2 top-[16%] h-[54%] w-[70%] -translate-x-1/2 rounded-full bg-white/10 blur-[120px]" />
        <div className="absolute left-1/2 top-[22%] h-[46%] w-[52%] -translate-x-1/2 rounded-full bg-cyan-200/10 blur-[140px]" />
        <div className="absolute bottom-[12%] left-1/2 h-24 w-[82%] -translate-x-1/2 rounded-full bg-white/75 blur-[42px]" />
        <div className="absolute bottom-[11%] left-[18%] h-28 w-[26%] rounded-full bg-blue-500/55 blur-[60px]" />
        <div className="absolute bottom-[11%] right-[18%] h-28 w-[26%] rounded-full bg-cyan-300/50 blur-[60px]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_34%,rgba(255,255,255,0.06),transparent_20%),radial-gradient(circle_at_50%_68%,transparent_0%,rgba(0,0,0,0.22)_46%,rgba(0,0,0,0.74)_100%)]" />
      </div>

      <div className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-b from-transparent from-50% via-black/20 via-75% to-black" />

      <motion.div
        className="sticky top-0 z-10 flex h-screen w-full items-center justify-center overflow-hidden will-change-transform"
        onViewportEnter={() => setHasEntered(true)}
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
              className="pointer-events-none absolute left-0 top-[25%] w-full text-center"
              style={{ transform: `translateZ(${DEPTHS.TEXT}px) rotateX(-10deg)` }}
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
                                className="mt-8 flex flex-col items-center gap-6 drop-shadow-[0_0_15px_rgba(123,215,255,0.22)]"
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

            {heroCards.map((card, idx) => (
              <FloatingHeroCard key={card.id} card={card} index={idx} hasEntered={hasEntered} />
            ))}
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
