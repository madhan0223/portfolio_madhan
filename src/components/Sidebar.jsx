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
  { id: 'experience', label: 'Experience', icon: Briefcase },
  { id: 'certifications', label: 'Certifications', icon: Award },
  { id: 'contact', label: 'Contact', icon: Mail },
];

export const Sidebar = () => {
  const { activeTab, setActiveTab } = useNavigation();
  const { openSettings } = useResume();

  return (
    <aside className="w-52 sm:w-56 shrink-0 h-fit sticky top-6 sm:top-8 self-start z-20 rounded-[28px] bg-[#121319]/90 border border-white/10 shadow-[0_12px_40px_rgba(0,0,0,0.6)] backdrop-blur-2xl p-4 sm:p-5 flex flex-col justify-between select-none">
      
      {/* Navigation Menu List */}
      <nav className="flex flex-col space-y-1 sm:space-y-1.5">
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;

          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3.5 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all text-left group ${
                isActive 
                  ? 'text-[#c89658] font-semibold bg-white/[0.04]' 
                  : 'text-slate-400 hover:text-white hover:bg-white/[0.03]'
              }`}
            >
              <Icon className={`w-4 h-4 transition-transform group-hover:scale-110 ${
                isActive ? 'text-[#c89658]' : 'text-slate-400 group-hover:text-white'
              }`} />
              <span className="tracking-wide">{item.label}</span>
            </button>
          );
        })}

        {/* Settings Item - Opens Resume Manager */}
        <button
          onClick={openSettings}
          className="w-full flex items-center gap-3.5 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all text-left text-slate-400 hover:text-[#c89658] hover:bg-white/[0.03] group"
          title="Resume & Portfolio Settings"
        >
          <Settings className="w-4 h-4 text-slate-400 group-hover:text-[#c89658] group-hover:rotate-45 transition-all" />
          <span className="tracking-wide">Settings</span>
        </button>
      </nav>

    </aside>
  );
};
