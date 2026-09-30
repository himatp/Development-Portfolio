import React, { useState, useEffect, useRef } from 'react';

type HeadingElement = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'div' | 'p' | 'span';

interface TypewriterHeadingProps {
  text: string;
  className?: string;
  as?: HeadingElement;
  speed?: number;
}

export const TypewriterHeading: React.FC<TypewriterHeadingProps> = ({
  text,
  className = '',
  as: Component = 'h2',
  speed = 30,
}) => {
  const headingRef = useRef<HTMLElement>(null);
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
      { threshold: 0.2 }
    );

    if (headingRef.current) {
      observer.observe(headingRef.current);
    }

    return () => observer.disconnect();
  }, [hasTriggered]);

  useEffect(() => {
    if (!hasTriggered || isComplete) return;

    const timer = setInterval(() => {
      setTypedCount((prev) => {
        if (prev >= text.length) {
          clearInterval(timer);
          setIsComplete(true);
          return text.length;
        }
        return prev + 1;
      });
    }, speed);

    return () => clearInterval(timer);
  }, [hasTriggered, isComplete, text, speed]);

  return (
    <Component ref={headingRef as any} className={className}>
      <span>{text.slice(0, typedCount)}</span>
      {!isComplete && hasTriggered && (
        <span className="inline-block w-[0.35em] h-[0.8em] bg-indigo-400 ml-1 align-baseline animate-pulse shrink-0" />
      )}
    </Component>
  );
};
