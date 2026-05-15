
import React, { useState, useRef, useMemo } from 'react';
import { motion, AnimatePresence, useTransform, useMotionValue, useSpring, useScroll, useMotionTemplate } from 'framer-motion';
import { createPortal } from 'react-dom';
import ExperienceModal from '../components/ExperienceModal';
import Magnetic from '../components/Magnetic';

// ==========================================
// 🟢 CONFIGURATION: GLOBAL ZOOM & LAYOUT
// ==========================================

// 🟢 1. GLOBAL SCALE: Adjusts the zoom level of the entire section
const PROFILE_SCALE = 0.7;

// 🟢 2. CARD DIMENSIONS: Standard dimensions before scaling
const CARD_WIDTH = '550px';
const CARD_HEIGHT = '180px';

// 🟢 3. CARD POSITIONS: Adjust each timeline card's Top, Left, and Rotation
const CARD_POSITIONS = [
    { top: '0%',  left: '55%', rotate: '-2deg' }, // legacy
    { top: '23%', left: '60%', rotate: '1deg' },
    { top: '46%', left: '56%', rotate: '-1deg' },
    { top: '69%', left: '59%', rotate: '2deg' },
];

// New: explicit left (education) and right (work) positions
const EDU_POSITIONS = [
    { top: '10%', left: '-12%', rotate: '-2deg', zIndex: 35 },
    { top: '36%', left: '-12%', rotate: '1deg', zIndex: 34 },
    { top: '62%', left: '-12%', rotate: '-1deg', zIndex: 33 },
];

const WORK_POSITIONS = [
    { top: '10%', left: '62%', rotate: '-2deg', zIndex: 36 },
    { top: '32%', left: '62%', rotate: '1deg', zIndex: 35 },
    { top: '54%', left: '62%', rotate: '-1deg', zIndex: 34 },
    { top: '76%', left: '62%', rotate: '2deg', zIndex: 33 },
];

// --- DATA ---
const experienceData = [
  { 
      id: '1', 
      year: '2025.10 - 2026.03', 
      role: '多媒体设计实习生', 
      company: '腾讯科技有限公司', 
      color: '#FF7F27', 
      desc: '1. 美学评调体系构建：参与WXG基础视觉训练的中式审美框架搭建，调研HPSv3等评测方法；\n2. 数据与质量管控：负责内部平台Prompt Tag的数据整理与素材采集，提升模型风格泛化能力。',
      tags: ['多媒体设计', '数据管理', 'AI应用'],
      type: 'work'
  },
  { 
      id: '2', 
      year: '2025.05 - 2025.09', 
      role: '电商设计实习生', 
      company: '珀莱雅化妆品股份有限公司', 
      color: '#005C4B', 
      desc: '1. 大促视觉全链路设计：参与618/七夕/双十一等大促物料视觉与交付；\n2. 电商直播与详情页：负责详情页视觉与拍摄。',
      tags: ['电商设计', '品牌视觉', '直播设计'],
      type: 'work'
  },
  { 
      id: '3', 
      year: '2024.05 - 2024.09', 
      role: '视觉设计实习生', 
      company: '美图公司', 
      color: '#FFCC00',
      desc: '1. 活动视觉与海报：负责在线平台活动视觉与系列海报；\n2. AIGC 工具物料：为 AIGC 平台设计营销物料，提升产出效率。',
      tags: ['AIGC设计', '产品视觉', '海报创作'],
      type: 'work'
  },
  { 
      id: '4', 
      year: '2024.09 - 2027.06', 
      role: '硕士研究生', 
      company: '湖北大学', 
      color: '#55FF55',
      desc: '视觉传达设计硕士在读，主修：创意方法论、设计管理与品牌策划等。GPA：专业排名前20%，获学年二、三等奖学金。',
      tags: ['硕士学位', '视觉传达', '学术研究'],
      type: 'edu'
  },
  { 
      id: '5', 
      year: '2019.09 - 2024.06', 
      role: '本科生', 
      company: '湖南涉外经济学院', 
      color: '#4DA6FF',
      desc: '视觉传达设计本科，主修：设计基础、色彩、海报、包装与插画等。GPA: 3.77，专业排名前8%，获校一等奖学金。',
      tags: ['本科学位', '视觉传达', '优秀毕业生'],
      type: 'edu'
  },
];

