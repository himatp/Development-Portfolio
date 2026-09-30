import React, { lazy, Suspense } from 'react';
import { ACTIVE_HERO_VISUAL } from './config';

const ParticlesVisual = lazy(() => import('./ParticlesVisual'));
const WireframeVisual = lazy(() => import('./WireframeVisual'));
const BlobVisual = lazy(() => import('./BlobVisual'));
const GlassCardVisual = lazy(() => import('./GlassCardVisual'));
const OrbitIconsVisual = lazy(() => import('./OrbitIconsVisual'));
const CodeRainVisual = lazy(() => import('./CodeRainVisual'));

export const HeroVisual: React.FC = () => {
  const renderVisual = () => {
    switch (ACTIVE_HERO_VISUAL) {
      case 'particles':
        return <ParticlesVisual />;
      case 'wireframe':
        return <WireframeVisual />;
      case 'blob':
        return <BlobVisual />;
      case 'glass-card':
        return <GlassCardVisual />;
      case 'orbit-icons':
        return <OrbitIconsVisual />;
      case 'code-rain':
        return <CodeRainVisual />;
      default:
        return <ParticlesVisual />;
    }
  };

  return (
    <Suspense
      fallback={
        <div className="w-full h-full bg-zinc-950/80 animate-pulse flex items-center justify-center text-xs font-mono text-zinc-600">
          Loading Visual...
        </div>
      }
    >
      {renderVisual()}
    </Suspense>
  );
};
