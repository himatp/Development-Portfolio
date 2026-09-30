import React from 'react';
import { motion } from 'framer-motion';
import { FRAMER_EASE } from '../../utils/motion';

interface ImageRevealProps {
  src: string;
  alt: string;
  className?: string;
  containerClassName?: string;
  delay?: number;
  hoverScale?: boolean;
}

export const ImageReveal: React.FC<ImageRevealProps> = ({
  src,
  alt,
  className = '',
  containerClassName = '',
  delay = 0,
  hoverScale = true,
}) => {
  return (
    <div className={`overflow-hidden relative ${containerClassName}`}>
      <motion.div
        initial={{ scale: 1.12, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{
          duration: 0.9,
          delay,
          ease: FRAMER_EASE,
        }}
        className="w-full h-full"
      >
        <motion.img
          src={src}
          alt={alt}
          whileHover={hoverScale ? { scale: 1.05 } : undefined}
          transition={{ duration: 0.6, ease: FRAMER_EASE }}
          className={`w-full h-full object-cover transition-all ${className}`}
          loading="lazy"
        />
      </motion.div>
    </div>
  );
};
