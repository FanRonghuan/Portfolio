import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import ShapeBlur from './ShapeBlur';

type ShapeBlurHoverLayerProps = {
  isHovered: boolean;
  className?: string;
  borderRadius?: string;
  variation?: 0 | 1 | 2 | 3;
  shapeSize?: number;
  roundness?: number;
  borderSize?: number;
  circleSize?: number;
  circleEdge?: number;
  opacity?: number;
  blurClassName?: string;
};

const ShapeBlurHoverLayer: React.FC<ShapeBlurHoverLayerProps> = ({
  isHovered,
  className = '',
  borderRadius = '2rem',
  variation = 0,
  shapeSize = 0.5,
  roundness = 0.5,
  borderSize = 0.05,
  circleSize = 0.5,
  circleEdge = 1,
  opacity = 0.9,
  blurClassName = '',
}) => {
  return (
    <AnimatePresence>
      {isHovered && (
        <motion.div
          key="shape-blur-hover"
          initial={{ opacity: 0 }}
          animate={{ opacity }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18, ease: 'easeOut' }}
          className={`pointer-events-none absolute inset-0 z-[15] overflow-hidden ${className}`}
          style={{ borderRadius }}
        >
          <div
            className={`absolute inset-0 mix-blend-screen ${blurClassName}`}
            style={{
              filter: 'blur(0.5px)',
              opacity: 0.9,
            }}
          >
            <ShapeBlur
              variation={variation}
              pixelRatioProp={typeof window !== 'undefined' ? window.devicePixelRatio || 1 : 1}
              shapeSize={shapeSize}
              roundness={roundness}
              borderSize={borderSize}
              circleSize={circleSize}
              circleEdge={circleEdge}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ShapeBlurHoverLayer;
