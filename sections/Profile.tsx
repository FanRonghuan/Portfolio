import React, { useMemo, useRef, useState } from 'react';
import {
  AnimatePresence,
  motion,
  useMotionTemplate,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
} from 'framer-motion';
import { createPortal } from 'react-dom';

const ASSET_BASE = `${import.meta.env.BASE_URL}assets/`;
const PROFILE_ACCENT = '#93DAFF';
const PROFILE_ACCENT_STRONG = '#73CBF7';

const PROFILE_SCALE = 0.7;
const CARD_WIDTH = '550px';
const CARD_HEIGHT = '180px';

const EDU_POSITIONS = [
  { top: '10%', left: '-12%', rotate: '-2deg', zIndex: 35 },
  { top: '36%', left: '-12%', rotate: '1deg', zIndex: 34 },
];

const WORK_POSITIONS = [
  { top: '10%', left: '62%', rotate: '-2deg', zIndex: 36 },
  { top: '32%', left: '62%', rotate: '1deg', zIndex: 35 },
  { top: '54%', left: '62%', rotate: '-1deg', zIndex: 34 },
];

const experienceData = [
  {
    id: '1',
    year: '2025.10 - 2026.03',
    role: '多媒体设计实习生',
    company: '腾讯科技有限公司',
    color: '#7BD7FF',
    desc: '1. 参与 WVG 基础视觉训练的中式审美框架搭建，调研 HPSv3 等评测方法；\n2. 负责内部平台 Prompt Tag 的数据整理与素材采集，提升模型风格泛化能力。',
    tags: ['多媒体设计', '数据管理', 'AI 应用'],
    type: 'work',
  },
  {
    id: '2',
    year: '2025.05 - 2025.09',
    role: '电商设计实习生',
    company: '珀莱雅化妆品股份有限公司',
    color: '#7BD7FF',
    desc: '1. 参与 618 / 七夕 / 双十一等大促视觉物料设计与交付；\n2. 负责电商详情页、直播场景页视觉与拍摄协同。',
    tags: ['电商设计', '品牌视觉', '直播设计'],
    type: 'work',
  },
  {
    id: '3',
    year: '2024.05 - 2024.09',
    role: '视觉设计实习生',
    company: '美图公司',
    color: '#93DAFF',
    desc: '1. 负责在线平台活动视觉与系列海报；\n2. 为 AIGC 平台设计营销物料，提升产出效率。',
    tags: ['AIGC 设计', '产品视觉', '海报创作'],
    type: 'work',
  },
  {
    id: '4',
    year: '2024.09 - 2027.06',
    role: '硕士研究生',
    company: '湖北大学',
    color: '#93DAFF',
    desc: '视觉传达设计硕士在读，主修创意方法论、设计管理与品牌策划等。GPA 专业前 20%，获学年二、三等奖学金。',
    tags: ['硕士学位', '视觉传达', '学术研究'],
    type: 'edu',
  },
  {
    id: '5',
    year: '2019.09 - 2024.06',
    role: '本科生',
    company: '湖南涉外经济学院',
    color: '#7BBEFF',
    desc: '视觉传达设计本科，主修设计基础、色彩、海报、包装与插画等。GPA 3.77，专业前 8%，获校一等奖学金。',
    tags: ['本科学位', '视觉传达', '优秀毕业生'],
    type: 'edu',
  },
];

const DEPTHS = {
  FLOOR: -300,
  PROPS: -290,
  MAIN: -50,
};

const parseRangeScore = (range: string) => {
  const [, endPart = '0.0'] = range.split(' - ');
  const [year = '0', month = '0'] = endPart.split('.');
  return Number(year) * 100 + Number(month);
};

