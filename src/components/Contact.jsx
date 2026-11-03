import React, { useState } from 'react';
import { 
  Sparkles, 
  Mail, 
  Github, 
  Linkedin, 
  Phone, 
  MapPin, 
  Copy, 
  Check, 
  Send, 
  Download,
  Settings,
  ArrowLeft
} from 'lucide-react';
import { profileData } from '../data/profile';
import { ResumeButton } from './ResumeButton';
import { useResume } from '../context/ResumeContext';
import { useNavigation } from '../context/NavigationContext';

export const Contact = () => {
  const [copied, setCopied] = useState(false);
  const { openSettings } = useResume();
  const { setActiveTab } = useNavigation();

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(profileData.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <section id="contact" className="pt-1 pb-12 sm:pb-16 relative z-10 max-w-7xl mx-auto px-1 sm:px-3">
      
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
            Let's <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#c89658] to-[#eed2ad]">Connect</span>
          </h2>
          <div className="w-16 h-0.5 bg-gradient-to-r from-[#c89658] to-[#eed2ad] rounded-full mx-auto mt-1" />
        </div>

        <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-[#c89658]/15 border border-[#c89658]/30 text-[#e4b57d] text-xs font-mono hidden sm:flex">
          <Sparkles className="w-3.5 h-3.5 text-[#c89658]" />
          <span>Connect</span>
        </div>
      </div>

      <div className="max-w-4xl mx-auto glass-card rounded-3xl p-8 sm:p-12 border border-[#c89658]/30 shadow-[0_12px_40px_rgba(0,0,0,0.5)] relative overflow-hidden">
        
        {/* Ambient Top Glow (Home Gold Theme) */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#c89658]/[0.08] rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#c89658]/[0.05] rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 text-center max-w-2xl mx-auto space-y-5">
          <p className="text-base sm:text-lg text-slate-200 leading-relaxed font-normal">
            "I'm open to learning opportunities, internships, technical discussions, and collaborations related to data engineering, machine learning, and data analytics."
          </p>

          <p className="text-xs sm:text-sm text-slate-400">
            Feel free to reach out directly via email, phone, or connect on LinkedIn and GitHub.
          </p>

          {/* Quick Copy / Send Email CTA Box (Home Gold Theme) */}
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
            <a
              href={`mailto:${profileData.email}`}
              className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-[#c89658] hover:bg-[#d8a568] text-[#0d0e12] font-semibold text-xs sm:text-sm shadow-[0_4px_20px_rgba(200,150,88,0.35)] flex items-center justify-center gap-2 transition active:scale-95"
            >
              <Mail className="w-4 h-4 text-[#0d0e12]" />
              <span>Send Email directly</span>
            </a>

            <button
              onClick={handleCopyEmail}
              className="w-full sm:w-auto px-5 py-3.5 rounded-2xl bg-[#161720] hover:bg-[#1f202c] text-slate-200 border border-white/10 hover:border-[#c89658]/50 text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 transition active:scale-95"
            >
              {copied ? <Check className="w-4 h-4 text-[#c89658]" /> : <Copy className="w-4 h-4 text-[#c89658]" />}
              <span>{copied ? 'Email Copied!' : 'Copy Email Address'}</span>
            </button>
          </div>
        </div>

        {/* Contact Information Grid (Home Gold Theme) */}
        <div className="mt-12 pt-8 border-t border-white/10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          
          {/* Email */}
          <a
            href={`mailto:${profileData.email}`}
            className="p-4 rounded-2xl bg-[#14151e]/80 border border-white/10 hover:border-[#c89658]/50 transition group flex flex-col items-center text-center"
          >
            <div className="p-2.5 rounded-xl bg-[#c89658]/15 text-[#e4b57d] mb-2 group-hover:scale-110 transition-transform">
              <Mail className="w-5 h-5" />
            </div>
            <span className="text-[11px] font-mono text-slate-400">Direct Email</span>
            <span className="text-xs font-semibold text-white mt-1 group-hover:text-[#c89658] truncate max-w-full">
              {profileData.email}
            </span>
          </a>

          {/* GitHub */}
          <a
            href={profileData.github}
            target="_blank"
            rel="noopener noreferrer"
            className="p-4 rounded-2xl bg-[#14151e]/80 border border-white/10 hover:border-[#c89658]/50 transition group flex flex-col items-center text-center"
          >
            <div className="p-2.5 rounded-xl bg-[#c89658]/15 text-[#e4b57d] mb-2 group-hover:scale-110 transition-transform">
              <Github className="w-5 h-5" />
            </div>
            <span className="text-[11px] font-mono text-slate-400">GitHub Profile</span>
            <span className="text-xs font-semibold text-white mt-1 group-hover:text-[#c89658]">
              @{profileData.githubUsername}
            </span>
          </a>

          {/* LinkedIn */}
          <a
            href={profileData.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="p-4 rounded-2xl bg-[#14151e]/80 border border-white/10 hover:border-[#c89658]/50 transition group flex flex-col items-center text-center"
          >
            <div className="p-2.5 rounded-xl bg-[#c89658]/15 text-[#e4b57d] mb-2 group-hover:scale-110 transition-transform">
              <Linkedin className="w-5 h-5" />
            </div>
            <span className="text-[11px] font-mono text-slate-400">LinkedIn Network</span>
            <span className="text-xs font-semibold text-white mt-1 group-hover:text-[#c89658]">
              {profileData.name}
            </span>
          </a>

          {/* Phone & Location */}
          <div className="p-4 rounded-2xl bg-[#14151e]/80 border border-white/10 flex flex-col items-center text-center">
            <div className="p-2.5 rounded-xl bg-[#c89658]/15 text-[#e4b57d] mb-2">
              <Phone className="w-5 h-5" />
            </div>
            <span className="text-[11px] font-mono text-slate-400">Phone & Location</span>
            <span className="text-xs font-semibold text-white mt-1">
              {profileData.phone}
            </span>
            <span className="text-[10px] text-slate-400 font-mono mt-0.5">
              {profileData.location}
            </span>
          </div>

        </div>

        {/* Changeable Resume Hub Card inside Contact */}
        <div className="mt-8 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-[#c89658]/15 border border-[#c89658]/30 text-[#e4b57d]">
              <Settings className="w-4 h-4 text-[#c89658]" />
            </div>
            <div className="text-left">
              <p className="text-xs font-bold text-white">Need to update or test my resume?</p>
              <p className="text-[11px] text-slate-400">You can upload a new PDF or change the cloud link anytime.</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <ResumeButton variant="primary" showSettingsGear={true} />
          </div>
        </div>

      </div>
    </section>
  );
};
