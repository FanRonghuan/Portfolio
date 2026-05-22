import React from 'react';

interface RollingTextProps {
  text: string;
  className?: string;
}

const RollingText: React.FC<RollingTextProps> = ({ text, className = "" }) => {
  return (
    <span className={`inline-block overflow-hidden align-baseline ${className}`} style={{ height: "1em" }}>
      <span className="sr-only">{text}</span>
      <span
        aria-hidden="true"
        className="block whitespace-nowrap will-change-transform transition-transform duration-500 ease-[cubic-bezier(0.2,0.65,0.3,0.9)] group-hover:-translate-y-1/2"
      >
        <span className="block leading-none">{text}</span>
        <span className="block leading-none">{text}</span>
      </span>
    </span>
  );
};

export default RollingText;
