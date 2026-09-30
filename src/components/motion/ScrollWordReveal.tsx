import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ScrollWordRevealProps {
  text: string;
  className?: string;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'div' | 'p' | 'span';
}

export const ScrollWordReveal: React.FC<ScrollWordRevealProps> = ({
  text,
  className = '',
  as: Component = 'h2',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const wordsRef = useRef<HTMLSpanElement[]>([]);

  useEffect(() => {
    if (!containerRef.current || wordsRef.current.length === 0) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        wordsRef.current,
        {
          opacity: 0.2,
          filter: 'blur(4px)',
        },
        {
          opacity: 1,
          filter: 'blur(0px)',
          stagger: 0.1,
          ease: 'none',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 92%',
            end: 'top 35%',
            scrub: true,
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, [text]);

  const words = text.split(' ');

  return (
    <div ref={containerRef} className="inline-block w-full">
      <Component className={className}>
        <span className="inline-flex flex-wrap items-center">
          {words.map((word, i) => (
            <span
              key={`${word}-${i}`}
              ref={(el) => {
                if (el) wordsRef.current[i] = el;
              }}
              className="inline-block mr-[0.28em] last:mr-0 select-none opacity-20 filter blur-[4px]"
            >
              {word}
            </span>
          ))}
        </span>
      </Component>
    </div>
  );
};
