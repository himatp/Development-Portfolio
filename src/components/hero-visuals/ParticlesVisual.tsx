import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  baseVx: number;
  baseVy: number;
  vx: number;
  vy: number;
  radius: number;
  color: string;
  alpha: number;
}

const PARTICLE_COUNT = 90;
const CONNECT_DISTANCE = 130;
const REPEL_DISTANCE = 160;
const COLOR_PALETTE = [
  'rgba(129, 140, 248, ', // indigo-400
  'rgba(168, 85, 247, ', // purple-500
  'rgba(99, 102, 241, ',  // indigo-500
  'rgba(192, 132, 252, ', // purple-400
  'rgba(56, 189, 248, ',  // cyan-400
];

const ParticlesVisual: React.FC = () => {
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

    // Detect touch device capability
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    mouseRef.current.isTouch = isTouchDevice;

    let animFrameId: number;
    let width = 0;
    let height = 0;
    let particles: Particle[] = [];

    // Initialize particles
    const initParticles = (w: number, h: number) => {
      particles = [];
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        const vx = (Math.random() - 0.5) * 0.65;
        const vy = (Math.random() - 0.5) * 0.65;
        const palette = COLOR_PALETTE[Math.floor(Math.random() * COLOR_PALETTE.length)];
        const alpha = 0.45 + Math.random() * 0.55;

        particles.push({
          x: Math.random() * w,
          y: Math.random() * h,
          baseVx: vx,
          baseVy: vy,
          vx: vx,
          vy: vy,
          radius: 1.5 + Math.random() * 2.2,
          color: palette,
          alpha: alpha,
        });
      }
    };

    // Canvas resize handler with DevicePixelRatio support
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

      if (particles.length === 0) {
        initParticles(width, height);
      }
    };

    const resizeObserver = new ResizeObserver(() => {
      handleResize();
    });
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

    // Track window scroll for subtle parallax
    const handleScroll = () => {
      scrollYRef.current = window.scrollY;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Mouse event listeners on container
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

        // Apply subtle parallax offset based on scroll position
        const parallaxOffset = (scrollYRef.current * 0.08) % height;

        ctx.save();
        ctx.translate(0, -parallaxOffset * 0.3);

        const mouse = mouseRef.current;

        // Update particle positions and velocities
        for (let i = 0; i < particles.length; i++) {
          const p = particles[i];

          // Cursor repel logic (if active & not touch)
          if (mouse.active && !mouse.isTouch) {
            const dx = p.x - mouse.x;
            const dy = p.y - mouse.y;
            const dist = Math.hypot(dx, dy);

            if (dist < REPEL_DISTANCE && dist > 0) {
              const force = (REPEL_DISTANCE - dist) / REPEL_DISTANCE;
              const angle = Math.atan2(dy, dx);
              const pushStrength = force * 1.6;
              p.vx += Math.cos(angle) * pushStrength;
              p.vy += Math.sin(angle) * pushStrength;
            }
          }

          // Elastic return to base velocity
          p.vx += (p.baseVx - p.vx) * 0.06;
          p.vy += (p.baseVy - p.vy) * 0.06;

          // Update coordinates
          p.x += p.vx;
          p.y += p.vy;

          // Wrap edges smoothly
          if (p.x < -15) p.x = width + 15;
          if (p.x > width + 15) p.x = -15;
          if (p.y < -15) p.y = height + 15;
          if (p.y > height + 15) p.y = -15;
        }

        // Draw connecting lines
        for (let i = 0; i < particles.length; i++) {
          for (let j = i + 1; j < particles.length; j++) {
            const p1 = particles[i];
            const p2 = particles[j];
            const dx = p1.x - p2.x;
            const dy = p1.y - p2.y;
            const dist = Math.hypot(dx, dy);

            if (dist < CONNECT_DISTANCE) {
              // Calculate edge alpha for both endpoints
              const margin = 45;
              const calcEdgeAlpha = (x: number, y: number) => {
                let ea = 1;
                if (x < margin) ea *= Math.max(0, x / margin);
                else if (x > width - margin) ea *= Math.max(0, (width - x) / margin);
                if (y < margin) ea *= Math.max(0, y / margin);
                else if (y > height - margin) ea *= Math.max(0, (height - y) / margin);
                return ea;
              };
              const pairEdgeAlpha = Math.min(calcEdgeAlpha(p1.x, p1.y), calcEdgeAlpha(p2.x, p2.y));

              const lineAlpha = (1 - dist / CONNECT_DISTANCE) * 0.32 * pairEdgeAlpha;
              if (lineAlpha > 0.01) {
                ctx.beginPath();
                ctx.moveTo(p1.x, p1.y);
                ctx.lineTo(p2.x, p2.y);
                ctx.strokeStyle = `rgba(129, 140, 248, ${lineAlpha})`;
                ctx.lineWidth = 1;
                ctx.stroke();
              }
            }
          }
        }

        // Draw particles & glow
        for (let i = 0; i < particles.length; i++) {
          const p = particles[i];

          // Edge fade computation
          const margin = 45;
          let edgeAlpha = 1;
          if (p.x < margin) edgeAlpha *= Math.max(0, p.x / margin);
          else if (p.x > width - margin) edgeAlpha *= Math.max(0, (width - p.x) / margin);
          if (p.y < margin) edgeAlpha *= Math.max(0, p.y / margin);
          else if (p.y > height - margin) edgeAlpha *= Math.max(0, (height - p.y) / margin);

          const finalAlpha = p.alpha * edgeAlpha;
          if (finalAlpha <= 0.01) continue;

          // Outer Glow
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius * 2.5, 0, Math.PI * 2);
          ctx.fillStyle = `${p.color}${finalAlpha * 0.25})`;
          ctx.fill();

          // Particle Core
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
          ctx.fillStyle = `${p.color}${finalAlpha})`;
          ctx.fill();
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
      className="w-full h-full relative overflow-hidden bg-transparent select-none pointer-events-auto"
    >
      {/* Canvas */}
      <canvas ref={canvasRef} className="block w-full h-full bg-transparent" />
    </div>
  );
};

export default ParticlesVisual;
