import React, { useEffect, useState, useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { Code2, Terminal, CheckCircle2 } from 'lucide-react';

interface Token {
  text: string;
  color: string;
}

interface CodeLine {
  tokens: Token[];
}

const CODE_LINES: CodeLine[] = [
  {
    tokens: [
      { text: 'import ', color: 'text-purple-400' },
      { text: 'React ', color: 'text-indigo-300' },
      { text: 'from ', color: 'text-purple-400' },
      { text: '\'react\';', color: 'text-emerald-400' },
    ],
  },
  { tokens: [] },
  {
    tokens: [
      { text: 'export ', color: 'text-purple-400' },
      { text: 'const ', color: 'text-purple-400' },
      { text: 'Developer ', color: 'text-amber-300 font-medium' },
      { text: '= () => {', color: 'text-zinc-300' },
    ],
  },
  {
    tokens: [
      { text: '  return (', color: 'text-purple-400' },
    ],
  },
  {
    tokens: [
      { text: '    <', color: 'text-zinc-500' },
      { text: 'Portfolio', color: 'text-cyan-400 font-medium' },
    ],
  },
  {
    tokens: [
      { text: '      name', color: 'text-indigo-300' },
      { text: '=', color: 'text-zinc-400' },
      { text: '"Himat Singh"', color: 'text-emerald-400' },
    ],
  },
  {
    tokens: [
      { text: '      role', color: 'text-indigo-300' },
      { text: '=', color: 'text-zinc-400' },
      { text: '"Full-Stack & AI"', color: 'text-emerald-400' },
    ],
  },
  {
    tokens: [
      { text: '      stack', color: 'text-indigo-300' },
      { text: '={[', color: 'text-zinc-400' },
      { text: '"React", "Vite", "TS"', color: 'text-emerald-400' },
      { text: ']}', color: 'text-zinc-400' },
    ],
  },
  {
    tokens: [
      { text: '      status', color: 'text-indigo-300' },
      { text: '=', color: 'text-zinc-400' },
      { text: '"Available for Hire"', color: 'text-emerald-400' },
    ],
  },
  {
    tokens: [
      { text: '    />', color: 'text-zinc-500' },
    ],
  },
  {
    tokens: [
      { text: '  );', color: 'text-zinc-300' },
    ],
  },
  {
    tokens: [
      { text: '};', color: 'text-zinc-300' },
    ],
  },
];

// Precompute total character count for typewriter loop
const TOTAL_CHARACTERS = CODE_LINES.reduce((sum, line) => {
  const lineLen = line.tokens.reduce((acc, t) => acc + t.text.length, 0);
  return sum + lineLen + 1; // +1 for newline
}, 0);

const GlassCardVisual: React.FC = () => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [typedCount, setTypedCount] = useState<number>(0);
  const [isTypingComplete, setIsTypingComplete] = useState<boolean>(false);
  const [isTouchDevice, setIsTouchDevice] = useState<boolean>(false);
  const [isInView, setIsInView] = useState<boolean>(false);

  // 3D Tilt Spring Motion Values
  const rawRotateX = useMotionValue(0);
  const rawRotateY = useMotionValue(0);
  const glossX = useMotionValue(50);
  const glossY = useMotionValue(50);

  const springConfig = { stiffness: 120, damping: 14 };
  const smoothRotateX = useSpring(rawRotateX, springConfig);
  const smoothRotateY = useSpring(rawRotateY, springConfig);

  useEffect(() => {
    // Detect touch capability
    const touch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    setIsTouchDevice(touch);

    // IntersectionObserver for trigger on scroll into view
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
        }
      },
      { threshold: 0.2 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Typewriter Effect logic
  useEffect(() => {
    if (!isInView || isTypingComplete) return;

    const timer = setInterval(() => {
      setTypedCount((prev) => {
        if (prev >= TOTAL_CHARACTERS) {
          clearInterval(timer);
          setIsTypingComplete(true);
          return TOTAL_CHARACTERS;
        }
        return prev + 1;
      });
    }, 28);

    return () => clearInterval(timer);
  }, [isInView, isTypingComplete]);

  // Mouse Move Tilt & Gloss
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isTouchDevice || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const normX = (x / rect.width) * 2 - 1; // -1 to 1
    const normY = (y / rect.height) * 2 - 1; // -1 to 1

    rawRotateX.set(-normY * 12); // tilt up/down
    rawRotateY.set(normX * 12);  // tilt left/right

    glossX.set((x / rect.width) * 100);
    glossY.set((y / rect.height) * 100);
  };

  const handleMouseLeave = () => {
    if (isTouchDevice) return;
    rawRotateX.set(0);
    rawRotateY.set(0);
    glossX.set(50);
    glossY.set(50);
  };

  // Helper to render typed characters line by line
  let charCounter = 0;

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="w-full h-full relative bg-transparent select-none pointer-events-auto flex items-center justify-center p-2 sm:p-4 perspective-[1000px]"
    >
      <motion.div
        style={{
          rotateX: smoothRotateX,
          rotateY: smoothRotateY,
          transformStyle: 'preserve-3d',
        }}
        className="relative w-full max-w-[420px] sm:max-w-[460px] rounded-2xl bg-zinc-900/85 border border-zinc-800/90 backdrop-blur-xl shadow-2xl shadow-indigo-500/10 overflow-hidden group transition-shadow duration-300 hover:shadow-indigo-500/20"
      >
        {/* Specular Highlight Gloss Overlay */}
        <motion.div
          style={{
            background: `radial-gradient(600px circle at ${glossX.get()}% ${glossY.get()}%, rgba(255, 255, 255, 0.08), transparent 60%)`,
          }}
          className="absolute inset-0 pointer-events-none z-20 transition-opacity duration-300 group-hover:opacity-100 opacity-60"
        />

        {/* Ambient Top Glow Border */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-indigo-500/50 to-transparent z-10" />

        {/* Code Editor Header Bar */}
        <div className="px-4 py-3 bg-zinc-950/80 border-b border-zinc-800/80 flex items-center justify-between z-10 relative">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-rose-500/80 border border-rose-600/50 inline-block" />
            <span className="w-3 h-3 rounded-full bg-amber-500/80 border border-amber-600/50 inline-block" />
            <span className="w-3 h-3 rounded-full bg-emerald-500/80 border border-emerald-600/50 inline-block" />
          </div>

          <div className="flex items-center gap-2 px-3 py-1 rounded-md bg-zinc-900/90 border border-zinc-800 text-xs font-mono text-zinc-300">
            <Code2 className="w-3.5 h-3.5 text-indigo-400" />
            <span>Developer.tsx</span>
          </div>

          <div className="flex items-center gap-1.5 text-[10px] font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>TypeScript</span>
          </div>
        </div>

        {/* Code Editor Body */}
        <div className="p-4 sm:p-5 font-mono text-xs sm:text-[13px] leading-relaxed text-zinc-200 overflow-x-auto min-h-[290px] flex flex-col justify-between">
          <div className="space-y-1">
            {CODE_LINES.map((line, lineIdx) => {
              return (
                <div key={lineIdx} className="flex items-start gap-3">
                  {/* Line Number */}
                  <span className="w-5 text-right text-zinc-600 text-[11px] select-none shrink-0 pt-0.5 font-mono">
                    {lineIdx + 1}
                  </span>

                  {/* Line Tokens */}
                  <div className="flex-1 whitespace-pre wrap-break-word">
                    {line.tokens.map((token, tokenIdx) => {
                      const startIdx = charCounter;
                      const endIdx = charCounter + token.text.length;
                      charCounter = endIdx;

                      if (typedCount < startIdx) {
                        return null; // Not reached yet
                      }

                      const visibleText = token.text.slice(0, Math.max(0, typedCount - startIdx));

                      return (
                        <span key={tokenIdx} className={token.color}>
                          {visibleText}
                        </span>
                      );
                    })}

                    {/* Blinking Cursor at active typing character position */}
                    {typedCount >= charCounter - 1 && typedCount < TOTAL_CHARACTERS && (
                      <span className="inline-block w-2 h-4 bg-indigo-400 ml-0.5 align-middle animate-pulse" />
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Footer Status Line inside editor */}
          <div className="mt-4 pt-3 border-t border-zinc-800/60 flex items-center justify-between text-[11px] text-zinc-500 font-mono">
            <div className="flex items-center gap-2">
              <Terminal className="w-3.5 h-3.5 text-zinc-400" />
              <span>UTF-8</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-indigo-400" />
              <span className="text-zinc-400">React 19 & Vite</span>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default GlassCardVisual;
