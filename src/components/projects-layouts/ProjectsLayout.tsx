import React, { lazy, Suspense } from 'react';
import { ACTIVE_PROJECTS_LAYOUT } from './config';
import type { Project } from '../../types';

const StackedPeek = lazy(() => import('./StackedPeek'));
const FannedDeck = lazy(() => import('./FannedDeck'));
const ThumbnailRail = lazy(() => import('./ThumbnailRail'));

interface ProjectsLayoutProps {
  projects: Project[];
  onSelectProject: (project: Project) => void;
}

export const ProjectsLayout: React.FC<ProjectsLayoutProps> = ({ projects, onSelectProject }) => {
  return (
    <Suspense
      fallback={
        <div className="min-h-[400px] flex items-center justify-center text-zinc-500 font-mono text-xs">
          Loading projects layout...
        </div>
      }
    >
      {(() => {
        switch (ACTIVE_PROJECTS_LAYOUT) {
          case 'stacked-peek':
            return <StackedPeek projects={projects} onSelectProject={onSelectProject} />;
          case 'fanned-deck':
            return <FannedDeck projects={projects} onSelectProject={onSelectProject} />;
          case 'thumbnail-rail':
            return <ThumbnailRail projects={projects} onSelectProject={onSelectProject} />;
          default:
            return <ThumbnailRail projects={projects} onSelectProject={onSelectProject} />;
        }
      })()}
    </Suspense>
  );
};
