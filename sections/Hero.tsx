
import React, { useRef, useState, useMemo } from 'react';
import { motion, useTransform, useMotionValue, useSpring, useScroll } from 'framer-motion';
import Spotlight3D from '../components/Spotlight3D';
import PatternPlaceholder from '../components/PatternPlaceholder';
import Magnetic from '../components/Magnetic';

// ==========================================
// 🟢 CONFIGURATION: GLOBAL ZOOM & LAYOUT
// ==========================================

// 🟢 1. GLOBAL SCALE: Adjusts the zoom level of the entire section
const HERO_SCALE = 0.8; 

// 🟢 2. CARD SIZE: Base dimensions
const CARD_SIZE_CLASSES = "w-[250px] md:w-[300px]"; 

// 🟢 3. SCATTERED LAYOUT CONFIGURATION (随机洒落布局)
// The goal is to look naturally messy, not geometric.
const CARD_LAYOUT_CONFIG = [
    // 1. 主视觉 (Main Focus) - Slightly Right, Top of the pile
    { left: '39%',  top: '77%', zIndex: 32 }, 
    
    // 2. 左侧大卡 (Left Major) - Overlapping Main, slightly lower
    { left: '19%',  top: '76%', zIndex: 35 }, 
    
    // 3. 右侧大卡 (Right Major) - Tucked behind Main
    { left: '72%',  top: '77%', zIndex: 30 }, 
    
    // 4. 中间下方 (Bottom Center) - Small, connecting piece
    { left: '58%',  top: '75%', zIndex: 25 }, 
    
    // 5. 左边边缘 (Left Edge) - Lower, wider angle
    { left: '8%',   top: '78%', zIndex: 37 }, 
    
    // 6. 右边边缘 (Right Edge) - Lower
    { left: '89%',  top: '72%', zIndex: 36 }, 
    
    // 7. 极左底部 (Bottom Left) - Deep background
    { left: '-7%',  top: '82%', zIndex: 36 }, 
    
    // 8. 极右底部 (Bottom Right) - Deep background
    { left: '79%',  top: '88%', zIndex: 10 }, 
];

// --- DATA: Defined with RANDOMIZED SCALES (大小错落) & ROTATIONS (随机旋转) ---
const heroCards = [
  { 
      id: 1, 
      color: '#FF7F27', 
      rotate: -2,      
      scale: 1.4,       
      img: 'https://raw.githubusercontent.com/Rachel-ahua/picture-storage/refs/heads/main/project1.jpg'
  }, 
  { 
      id: 2, 
      color: '#00A2E8', 
      rotate: 8,        
      scale: 1.2,      
      img: 'https://picsum.photos/seed/hero2/400/400'
  }, 
  { 
      id: 3, 
      color: '#55FFFF', 
      rotate: 24,       
      scale: 1.15,       
      img: 'https://picsum.photos/seed/hero3/400/400'
  }, 
  {   id: 4, 
      color: '#E0221E', 
      rotate: 12,       
      scale: 1.1,      
      img: 'https://picsum.photos/seed/hero4/400/400'
  }, 
  { 
      id: 5, 
      color: '#E0221E', 
      rotate: 2,      
      scale: 1.0,      
      img: 'https://picsum.photos/seed/hero5/400/400' 
  }, 
  { 
      id: 6, 
      color: '#0044BA', 
      rotate: 15,       
      scale: 0.9,       
      img: 'https://picsum.photos/seed/hero6/400/400'
  },
  { 
      id: 7, 
      color: '#AA88EE', 
      rotate: -15,       
      scale: 0.95,      
      img: 'https://picsum.photos/seed/hero7/400/400'
  },
  { 
      id: 8, 
      color: '#4ECDC4', 
      rotate: -15,      
      scale: 0.01,       
      img: 'https://picsum.photos/seed/hero8/400/400'
  }
];

// --- DEPTH CONFIG ---
const DEPTHS = {
    FLOOR: -300,
    PROPS: -290,
    CARDS: -50,
    TEXT: 10, 
};

