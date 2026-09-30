import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface StaggerContainerProps {
  children: React.ReactNode;
  className?: string;
  staggerDelay?: number;
  once?: boolean;
}

export const StaggerContainer: React.FC<StaggerContainerProps> = ({
  children,
  className = '',
  staggerDelay = 0.1,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      const items = containerRef.current!.querySelectorAll('.gsap-reveal-item');
      if (items.length === 0) return;

      gsap.fromTo(
        items,
        {
          opacity: 0,
          y: 25,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: staggerDelay,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none',
            once: true,
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, [staggerDelay]);

  return (
    <div ref={containerRef} className={className}>
      {children}
    </div>
  );
};

interface RevealItemProps {
  children: React.ReactNode;
  className?: string;
}

export const RevealItem: React.FC<RevealItemProps> = ({
  children,
  className = '',
}) => {
  return <div className={`gsap-reveal-item opacity-0 ${className}`}>{children}</div>;
};
