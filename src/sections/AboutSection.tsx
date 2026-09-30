import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useMotionTemplate } from 'framer-motion';
import { ArrowUpRight, X, Code2, Cpu, Zap, ShieldCheck } from 'lucide-react';
import { ABOUT_DATA } from '../data/portfolioData';
import { SectionHeader } from '../components/ui/SectionHeader';
import { StaggerContainer, RevealItem } from '../components/motion/StaggerContainer';

const FULL_QUOTE = "Focused on building clean, functional, and visually engaging digital products.";

// Typewriter Quote Component on Scroll
const TypewriterQuote: React.FC = () => {
  const quoteRef = useRef<HTMLDivElement>(null);
  const [typedCount, setTypedCount] = useState<number>(0);
  const [isComplete, setIsComplete] = useState<boolean>(false);
  const [hasTriggered, setHasTriggered] = useState<boolean>(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasTriggered) {
          setHasTriggered(true);
        }
      },
      { threshold: 0.3 }
    );

    if (quoteRef.current) {
      observer.observe(quoteRef.current);
    }

    return () => observer.disconnect();
  }, [hasTriggered]);

  useEffect(() => {
    if (!hasTriggered || isComplete) return;

    const timer = setInterval(() => {
      setTypedCount((prev) => {
        if (prev >= FULL_QUOTE.length) {
          clearInterval(timer);
          setIsComplete(true);
          return FULL_QUOTE.length;
        }
        return prev + 1;
      });
    }, 28);

    return () => clearInterval(timer);
  }, [hasTriggered, isComplete]);

  return (
    <div
      ref={quoteRef}
      className="absolute bottom-6 left-6 right-6 p-4 rounded-xl bg-zinc-900/90 border border-zinc-800 backdrop-blur-md z-20"
      style={{ transform: 'translateZ(20px)' }}
    >
      <p className="text-xs text-zinc-300 font-mono italic min-h-[36px] flex items-center flex-wrap">
        <span>"{FULL_QUOTE.slice(0, typedCount)}"</span>
        {!isComplete && hasTriggered && (
          <span className="inline-block w-1.5 h-3.5 bg-indigo-400 ml-0.5 align-middle animate-pulse shrink-0" />
        )}
      </p>
    </div>
  );
};

// 3D Tilt & Moving Gloss Photo Card Component
const TiltPhotoCard: React.FC = () => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  const rawRotateX = useMotionValue(0);
  const rawRotateY = useMotionValue(0);
  const glossX = useMotionValue(50);
  const glossY = useMotionValue(50);

  const springConfig = { stiffness: 120, damping: 14 };
  const smoothRotateX = useSpring(rawRotateX, springConfig);
  const smoothRotateY = useSpring(rawRotateY, springConfig);

  const glossBackground = useMotionTemplate`radial-gradient(600px circle at ${glossX}% ${glossY}%, rgba(255, 255, 255, 0.12), transparent 60%)`;

  useEffect(() => {
    const touch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    setIsTouchDevice(touch);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isTouchDevice || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const normX = (x / rect.width) * 2 - 1; // -1 to 1
    const normY = (y / rect.height) * 2 - 1; // -1 to 1

    rawRotateX.set(-normY * 10); // max 10deg tilt
    rawRotateY.set(normX * 10);

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

  return (
    <div className="perspective-[1000px] w-full">
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX: smoothRotateX,
          rotateY: smoothRotateY,
          transformStyle: 'preserve-3d',
        }}
        className="aspect-square rounded-3xl overflow-hidden border border-zinc-800 bg-zinc-900/50 p-2 relative group transition-all duration-300 hover:border-zinc-700 hover:shadow-2xl hover:shadow-indigo-500/10"
      >
        <img
          src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1000&auto=format&fit=crop"
          alt="Developer workspace"
          className="w-full h-full object-cover rounded-2xl grayscale group-hover:grayscale-0 transition-all duration-700 opacity-80"
        />
        <div className="absolute inset-0 bg-zinc-950/30 rounded-2xl pointer-events-none z-0" />

        {/* Soft Moving Gloss/Highlight Overlay */}
        {!isTouchDevice && (
          <motion.div
            style={{
              background: glossBackground,
            }}
            className="absolute inset-0 rounded-2xl pointer-events-none z-10 transition-opacity duration-300 opacity-60 group-hover:opacity-100"
          />
        )}

        {/* Typewriter Floating Quote Card */}
        <TypewriterQuote />
      </motion.div>
    </div>
  );
};

// 3D Hover-Tilt Feature Card Component
interface TiltFeatureCardProps {
  title: string;
  desc: string;
  icon: React.ComponentType<{ className?: string }>;
  delay: number;
}

