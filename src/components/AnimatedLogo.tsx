import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'motion/react';

const LOGO_SOURCES = [
  { id: 'logo-1', src: '/logo-1.png', alt: 'নুন-মুন লোগো ১' },
  { id: 'logo-2', src: '/logo-2.png', alt: 'নুন-মুন লোগো ২' },
];

export type LogoTransitionDirection = 
  | 'up-to-down' 
  | 'right-to-left' 
  | 'down-to-up' 
  | 'left-to-right';

const DIRECTION_CYCLE: LogoTransitionDirection[] = [
  'up-to-down',
  'right-to-left',
  'down-to-up',
  'left-to-right',
];

interface AnimatedLogoProps {
  className?: string;
  intervalMs?: number;
}

const variants = {
  enter: (dir: LogoTransitionDirection) => {
    switch (dir) {
      case 'up-to-down':
        return { y: '-100%', x: 0, opacity: 0.2 };
      case 'right-to-left':
        return { x: '100%', y: 0, opacity: 0.2 };
      case 'down-to-up':
        return { y: '100%', x: 0, opacity: 0.2 };
      case 'left-to-right':
        return { x: '-100%', y: 0, opacity: 0.2 };
    }
  },
  center: {
    x: 0,
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.65,
      ease: [0.16, 1, 0.3, 1], // Smooth snappy ease
    },
  },
  exit: (dir: LogoTransitionDirection) => {
    switch (dir) {
      case 'up-to-down':
        return {
          y: '100%',
          x: 0,
          opacity: 0.2,
          transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] },
        };
      case 'right-to-left':
        return {
          x: '-100%',
          y: 0,
          opacity: 0.2,
          transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] },
        };
      case 'down-to-up':
        return {
          y: '-100%',
          x: 0,
          opacity: 0.2,
          transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] },
        };
      case 'left-to-right':
        return {
          x: '100%',
          y: 0,
          opacity: 0.2,
          transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] },
        };
    }
  },
};

export const AnimatedLogo: React.FC<AnimatedLogoProps> = ({
  className = 'w-full h-full object-cover',
  intervalMs = 2500, // 2.5 seconds (in the requested 2-3s range)
}) => {
  const [logoIndex, setLogoIndex] = useState<number>(0);
  const [directionIndex, setDirectionIndex] = useState<number>(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setLogoIndex((prev) => (prev + 1) % LOGO_SOURCES.length);
      setDirectionIndex((prev) => (prev + 1) % DIRECTION_CYCLE.length);
    }, intervalMs);

    return () => clearInterval(timer);
  }, [intervalMs]);

  const currentLogo = LOGO_SOURCES[logoIndex];
  const currentDirection = DIRECTION_CYCLE[directionIndex];

  return (
    <div className="relative w-full h-full overflow-hidden flex items-center justify-center">
      <AnimatePresence initial={false} custom={currentDirection}>
        <motion.div
          key={`${currentLogo.id}-${logoIndex}`}
          custom={currentDirection}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          className="absolute inset-0 w-full h-full flex items-center justify-center pointer-events-none select-none"
        >
          <img
            src={currentLogo.src}
            alt={currentLogo.alt}
            className={`${className} pointer-events-none select-none`}
            loading="eager"
            decoding="async"
            draggable={false}
          />
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