const PulseAvatar: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M30 80 C 30 80, 35 85, 45 85 C 55 85, 60 75, 60 60 C 60 45, 55 35, 45 35"
      stroke="white"
      strokeWidth="2"
      strokeLinecap="round"
    />
    <motion.circle
      cx="45"
      cy="45"
      r="15"
      stroke="#7BD7FF"
      strokeWidth="1"
      strokeDasharray="4 4"
      animate={{ r: [15, 25], opacity: [1, 0] }}
      transition={{ duration: 2, repeat: Infinity, ease: 'easeOut' }}
    />
    <motion.circle
      cx="45"
      cy="45"
      r="15"
      stroke="#7BD7FF"
      strokeWidth="1"
      strokeDasharray="4 4"
      animate={{ r: [15, 35], opacity: [1, 0] }}
      transition={{ duration: 2, repeat: Infinity, ease: 'easeOut', delay: 0.6 }}
    />
    <motion.circle
      cx="45"
      cy="45"
      r="15"
      stroke="#7BD7FF"
      strokeWidth="1"
      strokeDasharray="4 4"
      animate={{ r: [15, 45], opacity: [1, 0] }}
      transition={{ duration: 2, repeat: Infinity, ease: 'easeOut', delay: 1.2 }}
    />
  </svg>
);

const WaveformLine: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 100 20" className={className} preserveAspectRatio="none">
    <motion.path
      d="M0 10 Q 12.5 0, 25 10 T 50 10 T 75 10 T 100 10"
      stroke="rgba(255,255,255,0.1)"
      strokeWidth="0.5"
      fill="none"
      animate={{
        d: [
          'M0 10 Q 12.5 0, 25 10 T 50 10 T 75 10 T 100 10',
          'M0 10 Q 12.5 20, 25 10 T 50 10 T 75 10 T 100 10',
          'M0 10 Q 12.5 0, 25 10 T 50 10 T 75 10 T 100 10',
        ],
      }}
      transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
    />
  </svg>
);

const FloorMarquee: React.FC<{
  direction: 'left' | 'right';
  text: string;
  className?: string;
  rotate?: number;
  style?: React.CSSProperties;
}> = React.memo(({ direction, text, className, rotate = 0, style }) => (
  <div
    className="absolute left-[-20%] flex w-[140%] pointer-events-auto overflow-visible will-change-transform"
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
      transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
    >
      {[...Array(6)].map((_, i) => (
        <span key={i} className="mx-4 transition-colors duration-300">
          {text} <span className="mx-4 opacity-30">•</span>
        </span>
      ))}
    </motion.div>
  </div>
));