// --- DEPTH CONFIG ---
const DEPTHS = {
    FLOOR: -300,
    PROPS: -290,
    MAIN: -50,
};

const PulseAvatar: React.FC<{ className?: string }> = ({ className }) => {
    return (
        <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Minimalist Face Silhouette */}
            <path 
                d="M30 80 C 30 80, 35 85, 45 85 C 55 85, 60 75, 60 60 C 60 45, 55 35, 45 35" 
                stroke="white" 
                strokeWidth="2" 
                strokeLinecap="round"
            />
            {/* Pulse Arcs (Mind/Inspiration) */}
            <motion.circle 
                cx="45" cy="45" r="15" 
                stroke="#FF5F1F" strokeWidth="1" strokeDasharray="4 4"
                animate={{ r: [15, 25], opacity: [1, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
            />
            <motion.circle 
                cx="45" cy="45" r="15" 
                stroke="#FF5F1F" strokeWidth="1" strokeDasharray="4 4"
                animate={{ r: [15, 35], opacity: [1, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeOut", delay: 0.6 }}
            />
            <motion.circle 
                cx="45" cy="45" r="15" 
                stroke="#FF5F1F" strokeWidth="1" strokeDasharray="4 4"
                animate={{ r: [15, 45], opacity: [1, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeOut", delay: 1.2 }}
            />
        </svg>
    );
};

const WaveformLine: React.FC<{ className?: string }> = ({ className }) => {
    return (
        <svg viewBox="0 0 100 20" className={className} preserveAspectRatio="none">
            <motion.path
                d="M0 10 Q 12.5 0, 25 10 T 50 10 T 75 10 T 100 10"
                stroke="rgba(255,255,255,0.1)"
                strokeWidth="0.5"
                fill="none"
                animate={{
                    d: [
                        "M0 10 Q 12.5 0, 25 10 T 50 10 T 75 10 T 100 10",
                        "M0 10 Q 12.5 20, 25 10 T 50 10 T 75 10 T 100 10",
                        "M0 10 Q 12.5 0, 25 10 T 50 10 T 75 10 T 100 10"
                    ]
                }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            />
        </svg>
    );
};

const FloorMarquee: React.FC<{ direction: 'left' | 'right', text: string, className?: string, rotate?: number, style?: React.CSSProperties }> = React.memo(({ direction, text, className, rotate = 0, style }) => {
    return (
        <div 
            className="absolute left-[-20%] w-[140%] pointer-events-auto overflow-visible flex will-change-transform"
            style={{ 
                transform: `translateZ(${DEPTHS.PROPS - 10}px) rotate(${rotate}deg)`, 
                zIndex: 0,
                ...style,
            }}
        >
            <motion.div
                className={`flex whitespace-nowrap ${className}`}
                initial={{ x: direction === 'left' ? '0%' : '-50%' }}
                animate={{ x: direction === 'left' ? '-50%' : '0%' }}
                transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
            >
                {[...Array(6)].map((_, i) => (
                    <span key={i} className="mx-4 transition-colors duration-300">
                        {text} <span className="mx-4 opacity-30">•</span>
                    </span>
                ))}
            </motion.div>
        </div>
    );
});

const ProfileTimelineCard: React.FC<{ 
    item: any, 
    onClick: () => void, 
    index: number, 
    style: React.CSSProperties 
}> = React.memo(({ item, onClick, index, style }) => {
    const ref = useRef<HTMLDivElement>(null);
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    const [isHovered, setIsHovered] = useState(false);

    const randomDuration = useMemo(() => 4 + Math.random() * 2, []);
    const randomDelay = useMemo(() => Math.random() * 2, []);

    const handleMouseMove = ({ clientX, clientY }: React.MouseEvent) => {
        if (!ref.current) return;
        const { left, top } = ref.current.getBoundingClientRect();
        mouseX.set(clientX - left);
        mouseY.set(clientY - top);
    };

    return (
        <motion.div
            ref={ref}
            onClick={onClick}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            // 🟢 UPDATED: Spring physics adjusted for overshoot/recoil
            initial={{ opacity: 0, x: 400, scale: 0.9 }} 
            whileInView={{ opacity: 1, x: 0, scale: 1 }}
            viewport={{ margin: "-10%" }} // Removed once: true to allow replay
            transition={{ 
                delay: index * 0.15, 
                type: "spring", 
                stiffness: 50,    
                damping: 9,       
                mass: 1,          
                
                // Specific overrides for the continuous floating/hover animations
                y: {
                    duration: isHovered ? 0.3 : randomDuration,
                    repeat: isHovered ? 0 : Infinity,
                    repeatType: "mirror",
                    ease: "easeInOut",
                    delay: isHovered ? 0 : randomDelay
                },
                rotateZ: {
                    duration: 5,
                    repeat: Infinity,
                    repeatType: "mirror"
                }
            }}
            className="absolute rounded-[2rem] cursor-pointer group perspective-1000 transform-gpu will-change-transform"
            style={{ 
                ...style, 
                width: CARD_WIDTH,
                height: CARD_HEIGHT,
                transformStyle: "preserve-3d" 
            }}
            animate={{
                y: isHovered ? -10 : [0, -10, 0], 
                rotateZ: isHovered ? 0 : [0, 0.5, -0.5, 0]
            }}
        >
            <div 
                className="absolute -left-16 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center pointer-events-none"
                style={{ transform: 'translateZ(10px)' }}
            >
                <div className="absolute left-full top-1/2 w-12 h-[2px] bg-pulse-orange/30 group-hover:w-16 transition-all duration-300" />
                <motion.div 
                    className="w-3 h-3 rounded-full bg-pulse-orange z-10 shadow-[0_0_10px_#FF5F1F]"
                    animate={{ scale: [1, 1.5, 1], opacity: [0.7, 1, 0.7] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                />
                <div 
                    className="absolute inset-0 rounded-full border border-pulse-orange/50 opacity-0 scale-0 group-hover:opacity-100 group-hover:scale-150 transition-all duration-500" 
                />
            </div>

            <motion.div 
                className="absolute inset-0 rounded-[2rem] shadow-sm" 
                style={{ transformStyle: 'preserve-3d' }}
                whileHover={{ z: 20, scale: 1.02 }} 
            >
                <motion.div
                    className="absolute -inset-[1px] rounded-[2rem] z-0 opacity-0 group-hover:opacity-50 transition-opacity duration-300 pointer-events-none"
                    style={{
                        background: item.color,
                        maskImage: useMotionTemplate`radial-gradient(300px circle at ${mouseX}px ${mouseY}px, black, transparent)`,
                        WebkitMaskImage: useMotionTemplate`radial-gradient(300px circle at ${mouseX}px ${mouseY}px, black, transparent)`,
                    }}
                />
                <div className="absolute inset-0 bg-deep-space/80 backdrop-blur-xl border border-white/10 rounded-[2rem] overflow-hidden z-10">
                    <div className="absolute inset-0 bg-gradient-to-br from-pulse-orange/5 to-transparent opacity-40 pointer-events-none" />

                    {/* Reverted Content Sizes */}
                    <div className={`relative p-6 flex flex-col justify-center h-full z-20 ${item.type === 'work' ? 'text-left' : 'text-right'}`}>
                        <div className={`flex flex-col gap-1 mb-2 ${item.type === 'work' ? 'items-start' : 'items-end'}`}>
                            <span className="px-3 py-1 rounded-md text-[10px] font-jetbrains-mono border border-pulse-orange/30 bg-pulse-orange/10 text-pulse-orange tracking-tighter">
                               {item.year}
                            </span>
                            <span className={`font-space-grotesk font-bold text-2xl text-white group-hover:text-pulse-orange transition-colors truncate ${item.type === 'work' ? 'text-left' : 'text-right'}`}>
                               {item.company}
                            </span>
                            <span className={`text-white/70 font-jetbrains-mono text-sm truncate ${item.type === 'work' ? 'text-left' : 'text-right'}`}>
                               {item.role}
                            </span>
                        </div>

                        <p className={`text-xs text-white/40 font-albert-light leading-relaxed line-clamp-2 whitespace-pre-line group-hover:text-white/60 transition-colors ${item.type === 'work' ? 'text-left' : 'text-right'}`}>
                            {item.desc}
                        </p>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
});

const ExperienceModalCard: React.FC<{ selectedExp: any, onClose: () => void }> = ({ selectedExp, onClose }) => {
    const ref = useRef<HTMLDivElement>(null);
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const handleMouseMove = ({ clientX, clientY }: React.MouseEvent) => {
        if (!ref.current) return;
        const { left, top } = ref.current.getBoundingClientRect();
        mouseX.set(clientX - left);
        mouseY.set(clientY - top);
    };

    return (
        <motion.div
            layoutId={`card-${selectedExp.id}`}
            ref={ref}
            onMouseMove={handleMouseMove}
            initial={{ rotateY: 90, opacity: 0, scale: 0.9 }}
            animate={{ rotateY: 0, opacity: 1, scale: 1 }}
            exit={{ rotateY: -90, opacity: 0, scale: 0.9 }}
            transition={{ type: "spring", stiffness: 80, damping: 15 }}
            className="relative w-full max-w-2xl transform-gpu overflow-hidden group"
            style={{ 
                transformStyle: "preserve-3d",
                borderRadius: '2.5rem',
            }}
            onClick={(e) => e.stopPropagation()}
        >
            <div 
                className="absolute inset-4 rounded-[2.5rem] transition-opacity duration-300 pointer-events-none"
                style={{ 
                    boxShadow: `0 0 100px -10px ${selectedExp.color}`,
                    opacity: 0.04,
                    zIndex: -1
                }}
            />
            <motion.div
                className="absolute inset-0 z-20 pointer-events-none rounded-[2.5rem]"
                style={{
                    border: '1.5px solid transparent',
                    background: selectedExp.color,
                    opacity: 0.15,
                    maskImage: useMotionTemplate`radial-gradient(300px circle at ${mouseX}px ${mouseY}px, black, transparent)`,
                    WebkitMaskImage: useMotionTemplate`radial-gradient(300px circle at ${mouseX}px ${mouseY}px, black, transparent)`,
                    maskComposite: 'exclude', 
                    WebkitMaskComposite: 'xor',
                    padding: '1.5px', 
                    backgroundClip: 'content-box',
                }}
            >
                 <div className="absolute inset-0 bg-transparent" /> 
            </motion.div>
            <div className="absolute inset-0 rounded-[2.5rem] border border-white/50 pointer-events-none z-20 mix-blend-overlay" />
             <div 
                className="absolute inset-0 rounded-[2.5rem] blur-md mix-blend-multiply transition-all duration-500"
                style={{ 
                    backgroundColor: selectedExp.color, 
                    transform: 'translate(4px, 4px) scale(0.99)', 
                    opacity: 0.015, 
                    zIndex: -1 
                }} 
            />
            <div 
                className="absolute inset-0 rounded-[2.5rem] blur-md mix-blend-screen transition-all duration-500"
                style={{ 
                    backgroundColor: '#ffffff', 
                    transform: 'translate(-4px, -4px) scale(0.99)', 
                    opacity: 0.01,
                    zIndex: -2 
                }} 
            />
            <div className="absolute inset-0 bg-black/80 backdrop-blur-[60px] saturate-150 rounded-[2.5rem] shadow-2xl" />
            <div className="relative z-20 p-10 md:p-14">
                <button 
                    onClick={onClose}
                    className="absolute top-6 right-6 w-10 h-10 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/10 transition-colors border border-white/5 backdrop-blur-sm text-white/60"
                >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                </button>
                <div className="flex items-center gap-4 mb-8">
                    <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-white font-bold text-xl shadow-lg border border-white/20" style={{ backgroundColor: selectedExp.color }}>
                        {selectedExp.company.charAt(0)}
                    </div>
                    <div>
                        <h2 className="text-3xl font-albert-black text-white">{selectedExp.company}</h2>
                        <span className="text-white/40 font-mono">{selectedExp.year}</span>
                    </div>
                </div>
                <div className="mb-8">
                    <h3 className="text-xl font-bold text-white mb-2">{selectedExp.role}</h3>
                    <p className="text-lg text-white/80 leading-relaxed font-albert-regular whitespace-pre-line">
                        {selectedExp.desc}
                    </p>
                </div>
                <div className="flex gap-2 flex-wrap">
                    {selectedExp.tags && selectedExp.tags.map((tag: string, i: number) => (
                         <span key={i} className="px-3 py-1 bg-white/10 border border-white/10 rounded-lg text-xs text-white/60 font-bold uppercase backdrop-blur-md shadow-sm">
                            {tag}
                         </span>
                    ))}
                </div>
                <div 
                    className="absolute -bottom-20 -right-20 w-80 h-80 rounded-full blur-[80px] pointer-events-none"
                    style={{ backgroundColor: selectedExp.color, opacity: 0.02 }} 
                />
            </div>
        </motion.div>
    );
};

const StablePhoto: React.FC = () => {
    const ref = useRef<HTMLDivElement>(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseXSpring = useSpring(x, { stiffness: 100, damping: 20 });
    const mouseYSpring = useSpring(y, { stiffness: 100, damping: 20 });

    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        x.set(mouseX / width - 0.5);
        y.set(mouseY / height - 0.5);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.div
            ref={ref}
            className="absolute w-[320px] h-[440px] md:w-[400px] md:h-[550px]"
            style={{
                top: '8%',
                left: '28%',
                zIndex: 24,
                transformStyle: "preserve-3d",
                z: DEPTHS.MAIN,
            }}
            initial={{ x: -1000, rotate: -45, opacity: 0 }}
            whileInView={{ 
                x: 0, 
                rotate: 2, 
                opacity: 1,
                y: [0, -10, 0]
            }}
            viewport={{ once: false }}
            transition={{ 
                x: { duration: 1.2, type: "spring", stiffness: 50, damping: 12 },
                y: { duration: 6, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }
            }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
        >
            <motion.div
                className="w-full h-full rounded-[2rem] bg-white/5 p-3 shadow-2xl group cursor-pointer border border-white/10"
                style={{
                    rotateX,
                    rotateY,
                    transformStyle: "preserve-3d",
                }}
            >
                <div className="w-full h-full relative overflow-hidden rounded-[1.5rem] bg-white/5 transform-style-3d">
                    <img 
                        src="/assets/profile-p1.jpg" 
                        alt="Profile" 
                        className="w-full h-full object-cover transition-transform duration-700 ease-out will-change-transform group-hover:scale-105"
                        decoding="async"
                        loading="lazy"
                    />
                    <div className="absolute inset-0 shadow-[inset_0_0_40px_rgba(0,0,0,0.1)] rounded-[1.5rem] pointer-events-none" />
                </div>
            </motion.div>
        </motion.div>
    );
};

const NameTilt: React.FC = () => {
    const ref = useRef<HTMLDivElement>(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseXSpring = useSpring(x, { stiffness: 200, damping: 10 });
    const mouseYSpring = useSpring(y, { stiffness: 200, damping: 10 });

    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["15deg", "-15deg"]);
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-15deg", "15deg"]);

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        x.set((e.clientX - rect.left) / rect.width - 0.5);
        y.set((e.clientY - rect.top) / rect.height - 0.5);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.div
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ 
                rotateX, 
                rotateY, 
                transformStyle: "preserve-3d" 
            }}
            className="inline-block"
        >
            <div className="text-center w-full">
                <h2 className="text-6xl md:text-7xl font-space-grotesk font-bold text-white leading-none mb-2 tracking-tighter transform -skew-x-4 pointer-events-none">
                    樊荣欢
                </h2>
                <div className="text-sm text-white/40 font-albert-regular tracking-wider">
                    视觉设计师 • 湖北大学 硕士在读
                </div>
            </div>
        </motion.div>
    );
};


const Profile: React.FC = () => {
  const [selectedExp, setSelectedExp] = useState<any>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
      target: containerRef,
      offset: ["start start", "end end"]
  });
  const floorY = useTransform(scrollYProgress, [0, 1], ["-10%", "-30%"]);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x, { stiffness: 30, damping: 25 });
  const mouseYSpring = useSpring(y, { stiffness: 30, damping: 25 });

  const handleMouseMove = (e: React.MouseEvent) => {
      const { clientX, clientY } = e;
      const w = window.innerWidth;
      const h = window.innerHeight;
      x.set(clientX / w - 0.5);
      y.set(clientY / h - 0.5);
  };

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["40deg", "20deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-15deg", "15deg"]);
  const translateX = useTransform(mouseXSpring, [-0.5, 0.5], ["-6%", "6%"]);
    const nameFloatX = useTransform(mouseXSpring, [-0.5, 0.5], [-24, 24]);
    const nameFloatY = useTransform(mouseYSpring, [-0.5, 0.5], [14, -14]);
    const nameTiltZ = useTransform(mouseXSpring, [-0.5, 0.5], [-3, 3]);

  return (
    <section 
        ref={containerRef}
        className="relative w-full bg-black overflow-hidden" 
        onMouseMove={handleMouseMove}
        style={{ height: '140vh' }}
    >
      {/* 🟢 BLEND OVERLAY: Subtle top gradient to smooth the transition from the Hero video */}
      <div className="absolute top-0 left-0 w-full h-40 bg-gradient-to-b from-black/0 to-black z-[5] pointer-events-none" />

      <motion.div 
         className="sticky top-0 w-full h-screen overflow-hidden flex items-center justify-center will-change-transform"
      >
        <div className="absolute inset-0 flex items-center justify-center perspective-2000">
            <motion.div
                className="relative w-full max-w-[1600px] will-change-transform transform-gpu"
                style={{
                    scale: PROFILE_SCALE, // 🟢 APPLIED GLOBAL SCALE
                    rotateX,
                    rotateY,
                    x: translateX,
                    y: floorY,
                    aspectRatio: '16/9',
                    transformStyle: "preserve-3d",
                }}
            >
                <div className="absolute inset-[-50%] bg-black transform-preserve-3d" style={{ transform: `translateZ(${DEPTHS.FLOOR}px)` }} />
                
                {/* Scaled Text (Reverted) */}
                <FloorMarquee 
                    direction="right" 
                    text="About Me" 
                    rotate={-5} 
                    className="text-[160px] font-albert-black text-white/5 leading-none" 
                    style={{ top: '15%', zIndex: 1 }}
                />

                <div 
                    className="absolute pointer-events-none text-center w-[400px]"
                    style={{
                         top: '5%',
                         left: '15%',
                         transform: `translateZ(${DEPTHS.PROPS}px) rotateX(-5deg)`,
                         zIndex: 5
                    }}
                >
            
                </div>

                <div className="absolute top-[10%] left-[50%] w-full h-[1px] opacity-20" style={{ transform: `translateZ(${DEPTHS.FLOOR + 10}px)` }}>
                    <WaveformLine className="w-full h-20" />
                </div>

                <div className="absolute top-[5%] left-[5%] w-32 h-32 opacity-40" style={{ transform: `translateZ(${DEPTHS.PROPS}px)` }}>
                    <PulseAvatar className="w-full h-full" />
                </div>

                <StablePhoto />

                <motion.div 
                    className="absolute pointer-events-auto"
                    style={{ 
                        top: '72%', 
                        left: '33%',
                        x: nameFloatX,
                        y: nameFloatY,
                        rotateZ: nameTiltZ,
                        transform: `translateZ(${DEPTHS.MAIN + 10}px) rotateX(-8deg)`,
                        width: '460px',
                        zIndex: 40
                    }}
                    initial={{ opacity: 0, y: 50, rotate: 10 }}
                    whileInView={{ opacity: 1, y: 0, rotate: -5 }}
                    viewport={{ once: false }}
                    transition={{ delay: 0.5, duration: 1, type: "spring" }}
                >
                    <Magnetic strength={40}>
                        <motion.div
                            className="cursor-pointer"
                            whileHover={{ scale: 1.15 }}
                            transition={{ type: "spring", stiffness: 300, damping: 15 }}
                        >
                            <NameTilt />
                            <div className="flex flex-wrap justify-center gap-4 text-sm font-mono text-white/40 px-4 border-t border-white/10 pt-3 pointer-events-none">
                                <span>Born. 2002.11</span>
                                <span>·</span>
                                <span>湖南·郴州</span>
                                <span>·</span>
                                <span>VISUAL DESIGNER</span>
                            </div>
                        </motion.div>
                    </Magnetic>
                </motion.div>

                {/* Timeline Cards - LEFT: Education, RIGHT: Work/Internships */}
                <div 
                    className="absolute w-full h-full pointer-events-auto"
                    style={{
                        zIndex: 30,
                        transformStyle: "preserve-3d",
                        transform: `translateZ(${DEPTHS.MAIN}px) rotateX(-5deg)`,
                    }}
                >
                    {
                        // Education cards (left)
                        experienceData.filter(e => e.type === 'edu').map((item, i) => (
                            <ProfileTimelineCard
                                key={item.id}
                                item={item}
                                index={i}
                                style={EDU_POSITIONS[i] as React.CSSProperties}
                                onClick={() => setSelectedExp(item)}
                            />
                        ))
                    }

                    {
                        // Work/Internship cards (right)
                        experienceData.filter(e => e.type === 'work').map((item, i) => (
                            <ProfileTimelineCard
                                key={item.id}
                                item={item}
                                index={i}
                                style={WORK_POSITIONS[i] as React.CSSProperties}
                                onClick={() => setSelectedExp(item)}
                            />
                        ))
                    }
                </div>

            </motion.div>
        </div>
      </motion.div>

      {/* FLIP MODAL OVERLAY */}
      {createPortal(
        <AnimatePresence>
            {selectedExp && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center perspective-2000 px-4">
                     <motion.div 
                        initial={{ opacity: 0 }} 
                        animate={{ opacity: 1 }} 
                        exit={{ opacity: 0 }} 
                        className="absolute inset-0 bg-black/60 backdrop-blur-md"
                        onClick={() => setSelectedExp(null)}
                     />
                     
                     <ExperienceModalCard 
                        selectedExp={selectedExp} 
                        onClose={() => setSelectedExp(null)} 
                     />
                </div>
            )}
        </AnimatePresence>,
        document.body
      )}
    </section>
  );
};

export default Profile;
