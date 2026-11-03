import React from 'react';
import { Download, ExternalLink, Settings, FileText } from 'lucide-react';
import { useResume } from '../context/ResumeContext';

export const ResumeButton = ({ 
  variant = 'primary', // 'primary' | 'secondary' | 'navbar' | 'compact'
  showSettingsGear = true,
  className = ''
}) => {
  const { downloadResume, viewResume, openSettings, sourceType } = useResume();

  if (variant === 'navbar') {
    return (
      <div className="flex items-center gap-1.5">
        <button
          onClick={downloadResume}
          className="relative group px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide bg-[#c89658]/20 hover:bg-[#c89658]/35 border border-[#c89658]/50 text-[#e4b57d] shadow-[0_0_15px_rgba(200,150,88,0.25)] transition-all flex items-center gap-1.5 active:scale-95"
        >
          <Download className="w-3.5 h-3.5 group-hover:translate-y-0.5 transition-transform text-[#c89658]" />
          <span>Resume</span>
          {sourceType === 'upload' && (
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" title="Custom resume active" />
          )}
        </button>
        {showSettingsGear && (
          <button
            onClick={openSettings}
            title="Resume Settings (Change / Update Resume)"
            className="p-1.5 rounded-full bg-[#161720] hover:bg-[#1f202c] text-slate-400 hover:text-[#c89658] border border-white/10 hover:border-[#c89658]/40 transition active:scale-90"
          >
            <Settings className="w-3.5 h-3.5" />
          </button>
        )}
      </div>
    );
  }

  if (variant === 'secondary') {
    return (
      <div className="inline-flex items-center gap-2">
        <button
          onClick={viewResume}
          className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold tracking-wide bg-[#161720] hover:bg-[#1f202c] text-slate-200 border border-white/10 hover:border-[#c89658]/50 transition-all flex items-center gap-2 shadow-sm ${className}`}
        >
          <ExternalLink className="w-4 h-4 text-[#c89658]" />
          <span>View Resume</span>
        </button>
        {showSettingsGear && (
          <button
            onClick={openSettings}
            title="Change Resume PDF"
            className="p-2.5 rounded-xl bg-[#161720] hover:bg-[#1f202c] text-slate-400 hover:text-[#c89658] border border-white/10 hover:border-[#c89658]/40 transition"
          >
            <Settings className="w-4 h-4" />
          </button>
        )}
      </div>
    );
  }

  // Default Primary Button (Used in Hero & Contact)
  return (
    <div className="inline-flex items-center gap-1.5">
      <button
        onClick={downloadResume}
        className={`px-4 sm:px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold tracking-wide bg-[#c89658] hover:bg-[#d8a568] text-[#0d0e12] shadow-[0_4px_20px_rgba(200,150,88,0.35)] transition-all flex items-center gap-2 active:scale-95 ${className}`}
      >
        <Download className="w-4 h-4 text-[#0d0e12]" />
        <span>Resume</span>
      </button>

      <button
        onClick={viewResume}
        title="View in new tab"
        className="p-2.5 rounded-full bg-[#161720] hover:bg-[#1f202c] text-slate-300 hover:text-[#c89658] border border-white/10 hover:border-[#c89658]/40 transition flex items-center"
      >
        <ExternalLink className="w-4 h-4 text-[#c89658]" />
      </button>

      {showSettingsGear && (
        <button
          onClick={openSettings}
          title="Resume Settings (Changeable Resume)"
          className="p-2.5 rounded-full bg-[#161720] hover:bg-[#1f202c] text-slate-400 hover:text-[#c89658] border border-white/10 hover:border-[#c89658]/40 transition active:rotate-45"
        >
          <Settings className="w-4 h-4" />
        </button>
      )}
    </div>
  );
};
