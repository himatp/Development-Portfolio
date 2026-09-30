import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import type { Project } from '../../types';
import { TypewriterHeading } from '../ui/TypewriterHeading';

interface StackedPeekProps {
  projects: Project[];
  onSelectProject: (project: Project) => void;
}

const StackedPeek: React.FC<StackedPeekProps> = ({ projects, onSelectProject }) => {
  const [activeIdx, setActiveIdx] = useState<number>(0);
  const [isTouchDevice, setIsTouchDevice] = useState<boolean>(false);

  useEffect(() => {
    const touch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    setIsTouchDevice(touch);
  }, []);

  if (!projects || projects.length === 0) {
    return (
      <div className="py-16 text-center text-zinc-500 font-mono text-sm">
        No projects match the selected category.
      </div>
    );
  }

  const activeProject = projects[Math.min(activeIdx, projects.length - 1)] || projects[0];

  return (
    <div className="w-full relative py-8">
      {/* Desktop / Mobile Responsive Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        {/* Left: Stacked Photo Deck */}
        <div className="lg:col-span-6 relative flex flex-col items-center">
          <div className="relative w-full aspect-[16/10] max-w-[580px] min-h-[300px] sm:min-h-[360px]">
            {projects.map((project, idx) => {
              const isActive = activeIdx === idx;
              const offsetTop = idx * 20; // 20px peeking sliver

              return (
                <motion.div
                  key={project.id}
                  onClick={() => {
                    setActiveIdx(idx);
                  }}
                  onMouseEnter={() => {
                    if (!isTouchDevice) setActiveIdx(idx);
                  }}
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    zIndex: isActive ? 40 : projects.length - idx,
                  }}
                  animate={{
                    y: isActive ? -28 : offsetTop,
                    x: isActive ? -16 : 0,
                    rotate: isActive ? 0 : (idx % 2 === 0 ? 0.8 : -0.8),
                    scale: isActive ? 1.02 : 1 - idx * 0.015,
                  }}
                  transition={{ type: 'spring', stiffness: 280, damping: 22 }}
                  className={`rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 border ${
                    isActive
                      ? 'border-indigo-500/80 shadow-2xl shadow-indigo-500/20 ring-1 ring-indigo-500/50'
                      : 'border-zinc-800/90 shadow-lg hover:border-zinc-700'
                  }`}
                >
                  {/* Image */}
                  <div className="relative aspect-[16/10] w-full bg-zinc-900 overflow-hidden group">
                    <img
                      src={project.image}
                      alt={project.title}
                      className={`w-full h-full object-cover transition-all duration-500 ${
                        isActive ? 'grayscale-0 opacity-100 scale-105' : 'grayscale opacity-75 group-hover:opacity-90'
                      }`}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 via-transparent to-transparent" />
                  </div>
                </motion.div>
              );
            })}
          </div>

          <p className="mt-16 text-center text-xs font-mono text-zinc-500 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse" />
            <span>Hover or tap stack slivers to inspect project details</span>
          </p>
        </div>

        {/* Connecting Line (Visible on lg screens) */}
        <div className="hidden lg:block absolute left-[48%] top-1/2 -translate-y-1/2 w-12 z-30 pointer-events-none">
          <motion.div
            key={activeProject.id}
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="h-px bg-gradient-to-r from-indigo-500 via-indigo-400 to-transparent origin-left"
          />
        </div>

        {/* Right: Refined Info Panel */}
        <div className="lg:col-span-6 relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeProject.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
              className="relative p-6 sm:p-8 rounded-2xl bg-zinc-900/80 border border-zinc-800/90 backdrop-blur-xl shadow-2xl overflow-hidden flex flex-col justify-between"
            >
              {/* Technical Viewfinder Corner Brackets */}
              <span className="absolute top-0 left-0 w-3.5 h-3.5 border-t-2 border-l-2 border-indigo-500/80" />
              <span className="absolute top-0 right-0 w-3.5 h-3.5 border-t-2 border-r-2 border-indigo-500/80" />
              <span className="absolute bottom-0 left-0 w-3.5 h-3.5 border-b-2 border-l-2 border-indigo-500/80" />
              <span className="absolute bottom-0 right-0 w-3.5 h-3.5 border-b-2 border-r-2 border-indigo-500/80" />

              <div>
                {/* Category Badge */}
                <span className="text-[11px] font-mono text-indigo-400 uppercase tracking-widest block mb-2 font-semibold">
                  {activeProject.category}
                </span>

                {/* Animated Typewriter Title */}
                <TypewriterHeading
                  key={activeProject.id}
                  text={activeProject.title}
                  speed={22}
                  as="h3"
                  className="text-2xl sm:text-3xl font-heading font-medium text-white mb-3"
                />

                {/* Description */}
                <p className="text-sm text-zinc-300 leading-relaxed mb-6 font-sans">
                  {activeProject.shortDescription}
                </p>
              </div>

              {/* Footer CTA Button */}
              <div className="pt-4 border-t border-zinc-800/80 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => onSelectProject(activeProject)}
                  className="px-5 py-2.5 rounded-full bg-white text-black font-medium text-xs hover:bg-zinc-200 transition-colors flex items-center gap-2 shadow-md cursor-pointer"
                  data-cursor-text="Inspect"
                >
                  <span>Inspect Full Project</span>
                  <ArrowUpRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default StackedPeek;
