import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TECH_SKILLS_DATA } from '../data/portfolioData';
import { SectionHeader } from '../components/ui/SectionHeader';
import { StaggerContainer, RevealItem } from '../components/motion/StaggerContainer';

export const TechSkillsSection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const categories = ['All', 'Frontend', 'Backend', 'AI & ML', 'Language', 'Tools'];

  const filteredSkills = activeCategory === 'All'
    ? TECH_SKILLS_DATA
    : TECH_SKILLS_DATA.filter((item) => item.category.toLowerCase().includes(activeCategory.toLowerCase()));

  return (
    <section className="py-24 md:py-36 bg-zinc-950 border-t border-zinc-900 relative">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <SectionHeader
          title="Tools I Work With"
          subtitle="Modern technologies and frameworks powering frontend interfaces, backend systems, and AI workflows."
        />

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs font-mono transition-all ${
                activeCategory === cat
                  ? 'bg-white text-black font-semibold shadow-md'
                  : 'bg-zinc-900 text-zinc-400 border border-zinc-800 hover:text-zinc-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Skill Badges Grid */}
        <StaggerContainer className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4">
          <AnimatePresence>
            {filteredSkills.map((skill) => (
              <RevealItem key={skill.name}>
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  whileHover={{ y: -4, borderColor: 'rgba(255,255,255,0.2)' }}
                  className="p-4 rounded-xl bg-zinc-900/50 border border-zinc-800/80 flex flex-col items-start justify-between gap-3 group transition-colors"
                  data-cursor-text="Tech"
                >
                  <div className="w-8 h-8 rounded-lg bg-zinc-800/60 border border-zinc-700/60 flex items-center justify-center text-zinc-300 group-hover:text-indigo-400 group-hover:border-indigo-500/30 transition-colors text-xs font-mono">
                    {skill.name.substring(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-white group-hover:text-indigo-200 transition-colors">
                      {skill.name}
                    </h4>
                    <span className="text-[10px] font-mono text-zinc-500">
                      {skill.category}
                    </span>
                  </div>
                </motion.div>
              </RevealItem>
            ))}
          </AnimatePresence>
        </StaggerContainer>
      </div>
    </section>
  );
};
