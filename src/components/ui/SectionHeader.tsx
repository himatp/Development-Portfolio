import React from 'react';
import { motion } from 'framer-motion';
import { TypewriterHeading } from './TypewriterHeading';
import { ScrollWordReveal } from '../motion/ScrollWordReveal';

interface SectionHeaderProps {
  label?: string;
  title: string;
  subtitle?: string;
  className?: string;
  align?: 'left' | 'center';
  scrollReveal?: boolean;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  title,
  subtitle,
  className = '',
  align = 'left',
  scrollReveal = false,
}) => {
  return (
    <div className={`mb-12 md:mb-20 ${align === 'center' ? 'text-center max-w-3xl mx-auto' : 'max-w-3xl'} ${className}`}>
      {scrollReveal ? (
        <ScrollWordReveal
          text={title}
          as="h2"
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-heading font-light tracking-tight text-white leading-[1.1] mb-6 block"
        />
      ) : (
        <TypewriterHeading
          text={title}
          as="h2"
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-heading font-light tracking-tight text-white leading-[1.1] mb-6 block"
        />
      )}

      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
          className="text-base sm:text-lg text-zinc-400 font-normal leading-relaxed"
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
};

