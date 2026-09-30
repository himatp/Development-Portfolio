import React, { useRef, useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import type { SimpleService } from '../../data/portfolioData';

gsap.registerPlugin(ScrollTrigger);

interface HorizontalScrollProps {
  services: SimpleService[];
}

const HorizontalScroll: React.FC<HorizontalScrollProps> = ({ services }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeIdx, setActiveIdx] = useState<number>(0);
  const scrollTriggerRef = useRef<ScrollTrigger | null>(null);

  useEffect(() => {
    if (!containerRef.current || !trackRef.current) return;

    const ctx = gsap.context(() => {
      const track = trackRef.current!;
      const getScrollAmount = () => -(track.scrollWidth - window.innerWidth + 48);

      const tween = gsap.to(track, {
        x: getScrollAmount,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top+=80',
          end: () => `+=${Math.max(1000, track.scrollWidth - window.innerWidth)}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const index = Math.min(
              services.length - 1,
              Math.max(0, Math.round(self.progress * (services.length - 1)))
            );
            setActiveIdx(index);
          },
        },
      });

      scrollTriggerRef.current = tween.scrollTrigger || null;
    }, containerRef);

    return () => ctx.revert();
  }, [services.length]);

  const scrollToPanel = (index: number) => {
    if (!scrollTriggerRef.current) return;
    const st = scrollTriggerRef.current;
    const targetProgress = index / (services.length - 1);
    const targetScroll = st.start + (st.end - st.start) * targetProgress;
    window.scrollTo({
      top: targetScroll,
      behavior: 'smooth',
    });
  };

  return (
    <div ref={containerRef} className="w-full relative py-6 overflow-hidden">
      {/* Top Header Bar: Controls & Active Indicator */}
      <div className="flex items-center justify-between mb-8 px-2 max-w-7xl mx-auto">
        {/* Step Counter / Progress Bar */}
        <div className="flex items-center gap-3">
          <span className="font-mono text-xs text-indigo-400 font-semibold">
            0{activeIdx + 1} / 0{services.length}
          </span>
          <div className="flex gap-1.5 items-center">
            {services.map((_, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => scrollToPanel(idx)}
                className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                  activeIdx === idx ? 'w-8 bg-indigo-500' : 'w-2 bg-zinc-800 hover:bg-zinc-700'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Scroll Affordance Arrow Controls */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => scrollToPanel(Math.max(0, activeIdx - 1))}
            disabled={activeIdx === 0}
            className="p-2.5 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-all cursor-pointer"
            aria-label="Previous service"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => scrollToPanel(Math.min(services.length - 1, activeIdx + 1))}
            disabled={activeIdx === services.length - 1}
            className="p-2.5 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-all cursor-pointer"
            aria-label="Next service"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Track & Panels */}
      <div ref={trackRef} className="flex gap-6 w-max px-4 sm:px-8">
        {services.map((service, idx) => {
          const numStr = String(idx + 1).padStart(2, '0');

          return (
            <div
              key={service.id}
              className="w-[85vw] max-w-[560px] sm:w-[70vw] md:w-[540px] shrink-0 rounded-3xl bg-zinc-900/40 border border-zinc-800/80 p-8 sm:p-12 flex flex-col justify-between min-h-[340px] sm:min-h-[380px] relative overflow-hidden group hover:border-zinc-700 transition-colors"
            >
              {/* Background Glow */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/5 rounded-full blur-3xl pointer-events-none" />

              {/* Number Header */}
              <div className="flex items-center justify-between mb-8">
                <span className="font-mono text-4xl sm:text-6xl text-indigo-400/80 font-light">
                  {numStr}
                </span>
                <span className="text-xs font-mono text-zinc-600 uppercase tracking-widest">
                  Service / 0{services.length}
                </span>
              </div>

              {/* Content */}
              <div className="relative z-10">
                <h3 className="text-2xl sm:text-3xl md:text-4xl font-heading font-light text-white mb-4 leading-tight group-hover:text-indigo-200 transition-colors">
                  {service.title}
                </h3>
                <p className="text-sm sm:text-base text-zinc-400 leading-relaxed max-w-lg">
                  {service.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default HorizontalScroll;
