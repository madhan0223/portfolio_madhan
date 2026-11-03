import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { 
  X, 
  Github, 
  ExternalLink, 
  CheckCircle2, 
  Layers, 
  Cpu, 
  Sparkles 
} from 'lucide-react';

export const ProjectModal = ({ project, onClose }) => {
  // ESC key dismissal
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!project) return null;

  return createPortal(
    <div 
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-2xl bg-[#14151e] border border-[#c89658]/40 rounded-3xl p-6 sm:p-8 shadow-2xl text-slate-100 max-h-[90vh] overflow-y-auto custom-scrollbar"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Category & Title */}
        <div className="flex items-center gap-2 mb-2">
          <span className={`text-xs px-3 py-1 rounded-full font-mono border backdrop-blur-md ${project.badgeColor}`}>
            {project.category}
          </span>
          <span className="text-xs text-slate-400 font-mono">
            {project.subtitle}
          </span>
        </div>

        <h3 className="text-2xl sm:text-3xl font-display font-extrabold text-white mb-4">
          {project.title}
        </h3>

        {/* Technologies Badge List */}
        <div className="flex flex-wrap gap-2 mb-6">
          {project.technologies.map((tech) => (
            <span
              key={tech}
              className="text-xs px-2.5 py-1 rounded-lg bg-[#0c0d12] border border-white/10 text-[#e4b57d] font-mono"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Full Overview */}
        <div className="space-y-4 text-sm text-slate-300 leading-relaxed border-t border-white/10 pt-5">
          <h4 className="text-xs font-mono uppercase tracking-wider text-[#e4b57d]">
            Project Overview
          </h4>
          <p>{project.fullDescription}</p>

          {/* Key Features List */}
          <div className="pt-2">
            <h4 className="text-xs font-mono uppercase tracking-wider text-[#e4b57d] mb-3">
              Key Capabilities & Methodologies
            </h4>
            <div className="space-y-2">
              {project.features.map((feature, idx) => (
                <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-200">
                  <CheckCircle2 className="w-4 h-4 text-[#c89658] shrink-0 mt-0.5" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="mt-8 pt-5 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            {project.hasValidGithub ? (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 rounded-xl text-xs font-semibold bg-[#c89658] hover:bg-[#d8a568] text-[#0d0e12] shadow-[0_4px_20px_rgba(200,150,88,0.35)] flex items-center gap-2 transition"
              >
                <Github className="w-4 h-4" />
                <span>View GitHub Repository</span>
              </a>
            ) : (
              <div className="flex items-center gap-2 text-xs text-slate-400 font-mono bg-[#0c0d12] px-3 py-2 rounded-xl border border-white/10">
                <Github className="w-4 h-4 text-slate-500" />
                <span>{project.placeholderRepoNote || 'Repository in private development'}</span>
              </div>
            )}

            {project.liveDemoUrl && (
              <a
                href={project.liveDemoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 rounded-xl text-xs font-semibold bg-[#161720] hover:bg-[#1f202c] text-[#e4b57d] border border-[#c89658]/40 flex items-center gap-2 transition"
              >
                <ExternalLink className="w-4 h-4" />
                <span>Live Demo</span>
              </a>
            )}
          </div>

          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-medium text-slate-300 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 transition"
          >
            Close Details
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
};
