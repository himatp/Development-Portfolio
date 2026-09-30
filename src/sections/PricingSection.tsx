import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { Check, Sparkles, ArrowRight, ChevronDown } from 'lucide-react';
import { RATE_CARD_DATA, FEATURE_EXPLANATIONS } from '../data/portfolioData';
import { SectionHeader } from '../components/ui/SectionHeader';
import { StaggerContainer, RevealItem } from '../components/motion/StaggerContainer';
import { MagneticButton } from '../components/motion/MagneticButton';

// Price count-up component on scroll into view
const CountUpPrice: React.FC<{ price: string; unit?: string; delay?: number }> = ({ price, unit, delay = 0 }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-40px' });
  const [displayValue, setDisplayValue] = useState<number>(0);

  const numericTarget = parseInt(price.replace(/[^0-9]/g, ''), 10) || 0;

  useEffect(() => {
    if (!isInView) return;

    let startTimestamp: number | null = null;
    const duration = 1000;

    const timeout = setTimeout(() => {
      const step = (timestamp: number) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        // Ease out cubic formula
        const easeProgress = 1 - Math.pow(1 - progress, 3);
        setDisplayValue(Math.floor(easeProgress * numericTarget));

        if (progress < 1) {
          window.requestAnimationFrame(step);
        } else {
          setDisplayValue(numericTarget);
        }
      };
      window.requestAnimationFrame(step);
    }, delay * 1000);

    return () => clearTimeout(timeout);
  }, [isInView, numericTarget, delay]);

  return (
    <span ref={ref} className="inline-flex items-baseline gap-1">
      <span className="text-3xl sm:text-4xl font-heading font-semibold text-white">
        ₹{displayValue.toLocaleString('en-IN')}
      </span>
      {unit && <span className="text-xs font-mono text-zinc-400">{unit}</span>}
    </span>
  );
};

// Quiz Filter Categories
const QUIZ_FILTERS = [
  { id: 'all', label: 'Show All', matches: null },
  { id: 'landing', label: 'Just a landing page?', matches: ['rate-landing'] },
  { id: 'website', label: 'Need a full website or store?', matches: ['rate-biz', 'rate-pro-web', 'rate-custom-web', 'rate-ecommerce'] },
  { id: 'custom', label: 'Need custom software or AI?', matches: ['rate-software', 'rate-ai'] },
];

