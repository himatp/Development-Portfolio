import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { SimpleService } from '../../data/portfolioData';
import { StaggerContainer, RevealItem } from '../motion/StaggerContainer';

interface EditorialListProps {
  services: SimpleService[];
}

const EditorialList: React.FC<EditorialListProps> = ({ services }) => {
  const [activeIndex, setActiveIndex] = useState<number>(0);

  return (
    <StaggerContainer className="w-full max-w-5xl mx-auto divide-y divide-zinc-800/60 border-t border-b border-zinc-800/60">
      {services.map((service, index) => {
        const isActive = activeIndex === index;

        return (
          <RevealItem key={service.id}>
            <div
              onMouseEnter={() => setActiveIndex(index)}
              onClick={() => setActiveIndex(index)}
              className="py-8 sm:py-10 transition-colors duration-300 cursor-pointer group"
            >
              {/* Main Header Row */}
              <div className="flex items-center justify-between gap-6">
                <h3 className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-heading font-light tracking-tight transition-all duration-300 ${
                  isActive ? 'text-white translate-x-2' : 'text-zinc-500 group-hover:text-zinc-300'
                }`}>
                  {service.title}
                </h3>

                {/* Status Indicator Dot */}
                <div className="hidden sm:flex items-center">
                  <span className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                    isActive ? 'bg-indigo-400 scale-125 shadow-lg shadow-indigo-500/50' : 'bg-zinc-800 group-hover:bg-zinc-700'
                  }`} />
                </div>
              </div>

              {/* Expandable Description */}
              <AnimatePresence initial={false}>
                {isActive && (
                  <motion.div
                    initial={{ opacity: 0, height: 0, marginTop: 0 }}
                    animate={{ opacity: 1, height: 'auto', marginTop: 16 }}
                    exit={{ opacity: 0, height: 0, marginTop: 0 }}
                    transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                    className="overflow-hidden"
                  >
                    <p className="text-base sm:text-lg text-zinc-300 font-normal leading-relaxed max-w-2xl">
                      {service.description}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </RevealItem>
        );
      })}
    </StaggerContainer>
  );
};

export default EditorialList;
