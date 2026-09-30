import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus } from 'lucide-react';
import { FAQ_DATA } from '../data/portfolioData';
import { SectionHeader } from '../components/ui/SectionHeader';

export const FAQSection: React.FC = () => {
  const [openId, setOpenId] = useState<string | null>(FAQ_DATA[0].id);

  const toggleFAQ = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section className="py-24 md:py-36 bg-zinc-950 border-t border-zinc-900 relative">
      <div className="max-w-4xl mx-auto px-6 md:px-12">
        <SectionHeader
          title="Frequently Asked Questions"
          subtitle="Everything you need to know about working together, timelines, and technical process."
        />

        <div className="space-y-4">
          {FAQ_DATA.map((item, index) => {
            const isOpen = openId === item.id;
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="rounded-2xl bg-zinc-900/40 border border-zinc-800/80 overflow-hidden transition-colors hover:border-zinc-700"
              >
                <button
                  type="button"
                  onClick={() => toggleFAQ(item.id)}
                  className="w-full p-6 text-left flex items-center justify-between gap-4 transition-colors"
                  aria-expanded={isOpen}
                >
                  <span className="text-base sm:text-lg font-heading font-medium text-white pr-4">
                    {item.question}
                  </span>
                  <motion.div
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                    className="p-2 rounded-full bg-zinc-800 text-zinc-300 shrink-0"
                  >
                    <Plus className="w-4 h-4" />
                  </motion.div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-6 pt-2 text-sm text-zinc-400 leading-relaxed border-t border-zinc-800/40">
                        {item.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