const ImageRevealHeroTitle: React.FC = () => {
    const [isHovered, setIsHovered] = useState(false);
    const REVEAL_IMAGE = "https://picsum.photos/seed/pulse-reveal/400/600";

    return (
        <div 
            className="relative flex items-center justify-center cursor-pointer select-none group h-[1.2em] w-full"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <motion.h1 
                className="font-space-grotesk font-bold text-[8vw] md:text-[10vw] leading-none tracking-tighter whitespace-nowrap transform -skew-x-6 origin-right z-20 relative drop-shadow-[0_0_20px_rgba(255,95,31,0.3)]"
                animate={{ 
                    x: isHovered ? '-15%' : '0%',
                    color: isHovered ? '#FF5F1F' : '#FFFFFF',
                }}
                transition={{ type: "spring", stiffness: 150, damping: 16 }}
            >
                A-FA
            </motion.h1>

            <motion.div
                className="absolute z-10 pointer-events-none rounded-[1rem] overflow-hidden border-2 border-pulse-orange shadow-[0_0_30px_rgba(255,95,31,0.5)]"
                style={{
                    width: '10vw',
                    height: '14vw', 
                    top: '50%',
                    left: '50%',
                    marginTop: '-7vw',
                    marginLeft: '-5vw' 
                }}
                initial={{ scale: 0, rotate: -15, opacity: 0 }}
                animate={{
                    scale: isHovered ? 1 : 0,
                    rotate: isHovered ? 6 : -15,
                    opacity: isHovered ? 1 : 0
                }}
                transition={{ 
                    type: "spring", 
                    stiffness: 180, 
                    damping: 14,
                    delay: isHovered ? 0.05 : 0 
                }}
            >
                <img 
                    src={REVEAL_IMAGE} 
                    alt="Pulse Reveal" 
                    className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
                />
            </motion.div>

            <motion.h1 
                className="font-space-grotesk font-bold text-[8vw] md:text-[10vw] leading-none tracking-tighter whitespace-nowrap transform -skew-x-6 origin-left z-20 relative ml-[2vw] drop-shadow-[0_0_20px_rgba(255,95,31,0.3)]"
                animate={{ 
                    x: isHovered ? '15%' : '0%',
                    color: isHovered ? '#FF5F1F' : '#FFFFFF',
                }}
                transition={{ type: "spring", stiffness: 150, damping: 16 }}
            >
                FA-FA
            </motion.h1>
        </div>
    );
};

