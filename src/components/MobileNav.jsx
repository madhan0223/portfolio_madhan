import React from 'react';
import { 
  Home, 
  User, 
  Code2, 
  Layers, 
  Briefcase, 
  Award, 
  Mail, 
  Settings 
} from 'lucide-react';
import { useNavigation } from '../context/NavigationContext';
import { useResume } from '../context/ResumeContext';

const NAV_ITEMS = [
  { id: 'home', label: 'Home', icon: Home },
  { id: 'about', label: 'About', icon: User },
  { id: 'skills', label: 'Skills', icon: Code2 },
  { id: 'projects', label: 'Projects', icon: Layers },
  { id: 'experience', label: 'Exp', icon: Briefcase },
  { id: 'certifications', label: 'Certs', icon: Award },
  { id: 'contact', label: 'Contact', icon: Mail },
];

export const MobileNav = () => {
  const { activeTab, setActiveTab } = useNavigation();
  const { openSettings } = useResume();

  return (
    <nav className="md:hidden sticky top-0 z-30 w-full bg-[#121319]/95 backdrop-blur-xl border-b border-white/[0.08] px-2 py-2 rounded-t-[28px]">
      <div className="flex items-center gap-1 overflow-x-auto no-scrollbar">
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;

          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-medium whitespace-nowrap shrink-0 transition-all ${
                isActive
                  ? 'text-[#c89658] bg-white/[0.06] font-semibold'
                  : 'text-slate-400 hover:text-white hover:bg-white/[0.03]'
              }`}
            >
              <Icon className={`w-3.5 h-3.5 ${
                isActive ? 'text-[#c89658]' : 'text-slate-400'
              }`} />
              <span>{item.label}</span>
            </button>
          );
        })}

        {/* Settings Item */}
        <button
          onClick={openSettings}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-medium whitespace-nowrap shrink-0 transition-all text-slate-400 hover:text-[#c89658] hover:bg-white/[0.03]"
          title="Resume & Portfolio Settings"
        >
          <Settings className="w-3.5 h-3.5 text-slate-400" />
          <span>Settings</span>
        </button>
      </div>
    </nav>
  );
};
