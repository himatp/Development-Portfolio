import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import {
  Code2,
  Cpu,
  Palette,
  Terminal,
  Sparkles,
  Bot,
  Layers,
  Database,
} from 'lucide-react';

interface OrbitItem {
  id: string;
  name: string;
  icon: React.ReactNode;
  ring: number; // 0: inner, 1: middle, 2: outer
  initialAngle: number;
  color: string;
  borderColor: string;
}

const ORBIT_ITEMS: OrbitItem[] = [
  // Ring 0 (Inner: radius ~100px)
  {
    id: 'react',
    name: 'React',
    icon: <Code2 className="w-4 h-4 text-cyan-400" />,
    ring: 0,
    initialAngle: 0,
    color: 'text-cyan-400',
    borderColor: 'hover:border-cyan-500/50',
  },
  {
    id: 'ts',
    name: 'TypeScript',
    icon: <Terminal className="w-4 h-4 text-blue-400" />,
    ring: 0,
    initialAngle: Math.PI,
    color: 'text-blue-400',
    borderColor: 'hover:border-blue-500/50',
  },

  // Ring 1 (Middle: radius ~165px)
  {
    id: 'python',
    name: 'Python',
    icon: <Cpu className="w-4 h-4 text-amber-400" />,
    ring: 1,
    initialAngle: 0.5,
    color: 'text-amber-400',
    borderColor: 'hover:border-amber-500/50',
  },
  {
    id: 'node',
    name: 'Node.js',
    icon: <Database className="w-4 h-4 text-emerald-400" />,
    ring: 1,
    initialAngle: 2.6,
    color: 'text-emerald-400',
    borderColor: 'hover:border-emerald-500/50',
  },
  {
    id: 'tailwind',
    name: 'Tailwind',
    icon: <Palette className="w-4 h-4 text-cyan-300" />,
    ring: 1,
    initialAngle: 4.7,
    color: 'text-cyan-300',
    borderColor: 'hover:border-cyan-400/50',
  },

  // Ring 2 (Outer: radius ~230px)
  {
    id: 'ai',
    name: 'AI & LLMs',
    icon: <Bot className="w-4 h-4 text-purple-400" />,
    ring: 2,
    initialAngle: 1.2,
    color: 'text-purple-400',
    borderColor: 'hover:border-purple-500/50',
  },
  {
    id: 'vite',
    name: 'Vite',
    icon: <Sparkles className="w-4 h-4 text-indigo-400" />,
    ring: 2,
    initialAngle: 4.2,
    color: 'text-indigo-400',
    borderColor: 'hover:border-indigo-500/50',
  },
];

