import React, { useState } from 'react';
import { 
  Sparkles, 
  Github, 
  ExternalLink, 
  ArrowUpRight, 
  Terminal, 
  CheckCircle2,
  Code2,
  Database,
  Brain,
  Eye,
  BarChart2,
  ArrowLeft
} from 'lucide-react';
import { projectsData } from '../data/projects';
import { ProjectModal } from './ProjectModal';
import { useNavigation } from '../context/NavigationContext';

export const Projects = () => {
  const [activeProject, setActiveProject] = useState(null);
  const { setActiveTab } = useNavigation();

  return (
    <section id="projects" className="pt-1 pb-12 sm:pb-16 relative z-10 max-w-7xl mx-auto px-1 sm:px-3">
      
      {/* Section Header with Quick Back Pill */}
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={() => setActiveTab('home')}
          className="px-3 py-1 rounded-full text-xs font-mono text-slate-300 hover:text-[#c89658] bg-white/5 hover:bg-white/10 border border-white/10 transition flex items-center gap-1.5 group"
          title="Return to Home workspace"
        >
          <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
          <span className="hidden sm:inline">Workspace</span>
        </button>

        <div className="text-center">
          <h2 className="text-2xl sm:text-3xl font-display font-extrabold text-white tracking-tight">
            Featured <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#c89658] to-[#eed2ad]">Projects</span>
          </h2>
          <div className="w-16 h-0.5 bg-gradient-to-r from-[#c89658] to-[#eed2ad] rounded-full mx-auto mt-1" />
        </div>

        <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-[#c89658]/15 border border-[#c89658]/30 text-[#e4b57d] text-xs font-mono hidden sm:flex">
          <Sparkles className="w-3.5 h-3.5 text-[#c89658]" />
          <span>Implementations</span>
        </div>
      </div>

      {/* Projects Grid (Home Gold Theme) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {projectsData.map((project) => (
          <div
            key={project.id}
            className="glass-card glass-card-hover rounded-3xl overflow-hidden border border-white/10 hover:border-[#c89658]/60 hover:shadow-[0_8px_30px_rgba(200,150,88,0.2)] flex flex-col justify-between group cursor-pointer transition-all duration-300"
            onClick={() => setActiveProject(project)}
          >
            {/* Visual Top Card Banner with Warm Gold Accent */}
            <div className={`relative h-44 bg-gradient-to-br ${project.gradient} p-6 flex flex-col justify-between overflow-hidden border-b border-white/10`}>
              {/* Subtle Warm Overlay */}
              <div className="absolute inset-0 bg-[radial-gradient(#c89658_1px,transparent_1px)] [background-size:16px_16px] opacity-10" />
              
              <div className="relative z-10 flex items-center justify-between">
                <span className={`text-xs px-3 py-1 rounded-full font-mono border backdrop-blur-md ${project.badgeColor}`}>
                  {project.category}
                </span>

                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveProject(project);
                  }}
                  className="p-2 rounded-xl bg-black/60 hover:bg-[#1f202c] text-slate-300 hover:text-[#c89658] border border-white/10 hover:border-[#c89658]/40 transition"
                  title="View full project details"
                >
                  <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </button>
              </div>

              {/* Graphic Icon Display */}
              <div className="relative z-10 flex items-center gap-3">
                <div className="p-3 rounded-2xl bg-black/70 border border-[#c89658]/40 text-[#c89658] shadow-[0_0_15px_rgba(200,150,88,0.25)]">
                  {project.id === 'restaurant-data-analysis' && <BarChart2 className="w-6 h-6" />}
                  {project.id === 'nexa-ai' && <Brain className="w-6 h-6" />}
                  {project.id === 'ai-career-toolkit' && <Code2 className="w-6 h-6" />}
                  {project.id === 'smart-intruder-alert' && <Eye className="w-6 h-6" />}
                </div>
                <div>
                  <h3 className="text-xl font-display font-bold text-white group-hover:text-[#c89658] transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-xs text-slate-400 font-mono">{project.subtitle}</p>
                </div>
              </div>
            </div>

            {/* Project Content Body */}
            <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between space-y-4">
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {project.shortDescription}
              </p>

              {/* Technologies Badges */}
              <div className="flex flex-wrap gap-1.5 pt-2">
                {project.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="text-[11px] px-2.5 py-1 rounded-lg bg-[#14151e] border border-white/10 text-slate-300 font-mono group-hover:border-[#c89658]/40 group-hover:text-[#e4b57d] transition-colors"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {/* Card Footer Actions */}
              <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs">
                {project.hasValidGithub ? (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="inline-flex items-center gap-1.5 font-semibold text-sky-400 hover:text-sky-300 group/link transition"
                  >
                    <Github className="w-4 h-4 text-sky-400 group-link-hover:scale-110 transition-transform" />
                    <span>Explore GitHub</span>
                    <ArrowUpRight className="w-3.5 h-3.5 group-link-hover:translate-x-0.5 group-link-hover:-translate-y-0.5 transition" />
                  </a>
                ) : (
                  <span className="text-[11px] text-slate-500 font-mono">
                    Public repo pending release
                  </span>
                )}

                <button
                  onClick={() => setActiveProject(project)}
                  className="text-slate-300 hover:text-[#c89658] font-medium flex items-center gap-1 transition"
                >
                  <span>Details</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Project Details Modal */}
      {activeProject && (
        <ProjectModal
          project={activeProject}
          onClose={() => setActiveProject(null)}
        />
      )}
    </section>
  );
};
