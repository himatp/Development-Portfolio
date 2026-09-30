import React from 'react';
import { motion } from 'framer-motion';
import { PROCESS_DATA } from '../data/portfolioData';
import { SectionHeader } from '../components/ui/SectionHeader';
import { StaggerContainer, RevealItem } from '../components/motion/StaggerContainer';
import { CheckCircle2 } from 'lucide-react';

export const ProcessSection: React.FC = () => {
  return (
    <section id="process" className="py-24 md:py-36 bg-zinc-950/90 border-t border-zinc-900 relative">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <SectionHeader
          title="How I Work"
          subtitle="A structured 4-step development workflow ensuring transparent communication and high-quality results."
        />

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {PROCESS_DATA.map((step, index) => (
            <RevealItem key={step.number}>
              <motion.div
                whileHover={{ y: -4 }}
                transition={{ duration: 0.3 }}
                className="h-full p-6 sm:p-8 rounded-3xl bg-zinc-900/40 border border-zinc-800/80 hover:border-zinc-700 hover:bg-zinc-900/60 transition-all flex flex-col justify-between group"
              >
                <div>
                  {/* Step Number & Connector Line */}
                  <div className="flex items-center justify-between mb-8">
                    <span className="text-2xl font-mono font-bold text-indigo-400">
                      {step.number}
                    </span>
                    <span className="text-[10px] font-mono uppercase text-zinc-500 tracking-wider">
                      Phase 0{index + 1}
                    </span>
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-2xl font-heading font-medium text-white mb-3 group-hover:text-indigo-200 transition-colors">
                    {step.title}
                  </h3>

                  <p className="text-sm text-zinc-400 leading-relaxed mb-6">
                    {step.description}
                  </p>
                </div>

                {/* Sub-bullet details */}
                <div className="pt-6 border-t border-zinc-800/60 space-y-2">
                  {step.details.map((detail, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-zinc-400">
                      <CheckCircle2 className="w-3.5 h-3.5 text-indigo-400 shrink-0 mt-0.5" />
                      <span>{detail}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </RevealItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
};
