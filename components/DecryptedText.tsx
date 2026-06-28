import React, { useEffect, useMemo, useRef, useState } from 'react';

type RevealDirection = 'start' | 'center' | 'end';

interface DecryptedTextProps {
  text: string;
  className?: string;
  encryptedClassName?: string;
  parentClassName?: string;
  speed?: number;
  animateOn?: 'hover';
  sequential?: boolean;
  revealDirection?: RevealDirection;
  characters?: string;
}

const srOnlyStyle: React.CSSProperties = {
  position: 'absolute',
  width: '1px',
  height: '1px',
  padding: 0,
  margin: '-1px',
  overflow: 'hidden',
  clip: 'rect(0,0,0,0)',
  border: 0,
};

const buildRevealOrder = (length: number, direction: RevealDirection) => {
  if (direction === 'start') {
    return Array.from({ length }, (_, index) => index);
  }

  if (direction === 'end') {
    return Array.from({ length }, (_, index) => length - 1 - index);
  }

  const middle = Math.floor((length - 1) / 2);
  const order: number[] = [];

  for (let offset = 0; order.length < length; offset += 1) {
    const right = middle + offset;
    const left = middle - offset - (length % 2 === 0 ? 0 : 0);

    if (offset === 0) {
      order.push(middle);
      continue;
    }

    if (right < length) {
      order.push(right);
    }

    if (left >= 0) {
      order.push(left);
    }
  }

  return order.slice(0, length);
};

const DecryptedText: React.FC<DecryptedTextProps> = ({
  text,
  className = '',
  encryptedClassName = '',
  parentClassName = '',
  speed = 42,
  sequential = true,
  revealDirection = 'center',
  characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890',
}) => {
  const [displayChars, setDisplayChars] = useState<string[]>(() => text.split(''));
  const [revealedIndices, setRevealedIndices] = useState<Set<number>>(new Set());
  const [isHovering, setIsHovering] = useState(false);
  const intervalRef = useRef<number | null>(null);
  const pointerRef = useRef(0);

  const chars = useMemo(() => text.split(''), [text]);
  const scramblePool = useMemo(() => characters.split(''), [characters]);
  const revealOrder = useMemo(() => buildRevealOrder(chars.length, revealDirection), [chars.length, revealDirection]);

  const stopAnimation = () => {
    if (intervalRef.current !== null) {
      window.clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  useEffect(() => () => stopAnimation(), []);

  const resetToPlainText = () => {
    stopAnimation();
    pointerRef.current = 0;
    setRevealedIndices(new Set());
    setDisplayChars(chars);
    setIsHovering(false);
  };

  const startAnimation = () => {
    stopAnimation();
    pointerRef.current = 0;
    setIsHovering(true);
    setRevealedIndices(new Set());

    intervalRef.current = window.setInterval(() => {
      pointerRef.current += 1;

      const nextRevealed = new Set(revealOrder.slice(0, pointerRef.current));

      const nextChars = chars.map((char, index) => {
        if (char === ' ') {
          return ' ';
        }

        if (nextRevealed.has(index)) {
          return char;
        }

        return scramblePool[Math.floor(Math.random() * scramblePool.length)];
      });

      setRevealedIndices(nextRevealed);
      setDisplayChars(nextChars);

      if (pointerRef.current >= chars.length) {
        stopAnimation();
        setDisplayChars(chars);
      }
    }, sequential ? speed : speed * 2);
  };

  return (
    <span
      className={parentClassName}
      onMouseEnter={startAnimation}
      onMouseLeave={resetToPlainText}
      style={{ display: 'inline-block', whiteSpace: 'pre' }}
    >
      <span style={srOnlyStyle}>{text}</span>
      <span aria-hidden="true">
        {displayChars.map((char, index) => {
          const isRevealed = !isHovering || revealedIndices.has(index) || char === ' ';

          return (
            <span
              key={`${text}-${index}`}
              className={isRevealed ? className : encryptedClassName}
            >
              {char}
            </span>
          );
        })}
      </span>
    </span>
  );
};

export default DecryptedText;
