import type { Transition, Variants } from 'framer-motion';

// Framer signature easing curve (ultra smooth easeOutExpo style)
export const FRAMER_EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

export const SPRING_TRANSITION: Transition = {
  type: 'spring',
  stiffness: 380,
  damping: 30,
  mass: 0.8,
};

export const SMOOTH_TRANSITION: Transition = {
  duration: 0.7,
  ease: FRAMER_EASE,
};

export const fadeUpVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 35,
    filter: 'blur(4px)',
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: SMOOTH_TRANSITION,
  },
};

export const staggerContainerVariants = (staggerDelay = 0.08, delayChildren = 0): Variants => ({
  hidden: {},
  visible: {
    transition: {
      staggerChildren: staggerDelay,
      delayChildren: delayChildren,
    },
  },
});
