import React from 'react';
import { motion } from 'framer-motion';
import { STATS_DATA } from '../data/portfolioData';

export const StatsSection: React.FC = () => {
  return (
    <section className="py-16 md:py-24 border-y border-zinc-900 bg-zinc-950/60 relative">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="text-center mb-12">
          <span className="text-xs font-mono uppercase tracking-widest text-zinc-500">
            WHAT I'VE SHIPPED SO FAR
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 md:gap-8 max-w-4xl mx-auto">
          {STATS_DATA.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1, ease: 'easeOut' }}
              className="flex flex-col items-center text-center p-6 sm:p-8 rounded-2xl bg-zinc-900/30 border border-zinc-900 hover:border-zinc-800 transition-colors"
            >
              <div className="text-4xl sm:text-5xl md:text-6xl font-heading font-light text-white tracking-tight mb-2">
                <span>{stat.value}</span>
              </div>
              <span className="text-xs sm:text-sm text-zinc-400 font-mono">
                {stat.label}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