const FrequencyMeter: React.FC = () => {
    return (
        <div className="flex items-end gap-1 h-8 md:h-12">
            {[...Array(12)].map((_, i) => (
                <motion.div
                    key={i}
                    className="w-1 md:w-1.5 bg-pulse-orange/60 rounded-full"
                    animate={{
                        height: [
                            `${20 + Math.random() * 80}%`,
                            `${20 + Math.random() * 80}%`,
                            `${20 + Math.random() * 80}%`
                        ]
                    }}
                    transition={{
                        duration: 0.5 + Math.random() * 0.5,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                />
            ))}
        </div>
    );
};

const PulsingSlogan: React.FC = () => {
    return (
        <div className="flex flex-col items-center gap-2">
            <motion.div 
                className="font-jetbrains-mono text-pulse-orange text-sm md:text-base tracking-[0.3em] uppercase"
                animate={{ opacity: [0.4, 1, 0.4] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
                Always F.A.F.A
            </motion.div>
            <div className="flex items-center gap-4 text-white/80 font-albert-light text-lg md:text-xl">
                <span className="tracking-widest">发疯是灵感</span>
                <div className="w-1 h-1 rounded-full bg-pulse-orange" />
                <span className="tracking-widest">发力是专业</span>
            </div>
        </div>
    );
};

const FloatingHeroCard: React.FC<{ card: any, index: number, hasEntered: boolean }> = ({ card, index, hasEntered }) => {
    const layout = CARD_LAYOUT_CONFIG[index] || { left: '50%', top: '50%', zIndex: 1 };
    const [isHovered, setIsHovered] = useState(false);

    // Random floating params
    const randomDuration = useMemo(() => 3 + Math.random() * 2, []);
    const randomOffset = useMemo(() => 5 + Math.random() * 5, []);
    const randomHoverRotate = useMemo(() => (Math.random() * 8 - 4), []); 

    return (
        <motion.div
            className={`absolute cursor-pointer ${CARD_SIZE_CLASSES} will-change-transform`}
            style={{
                top: layout.top,
                left: layout.left,
                aspectRatio: '1/1',
                zIndex: layout.zIndex, 
                transformStyle: "preserve-3d",
                z: DEPTHS.CARDS,
            }}
            // 🟢 UPDATED ENTRY: More random Y start to feel like a shuffle
            initial={{ opacity: 0, y: 1000 + Math.random() * 400, rotate: card.rotate + (Math.random() * 40 - 20) }}
            animate={hasEntered ? { opacity: 1, y: 0, rotate: card.rotate } : {}}
            transition={{ 
                duration: 1.5, 
                // Randomize delay slightly to break the "wave" pattern
                delay: 0.1 + (Math.random() * 0.4), 
                type: "spring", 
                stiffness: 45, 
                damping: 16,
                mass: 1.1
            }} 
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <motion.div
                animate={{
                    y: isHovered ? -60 : [0, -randomOffset, 0],
                    scale: isHovered ? (card.scale || 1) * 1.1 : (card.scale || 1),
                    rotate: isHovered ? card.rotate + randomHoverRotate : card.rotate, 
                }}
                transition={{
                    y: {
                        duration: isHovered ? 0.3 : randomDuration,
                        repeat: isHovered ? 0 : Infinity,
                        repeatType: "mirror", 
                        ease: "easeInOut"
                    },
                    scale: { 
                        type: "spring", 
                        stiffness: 200,
                        damping: 15
                    },
                    rotate: { 
                        type: "spring", 
                        stiffness: 150, 
                        damping: 20 
                    }
                }}
                className="w-full h-full relative origin-bottom"
            >
                <Magnetic strength={40}>
                    <Spotlight3D 
                        className="w-full h-full rounded-[2.5rem] bg-white/10 backdrop-blur-md border border-white/30 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.15)]" 
                        color={card.color}
                        enableElasticScale={false} 
                        spotlightColor="rgba(255,255,255,0.5)"
                    >
                         <motion.div 
                            className="absolute inset-4 rounded-[2rem] blur-2xl opacity-0 transition-opacity duration-500 z-0"
                            animate={{ opacity: isHovered ? 0.6 : 0 }}
                            style={{ backgroundColor: card.color }}
                        />

                        <div className="w-full h-full relative p-3">
                            <div className="w-full h-full rounded-[2rem] overflow-hidden relative shadow-inner bg-white">
                                {card.img ? (
                                    <div className="w-full h-full relative group">
                                            <img 
                                            src={card.img} 
                                            alt={`Card ${card.id}`} 
                                            className="w-full h-full object-cover"
                                            decoding="async"
                                            />
                                            <motion.div 
                                                className="absolute inset-0 pointer-events-none mix-blend-overlay z-10"
                                                animate={{ opacity: isHovered ? 0.4 : 0 }}
                                                transition={{ duration: 0.3 }}
                                                style={{ backgroundColor: card.color }}
                                            />
                                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300" />
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
        offset: ["start start", "end end"]
    });

    const floorY = useTransform(scrollYProgress, [0, 1], ["0%", "-40%"]);
    
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

    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["35deg", "20deg"]);
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-15deg", "15deg"]);
    const translateX = useTransform(mouseXSpring, [-0.5, 0.5], ["-8%", "8%"]);

    return (
        <section 
            ref={containerRef}
            className="relative w-full bg-black overflow-hidden"
            onMouseMove={handleMouseMove}
            style={{ height: '140vh' }}
        >
            {/* Background Video - Restored brightness (opacity-100) */}
            <video
                autoPlay
                muted
                loop
                playsInline
                className="absolute inset-0 w-full h-full object-cover z-0"
            >
                <source src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260306_074215_04640ca7-042c-45d6-bb56-58b1e8a42489.mp4" type="video/mp4" />
            </video>

            {/* 🟢 SILKY TRANSITION OVERLAY: Multi-stop gradient for a more natural fade into the next section */}
            <div className="absolute inset-0 z-[1] pointer-events-none bg-gradient-to-b from-transparent from-50% via-black/20 via-75% to-black" />

             <motion.div 
                className="sticky top-0 w-full h-screen overflow-hidden flex items-center justify-center will-change-transform z-10"
                onViewportEnter={() => setHasEntered(true)}
             >
                <div className="absolute inset-0 flex items-center justify-center perspective-2000">
                    <motion.div
                        className="relative w-full max-w-[1400px] will-change-transform transform-gpu"
                        style={{
                            scale: HERO_SCALE, 
                            rotateX,
                            rotateY,
                            x: translateX,
                            y: floorY,
                            aspectRatio: '16/9',
                            transformStyle: "preserve-3d",
                        }}
                    >
                        {/* 1. Main Title - Moved UP slightly to 28% to balance the bottom card pile */}
                        <div className="absolute top-[25%] left-0 w-full text-center pointer-events-none" style={{ transform: `translateZ(${DEPTHS.TEXT}px) rotateX(-10deg)` }}>
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
                                className="mt-8 flex flex-col items-center gap-6 drop-shadow-[0_0_15px_rgba(255,95,31,0.2)]"
                                initial={{ opacity: 0, y: 80 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 1.2, ease: "easeOut", delay: 0.4 }}
                                viewport={{ once: true }}
                            >
                                <FrequencyMeter />
                                <PulsingSlogan />
                                
                                <div className="flex items-center gap-4 mt-4">
                                    <div className="font-jetbrains-mono text-xs md:text-sm text-white/40 tracking-widest uppercase">Visual Designer</div>
                                    <div className="w-8 h-[1px] bg-pulse-orange/30" />
                                    <div className="font-jetbrains-mono text-xs md:text-sm text-white/40 tracking-widest uppercase">Illustrator & Animator</div>
                                </div>
                            </motion.div>
                        </div>

                        {/* 2. Scattered Card Deck */}
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
