import React from 'react';
import { motion } from 'framer-motion';
import { TRUST_DATA } from '../data/portfolioData';

export const TrustSection: React.FC = () => {
  return (
    <section className="py-20 md:py-28 bg-zinc-950 border-t border-zinc-900 overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-6 md:px-12 text-center mb-12">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-3xl sm:text-4xl font-heading font-light text-white mb-4"
        >
          {TRUST_DATA.heading}
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-base text-zinc-400 max-w-2xl mx-auto"
        >
          {TRUST_DATA.description}
        </motion.p>
      </div>

      {/* Infinite Horizontal Ticker */}
      <div className="flex overflow-hidden whitespace-nowrap mask-linear-fade relative py-4 bg-zinc-900/30 border-y border-zinc-900">
        <motion.div
          animate={{ x: ['0%', '-50%'] }}
          transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
          className="flex items-center gap-8 text-sm font-mono text-zinc-400 uppercase tracking-widest shrink-0"
        >
          {[...TRUST_DATA.technologies, ...TRUST_DATA.technologies].map((tech, idx) => (
            <div key={`${tech}-${idx}`} className="flex items-center gap-8">
              <span className="hover:text-white transition-colors cursor-default">{tech}</span>
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-500/60" />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
