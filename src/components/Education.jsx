import React from 'react';
import { GraduationCap, Sparkles, Award, Calendar, BookOpen } from 'lucide-react';
import { educationData } from '../data/experience';

export const Education = () => {
  return (
    <section id="education" className="py-20 sm:py-28 relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Section Header */}
      <div className="flex flex-col items-center text-center mb-16">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-mono mb-3">
          <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
          <span>Academic Milestones</span>
        </div>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold text-white tracking-tight">
          Educational <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">Background</span>
        </h2>
        <div className="w-20 h-1 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full mt-3" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {educationData.map((item, idx) => (
          <div
            key={item.id}
            className={`glass-card glass-card-hover rounded-3xl p-6 sm:p-7 flex flex-col justify-between border ${
              idx === 0 
                ? 'border-cyan-400/40 shadow-neon-cyan relative overflow-hidden' 
                : 'border-purple-500/20'
            }`}
          >
            {idx === 0 && (
              <div className="absolute top-0 right-0 px-4 py-1 bg-gradient-to-l from-cyan-500 to-purple-600 text-white text-[10px] font-mono font-bold tracking-wider uppercase rounded-bl-xl shadow-sm">
                Current Degree
              </div>
            )}

            <div>
              <div className="p-3 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 w-fit mb-4">
                <GraduationCap className="w-6 h-6" />
              </div>

              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-mono text-cyan-300 font-semibold bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-800/40">
                  {item.score}
                </span>
                <span className="text-[11px] text-slate-400 font-mono">
                  {item.period}
                </span>
              </div>

              <h3 className="text-lg font-display font-bold text-white mb-2 leading-snug">
                {item.degree}
              </h3>

              <p className="text-xs text-slate-300 font-medium mb-3">
                {item.institution}
              </p>

              <p className="text-xs text-slate-400 leading-relaxed">
                {item.description}
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-500 font-mono">
              <span>Status</span>
              <span className="text-emerald-400">✓ {item.status}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
