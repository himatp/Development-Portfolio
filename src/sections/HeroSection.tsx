import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { HERO_DATA } from '../data/portfolioData';
import { TextReveal } from '../components/motion/TextReveal';
import { MagneticButton } from '../components/motion/MagneticButton';
import { FRAMER_EASE } from '../utils/motion';
import { HeroVisual } from '../components/hero-visuals/HeroVisual';

export const HeroSection: React.FC = () => {
  return (
    <section id="hero" className="relative min-h-[92vh] pt-32 md:pt-44 pb-20 md:pb-28 overflow-hidden bg-grid-pattern flex items-center">
      {/* Subtle radial ambient background light */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[450px] bg-indigo-500/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Typography & CTAs */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            
            {/* Small Intro Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: FRAMER_EASE }}
              className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-zinc-900/90 border border-zinc-800 text-xs font-mono uppercase tracking-widest text-zinc-300 w-fit mb-8 shadow-sm"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>{HERO_DATA.badge}</span>
            </motion.div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-heading font-light tracking-tight text-white leading-[1.08] mb-8">
              <TextReveal text={HERO_DATA.titleLine1} delay={0.15} />
              <br />
              <span className="text-zinc-300 font-normal">
                <TextReveal text={HERO_DATA.titleLine2} delay={0.35} />
              </span>
            </h1>

            {/* Supporting Text */}
            <motion.p
              initial={{ opacity: 0, y: 20, filter: 'blur(4px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ duration: 0.75, delay: 0.55, ease: FRAMER_EASE }}
              className="text-base sm:text-lg md:text-xl text-zinc-400 font-normal leading-relaxed max-w-2xl mb-10"
            >
              {HERO_DATA.subtitle}
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, delay: 0.7, ease: FRAMER_EASE }}
              className="flex flex-wrap items-center gap-4"
            >
              <MagneticButton href="#contact">
                <span className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-white text-black font-medium text-sm tracking-wide hover:bg-zinc-200 transition-colors shadow-lg hover:shadow-white/10"
                      data-cursor-text="Connect">
                  {HERO_DATA.primaryCta}
                  <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </span>
              </MagneticButton>

              <MagneticButton href="#projects">
                <span className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-zinc-900 text-zinc-200 border border-zinc-800 font-medium text-sm hover:border-zinc-700 hover:text-white transition-all"
                      data-cursor-text="Projects">
                  {HERO_DATA.secondaryCta}
                </span>
              </MagneticButton>
            </motion.div>
          </div>

          {/* Right Column: Interactive Hero Visual Area */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: 35, filter: 'blur(8px)' }}
              animate={{ opacity: 1, scale: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ duration: 0.9, delay: 0.35, ease: FRAMER_EASE }}
              className="relative w-full max-w-md aspect-[4/5] group"
            >
              {/* Expanded Particle/Wireframe Canvas Container (vertically expanded height) */}
              <div className="absolute -top-28 -bottom-28 -left-16 -right-16 sm:-top-36 sm:-bottom-36 sm:-left-24 sm:-right-24 lg:-top-52 lg:-bottom-52 lg:-left-32 lg:-right-32 z-0 pointer-events-auto">
                {/* Original portrait image preserved for easy reversion:
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1000&auto=format&fit=crop"
                  alt="Himat - Freelance Developer"
                  className="w-full h-full object-cover grayscale contrast-125 group-hover:scale-105 transition-transform duration-700 opacity-90"
                />
                */}
                <HeroVisual />
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
};
