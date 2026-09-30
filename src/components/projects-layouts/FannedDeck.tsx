import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import type { Project } from '../../types';
import { TypewriterHeading } from '../ui/TypewriterHeading';

interface FannedDeckProps {
  projects: Project[];
  onSelectProject: (project: Project) => void;
}

export const FannedDeck: React.FC<FannedDeckProps> = ({ projects, onSelectProject }) => {
  const [activeIdx, setActiveIdx] = useState<number | null>(0);
  const [isTouchDevice, setIsTouchDevice] = useState<boolean>(false);

  useEffect(() => {
    const touch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    setIsTouchDevice(touch);
  }, []);

  // When projects change (e.g. filter tab changed), keep activeIdx within bounds or default to 0
  useEffect(() => {
    if (projects.length > 0) {
      setActiveIdx((prev) => (prev === null || prev >= projects.length ? 0 : prev));
    } else {
      setActiveIdx(null);
    }
  }, [projects]);

  if (!projects || projects.length === 0) {
    return (
      <div className="py-16 text-center text-zinc-500 font-mono text-sm">
        No projects match the selected category.
      </div>
    );
  }

  const activeProject = activeIdx !== null && projects[activeIdx] ? projects[activeIdx] : null;
  const numCards = projects.length;
  const centerIdx = (numCards - 1) / 2;

  return (
    <div className="w-full relative py-8">
      <div
        className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center"
        onMouseLeave={() => {
          if (!isTouchDevice) {
            setActiveIdx(0);
          }
        }}
      >
        {/* Left Column: Fanned Card Deck */}
        <div className="lg:col-span-6 relative flex flex-col items-center justify-center min-h-[340px] sm:min-h-[400px]">
          <div className="relative w-full max-w-[480px] sm:max-w-[540px] h-[280px] sm:h-[340px] flex items-center justify-center">
            {projects.map((project, idx) => {
              const isActive = activeIdx === idx;
              const hasActiveCard = activeIdx !== null;

              // Calculate spread metrics
              const offsetFromCenter = idx - centerIdx;
              
              // Angle spread: -9 deg to +9 deg
              const baseRotate = numCards > 1 ? (offsetFromCenter / Math.max(centerIdx, 1)) * 9 : 0;
              
              // Horizontal offset (px spread out from center)
              const xSpread = numCards > 3 ? 55 : 70;
              const baseXOffset = offsetFromCenter * xSpread;
              
              // Arc curve (outer cards slightly lower)
              const baseArcY = Math.pow(Math.abs(offsetFromCenter), 1.4) * 6;

              // Dynamics based on hover state
              let rotateVal = baseRotate;
              let xVal = baseXOffset;
              let yVal = baseArcY;
              let scaleVal = 1;
              let opacityVal = 1;
              let zIndexVal = 10 + idx;

              if (isActive) {
                rotateVal = 0;
                yVal = -36;
                xVal = baseXOffset;
                scaleVal = 1.06;
                opacityVal = 1;
                zIndexVal = 50;
              } else if (hasActiveCard) {
                // Other cards recede when one is active
                rotateVal = baseRotate;
                yVal = baseArcY + 12;
                xVal = baseXOffset;
                scaleVal = 0.92;
                opacityVal = 0.55;
                zIndexVal = 10 + (numCards - Math.abs(idx - activeIdx));
              }

              return (
                <motion.div
                  key={project.id}
                  onClick={() => {
                    if (isTouchDevice) {
                      setActiveIdx(isActive ? null : idx);
                    } else {
                      setActiveIdx(idx);
                    }
                  }}
                  onMouseEnter={() => {
                    if (!isTouchDevice) {
                      setActiveIdx(idx);
                    }
                  }}
                  style={{
                    position: 'absolute',
                    transformOrigin: 'bottom center',
                    zIndex: zIndexVal,
                  }}
                  animate={{
                    rotate: rotateVal,
                    x: xVal,
                    y: yVal,
                    scale: scaleVal,
                    opacity: opacityVal,
                  }}
                  transition={{
                    type: 'spring',
                    stiffness: 320,
                    damping: 24,
                    mass: 0.6,
                  }}
                  className={`w-[220px] sm:w-[270px] aspect-[16/10] rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 border ${
                    isActive
                      ? 'border-indigo-500/80 shadow-2xl shadow-indigo-500/25 ring-1 ring-indigo-500/60'
                      : 'border-zinc-800/90 shadow-xl hover:border-zinc-700'
                  }`}
                >
                  <div className="relative w-full h-full bg-zinc-900 overflow-hidden group">
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

          <p className="mt-8 text-center text-xs font-mono text-zinc-500 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse" />
            <span>Hover or tap cards to inspect project details</span>
          </p>
        </div>

        {/* Desktop Animated Connector Line */}
        {activeProject && (
          <div className="hidden lg:block absolute left-[46%] top-1/2 -translate-y-1/2 w-14 z-40 pointer-events-none">
            <motion.div
              key={activeProject.id}
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 1 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className="h-px bg-gradient-to-r from-indigo-500 via-indigo-400 to-transparent origin-left"
            />
          </div>
        )}

        {/* Right Column: Clean Info Panel */}
        <div className="lg:col-span-6 relative">
          <AnimatePresence mode="wait">
            {activeProject ? (
              <motion.div
                key={activeProject.id}
                initial={{ opacity: 0, x: 25 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -25 }}
                transition={{ duration: 0.35, ease: 'easeOut' }}
                className="relative p-6 sm:p-8 rounded-2xl bg-zinc-900/85 border border-zinc-800/90 backdrop-blur-xl shadow-2xl overflow-hidden flex flex-col justify-between"
              >
                {/* Left-to-Right Scanning Wipe Reveal Wrapper */}
                <div className="relative overflow-hidden">
                  {/* Glowing Laser Scan Line */}
                  <motion.div
                    key={`scan-${activeProject.id}`}
                    initial={{ left: '0%', opacity: 1 }}
                    animate={{ left: '100%', opacity: 0 }}
                    transition={{ duration: 0.5, ease: 'easeInOut' }}
                    className="absolute top-0 bottom-0 w-1 bg-gradient-to-b from-indigo-400 via-cyan-400 to-indigo-600 shadow-[0_0_12px_#6366f1] z-20 pointer-events-none"
                  />

                  {/* Scanning Content Container */}
                  <motion.div
                    key={`content-${activeProject.id}`}
                    initial={{ clipPath: 'inset(0 100% 0 0)' }}
                    animate={{ clipPath: 'inset(0 0% 0 0)' }}
                    transition={{ duration: 0.5, ease: 'easeInOut' }}
                  >
                    {/* Category */}
                    <span className="text-[11px] font-mono text-indigo-400 uppercase tracking-widest block mb-2 font-semibold">
                      {activeProject.category}
                    </span>

                    {/* Project Title with Typewriter effect */}
                    <TypewriterHeading
                      key={activeProject.id}
                      text={activeProject.title}
                      speed={20}
                      as="h3"
                      className="text-2xl sm:text-3xl font-heading font-medium text-white mb-3"
                    />

                    {/* Description */}
                    <p className="text-sm text-zinc-300 leading-relaxed mb-6 font-sans">
                      {activeProject.shortDescription}
                    </p>
                  </motion.div>
                </div>

                {/* Footer Action */}
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
            ) : (
              <div className="p-8 rounded-2xl bg-zinc-900/50 border border-zinc-800 text-center font-mono text-xs text-zinc-500">
                Hover over a card in the fan to reveal project details
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default FannedDeck;
