import React, { useEffect, useMemo, useRef } from 'react';
import { gsap } from 'gsap';

interface SplitTextProps {
  text: string;
  className?: string;
  delay?: number;
  duration?: number;
  ease?: string;
  from?: gsap.TweenVars;
  to?: gsap.TweenVars;
  textAlign?: React.CSSProperties['textAlign'];
  tag?: keyof JSX.IntrinsicElements;
}

const SplitText: React.FC<SplitTextProps> = ({
  text,
  className = '',
  delay = 50,
  duration = 1.25,
  ease = 'power3.out',
  from = { opacity: 0, y: 40 },
  to = { opacity: 1, y: 0 },
  textAlign = 'center',
  tag = 'p',
}) => {
  const ref = useRef<HTMLElement | null>(null);
  const chars = useMemo(() => Array.from(text), [text]);

  useEffect(() => {
    if (!ref.current) return;

    const targets = ref.current.querySelectorAll('.split-char');
    const tween = gsap.fromTo(
      targets,
      { ...from },
      {
        ...to,
        duration,
        ease,
        stagger: delay / 1000,
        willChange: 'transform, opacity',
        force3D: true,
      }
    );

    return () => tween.kill();
  }, [chars, delay, duration, ease, from, to]);

  const Tag = tag as keyof JSX.IntrinsicElements;

  return React.createElement(
    Tag,
    {
      ref: (node: HTMLElement | null) => {
        ref.current = node;
      },
      className: `split-parent ${className}`,
      style: {
        textAlign,
        overflow: 'hidden',
        display: 'inline-block',
        whiteSpace: 'normal',
        wordWrap: 'break-word',
      },
    },
    chars.map((char, index) => (
      <span key={`${char}-${index}`} className="split-char inline-block">
        {char === ' ' ? '\u00A0' : char}
      </span>
    ))
  );
};

export default SplitText;
