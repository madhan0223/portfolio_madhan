import React from 'react';
import { Github, Linkedin, Mail, ArrowUp } from 'lucide-react';
import { profileData } from '../data/profile';

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative z-10 border-t border-purple-500/15 bg-[#03050d] py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Brand & Exact 3 Titles */}
        <div className="text-center md:text-left space-y-1">
          <div className="flex items-center justify-center md:justify-start gap-2">
            <span className="font-display font-black text-xl text-white tracking-wider">
              {profileData.name}
            </span>
            <span className="text-xs px-2 py-0.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 font-mono">
              Portfolio
            </span>
          </div>
          <p className="text-xs font-mono text-cyan-300">
            {profileData.heroTitleFormatted}
          </p>
          <p className="text-[11px] text-slate-500">
            Loyola Institute of Technology, Chennai • Class of 2027
          </p>
        </div>

        {/* Social Icons & Back to top */}
        <div className="flex flex-col items-center md:items-end gap-3">
          <div className="flex items-center gap-3">
            <a
              href={profileData.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-cyan-300 hover:border-cyan-500/40 transition"
            >
              <Github className="w-4 h-4" />
            </a>

            <a
              href={profileData.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-cyan-300 hover:border-cyan-500/40 transition"
            >
              <Linkedin className="w-4 h-4" />
            </a>

            <a
              href={`mailto:${profileData.email}`}
              aria-label="Email"
              className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-cyan-300 hover:border-cyan-500/40 transition"
            >
              <Mail className="w-4 h-4" />
            </a>

            <button
              onClick={scrollToTop}
              title="Back to Top"
              className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white transition flex items-center gap-1 text-xs"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>

          <p className="text-[11px] font-mono text-slate-500">
            © {currentYear} {profileData.name}. All rights reserved.
          </p>
        </div>

      </div>
    </footer>
  );
};
