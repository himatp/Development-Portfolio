import React from 'react';
import { PROJECTS_DATA } from '../data/portfolioData';
import type { Project } from '../types';
import { SectionHeader } from '../components/ui/SectionHeader';
import { ProjectsLayout } from '../components/projects-layouts/ProjectsLayout';

interface ProjectsSectionProps {
  onSelectProject: (project: Project) => void;
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({ onSelectProject }) => {
  return (
    <section id="projects" className="py-24 md:py-36 bg-zinc-950 border-t border-zinc-900 relative">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <SectionHeader
          title="Selected Work"
          subtitle="Explore flagship web applications, AI tools, custom software systems, and digital products."
        />

        {/* Projects Layout Switcher View */}
        <ProjectsLayout
          projects={PROJECTS_DATA}
          onSelectProject={onSelectProject}
        />
      </div>
    </section>
  );
};
