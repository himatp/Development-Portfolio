import React, { useEffect, useState, useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

// Organic SVG blob path variations with identical control point structure for seamless morphing
const BLOB_PATHS = [
  'M 250 50 C 380 40 460 130 450 250 C 440 370 360 460 250 450 C 140 440 40 360 50 250 C 60 140 120 60 250 50 Z',
  'M 270 60 C 420 80 440 190 430 290 C 420 390 310 440 210 430 C 110 420 50 310 70 190 C 90 70 120 40 270 60 Z',
  'M 230 40 C 350 70 470 150 440 270 C 410 390 330 460 210 440 C 90 420 40 290 60 170 C 80 50 110 10 230 40 Z',
  'M 260 55 C 390 45 450 160 460 265 C 470 370 340 450 230 445 C 120 440 50 340 60 220 C 70 100 130 65 260 55 Z',
];

const BlobVisual: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isTouchDevice, setIsTouchDevice] = useState<boolean>(false);
  const [scrollProgress, setScrollProgress] = useState<number>(0);

  // Mouse spring follow physics
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);

  const springConfig = { stiffness: 75, damping: 18, mass: 0.6 };
  const smoothX = useSpring(rawX, springConfig);
  const smoothY = useSpring(rawY, springConfig);

  useEffect(() => {
    // Touch device detection
    const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    setIsTouchDevice(isTouch);

    // Scroll progress listener
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const progress = Math.min(scrollY / 1000, 1);
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isTouchDevice || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const deltaX = (e.clientX - centerX) * 0.32;
    const deltaY = (e.clientY - centerY) * 0.32;

    rawX.set(deltaX);
    rawY.set(deltaY);
  };

  const handleMouseLeave = () => {
    if (isTouchDevice) return;
    rawX.set(0);
    rawY.set(0);
  };

  // Dynamic scroll transformations
  const scrollScale = 1 - scrollProgress * 0.28;
  const scrollOpacity = 1 - scrollProgress * 0.65;

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="w-full h-full relative bg-transparent select-none pointer-events-auto flex items-center justify-center"
    >
      <motion.div
        style={{
          x: smoothX,
          y: smoothY,
          scale: scrollScale,
          opacity: scrollOpacity,
        }}
        className="relative w-full max-w-[440px] sm:max-w-[500px] aspect-square flex items-center justify-center transition-transform duration-100 ease-out"
      >
        <svg
          viewBox="0 0 500 500"
          className="w-full h-full overflow-visible drop-shadow-[0_0_55px_rgba(168,85,247,0.45)]"
        >
          <defs>
            {/* Soft Ambient Radial Blur Filter */}
            <filter id="blobAuraBlur" x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur stdDeviation="22" result="blur" />
            </filter>

            {/* Glowing Gradient */}
            <linearGradient id="blobGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#a855f7" stopOpacity="0.85" />
              <stop offset="40%" stopColor="#818cf8" stopOpacity="0.80" />
              <stop offset="75%" stopColor="#6366f1" stopOpacity="0.75" />
              <stop offset="100%" stopColor="#38bdf8" stopOpacity="0.85" />
            </linearGradient>

            {/* Secondary Inner Glow Gradient */}
            <linearGradient id="innerGlow" x1="100%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#c084fc" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#818cf8" stopOpacity="0.2" />
            </linearGradient>
          </defs>

          {/* Outer Ethereal Glow Aura Layer */}
          <motion.path
            animate={{
              d: BLOB_PATHS,
              rotate: [0, 90, 180, 270, 360],
            }}
            transition={{
              d: {
                duration: 14,
                repeat: Infinity,
                repeatType: 'mirror',
                ease: 'easeInOut',
              },
              rotate: {
                duration: 28,
                repeat: Infinity,
                ease: 'linear',
              },
            }}
            fill="url(#blobGradient)"
            filter="url(#blobAuraBlur)"
            className="opacity-70 transform-origin-center"
          />

          {/* Main Morphing Blob Layer */}
          <motion.path
            animate={{
              d: BLOB_PATHS,
              rotate: [0, -90, -180, -270, -360],
            }}
            transition={{
              d: {
                duration: 12,
                repeat: Infinity,
                repeatType: 'mirror',
                ease: 'easeInOut',
              },
              rotate: {
                duration: 22,
                repeat: Infinity,
                ease: 'linear',
              },
            }}
            fill="url(#blobGradient)"
            className="transform-origin-center mix-blend-screen opacity-90"
          />

          {/* Inner Highlight Layer */}
          <motion.path
            animate={{
              d: [BLOB_PATHS[2], BLOB_PATHS[0], BLOB_PATHS[3], BLOB_PATHS[1]],
              scale: [0.85, 0.92, 0.85],
            }}
            transition={{
              d: {
                duration: 10,
                repeat: Infinity,
                repeatType: 'mirror',
                ease: 'easeInOut',
              },
              scale: {
                duration: 8,
                repeat: Infinity,
                repeatType: 'mirror',
                ease: 'easeInOut',
              },
            }}
            fill="url(#innerGlow)"
            className="transform-origin-center opacity-70"
          />
        </svg>
      </motion.div>
    </div>
  );
};

export default BlobVisual;
