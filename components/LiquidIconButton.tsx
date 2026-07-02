import React from 'react';
import { motion } from 'framer-motion';

type LiquidIconButtonProps = {
  children: React.ReactNode;
  className?: string;
  iconClassName?: string;
  glowClassName?: string;
  label?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  type?: 'button' | 'submit' | 'reset';
  tone?: 'light' | 'dark';
};

const LiquidIconButton: React.FC<LiquidIconButtonProps> = ({
  children,
  className = '',
  iconClassName = '',
  glowClassName = '',
  label,
  onClick,
  type = 'button',
  tone = 'dark',
}) => {
  const isLight = tone === 'light';

  return (
    <motion.button
      type={type}
      aria-label={label}
      onClick={onClick}
      whileHover={{ scale: 1.06, y: -2 }}
      whileTap={{ scale: 0.94, y: 0 }}
      transition={{ type: 'spring', stiffness: 260, damping: 18 }}
      className={`relative inline-flex items-center justify-center overflow-hidden rounded-full backdrop-blur-xl ${className} ${
        isLight
          ? 'border border-black/20 bg-white/70 text-black shadow-[0_4px_14px_rgba(0,0,0,0.18),0_1px_2px_rgba(0,0,0,0.08)]'
          : 'border border-white/15 bg-white/[0.08] text-white shadow-[0_16px_40px_rgba(0,0,0,0.28)]'
      }`}
      style={{ backdropFilter: isLight ? 'blur(16px) saturate(140%)' : 'blur(18px) saturate(145%)' }}
    >
      <div
        className={`pointer-events-none absolute inset-[1px] rounded-full ${
          isLight
            ? 'border border-white/75 bg-gradient-to-b from-white/90 via-white/55 to-white/30'
            : 'border border-white/10 bg-gradient-to-br from-white/[0.18] via-white/[0.08] to-white/[0.03]'
        }`}
      />
      <div
        className={`pointer-events-none absolute inset-0 rounded-full ${
          isLight
            ? 'shadow-[inset_1px_1px_0_rgba(255,255,255,0.95),inset_-1px_-1px_1px_rgba(0,0,0,0.12),inset_0_0_18px_rgba(255,255,255,0.35)]'
            : 'opacity-90 shadow-[inset_1px_1px_1px_rgba(255,255,255,0.28),inset_-1px_-1px_1px_rgba(255,255,255,0.06),inset_0_0_22px_rgba(255,255,255,0.08)]'
        }`}
      />
      <div
        className={`pointer-events-none absolute left-[14%] top-[10%] rounded-full blur-md ${
          isLight ? 'h-[38%] w-[60%] bg-white/85' : 'h-[32%] w-[56%] bg-white/18'
        }`}
      />
      <div className={`pointer-events-none absolute inset-0 rounded-full opacity-70 ${glowClassName}`} />
      <span className={`relative z-10 flex items-center justify-center ${iconClassName}`}>
        {children}
      </span>
    </motion.button>
  );
};

export default LiquidIconButton;
