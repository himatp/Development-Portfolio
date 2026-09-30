import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, GitBranch, CheckCircle2, Calendar, User } from 'lucide-react';
import type { Project } from '../types';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    if (project) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose]);

  return (
    <AnimatePresence>
      {project && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-zinc-950/80 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full max-w-4xl bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden shadow-2xl z-10 max-h-[90vh] flex flex-col my-auto"
          >
            {/* Header / Close button */}
            <div className="flex items-center justify-between p-6 border-b border-zinc-800 bg-zinc-900/90 sticky top-0 z-20 backdrop-blur-sm">
              <div className="flex items-center gap-3">
                <span className="px-3 py-1 rounded-full text-xs font-mono uppercase bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                  {project.category}
                </span>
                <h3 className="text-xl font-heading font-medium text-white hidden sm:block">
                  {project.title}
                </h3>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="p-2 rounded-full bg-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-700 transition-colors"
                aria-label="Close Project Details"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Scrollable Content */}
            <div className="p-6 sm:p-8 overflow-y-auto space-y-8">
              {/* Image banner */}
              <div className="relative rounded-xl overflow-hidden aspect-video border border-zinc-800">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Title & Short info */}
              <div>
                <h2 className="text-3xl sm:text-4xl font-heading font-light text-white mb-4">
                  {project.title}
                </h2>
                <p className="text-zinc-300 text-base sm:text-lg leading-relaxed">
                  {project.fullDescription}
                </p>
              </div>

              {/* Metadata row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-xl bg-zinc-950/60 border border-zinc-800/80">
                {project.timeline && (
                  <div className="flex items-start gap-3">
                    <Calendar className="w-4 h-4 text-indigo-400 mt-1" />
                    <div>
                      <span className="text-[10px] uppercase font-mono text-zinc-500 block">Timeline</span>
                      <span className="text-sm font-medium text-zinc-200">{project.timeline}</span>
                    </div>
                  </div>
                )}
                {project.role && (
                  <div className="flex items-start gap-3">
                    <User className="w-4 h-4 text-indigo-400 mt-1" />
                    <div>
                      <span className="text-[10px] uppercase font-mono text-zinc-500 block">Role</span>
                      <span className="text-sm font-medium text-zinc-200">{project.role}</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Features list */}
              {project.features && project.features.length > 0 && (
                <div>
                  <h4 className="text-xs font-mono uppercase text-zinc-400 tracking-wider mb-4">
                    Key Deliverables & Features
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {project.features.map((feature, idx) => (
                      <div key={idx} className="flex items-start gap-3 p-3 rounded-lg bg-zinc-950/30 border border-zinc-800/50">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                        <span className="text-sm text-zinc-300 leading-snug">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Technologies */}
              <div>
                <h4 className="text-xs font-mono uppercase text-zinc-400 tracking-wider mb-3">
                  Technologies Used
                </h4>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 rounded-md text-xs font-mono bg-zinc-800 text-zinc-300 border border-zinc-700"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-4 pt-4 border-t border-zinc-800">
                {project.demoUrl && project.demoUrl !== '#' && (
                  <a
                    href={project.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white text-black font-medium text-xs tracking-wide hover:bg-zinc-200 transition-colors"
                  >
                    <span>Visit Live Demo</span>
                    <ExternalLink className="w-4 h-4" />
                  </a>
                )}
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-zinc-800 text-white font-medium text-xs border border-zinc-700 hover:bg-zinc-700 transition-colors"
                  >
                    <GitBranch className="w-4 h-4" />
                    <span>View Repository</span>
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
