import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import type { Project } from '../../types';
import { TypewriterHeading } from '../ui/TypewriterHeading';

interface ThumbnailRailProps {
  projects: Project[];
  onSelectProject: (project: Project) => void;
}

export const ThumbnailRail: React.FC<ThumbnailRailProps> = ({ projects, onSelectProject }) => {
  const [activeIdx, setActiveIdx] = useState<number>(0);
  const [isTouchDevice, setIsTouchDevice] = useState<boolean>(false);

  useEffect(() => {
    const touch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    setIsTouchDevice(touch);
  }, []);

  // Reset activeIdx to 0 when filtered projects change
  useEffect(() => {
    setActiveIdx(0);
  }, [projects]);

  if (!projects || projects.length === 0) {
    return (
      <div className="py-16 text-center text-zinc-500 font-mono text-sm">
        No projects match the selected category.
      </div>
    );
  }

  const activeProject = projects[Math.min(activeIdx, projects.length - 1)] || projects[0];
  const totalCount = projects.length;

  return (
    <div className="w-full relative py-8">
      {/* Side-by-Side Layout on Large Screens, Stacked Rail on Mobile */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
        
        {/* Thumbnail Rail: Horizontal on mobile, Vertical on lg */}
        <div className="lg:col-span-3 flex flex-row lg:flex-col gap-3 overflow-x-auto lg:overflow-y-auto max-h-[520px] pb-2 lg:pb-0 pr-1 scrollbar-thin scrollbar-thumb-zinc-800 scrollbar-track-transparent">
          {projects.map((project, idx) => {
            const isActive = activeIdx === idx;

            return (
              <motion.button
                key={project.id}
                type="button"
                onClick={() => setActiveIdx(idx)}
                onMouseEnter={() => {
                  if (!isTouchDevice) setActiveIdx(idx);
                }}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className={`relative shrink-0 flex items-center gap-3 p-2 rounded-xl text-left transition-all duration-200 border cursor-pointer ${
                  isActive
                    ? 'bg-zinc-900 border-indigo-500/80 shadow-lg shadow-indigo-500/15 ring-1 ring-indigo-500/50'
                    : 'bg-zinc-950/60 border-zinc-800/80 hover:border-zinc-700 hover:bg-zinc-900/50'
                }`}
              >
                {/* Thumbnail Image */}
                <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-lg overflow-hidden shrink-0 bg-zinc-900 border border-zinc-800">
                  <img
                    src={project.image}
                    alt={project.title}
                    className={`w-full h-full object-cover transition-all duration-300 ${
                      isActive ? 'grayscale-0 opacity-100 scale-105' : 'grayscale opacity-60 group-hover:opacity-85'
                    }`}
                  />
                  {/* Index badge */}
                  <span className="absolute bottom-1 right-1 px-1.5 py-0.5 rounded bg-zinc-950/90 text-[9px] font-mono text-zinc-300 border border-zinc-800">
                    [0{idx + 1}]
                  </span>
                </div>

                {/* Title & Category (Visible on desktop vertical rail) */}
                <div className="hidden lg:block overflow-hidden flex-1 pr-1">
                  <span className="text-[10px] font-mono text-indigo-400 block truncate font-medium uppercase tracking-wider">
                    {project.category}
                  </span>
                  <h4 className={`text-xs font-medium truncate mt-0.5 transition-colors ${
                    isActive ? 'text-white' : 'text-zinc-400'
                  }`}>
                    {project.title}
                  </h4>
                </div>

                {/* Active Indicator Glow Pip */}
                {isActive && (
                  <motion.span
                    layoutId="activeRailPip"
                    className="absolute right-2 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-indigo-400 hidden lg:block shadow-[0_0_8px_#818cf8]"
                  />
                )}
              </motion.button>
            );
          })}
        </div>

        {/* Large Preview & Info Panel Area */}
        <div className="lg:col-span-9 flex flex-col gap-6">
          {/* Main Display Container */}
          <div className="relative rounded-2xl bg-zinc-900/90 border border-zinc-800/90 backdrop-blur-xl shadow-2xl overflow-hidden">
            {/* Corner Bracket Lines (HUD Overlay) */}
            <span className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-indigo-500/80 z-20 pointer-events-none" />
            <span className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-indigo-500/80 z-20 pointer-events-none" />
            <span className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-indigo-500/80 z-20 pointer-events-none" />
            <span className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-indigo-500/80 z-20 pointer-events-none" />

            {/* Large Image Viewport */}
            <div className="relative aspect-[16/9] w-full bg-zinc-950 overflow-hidden border-b border-zinc-800/80">
              <AnimatePresence mode="wait">
                <motion.img
                  key={activeProject.id}
                  src={activeProject.image}
                  alt={activeProject.title}
                  initial={{ opacity: 0, scale: 1.03 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.97 }}
                  transition={{ duration: 0.22, ease: 'easeOut' }}
                  className="w-full h-full object-cover"
                />
              </AnimatePresence>

              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 via-transparent to-zinc-950/40 pointer-events-none" />

              {/* HUD Monospace Micro-Labels */}
              <div className="absolute top-3 left-4 px-2.5 py-1 rounded bg-zinc-950/80 backdrop-blur-md border border-zinc-800 text-[10px] font-mono text-indigo-400 z-10 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse" />
                <span>[{String(activeIdx + 1).padStart(2, '0')}/{String(totalCount).padStart(2, '0')}]</span>
              </div>

              <div className="absolute top-3 right-4 px-2.5 py-1 rounded bg-zinc-950/80 backdrop-blur-md border border-zinc-800 text-[10px] font-mono text-zinc-300 z-10">
                STATUS: SHIPPED
              </div>
            </div>

            {/* Technical Telemetry & Description Area */}
            <div className="p-6 sm:p-8 flex flex-col justify-between">
              <div>
                {/* Category Badge */}
                <span className="text-[11px] font-mono text-indigo-400 uppercase tracking-widest block mb-2 font-semibold">
                  {activeProject.category}
                </span>

                {/* Typewriter Title */}
                <TypewriterHeading
                  key={activeProject.id + '-title'}
                  text={activeProject.title}
                  speed={18}
                  as="h3"
                  className="text-2xl sm:text-3xl font-heading font-medium text-white mb-3"
                />

                {/* Typewriter Description */}
                <TypewriterHeading
                  key={activeProject.id + '-desc'}
                  text={activeProject.shortDescription}
                  speed={10}
                  as="p"
                  className="text-sm text-zinc-300 leading-relaxed mb-6 font-sans"
                />
              </div>

              {/* Footer Actions */}
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
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ThumbnailRail;
