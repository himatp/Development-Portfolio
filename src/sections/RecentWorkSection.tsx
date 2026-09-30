import React from 'react';
import { motion } from 'framer-motion';
import { Terminal, Zap, GraduationCap, ArrowRight } from 'lucide-react';
import { RECENT_WORK_DATA } from '../data/portfolioData';
import { SectionHeader } from '../components/ui/SectionHeader';
import { StaggerContainer, RevealItem } from '../components/motion/StaggerContainer';
import { MagneticButton } from '../components/motion/MagneticButton';

export const RecentWorkSection: React.FC = () => {
  const getIcon = (index: number) => {
    switch (index) {
      case 0:
        return <Terminal className="w-5 h-5 text-indigo-400" />;
      case 1:
        return <Zap className="w-5 h-5 text-cyan-400" />;
      case 2:
        return <GraduationCap className="w-5 h-5 text-emerald-400" />;
      default:
        return <Terminal className="w-5 h-5 text-indigo-400" />;
    }
  };

  return (
    <section className="py-24 md:py-36 bg-zinc-950 border-t border-zinc-900 relative">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <SectionHeader
          label="06 / RECENT WORK"
          title={RECENT_WORK_DATA.heading}
          subtitle={RECENT_WORK_DATA.subtext}
        />

        {/* 3 Highlight Cards */}
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-12">
          {RECENT_WORK_DATA.highlights.map((item, idx) => (
            <RevealItem key={item.id}>
              <motion.div
                whileHover={{ y: -6 }}
                transition={{ duration: 0.3 }}
                className="h-full p-8 rounded-3xl bg-zinc-900/40 border border-zinc-800/80 hover:border-zinc-700 hover:bg-zinc-900/70 transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-indigo-400 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20">
                      {item.badge}
                    </span>
                    <div className="p-2.5 rounded-xl bg-zinc-800/80 border border-zinc-700/60">
                      {getIcon(idx)}
                    </div>
                  </div>

                  <h3 className="text-xl font-heading font-medium text-white mb-3 group-hover:text-indigo-200 transition-colors">
                    {item.title}
                  </h3>

                  <p className="text-sm text-zinc-400 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="pt-6 border-t border-zinc-800/60 mt-6 flex items-center justify-between text-xs font-mono text-zinc-500 group-hover:text-zinc-300 transition-colors">
                  <span>Highlight 0{idx + 1}</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </motion.div>
            </RevealItem>
          ))}
        </StaggerContainer>

        <div className="text-center">
          <MagneticButton href="#contact">
            <span className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-300 text-xs font-mono hover:text-white hover:border-zinc-700 transition-all cursor-pointer">
              <span>Interested in working together? Let's talk</span>
              <ArrowRight className="w-3.5 h-3.5 text-indigo-400" />
            </span>
          </MagneticButton>
        </div>
      </div>
    </section>
  );
};