const OrbitIconsVisual: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isTouchDevice, setIsTouchDevice] = useState<boolean>(false);
  const [scrollY, setScrollY] = useState<number>(0);
  const mouseRef = useRef<{ x: number; y: number; active: boolean }>({
    x: -1000,
    y: -1000,
    active: false,
  });

  // State storing dynamic icon offsets and scale for proximity interaction
  const [itemStates, setItemStates] = useState<
    { [key: string]: { currentAngle: number; nudgeX: number; nudgeY: number; isHovered: boolean } }
  >(() => {
    const initial: { [key: string]: { currentAngle: number; nudgeX: number; nudgeY: number; isHovered: boolean } } = {};
    ORBIT_ITEMS.forEach((item) => {
      initial[item.id] = {
        currentAngle: item.initialAngle,
        nudgeX: 0,
        nudgeY: 0,
        isHovered: false,
      };
    });
    return initial;
  });

  useEffect(() => {
    const touch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    setIsTouchDevice(touch);

    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    let animFrameId: number;
    let lastTime = performance.now();

    // Base orbit speeds for each ring (radians per second)
    const ringSpeeds = [0.35, -0.22, 0.16]; // ring 0, 1, 2

    const render = (time: number) => {
      const delta = (time - lastTime) / 1000;
      lastTime = time;

      const container = containerRef.current;
      if (!container) {
        animFrameId = requestAnimationFrame(render);
        return;
      }

      const rect = container.getBoundingClientRect();
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const isSmallScreen = rect.width < 640;

      // Ring radii based on viewport width
      const radii = isSmallScreen ? [65, 110, 150] : [95, 160, 225];

      const mouse = mouseRef.current;

      setItemStates((prevStates) => {
        const nextStates = { ...prevStates };

        ORBIT_ITEMS.forEach((item) => {
          const state = prevStates[item.id] || {
            currentAngle: item.initialAngle,
            nudgeX: 0,
            nudgeY: 0,
            isHovered: false,
          };

          const radius = radii[item.ring];
          let speed = ringSpeeds[item.ring];

          // Compute current base icon center coordinates
          const angle = state.currentAngle;
          const baseIconX = centerX + Math.cos(angle) * radius;
          const baseIconY = centerY + Math.sin(angle) * radius;

          // Proximity Repel & Speedup calculation
          let targetNudgeX = 0;
          let targetNudgeY = 0;
          let isNear = false;

          if (mouse.active && !isTouchDevice) {
            const dx = baseIconX - mouse.x;
            const dy = baseIconY - mouse.y;
            const dist = Math.hypot(dx, dy);

            if (dist < 130 && dist > 0) {
              isNear = true;
              const force = (130 - dist) / 130;
              const pushAngle = Math.atan2(dy, dx);
              const pushDist = force * 28;

              targetNudgeX = Math.cos(pushAngle) * pushDist;
              targetNudgeY = Math.sin(pushAngle) * pushDist;
              speed *= 2.2; // Speed up when hovered
            }
          }

          // Smooth lerp for angle update and nudge return
          const newAngle = state.currentAngle + speed * delta;
          const newNudgeX = state.nudgeX + (targetNudgeX - state.nudgeX) * 0.1;
          const newNudgeY = state.nudgeY + (targetNudgeY - state.nudgeY) * 0.1;

          nextStates[item.id] = {
            currentAngle: newAngle,
            nudgeX: newNudgeX,
            nudgeY: newNudgeY,
            isHovered: isNear,
          };
        });

        return nextStates;
      });

      animFrameId = requestAnimationFrame(render);
    };

    animFrameId = requestAnimationFrame(render);
    return () => cancelAnimationFrame(animFrameId);
  }, [isTouchDevice]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isTouchDevice || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    mouseRef.current.x = e.clientX - rect.left;
    mouseRef.current.y = e.clientY - rect.top;
    mouseRef.current.active = true;
  };

  const handleMouseLeave = () => {
    mouseRef.current.active = false;
    mouseRef.current.x = -1000;
    mouseRef.current.y = -1000;
  };

  // Parallax calculations
  const parallaxY = (scrollY * 0.08) % 30;
  const parallaxRotate = (scrollY * 0.04) % 360;

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="w-full h-full relative bg-transparent select-none pointer-events-auto flex items-center justify-center overflow-hidden"
    >
      <motion.div
        style={{
          y: -parallaxY,
          rotate: parallaxRotate * 0.1,
        }}
        className="relative w-full max-w-[460px] sm:max-w-[520px] aspect-square flex items-center justify-center"
      >
        {/* SVG Orbit Ring Lines & Spokes Layer */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none overflow-visible">
          <defs>
            <radialGradient id="hubGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#818cf8" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#6366f1" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* Central Radial Aura Glow */}
          <circle cx="50%" cy="50%" r="90" fill="url(#hubGlow)" />

          {/* Concentric Orbit Paths */}
          {/* Inner Ring */}
          <circle
            cx="50%"
            cy="50%"
            r="20.5%"
            fill="none"
            stroke="rgba(129, 140, 248, 0.18)"
            strokeWidth="1"
            strokeDasharray="4 4"
          />
          {/* Middle Ring */}
          <circle
            cx="50%"
            cy="50%"
            r="34.5%"
            fill="none"
            stroke="rgba(129, 140, 248, 0.15)"
            strokeWidth="1"
          />
          {/* Outer Ring */}
          <circle
            cx="50%"
            cy="50%"
            r="48.5%"
            fill="none"
            stroke="rgba(129, 140, 248, 0.12)"
            strokeWidth="1"
            strokeDasharray="6 6"
          />

          {/* Lines connecting Orbit Icons to Center Core Hub */}
          {ORBIT_ITEMS.map((item) => {
            const state = itemStates[item.id];
            if (!state) return null;

            // Calculate current percentage coordinates for SVG lines
            const isSmall = typeof window !== 'undefined' && window.innerWidth < 640;
            const radii = isSmall ? [65, 110, 150] : [95, 160, 225];
            const radius = radii[item.ring];

            // Render faint spokes to center hub
            return (
              <line
                key={`spoke-${item.id}`}
                x1="50%"
                y1="50%"
                x2={`calc(50% + ${Math.cos(state.currentAngle) * radius + state.nudgeX}px)`}
                y2={`calc(50% + ${Math.sin(state.currentAngle) * radius + state.nudgeY}px)`}
                stroke={state.isHovered ? 'rgba(168, 85, 247, 0.45)' : 'rgba(129, 140, 248, 0.1)'}
                strokeWidth={state.isHovered ? 1.5 : 1}
              />
            );
          })}
        </svg>

        {/* Shared Center Core Node Hub */}
        <div className="absolute z-10 flex items-center justify-center">
          <div className="p-3.5 sm:p-4 rounded-full bg-zinc-900/90 border border-indigo-500/40 shadow-2xl shadow-indigo-500/30 backdrop-blur-xl flex items-center justify-center group hover:scale-110 transition-transform">
            <Layers className="w-5 h-5 sm:w-6 sm:h-6 text-indigo-400 animate-pulse" />
          </div>
        </div>

        {/* Floating Orbit Tech Badges */}
        {ORBIT_ITEMS.map((item) => {
          const state = itemStates[item.id];
          if (!state) return null;

          const isSmall = typeof window !== 'undefined' && window.innerWidth < 640;
          const radii = isSmall ? [65, 110, 150] : [95, 160, 225];
          const radius = radii[item.ring];

          const posX = Math.cos(state.currentAngle) * radius + state.nudgeX;
          const posY = Math.sin(state.currentAngle) * radius + state.nudgeY;

          return (
            <motion.div
              key={item.id}
              style={{
                x: posX,
                y: posY,
              }}
              animate={{
                scale: state.isHovered ? 1.15 : 1,
              }}
              transition={{ duration: 0.2 }}
              className={`absolute z-20 px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-2xl bg-zinc-900/90 border border-zinc-800/90 shadow-xl backdrop-blur-md flex items-center gap-2 cursor-pointer transition-colors ${
                state.isHovered
                  ? 'border-indigo-500/80 shadow-indigo-500/30 text-white bg-zinc-900'
                  : 'text-zinc-300 hover:border-zinc-700'
              }`}
            >
              {item.icon}
              <span className="text-[11px] sm:text-xs font-mono font-medium tracking-wide">
                {item.name}
              </span>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
};

export default OrbitIconsVisual;
