import React from 'react';
import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { FRAMER_EASE } from '../../utils/motion';

interface TextRevealProps {
  text: string;
  className?: string;
  delay?: number;
  as?: keyof React.JSX.IntrinsicElements;
  once?: boolean;
}

export const TextReveal: React.FC<TextRevealProps> = ({
  text,
  className = '',
  delay = 0,
  as: Component = 'div',
  once = true,
}) => {
  const words = text.split(' ');

  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.04,
        delayChildren: delay,
      },
    },
  };

  const wordVariants: Variants = {
    hidden: {
      opacity: 0,
      y: '100%',
      filter: 'blur(4px)',
    },
    visible: {
      opacity: 1,
      y: '0%',
      filter: 'blur(0px)',
      transition: {
        duration: 0.75,
        ease: FRAMER_EASE,
      },
    },
  };

  return (
    <Component className={`inline-block overflow-hidden ${className}`}>
      <motion.span
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once, margin: '-40px' }}
        className="inline-flex flex-wrap gap-x-[0.28em] gap-y-[0.1em] py-1"
      >
        {words.map((word, index) => (
          <span key={`${word}-${index}`} className="inline-block overflow-hidden py-1">
            <motion.span
              variants={wordVariants}
              className="inline-block"
            >
              {word}
            </motion.span>
          </span>
        ))}
      </motion.span>
    </Component>
  );
};
