import React from 'react';
import { Award, Sparkles, ExternalLink, CheckCircle2, ShieldCheck, ArrowLeft } from 'lucide-react';
import { certificationsData } from '../data/certifications';
import { useNavigation } from '../context/NavigationContext';

export const Certifications = () => {
  const { setActiveTab } = useNavigation();

  return (
    <section id="certifications" className="pt-1 pb-12 sm:pb-16 relative z-10 max-w-7xl mx-auto px-1 sm:px-3">
      
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
            Verified <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#c89658] to-[#eed2ad]">Certifications</span>
          </h2>
          <div className="w-16 h-0.5 bg-gradient-to-r from-[#c89658] to-[#eed2ad] rounded-full mx-auto mt-1" />
        </div>

        <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-[#c89658]/15 border border-[#c89658]/30 text-[#e4b57d] text-xs font-mono hidden sm:flex">
          <Sparkles className="w-3.5 h-3.5 text-[#c89658]" />
          <span>Credentials</span>
        </div>
      </div>

      {/* Certifications Grid (Home Gold Theme) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {certificationsData.map((cert) => (
          <div
            key={cert.id}
            className="glass-card glass-card-hover rounded-3xl p-6 sm:p-7 flex flex-col justify-between border border-white/10 hover:border-[#c89658]/60 hover:shadow-[0_8px_30px_rgba(200,150,88,0.2)] relative group transition-all duration-300"
          >
            <div>
              {/* Header Badge */}
              <div className="flex items-center justify-between mb-4">
                <span className={`text-[10px] font-mono font-semibold px-2.5 py-0.5 rounded-full bg-[#14151e] border ${cert.border} ${cert.textColor}`}>
                  {cert.badge}
                </span>
                <ShieldCheck className={`w-4 h-4 ${cert.textColor}`} />
              </div>

              <h3 className="text-base sm:text-lg font-display font-bold text-white mb-1.5 group-hover:text-[#c89658] transition-colors">
                {cert.title}
              </h3>

              <div className="flex items-center gap-1.5 text-xs text-[#e4b57d] font-mono mb-3">
                <span>Issuer:</span>
                <span className="text-white font-medium">{cert.issuer}</span>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed mb-4">
                {cert.description}
              </p>

              {/* Skills Tags */}
              <div className="flex flex-wrap gap-1.5">
                {cert.skills.map((s) => (
                  <span
                    key={s}
                    className="text-[10px] px-2 py-0.5 rounded-lg bg-[#14151e] border border-white/10 text-slate-300 font-mono"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>

            {/* Footer Verification Note */}
            <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-[11px] text-slate-400">
              <span className="flex items-center gap-1 text-emerald-400">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Resume Verified</span>
              </span>
              <span className="font-mono text-slate-400">{cert.category}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
