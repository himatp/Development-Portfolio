import React, { useEffect, useRef } from 'react';

const CODE_TOKENS = [
  'const',
  '=>',
  '{}',
  'async',
  'return',
  '<div>',
  'useState',
  'import',
  'npm',
  'git',
  'React',
  'TS',
  'Vite',
  'await',
  'props',
  '<App />',
  '[]',
  'true',
  'function',
  'interface',
  'export',
  'type',
  'className',
  'useEffect',
  'null',
  'flex',
  'motion',
  '</>',
  'string',
  'boolean',
  'map',
];

interface Stream {
  x: number;
  y: number;
  baseSpeed: number;
  speed: number;
  length: number;
  fontSize: number;
  tokens: string[];
}

const CodeRainVisual: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isVisibleRef = useRef<boolean>(true);
  const mouseRef = useRef<{ x: number; y: number; active: boolean; isTouch: boolean }>({
    x: -1000,
    y: -1000,
    active: false,
    isTouch: false,
  });
  const scrollYRef = useRef<number>(0);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Touch device detection
    const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    mouseRef.current.isTouch = isTouch;

    let animFrameId: number;
    let width = 0;
    let height = 0;
    let streams: Stream[] = [];

    // Initialize spaced-out low density streams
    const initStreams = (w: number, h: number) => {
      streams = [];
      const isMobile = w < 640;
      const columnSpacing = isMobile ? 42 : 36;
      const totalColumns = Math.floor(w / columnSpacing);
      // Low density: pick ~40% of available columns
      const activeColumnsCount = Math.floor(totalColumns * 0.45);

      const availableCols: number[] = [];
      for (let c = 0; c < totalColumns; c++) {
        availableCols.push(c);
      }

      // Shuffle columns
      for (let i = availableCols.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [availableCols[i], availableCols[j]] = [availableCols[j], availableCols[i]];
      }

      const selectedCols = availableCols.slice(0, activeColumnsCount);

      selectedCols.forEach((colIdx) => {
        const x = colIdx * columnSpacing + columnSpacing / 2;
        const length = 6 + Math.floor(Math.random() * 5); // 6 to 10 tokens
        const tokens: string[] = [];

        for (let i = 0; i < length; i++) {
          tokens.push(CODE_TOKENS[Math.floor(Math.random() * CODE_TOKENS.length)]);
        }

        streams.push({
          x,
          y: Math.random() * -h, // start staggered above top boundary
          baseSpeed: 1.0 + Math.random() * 1.2, // slow ambient speed
          speed: 1.2,
          length,
          fontSize: isMobile ? 11 : 13,
          tokens,
        });
      });
    };

    // Canvas resize handler with DevicePixelRatio
    const handleResize = () => {
      const rect = container.getBoundingClientRect();
      width = rect.width;
      height = rect.height;

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.scale(dpr, dpr);

      if (streams.length === 0) {
        initStreams(width, height);
      }
    };

    const resizeObserver = new ResizeObserver(() => handleResize());
    resizeObserver.observe(container);
    handleResize();

    // IntersectionObserver to pause when out of viewport
    const io = new IntersectionObserver(
      ([entry]) => {
        isVisibleRef.current = entry.isIntersecting;
      },
      { threshold: 0.05 }
    );
    io.observe(container);

    // Scroll listener for parallax
    const handleScroll = () => {
      scrollYRef.current = window.scrollY;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Mouse event listeners
    const handleMouseMove = (e: MouseEvent) => {
      if (mouseRef.current.isTouch) return;
      const rect = container.getBoundingClientRect();
      mouseRef.current.x = e.clientX - rect.left;
      mouseRef.current.y = e.clientY - rect.top;
      mouseRef.current.active = true;
    };

    const handleMouseLeave = () => {
      mouseRef.current.active = false;
      mouseRef.current.x = -1000;
      mouseRef.current.y = -1000;
    };

    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('mouseleave', handleMouseLeave);

    // Animation Loop
    const render = () => {
      if (isVisibleRef.current && width > 0 && height > 0) {
        ctx.clearRect(0, 0, width, height);

        // Scroll parallax offset
        const parallaxOffset = (scrollYRef.current * 0.08) % height;

        ctx.save();
        ctx.translate(0, -parallaxOffset * 0.25);

        const mouse = mouseRef.current;

        for (let i = 0; i < streams.length; i++) {
          const stream = streams[i];

          // Proximity slowdown and glow check
          let targetSpeed = stream.baseSpeed;
          let isNear = false;

          if (mouse.active && !mouse.isTouch) {
            const dx = stream.x - mouse.x;
            const dy = stream.y - mouse.y;
            const dist = Math.hypot(dx, dy);

            if (dist < 120 && dist > 0) {
              isNear = true;
              targetSpeed = stream.baseSpeed * 0.25; // Slow down/pause near cursor
            }
          }

          // Smooth lerp speed transition
          stream.speed += (targetSpeed - stream.speed) * 0.08;
          stream.y += stream.speed;

          // Reset stream when head passes bottom boundary plus tail length
          const tailLengthPx = stream.length * (stream.fontSize * 1.8);
          if (stream.y - tailLengthPx > height) {
            stream.y = Math.random() * -120 - 40;
            // Rotate tokens
            for (let t = 0; t < stream.tokens.length; t++) {
              stream.tokens[t] = CODE_TOKENS[Math.floor(Math.random() * CODE_TOKENS.length)];
            }
          }

          // Draw tokens in stream
          ctx.font = `500 ${stream.fontSize}px ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace`;

          for (let j = 0; j < stream.length; j++) {
            const tokenY = stream.y - j * (stream.fontSize * 1.8);
            if (tokenY < -20 || tokenY > height + 20) continue;

            const token = stream.tokens[j] || CODE_TOKENS[0];

            if (j === 0) {
              // Head Token: Brighter White / Glowing Violet
              ctx.shadowColor = isNear ? 'rgba(192, 132, 252, 0.9)' : 'rgba(168, 85, 247, 0.7)';
              ctx.shadowBlur = isNear ? 12 : 6;
              ctx.fillStyle = isNear ? '#ffffff' : 'rgba(238, 242, 255, 0.95)';
            } else {
              // Trailing Tokens: Fading violet/purple/indigo opacity
              ctx.shadowColor = 'transparent';
              ctx.shadowBlur = 0;

              const fadeRatio = 1 - j / stream.length;
              const alpha = Math.max(0.08, fadeRatio * (isNear ? 0.9 : 0.65));

              if (j % 2 === 0) {
                ctx.fillStyle = `rgba(168, 85, 247, ${alpha})`; // purple-500
              } else {
                ctx.fillStyle = `rgba(129, 140, 248, ${alpha})`; // indigo-400
              }
            }

            ctx.fillText(token, stream.x, tokenY);
          }
        }

        ctx.restore();
      }

      animFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animFrameId);
      resizeObserver.disconnect();
      io.disconnect();
      window.removeEventListener('scroll', handleScroll);
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="w-full h-full relative overflow-hidden bg-transparent select-none pointer-events-auto flex items-center justify-center"
    >
      <canvas ref={canvasRef} className="block w-full h-full bg-transparent" />
    </div>
  );
};

export default CodeRainVisual;
