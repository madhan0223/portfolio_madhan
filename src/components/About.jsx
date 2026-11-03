import React from 'react';
import { 
  GraduationCap, 
  MapPin, 
  Mail, 
  Phone, 
  Globe, 
  CheckCircle2, 
  Sparkles,
  Code2,
  Database,
  BarChart3,
  ArrowLeft
} from 'lucide-react';
import { profileData } from '../data/profile';
import { educationData } from '../data/experience';
import { useNavigation } from '../context/NavigationContext';

export const About = () => {
  const { setActiveTab } = useNavigation();

  return (
    <section id="about" className="pt-1 pb-12 sm:pb-16 relative z-10 max-w-7xl mx-auto px-1 sm:px-3">
      
      {/* Section Header with Quick Back Pill */}
      <div className="flex items-center justify-between mb-6">
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
            About <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#c89658] to-[#eed2ad]">Me</span>
          </h2>
          <div className="w-16 h-0.5 bg-gradient-to-r from-[#c89658] to-[#eed2ad] rounded-full mx-auto mt-1" />
        </div>

        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#c89658]/15 border border-[#c89658]/30 text-[#e4b57d] text-xs font-mono hidden sm:flex">
          <Sparkles className="w-3.5 h-3.5 text-[#c89658]" />
          <span>Background</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        
        {/* Left Column: Biography & Pillars */}
        <div className="lg:col-span-7 space-y-6">
          <div className="glass-card p-6 sm:p-8 rounded-3xl space-y-4 border border-white/10">
            <h3 className="text-xl sm:text-2xl font-display font-bold text-white flex items-center gap-2">
              <span>B.Tech in Artificial Intelligence & Data Science</span>
            </h3>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
              {profileData.fullBio}
            </p>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
              My technical journey is centered around developing clean data pipelines, deploying practical machine learning models, and turning multi-dimensional datasets into intuitive analytical dashboards.
            </p>

            {/* Core Pillars (Home Gold Theme) */}
            <div className="pt-4 grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="p-3.5 rounded-2xl bg-[#14151e]/80 border border-white/10 hover:border-[#c89658]/40 transition-all flex flex-col justify-between">
                <Database className="w-5 h-5 text-[#c89658] mb-2" />
                <h4 className="text-xs font-bold text-white">Data Engineering</h4>
                <p className="text-[11px] text-slate-400 mt-1">ETL, SQL, and structured dataset pipelines.</p>
              </div>

              <div className="p-3.5 rounded-2xl bg-[#14151e]/80 border border-white/10 hover:border-[#c89658]/40 transition-all flex flex-col justify-between">
                <Code2 className="w-5 h-5 text-[#c89658] mb-2" />
                <h4 className="text-xs font-bold text-white">Machine Learning</h4>
                <p className="text-[11px] text-slate-400 mt-1">Computer vision, RAG workspaces, and predictive models.</p>
              </div>

              <div className="p-3.5 rounded-2xl bg-[#14151e]/80 border border-white/10 hover:border-[#c89658]/40 transition-all flex flex-col justify-between">
                <BarChart3 className="w-5 h-5 text-[#c89658] mb-2" />
                <h4 className="text-xs font-bold text-white">Data Analytics</h4>
                <p className="text-[11px] text-slate-400 mt-1">EDA, Power BI dashboards, and statistical reporting.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Profile Box + Education Box (Shifted Up for Balance) */}
        <div className="lg:col-span-5 space-y-4">
          
          {/* Card 1: Professional Profile & Contact Card */}
          <div className="glass-card p-5 sm:p-6 rounded-3xl border border-white/10 hover:border-[#c89658]/40 shadow-[0_12px_40px_rgba(0,0,0,0.5)] relative overflow-hidden group transition-all duration-300">
            {/* Top gold energy banner */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#c89658] via-[#eed2ad] to-[#c89658]" />

            <div className="flex items-center gap-3.5 pb-4 border-b border-white/10">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#c89658]/20 to-[#161720] border border-[#c89658]/40 flex items-center justify-center font-display font-black text-xl text-[#e6bc86] shadow-[0_0_20px_rgba(200,150,88,0.25)] shrink-0">
                MS
              </div>
              <div>
                <h3 className="text-base font-bold text-white leading-tight">{profileData.name}</h3>
                <p className="text-xs text-[#c89658] font-mono mt-0.5">Data & ML Engineer</p>
                <p className="text-[11px] text-slate-400 mt-0.5">{profileData.location}</p>
              </div>
            </div>

            {/* Quick Facts List */}
            <div className="py-3.5 space-y-2.5 text-xs text-slate-300">
              <div className="flex items-center justify-between">
                <span className="text-slate-400 flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-[#c89658]" />
                  Email:
                </span>
                <a href={`mailto:${profileData.email}`} className="font-mono text-[#e4b57d] hover:text-[#fae5ca] hover:underline truncate max-w-[175px]">
                  {profileData.email}
                </a>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-slate-400 flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-[#c89658]" />
                  Phone:
                </span>
                <span className="font-mono text-white">{profileData.phone}</span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-slate-400 flex items-center gap-2">
                  <Globe className="w-3.5 h-3.5 text-[#c89658]" />
                  Languages:
                </span>
                <span className="font-mono text-white">English, Tamil</span>
              </div>
            </div>
          </div>

          {/* Card 2: Academic Milestones / Education Box */}
          <div className="glass-card p-5 sm:p-6 rounded-3xl border border-white/10 hover:border-[#c89658]/40 shadow-[0_12px_40px_rgba(0,0,0,0.5)] relative overflow-hidden group transition-all duration-300">
            {/* Top gold energy banner */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#c89658] via-[#eed2ad] to-[#c89658]" />

            <div className="flex items-center justify-between pb-3.5 border-b border-white/10">
              <div className="flex items-center gap-2">
                <GraduationCap className="w-4 h-4 text-[#c89658]" />
                <h4 className="text-sm font-bold text-white font-display">Academic Education</h4>
              </div>
              <span className="text-[10px] font-mono text-[#e4b57d] bg-[#c89658]/15 border border-[#c89658]/30 px-2 py-0.5 rounded-full">
                3 Milestones
              </span>
            </div>

            {/* Milestones List */}
            <div className="py-3.5 space-y-2.5">
              {educationData.map((edu, idx) => (
                <div 
                  key={edu.id} 
                  className="p-3 rounded-2xl bg-[#14151e]/80 border border-white/10 hover:border-[#c89658]/35 transition-all"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h5 className="text-xs font-bold text-white leading-snug">{edu.degree}</h5>
                      <p className="text-[11px] text-slate-400 mt-0.5 leading-snug">{edu.institution}</p>
                    </div>
                    {idx === 0 && (
                      <span className="text-[9px] font-mono px-2 py-0.5 rounded-md bg-[#c89658]/20 text-[#e4b57d] border border-[#c89658]/40 shrink-0 font-medium">
                        Current
                      </span>
                    )}
                  </div>

                  <div className="flex items-center justify-between text-[11px] font-mono mt-2 pt-2 border-t border-white/5">
                    <span className="text-[#e4b57d] font-semibold bg-[#c89658]/10 px-2 py-0.5 rounded border border-[#c89658]/25 text-[10px]">
                      {edu.score}
                    </span>
                    <span className="text-slate-400 text-[10px]">{edu.period}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Verification Footer */}
            <div className="pt-3 border-t border-white/10 flex items-center justify-between text-[11px]">
              <span className="flex items-center gap-1.5 text-emerald-400 font-mono">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Resume Verified</span>
              </span>
              <span className="text-slate-500 font-mono text-[10px]">Academic Records</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