const TiltFeatureCard: React.FC<TiltFeatureCardProps> = ({ title, desc, icon: IconComponent, delay }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const rawRotateX = useMotionValue(0);
  const rawRotateY = useMotionValue(0);

  const springConfig = { stiffness: 180, damping: 16 };
  const rotateX = useSpring(rawRotateX, springConfig);
  const rotateY = useSpring(rawRotateY, springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (isTouch || !cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const normX = (x / rect.width) * 2 - 1;
    const normY = (y / rect.height) * 2 - 1;

    rawRotateX.set(-normY * 8); // max 8deg tilt
    rawRotateY.set(normX * 8);
  };

  const handleMouseEnter = () => {
    const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (!isTouch) setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    rawRotateX.set(0);
    rawRotateY.set(0);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className="perspective-[800px]"
    >
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
        }}
        animate={{
          scale: isHovered ? 1.02 : 1,
        }}
        transition={{ duration: 0.2 }}
        className={`p-5 rounded-2xl bg-zinc-900/40 border transition-all duration-300 ${
          isHovered
            ? 'border-indigo-500/50 bg-zinc-900/80 shadow-lg shadow-indigo-500/10'
            : 'border-zinc-800/80 hover:border-zinc-700'
        }`}
      >
        <motion.div
          animate={{
            scale: isHovered ? 1.12 : 1,
            rotate: isHovered ? 6 : 0,
          }}
          transition={{ type: 'spring', stiffness: 300, damping: 15 }}
          className="w-8 h-8 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 mb-3"
        >
          <IconComponent className="w-4 h-4" />
        </motion.div>
        <h4 className="text-base font-heading font-medium text-white mb-1">
          {title}
        </h4>
        <p className="text-xs text-zinc-400 leading-relaxed">
          {desc}
        </p>
      </motion.div>
    </motion.div>
  );
};

export const AboutSection: React.FC = () => {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <section id="about" className="py-24 md:py-36 bg-zinc-950 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <SectionHeader
          title={ABOUT_DATA.heading}
          scrollReveal={true}
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Visual Illustration Card */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="lg:col-span-5 relative"
          >
            <TiltPhotoCard />
          </motion.div>

          {/* Right Narrative & Feature Grid */}
          <div className="lg:col-span-7 flex flex-col justify-between">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: 'easeOut' }}
              className="text-lg sm:text-xl text-zinc-300 font-normal leading-relaxed mb-10"
            >
              {ABOUT_DATA.content}
            </motion.p>

            {/* 3D Hover-Tilt Feature Cards Grid */}
            <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
              {ABOUT_DATA.highlights.map((item, index) => {
                const icons = [Code2, Zap, Cpu, ShieldCheck];
                const IconComponent = icons[index % icons.length];
                return (
                  <RevealItem key={item.title}>
                    <TiltFeatureCard
                      title={item.title}
                      desc={item.desc}
                      icon={IconComponent}
                      delay={0}
                    />
                  </RevealItem>
                );
              })}
            </StaggerContainer>

            {/* CTA Button */}
            <div>
              <button
                type="button"
                onClick={() => setModalOpen(true)}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-zinc-900 border border-zinc-800 text-white font-medium text-xs hover:bg-zinc-800 transition-colors cursor-pointer"
                data-cursor-text="About"
              >
                <span>{ABOUT_DATA.ctaText}</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Extended About Modal */}
      <AnimatePresence>
        {modalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setModalOpen(false)}
              className="fixed inset-0 bg-zinc-950/80 backdrop-blur-md"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-2xl bg-zinc-900 border border-zinc-800 rounded-2xl p-6 sm:p-8 z-10 shadow-2xl my-auto"
            >
              <div className="flex items-center justify-between pb-4 mb-6 border-b border-zinc-800">
                <h3 className="text-2xl font-heading font-medium text-white">
                  About Himat
                </h3>
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="p-2 rounded-full bg-zinc-800 text-zinc-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-4 text-zinc-300 text-sm leading-relaxed mb-8">
                <p>
                  Hello! I'm Himat, a freelance developer with over 4 years of experience crafting high-performance digital products for clients worldwide.
                </p>
                <p>
                  My core focus lies at the intersection of modern frontend architectures (React, TypeScript, Tailwind CSS), backend REST/GraphQL APIs (Node.js, Express, Python), and practical AI integrations (OpenAI LLMs, RAG knowledge bases, speech processing).
                </p>
                <p>
                  Whether working with early-stage founders to turn raw ideas into launched MVP applications, or collaborating with established businesses to modernize legacy UI/UX systems, I prioritize clear code structure, speed, and intuitive motion.
                </p>
              </div>

              <div className="flex items-center justify-end gap-4 pt-4 border-t border-zinc-800">
                <a
                  href="#contact"
                  onClick={() => setModalOpen(false)}
                  className="px-6 py-2.5 rounded-full bg-white text-black font-medium text-xs hover:bg-zinc-200 transition-colors"
                >
                  Let's Work Together
                </a>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};