const ProfileTimelineCard: React.FC<{
  item: (typeof experienceData)[number];
  onClick: () => void;
  index: number;
  style: React.CSSProperties;
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
      initial={{ opacity: 0, x: 400, scale: 0.9 }}
      whileInView={{ opacity: 1, x: 0, scale: 1 }}
      viewport={{ margin: '-10%' }}
      transition={{
        delay: index * 0.15,
        type: 'spring',
        stiffness: 50,
        damping: 9,
        mass: 1,
        y: {
          duration: isHovered ? 0.3 : randomDuration,
          repeat: isHovered ? 0 : Infinity,
          repeatType: 'mirror',
          ease: 'easeInOut',
          delay: isHovered ? 0 : randomDelay,
        },
        rotateZ: {
          duration: 5,
          repeat: Infinity,
          repeatType: 'mirror',
        },
      }}
      className="absolute group cursor-pointer rounded-[2rem] perspective-1000 transform-gpu will-change-transform"
      style={{
        ...style,
        width: CARD_WIDTH,
        height: CARD_HEIGHT,
        transformStyle: 'preserve-3d',
      }}
      animate={{
        y: isHovered ? -10 : [0, -10, 0],
        rotateZ: isHovered ? 0 : [0, 0.5, -0.5, 0],
      }}
    >
      <div
        className="absolute -left-16 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center pointer-events-none"
        style={{ transform: 'translateZ(10px)' }}
      >
        <div
          className="absolute left-full top-1/2 h-[2px] w-12 transition-all duration-300 group-hover:w-16"
          style={{ backgroundColor: 'rgba(147, 218, 255, 0.34)' }}
        />
        <motion.div
          className="z-10 h-3 w-3 rounded-full"
          style={{
            backgroundColor: PROFILE_ACCENT_STRONG,
            boxShadow: '0 0 12px rgba(115, 203, 247, 0.55)',
          }}
          animate={{ scale: [1, 1.5, 1], opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />
        <div
          className="absolute inset-0 scale-0 rounded-full opacity-0 transition-all duration-500 group-hover:scale-150 group-hover:opacity-100"
          style={{ border: '1px solid rgba(147, 218, 255, 0.5)' }}
        />
      </div>

      <motion.div
        className="absolute inset-0 rounded-[2rem] shadow-sm"
        style={{ transformStyle: 'preserve-3d' }}
        whileHover={{ z: 20, scale: 1.02 }}
      >
        <motion.div
          className="pointer-events-none absolute -inset-[1px] z-0 rounded-[2rem] opacity-0 transition-opacity duration-300 group-hover:opacity-50"
          style={{
            background: item.color,
            maskImage: useMotionTemplate`radial-gradient(300px circle at ${mouseX}px ${mouseY}px, black, transparent)`,
            WebkitMaskImage: useMotionTemplate`radial-gradient(300px circle at ${mouseX}px ${mouseY}px, black, transparent)`,
          }}
        />
        <div className="absolute inset-0 z-10 overflow-hidden rounded-[2rem] border border-white/10 bg-deep-space/80 backdrop-blur-xl">
          <div
            className="pointer-events-none absolute inset-0 opacity-50"
            style={{ background: 'linear-gradient(135deg, rgba(147, 218, 255, 0.14) 0%, transparent 52%)' }}
          />

          <div className={`relative z-20 flex h-full flex-col justify-center p-6 ${item.type === 'work' ? 'text-left' : 'text-right'}`}>
            <div className={`mb-2 flex flex-col gap-1 ${item.type === 'work' ? 'items-start' : 'items-end'}`}>
              <span
                className="rounded-md px-3 py-1 text-[11px] md:text-[12px] font-jetbrains-mono tracking-tighter"
                style={{
                  border: '1px solid rgba(147, 218, 255, 0.3)',
                  backgroundColor: 'rgba(147, 218, 255, 0.08)',
                  color: PROFILE_ACCENT,
                }}
              >
                {item.year}
              </span>
              <span
                className={`truncate font-space-grotesk text-2xl font-bold text-white transition-colors group-hover:text-[#93DAFF] ${item.type === 'work' ? 'text-left' : 'text-right'}`}
              >
                {item.company}
              </span>
              <span className={`truncate font-jetbrains-mono text-sm text-white/70 ${item.type === 'work' ? 'text-left' : 'text-right'}`}>
                {item.role}
              </span>
            </div>

            <p
              className={`line-clamp-2 whitespace-pre-line font-albert-light text-xs leading-relaxed text-white/40 transition-colors group-hover:text-white/60 ${item.type === 'work' ? 'text-left' : 'text-right'}`}
            >
              {item.desc}
            </p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
});

const ExperienceModalCard: React.FC<{
  selectedExp: (typeof experienceData)[number];
  onClose: () => void;
}> = ({ selectedExp, onClose }) => {
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
      transition={{ type: 'spring', stiffness: 80, damping: 15 }}
      className="relative w-full max-w-2xl transform-gpu overflow-hidden group"
      style={{
        transformStyle: 'preserve-3d',
        borderRadius: '2.5rem',
      }}
      onClick={(e) => e.stopPropagation()}
    >
      <div
        className="pointer-events-none absolute inset-4 rounded-[2.5rem] transition-opacity duration-300"
        style={{
          boxShadow: `0 0 100px -10px ${selectedExp.color}`,
          opacity: 0.04,
          zIndex: -1,
        }}
      />
      <motion.div
        className="pointer-events-none absolute inset-0 z-20 rounded-[2.5rem]"
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
      <div className="pointer-events-none absolute inset-0 z-20 rounded-[2.5rem] border border-white/50 mix-blend-overlay" />
      <div className="absolute inset-0 rounded-[2.5rem] bg-black/80 backdrop-blur-[60px] saturate-150 shadow-2xl" />
      <div className="relative z-20 p-10 md:p-14">
        <button
          onClick={onClose}
          className="absolute right-6 top-6 flex h-10 w-10 items-center justify-center rounded-full border border-white/5 bg-white/5 text-white/60 backdrop-blur-sm transition-colors hover:bg-white/10"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
        <div className="mb-8 flex items-center gap-4">
          <div
            className="flex h-16 w-16 items-center justify-center rounded-2xl border border-white/20 text-xl font-bold text-white shadow-lg"
            style={{ backgroundColor: selectedExp.color }}
          >
            {selectedExp.company.charAt(0)}
          </div>
          <div>
            <h2 className="text-3xl font-albert-black text-white">{selectedExp.company}</h2>
            <span className="font-mono text-white/40">{selectedExp.year}</span>
          </div>
        </div>
        <div className="mb-8">
          <h3 className="mb-2 text-xl font-bold text-white">{selectedExp.role}</h3>
          <p className="whitespace-pre-line font-albert-regular text-lg leading-relaxed text-white/80">{selectedExp.desc}</p>
        </div>
        <div className="flex flex-wrap gap-2">
          {selectedExp.tags.map((tag, i) => (
            <span
              key={i}
              className="rounded-lg border border-white/10 bg-white/10 px-3 py-1 text-xs font-bold uppercase text-white/60 shadow-sm backdrop-blur-md"
            >
              {tag}
            </span>
          ))}
        </div>
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

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['10deg', '-10deg']);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-10deg', '10deg']);

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
      className="absolute h-[580px] w-[360px] md:h-[720px] md:w-[440px]"
      style={{
        top: '11%',
        left: '28%',
        zIndex: 24,
        transformStyle: 'preserve-3d',
        z: DEPTHS.MAIN,
      }}
      initial={{ x: -1000, rotate: -45, opacity: 0 }}
      whileInView={{
        x: 0,
        rotate: 2,
        opacity: 1,
        y: [0, -10, 0],
      }}
      viewport={{ once: false }}
      transition={{
        x: { duration: 1.2, type: 'spring', stiffness: 50, damping: 12 },
        y: { duration: 6, repeat: Infinity, repeatType: 'mirror', ease: 'easeInOut' },
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div
        className="group flex h-full w-full cursor-pointer flex-col items-center"
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
        }}
        whileHover={{ y: -8 }}
      >
        <div className="h-[440px] w-[320px] rounded-[2rem] border border-white/10 bg-white/5 p-3 shadow-2xl md:h-[550px] md:w-[400px]">
          <div className="relative h-full w-full overflow-hidden rounded-[1.5rem] bg-white/5 transform-style-3d">
            <img
              src={`${ASSET_BASE}profile-p1.jpg`}
              alt="Profile"
              className="h-full w-full object-cover transition-transform duration-700 ease-out will-change-transform group-hover:scale-105"
              decoding="async"
              loading="lazy"
            />
            <div className="pointer-events-none absolute inset-0 rounded-[1.5rem] shadow-[inset_0_0_40px_rgba(0,0,0,0.1)]" />
          </div>
        </div>

        <motion.div
          className="relative mt-5 w-[340px] rounded-[1.75rem] border border-white/10 bg-deep-space/80 px-6 py-5 shadow-[0_18px_55px_rgba(7,20,36,0.3)] backdrop-blur-xl md:w-[420px]"
          style={{ transform: 'translateZ(18px)' }}
          whileHover={{ scale: 1.02 }}
          transition={{ type: 'spring', stiffness: 220, damping: 18 }}
        >
          <div className="relative z-10 flex flex-col items-center text-center">
            <h2 className="transform -skew-x-3 text-[2rem] font-space-grotesk font-bold leading-none tracking-[-0.04em] text-white md:text-[2.6rem]">
              樊荣欢
            </h2>
            <div className="mt-3 text-[13px] font-albert-regular tracking-[0.18em] text-white/62 md:text-[15px]">
              视觉设计师 • 湖北大学 硕士在读
            </div>
            <div className="mt-2 flex flex-wrap justify-center gap-3 border-t border-white/10 pt-3 text-[12px] font-mono tracking-[0.08em] text-white/52 md:text-[13px]">
              <span>Born. 2002.11</span>
              <span>·</span>
              <span>湖南·郴州</span>
              <span>·</span>
              <span>VISUAL DESIGNER</span>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

const Profile: React.FC = () => {
  const [selectedExp, setSelectedExp] = useState<(typeof experienceData)[number] | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const educationItems = useMemo(
    () =>
      experienceData
        .filter((e) => e.type === 'edu')
        .sort((a, b) => parseRangeScore(a.year) - parseRangeScore(b.year)),
    []
  );

  const workItems = useMemo(
    () =>
      experienceData
        .filter((e) => e.type === 'work')
        .sort((a, b) => parseRangeScore(a.year) - parseRangeScore(b.year)),
    []
  );

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const floorY = useTransform(scrollYProgress, [0, 1], ['-10%', '-30%']);

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

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['40deg', '20deg']);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-15deg', '15deg']);
  const translateX = useTransform(mouseXSpring, [-0.5, 0.5], ['-6%', '6%']);

  return (
    <section
      ref={containerRef}
      className="relative w-full overflow-hidden bg-black"
      onMouseMove={handleMouseMove}
      style={{ height: '140vh' }}
    >
      <div className="pointer-events-none absolute left-0 top-0 z-[5] h-40 w-full bg-gradient-to-b from-black/0 to-black" />

      <motion.div className="sticky top-0 flex h-screen w-full items-center justify-center overflow-hidden will-change-transform">
        <div className="absolute inset-0 flex items-center justify-center perspective-2000">
          <motion.div
            className="relative w-full max-w-[1600px] transform-gpu will-change-transform"
            style={{
              scale: PROFILE_SCALE,
              rotateX,
              rotateY,
              x: translateX,
              y: floorY,
              aspectRatio: '16/9',
              transformStyle: 'preserve-3d',
            }}
          >
            <div
              className="absolute inset-[-50%] bg-black transform-preserve-3d"
              style={{ transform: `translateZ(${DEPTHS.FLOOR}px)` }}
            />

            <FloorMarquee
              direction="right"
              text="About Me"
              rotate={-5}
              className="text-[160px] font-albert-black leading-none text-white/5"
              style={{ top: '15%', zIndex: 1 }}
            />

            <div
              className="absolute left-[50%] top-[10%] h-[1px] w-full opacity-20"
              style={{ transform: `translateZ(${DEPTHS.FLOOR + 10}px)` }}
            >
              <WaveformLine className="h-20 w-full" />
            </div>

            <div
              className="absolute left-[5%] top-[5%] h-32 w-32 opacity-40"
              style={{ transform: `translateZ(${DEPTHS.PROPS}px)` }}
            >
              <PulseAvatar className="h-full w-full" />
            </div>

            <StablePhoto />

            <div
              className="absolute h-full w-full pointer-events-auto"
              style={{
                zIndex: 30,
                transformStyle: 'preserve-3d',
                transform: `translateZ(${DEPTHS.MAIN}px) rotateX(-5deg)`,
              }}
            >
              {educationItems.map((item, i) => (
                <ProfileTimelineCard
                  key={item.id}
                  item={item}
                  index={i}
                  style={EDU_POSITIONS[i] as React.CSSProperties}
                  onClick={() => setSelectedExp(item)}
                />
              ))}

              {workItems.map((item, i) => (
                <ProfileTimelineCard
                  key={item.id}
                  item={item}
                  index={i}
                  style={WORK_POSITIONS[i] as React.CSSProperties}
                  onClick={() => setSelectedExp(item)}
                />
              ))}
            </div>
          </motion.div>
        </div>
      </motion.div>

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

              <ExperienceModalCard selectedExp={selectedExp} onClose={() => setSelectedExp(null)} />
            </div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </section>
  );
};

export default Profile;
