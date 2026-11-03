import React, { useState, useEffect } from 'react';
import { 
  Github, 
  Linkedin, 
  Mail, 
  Download 
} from 'lucide-react';
import { profileData } from '../data/profile';
import { AiWorkspaceCard } from './AiWorkspaceCard';
import { useNavigation } from '../context/NavigationContext';
import { useResume } from '../context/ResumeContext';

const ROLES = [
  "ML Engineer",
  "Data Engineer",
  "Data Analyst"
];

export const Hero = () => {
  const { setActiveTab } = useNavigation();
  const { downloadResume } = useResume();

  // Typewriter effect cycling through the 3 verified roles
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentFullRole = ROLES[roleIndex];
    let timeout;

    if (!isDeleting && displayedText !== currentFullRole) {
      // Typing forward
      timeout = setTimeout(() => {
        setDisplayedText(currentFullRole.slice(0, displayedText.length + 1));
      }, 90);
    } else if (!isDeleting && displayedText === currentFullRole) {
      // Pause at full word
      timeout = setTimeout(() => {
        setIsDeleting(true);
      }, 2200);
    } else if (isDeleting && displayedText !== '') {
      // Deleting back
      timeout = setTimeout(() => {
        setDisplayedText(currentFullRole.slice(0, displayedText.length - 1));
      }, 50);
    } else if (isDeleting && displayedText === '') {
      // Switch to next role
      setIsDeleting(false);
      setRoleIndex((prev) => (prev + 1) % ROLES.length);
    }

    return () => clearTimeout(timeout);
  }, [displayedText, isDeleting, roleIndex]);

  return (
    <div className="w-full flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12 my-auto select-none">
      
      {/* Left / Center Content Column */}
      <div className="flex-1 flex flex-col space-y-4 max-w-xl text-left">
        
        {/* Brand: Portfolio with Underlined Gold Accent */}
        <div className="space-y-1">
          <h1 className="text-4xl sm:text-5xl font-display font-extrabold tracking-tight text-white flex items-center gap-0.5">
            <span>Port</span>
            <span className="text-[#c89658] relative inline-block pb-1">
              folio
              <span className="absolute left-0 bottom-0 w-full h-[3.5px] bg-[#c89658] rounded-full" />
            </span>
          </h1>

          {/* Candidate Name */}
          <h2 className="text-2xl sm:text-3xl font-display font-bold text-white pt-1">
            {profileData.name}
          </h2>
        </div>

        {/* Dynamic Typewriter Role */}
        <div className="text-xl sm:text-2xl font-display font-semibold text-white flex items-center gap-2">
          <span>I'm a</span>
          <span className="text-[#c89658] min-w-[150px]">
            {displayedText}
          </span>
          <span className="text-[#c89658] font-light animate-pulse -ml-1">|</span>
        </div>

        {/* Bio Statement */}
        <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
          Building intelligent, data-driven solutions with Machine Learning, Data Analytics and Data Engineering to solve real-world problems.
        </p>

        {/* Dual Primary CTA Buttons */}
        <div className="pt-2 flex flex-wrap items-center gap-3.5">
          {/* Solid Gold Button: View My Projects */}
          <button
            onClick={() => setActiveTab('projects')}
            className="px-6 py-2.5 rounded-full text-sm font-semibold tracking-wide bg-[#c89658] hover:bg-[#d8a568] text-[#0d0e12] shadow-[0_4px_20px_rgba(200,150,88,0.35)] transition-all active:scale-95"
          >
            View My Projects
          </button>

          {/* Outline Gold Button: Get In Touch */}
          <button
            onClick={() => setActiveTab('contact')}
            className="px-6 py-2.5 rounded-full text-sm font-semibold tracking-wide bg-transparent hover:bg-[#c89658]/10 text-[#c89658] border border-[#c89658] transition-all active:scale-95"
          >
            Get In Touch
          </button>
        </div>

        {/* Bottom Social & Action Pill Dock */}
        <div className="pt-2 flex flex-wrap items-center gap-2 text-xs">
          {/* GitHub Pill */}
          <a
            href={profileData.github}
            target="_blank"
            rel="noopener noreferrer"
            className="px-3.5 py-2 rounded-full bg-[#161720] hover:bg-[#1f202c] border border-white/10 hover:border-[#c89658]/40 text-slate-200 transition-all flex items-center gap-2"
          >
            <Github className="w-3.5 h-3.5 text-slate-300" />
            <span className="font-medium">GitHub</span>
          </a>

          {/* LinkedIn Pill */}
          <a
            href={profileData.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="px-3.5 py-2 rounded-full bg-[#161720] hover:bg-[#1f202c] border border-white/10 hover:border-[#c89658]/40 text-slate-200 transition-all flex items-center gap-2"
          >
            <Linkedin className="w-3.5 h-3.5 text-[#0077b5]" />
            <span className="font-medium">LinkedIn</span>
          </a>

          {/* Email Pill */}
          <a
            href={`mailto:${profileData.email}`}
            className="px-3.5 py-2 rounded-full bg-[#161720] hover:bg-[#1f202c] border border-white/10 hover:border-[#c89658]/40 text-slate-200 transition-all flex items-center gap-2"
          >
            <Mail className="w-3.5 h-3.5 text-slate-300" />
            <span className="font-medium">Email</span>
          </a>

          {/* Resume Pill (Gold Highlighted) */}
          <button
            onClick={downloadResume}
            className="px-3.5 py-2 rounded-full bg-[#c89658]/20 hover:bg-[#c89658]/30 border border-[#c89658]/50 text-[#e4b57d] transition-all flex items-center gap-1.5"
            title="Download verified resume PDF"
          >
            <Download className="w-3.5 h-3.5 text-[#c89658]" />
            <span className="font-medium">Resume</span>
          </button>
        </div>

      </div>

      {/* Right Column: AI Workspace Showcase Card */}
      <div className="flex-1 flex justify-center items-center">
        <AiWorkspaceCard />
      </div>

    </div>
  );
};