export const PricingSection: React.FC = () => {
  const [activeQuizFilter, setActiveQuizFilter] = useState<string>('all');
  const [expandedExclusions, setExpandedExclusions] = useState<Record<string, boolean>>({});
  const [expandedFeature, setExpandedFeature] = useState<Record<string, string | null>>({});
  const [isTouchDevice, setIsTouchDevice] = useState<boolean>(false);

  useEffect(() => {
    const touch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    setIsTouchDevice(touch);
  }, []);

  const activeFilterObj = QUIZ_FILTERS.find((f) => f.id === activeQuizFilter);
  const activeMatches = activeFilterObj?.matches || null;

  const toggleExclusion = (id: string) => {
    setExpandedExclusions((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const toggleFeatureExplanation = (cardId: string, featureText: string) => {
    setExpandedFeature((prev) => ({
      ...prev,
      [cardId]: prev[cardId] === featureText ? null : featureText,
    }));
  };

  return (
    <section className="py-24 md:py-36 bg-zinc-950/80 border-t border-zinc-900 relative">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <SectionHeader
          title="Transparent Service Rates"
          subtitle="Clear starting rate card for web development, custom software, AI solutions, and maintenance."
        />

        {/* Quiz-Style Filter Toggle Bar */}
        <div className="mb-12 flex flex-wrap items-center justify-center gap-2 sm:gap-3">
          {QUIZ_FILTERS.map((filter) => {
            const isActive = activeQuizFilter === filter.id;

            return (
              <button
                key={filter.id}
                type="button"
                onClick={() => setActiveQuizFilter(filter.id)}
                className={`px-4 py-2 rounded-full text-xs font-mono transition-all cursor-pointer ${
                  isActive
                    ? 'bg-indigo-500 text-white shadow-lg shadow-indigo-500/25 border border-indigo-400 font-medium'
                    : 'bg-zinc-900/80 text-zinc-400 hover:text-white border border-zinc-800 hover:border-zinc-700'
                }`}
              >
                {filter.label}
              </button>
            );
          })}
        </div>

        {/* Top 3 Featured / Popular Cards */}
        <div className="mb-12">
          <span className="text-xs font-mono uppercase tracking-widest text-indigo-400 block mb-6">
            ★ Featured Services
          </span>
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {RATE_CARD_DATA.popular.map((item, idx) => {
              const isMatch = activeMatches === null || activeMatches.includes(item.id);
              const isDimmed = activeMatches !== null && !isMatch;
              const isExclusionOpen = Boolean(expandedExclusions[item.id]);

              return (
                <RevealItem key={item.id}>
                  <motion.div
                    whileHover={{ y: -6 }}
                    transition={{ duration: 0.3 }}
                    className={`h-full p-8 rounded-3xl bg-zinc-900/90 border-2 flex flex-col justify-between relative transition-all duration-300 ${
                      isDimmed ? 'opacity-40 grayscale-[20%] scale-[0.98]' : 'opacity-100 scale-100'
                    } ${
                      activeMatches !== null && isMatch
                        ? 'border-indigo-400 shadow-2xl shadow-indigo-500/30 ring-2 ring-indigo-500/60'
                        : 'border-indigo-500/80 shadow-2xl shadow-indigo-500/10'
                    }`}
                  >
                    {/* Badge */}
                    <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-indigo-500 to-cyan-500 text-white text-[10px] font-mono uppercase font-bold tracking-widest flex items-center gap-1.5 shadow-md">
                      <Sparkles className="w-3 h-3" />
                      <span>Popular Service</span>
                    </div>

                    <div>
                      {/* Top Header Title */}
                      <div className="mb-4 pt-2">
                        <span className="text-xs font-mono uppercase text-zinc-400 tracking-wider font-semibold">
                          {item.title}
                        </span>
                      </div>

                      {/* Animated Price Count-up */}
                      <div className="mb-6">
                        <span className="text-xs font-mono text-zinc-400 block mb-1">Starting</span>
                        <CountUpPrice price={item.price} unit={item.unit} delay={idx * 0.15} />
                      </div>

                      {/* Description */}
                      <p className="text-xs text-zinc-400 leading-relaxed mb-6">
                        {item.description}
                      </p>

                      {/* Included Highlights with Click-to-Expand Explanation */}
                      <div className="space-y-1.5 mb-6">
                        {item.highlights.map((h) => {
                          const explanation = FEATURE_EXPLANATIONS[h];
                          const isFeatureExpanded = expandedFeature[item.id] === h;

                          return (
                            <div key={h} className="flex flex-col">
                              <div
                                onClick={() => toggleFeatureExplanation(item.id, h)}
                                title={isTouchDevice ? undefined : 'Click to show additional desc'}
                                data-cursor-text={isTouchDevice ? undefined : 'Click to show additional desc'}
                                className="flex items-start justify-between gap-2 text-xs text-zinc-300 py-1 px-1.5 -mx-1.5 rounded-lg hover:bg-zinc-800/50 transition-colors cursor-pointer group/bullet"
                              >
                                <div className="flex items-start gap-2.5">
                                  <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                                  <span className="group-hover/bullet:text-white transition-colors">{h}</span>
                                </div>
                                <ChevronDown
                                  className={`w-3.5 h-3.5 text-zinc-500 shrink-0 mt-0.5 group-hover/bullet:text-indigo-400 transition-transform duration-200 ${
                                    isFeatureExpanded ? 'rotate-180 text-indigo-400' : ''
                                  }`}
                                />
                              </div>

                              <AnimatePresence>
                                {isFeatureExpanded && explanation && (
                                  <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: 'auto', opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    transition={{ duration: 0.22, ease: 'easeOut' }}
                                    className="overflow-hidden mt-1 mb-2 ml-6 p-2.5 rounded-xl bg-indigo-500/10 border border-indigo-500/25 text-[11px] text-indigo-200 leading-relaxed font-sans shadow-inner"
                                  >
                                    {explanation}
                                  </motion.div>
                                )}
                              </AnimatePresence>
                            </div>
                          );
                        })}
                      </div>

                      {/* AI Solutions Custom Note */}
                      {item.id === 'rate-ai' && RATE_CARD_DATA.note && (
                        <p className="text-[11px] font-mono text-indigo-300/80 bg-indigo-500/10 p-2.5 rounded-lg border border-indigo-500/20 mb-4">
                          * {RATE_CARD_DATA.note}
                        </p>
                      )}

                      {/* Expandable "What's not included" */}
                      {item.exclusions && (
                        <div className="mb-6">
                          <button
                            type="button"
                            onClick={() => toggleExclusion(item.id)}
                            className="text-[11px] font-mono text-zinc-400 hover:text-indigo-300 flex items-center gap-1 transition-colors py-1 cursor-pointer"
                          >
                            <span>What's not included</span>
                            <ChevronDown
                              className={`w-3.5 h-3.5 transition-transform duration-200 ${
                                isExclusionOpen ? 'rotate-180 text-indigo-400' : ''
                              }`}
                            />
                          </button>

                          <AnimatePresence>
                            {isExclusionOpen && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.25 }}
                                className="overflow-hidden mt-2 pt-2 border-t border-zinc-800/80 text-[11px] text-zinc-400 space-y-1.5"
                              >
                                <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider block mb-1">
                                  Available Separately:
                                </span>
                                {item.exclusions.map((ex) => (
                                  <div key={ex} className="flex items-start gap-1.5 text-zinc-400 leading-snug">
                                    <span className="text-zinc-600 mt-0.5">•</span>
                                    <span>{ex}</span>
                                  </div>
                                ))}
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      )}
                    </div>

                    {/* Clean Full-Width Button */}
                    <div className="pt-6 border-t border-zinc-800/60 w-full">
                      <MagneticButton href="#contact" className="w-full block">
                        <span
                          className="w-full py-3.5 px-6 rounded-full text-xs font-medium tracking-wide flex items-center justify-center gap-2 bg-white text-black hover:bg-zinc-200 transition-colors shadow-md cursor-pointer text-center"
                          data-cursor-text="Select"
                        >
                          <span>Discuss {item.title}</span>
                          <ArrowRight className="w-4 h-4 shrink-0" />
                        </span>
                      </MagneticButton>
                    </div>
                  </motion.div>
                </RevealItem>
              );
            })}
          </StaggerContainer>
        </div>

        {/* Remaining 6 Compact Cards (3-column grid) */}
        <div>
          <span className="text-xs font-mono uppercase tracking-widest text-zinc-500 block mb-6">
            All Additional Services & Plans
          </span>
          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {RATE_CARD_DATA.compact.map((item, idx) => {
              const isMatch = activeMatches === null || activeMatches.includes(item.id);
              const isDimmed = activeMatches !== null && !isMatch;
              const isExclusionOpen = Boolean(expandedExclusions[item.id]);

              return (
                <RevealItem key={item.id}>
                  <motion.div
                    whileHover={{ y: -4 }}
                    transition={{ duration: 0.3 }}
                    className={`p-6 rounded-2xl bg-zinc-900/40 border transition-all duration-300 flex flex-col justify-between group h-full ${
                      isDimmed ? 'opacity-40 grayscale-[20%] scale-[0.98]' : 'opacity-100 scale-100'
                    } ${
                      activeMatches !== null && isMatch
                        ? 'border-indigo-400 shadow-xl shadow-indigo-500/20 ring-1 ring-indigo-500/50 bg-zinc-900/70'
                        : 'border-zinc-800/80 hover:border-zinc-700 hover:bg-zinc-900/70'
                    }`}
                  >
                    <div>
                      {/* Card Header & Price */}
                      <div className="flex items-start justify-between gap-3 mb-3">
                        <div>
                          <h4 className="text-lg font-heading font-medium text-white group-hover:text-indigo-200 transition-colors">
                            {item.title}
                          </h4>
                          <span className="text-[10px] font-mono text-zinc-500 block mt-0.5">Starting</span>
                        </div>

                        <div className="text-right shrink-0">
                          <CountUpPrice price={item.price} unit={item.unit} delay={(idx + 3) * 0.1} />
                        </div>
                      </div>

                      {/* Description */}
                      <p className="text-xs text-zinc-400 leading-relaxed mb-4">
                        {item.description}
                      </p>

                      {/* Included Highlights with Click-to-Expand Explanation */}
                      <div className="space-y-1.5 mb-4">
                        {item.highlights.map((h) => {
                          const explanation = FEATURE_EXPLANATIONS[h];
                          const isFeatureExpanded = expandedFeature[item.id] === h;

                          return (
                            <div key={h} className="flex flex-col">
                              <div
                                onClick={() => toggleFeatureExplanation(item.id, h)}
                                title={isTouchDevice ? undefined : 'Click to show additional desc'}
                                data-cursor-text={isTouchDevice ? undefined : 'Click to show additional desc'}
                                className="flex items-start justify-between gap-2 text-[11px] text-zinc-300 py-1 px-1.5 -mx-1.5 rounded-lg hover:bg-zinc-800/50 transition-colors cursor-pointer group/bullet"
                              >
                                <div className="flex items-start gap-2">
                                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 shrink-0 mt-1.5" />
                                  <span className="group-hover/bullet:text-white transition-colors">{h}</span>
                                </div>
                                <ChevronDown
                                  className={`w-3 h-3 text-zinc-500 shrink-0 mt-1 group-hover/bullet:text-indigo-400 transition-transform duration-200 ${
                                    isFeatureExpanded ? 'rotate-180 text-indigo-400' : ''
                                  }`}
                                />
                              </div>

                              <AnimatePresence>
                                {isFeatureExpanded && explanation && (
                                  <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: 'auto', opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    transition={{ duration: 0.22, ease: 'easeOut' }}
                                    className="overflow-hidden mt-1 mb-2 ml-4 p-2.5 rounded-xl bg-indigo-500/10 border border-indigo-500/25 text-[11px] text-indigo-200 leading-relaxed font-sans shadow-inner"
                                  >
                                    {explanation}
                                  </motion.div>
                                )}
                              </AnimatePresence>
                            </div>
                          );
                        })}
                      </div>

                      {/* Expandable "What's not included" */}
                      {item.exclusions && (
                        <div className="mb-4">
                          <button
                            type="button"
                            onClick={() => toggleExclusion(item.id)}
                            className="text-[11px] font-mono text-zinc-400 hover:text-indigo-300 flex items-center gap-1 transition-colors py-1 cursor-pointer"
                          >
                            <span>What's not included</span>
                            <ChevronDown
                              className={`w-3.5 h-3.5 transition-transform duration-200 ${
                                isExclusionOpen ? 'rotate-180 text-indigo-400' : ''
                              }`}
                            />
                          </button>

                          <AnimatePresence>
                            {isExclusionOpen && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.25 }}
                                className="overflow-hidden mt-2 pt-2 border-t border-zinc-800/80 text-[11px] text-zinc-400 space-y-1.5"
                              >
                                <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider block mb-1">
                                  Available Separately:
                                </span>
                                {item.exclusions.map((ex) => (
                                  <div key={ex} className="flex items-start gap-1.5 text-zinc-400 leading-snug">
                                    <span className="text-zinc-600 mt-0.5">•</span>
                                    <span>{ex}</span>
                                  </div>
                                ))}
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      )}
                    </div>

                    {/* Compact Card CTA Button */}
                    <div className="pt-4 border-t border-zinc-800/60 w-full mt-4">
                      <MagneticButton href="#contact" className="w-full block">
                        <span className="w-full py-2.5 px-4 rounded-full text-xs font-medium tracking-wide flex items-center justify-center gap-2 bg-zinc-800/80 text-white hover:bg-zinc-700 transition-colors shadow-sm cursor-pointer text-center">
                          <span>Get Quote</span>
                          <ArrowRight className="w-3.5 h-3.5 shrink-0" />
                        </span>
                      </MagneticButton>
                    </div>
                  </motion.div>
                </RevealItem>
              );
            })}
          </StaggerContainer>
        </div>

        {/* Required Exact Disclaimer */}
        <p className="text-center text-xs font-mono text-zinc-500 mt-12 max-w-3xl mx-auto leading-relaxed">
          * {RATE_CARD_DATA.disclaimer}
        </p>
      </div>
    </section>
  );
};

export default PricingSection;
