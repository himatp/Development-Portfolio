import React, { useEffect, useState } from 'react';
import { motion, useSpring } from 'framer-motion';

export const CustomCursor: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [cursorText, setCursorText] = useState('');
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  // Snappy spring config for tight cursor tracking
  const springConfig = { stiffness: 550, damping: 30, mass: 0.4 };
  const cursorX = useSpring(-100, springConfig);
  const cursorY = useSpring(-100, springConfig);

  useEffect(() => {
    // Check if touch device
    if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
      setIsTouchDevice(true);
      return;
    }

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      
      // Check for interactive elements
      const interactiveEl = target.closest('a, button, [role="button"], input, textarea, select, .cursor-hover-target');
      
      if (interactiveEl) {
        setIsHovered(true);
        const customText = interactiveEl.getAttribute('data-cursor-text');
        if (customText) {
          setCursorText(customText);
        } else if (interactiveEl.tagName === 'A' || interactiveEl.tagName === 'BUTTON') {
          setCursorText('');
        }
      } else {
        setIsHovered(false);
        setCursorText('');
      }
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mouseover', handleMouseOver);
    document.body.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseover', handleMouseOver);
      document.body.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [cursorX, cursorY, isVisible]);

  if (isTouchDevice || !isVisible) return null;

  return (
    <motion.div
      className="fixed top-0 left-0 pointer-events-none z-[9999] flex items-center justify-center rounded-full mix-blend-difference"
      style={{
        x: cursorX,
        y: cursorY,
        translateX: '-50%',
        translateY: '-50%',
      }}
      animate={{
        width: cursorText ? 70 : isHovered ? 44 : 14,
        height: cursorText ? 70 : isHovered ? 44 : 14,
        backgroundColor: cursorText ? 'rgba(255, 255, 255, 0.95)' : isHovered ? 'rgba(255, 255, 255, 0.85)' : '#ffffff',
      }}
      transition={{ type: 'spring', stiffness: 550, damping: 30, mass: 0.4 }}
    >
      {cursorText && (
        <span className="text-[10px] font-medium tracking-wider text-black uppercase select-none px-2 text-center">
          {cursorText}
        </span>
      )}
    </motion.div>
  );
};
