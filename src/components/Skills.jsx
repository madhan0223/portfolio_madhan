import React, { useState } from 'react';
import { 
  Sparkles, 
  Code, 
  Database, 
  Brain, 
  BarChart3, 
  FileSpreadsheet, 
  GitBranch, 
  Github, 
  Cpu, 
  Eye, 
  ScanFace, 
  LineChart, 
  PieChart, 
  BookOpen,
  Table,
  Binary,
  ArrowLeft
} from 'lucide-react';
import { skillCategories } from '../data/skills';
import { useNavigation } from '../context/NavigationContext';

// Dynamic icon mapper
const iconMap = {
  Code,
  Database,
  Brain,
  BarChart3,
  FileSpreadsheet,
  GitBranch,
  Github,
  Cpu,
  Eye,
  ScanFace,
  LineChart,
  PieChart,
  BookOpen,
  Table,
  Binary
};

export const Skills = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const { setActiveTab } = useNavigation();

  const displayedCategories = selectedCategory === 'all' 
    ? skillCategories 
    : skillCategories.filter(cat => cat.id === selectedCategory);

  return (
    <section id="skills" className="pt-1 pb-12 sm:pb-16 relative z-10 max-w-7xl mx-auto px-1 sm:px-3">
      
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
            Technical <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#c89658] to-[#eed2ad]">Skills</span>
          </h2>
          <div className="w-16 h-0.5 bg-gradient-to-r from-[#c89658] to-[#eed2ad] rounded-full mx-auto mt-1" />
        </div>

        <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-[#c89658]/15 border border-[#c89658]/30 text-[#e4b57d] text-xs font-mono hidden sm:flex">
          <Sparkles className="w-3.5 h-3.5 text-[#c89658]" />
          <span>Competencies</span>
        </div>
      </div>

      {/* Filter Tabs (Home Gold Theme) */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-6">
        <button
          onClick={() => setSelectedCategory('all')}
          className={`px-4 py-2 rounded-xl text-xs font-medium transition-all ${
            selectedCategory === 'all'
              ? 'bg-[#c89658] text-[#0d0e12] font-semibold shadow-[0_4px_20px_rgba(200,150,88,0.35)]'
              : 'bg-[#14151e] text-slate-300 border border-white/10 hover:text-white hover:border-[#c89658]/40'
          }`}
        >
          All Specializations
        </button>
        {skillCategories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={`px-4 py-2 rounded-xl text-xs font-medium transition-all ${
              selectedCategory === cat.id
                ? 'bg-[#c89658] text-[#0d0e12] font-semibold shadow-[0_4px_20px_rgba(200,150,88,0.35)]'
                : 'bg-[#14151e] text-slate-300 border border-white/10 hover:text-white hover:border-[#c89658]/40'
            }`}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {/* Skill Category Cards (Home Gold Theme) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {displayedCategories.map((category) => (
          <div 
            key={category.id}
            className="glass-card glass-card-hover rounded-3xl p-6 sm:p-7 flex flex-col justify-between border border-white/10 hover:border-[#c89658]/50 hover:shadow-[0_8px_30px_rgba(200,150,88,0.18)] relative overflow-hidden group transition-all duration-300"
          >
            {/* Ambient corner glow */}
            <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl ${category.accent} rounded-full blur-2xl pointer-events-none`} />

            <div>
              {/* Category Header */}
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-mono font-semibold px-2.5 py-1 rounded-full bg-[#c89658]/15 border border-[#c89658]/35 text-[#e4b57d]">
                  {category.badge}
                </span>
                <span className="text-xs text-slate-400 font-mono">
                  {category.skills.length} Tools
                </span>
              </div>

              <h3 className="text-xl font-display font-bold text-white mb-2 group-hover:text-[#c89658] transition-colors">
                {category.name}
              </h3>
              <p className="text-xs text-slate-400 mb-6 leading-relaxed">
                {category.description}
              </p>

              {/* Skills Grid */}
              <div className="grid grid-cols-1 gap-2.5">
                {category.skills.map((skill) => {
                  const IconComponent = iconMap[skill.icon] || Code;
                  return (
                    <div 
                      key={skill.name}
                      className="p-2.5 rounded-xl bg-[#14151e]/80 border border-white/5 hover:border-[#c89658]/40 hover:bg-[#181a24] transition-all flex items-center justify-between group/item"
                    >
                      <div className="flex items-center gap-2.5">
                        <div className="p-1.5 rounded-lg bg-black/60 border border-white/10 text-[#c89658] group-hover/item:border-[#c89658]/40 transition-colors">
                          <IconComponent className="w-4 h-4" />
                        </div>
                        <span className="text-xs font-semibold text-slate-200 group-hover/item:text-white">
                          {skill.name}
                        </span>
                      </div>
                      <span className="text-[10px] font-mono text-slate-400 group-hover/item:text-[#e4b57d]">
                        {skill.tag}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Authenticity Assurance Footer */}
            <div className="mt-6 pt-4 border-t border-white/10 text-[11px] text-slate-400 flex items-center justify-between">
              <span>Verified resume technology</span>
              <span className="text-sky-400 font-mono font-medium">✓ Practical</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
