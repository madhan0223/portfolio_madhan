import React, { useState } from 'react';
import { Menu, X, Sparkles, Eye, Download } from 'lucide-react';
import { ResumeButton } from './ResumeButton';
import { useNavigation } from '../context/NavigationContext';

const NAV_ITEMS = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'experience', label: 'Experience' },
  { id: 'certifications', label: 'Certifications' },
  { id: 'contact', label: 'Contact' },
];

export const Navbar = () => {
  const { activeTab, setActiveTab, toggleBackgroundOnly } = useNavigation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleNavClick = (id) => {
    setActiveTab(id);
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="fixed top-3 sm:top-4 left-0 right-0 z-40 px-3 sm:px-6 pointer-events-none">
      <div className="max-w-6xl mx-auto flex items-center justify-between p-2 sm:px-5 rounded-full bg-[#060a1e]/65 border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.5)] backdrop-blur-2xl pointer-events-auto transition-all">
        
        {/* Brand Logo */}
        <button 
          onClick={() => handleNavClick('home')}
          className="flex items-center gap-2 group cursor-pointer select-none text-left pl-1"
        >
          <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-cyan-400 to-purple-600 flex items-center justify-center font-display font-black text-white text-xs shadow-neon-cyan group-hover:scale-105 transition-transform">
            M
          </div>
          <span className="font-display font-bold tracking-wider text-sm sm:text-base text-white group-hover:text-cyan-300 transition-colors">
            MADHAN S
          </span>
        </button>

        {/* Desktop Navigation Tabs */}
        <nav className="hidden lg:flex items-center gap-1 bg-black/30 px-2.5 py-1 rounded-full border border-white/5 backdrop-blur-md">
          {NAV_ITEMS.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`relative px-3.5 py-1 rounded-full text-xs font-medium tracking-wide transition-all ${
                  isActive 
                    ? 'text-cyan-300 font-semibold' 
                    : 'text-slate-300 hover:text-white hover:bg-white/5'
                }`}
              >
                {isActive && (
                  <span className="absolute inset-0 rounded-full bg-cyan-500/20 border border-cyan-400/40 shadow-sm" />
                )}
                <span className="relative z-10 flex items-center gap-1">
                  {item.label}
                  {isActive && <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 inline-block animate-ping" />}
                </span>
              </button>
            );
          })}
        </nav>

        {/* Actions: Background View & Resume */}
        <div className="hidden sm:flex items-center gap-2 pr-1">
          <button
            onClick={toggleBackgroundOnly}
            className="px-3 py-1 rounded-full text-xs font-medium text-slate-300 hover:text-cyan-300 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-cyan-400/40 transition flex items-center gap-1.5 active:scale-95"
            title="View only the anime background"
          >
            <Eye className="w-3.5 h-3.5 text-cyan-400" />
            <span className="hidden md:inline">View Scenery</span>
          </button>

          <ResumeButton variant="navbar" />
        </div>

        {/* Mobile Hamburger & Actions */}
        <div className="flex items-center gap-1.5 lg:hidden">
          <button
            onClick={toggleBackgroundOnly}
            className="p-1.5 rounded-full bg-white/5 border border-white/10 text-cyan-300 text-xs flex items-center"
            title="View Scenery"
          >
            <Eye className="w-4 h-4" />
          </button>

          <div className="sm:hidden">
            <ResumeButton variant="navbar" showSettingsGear={false} />
          </div>

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-1.5 rounded-full bg-white/5 border border-white/10 text-slate-300 hover:text-white"
            aria-label="Toggle mobile menu"
          >
            {isMobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isMobileMenuOpen && (
        <div className="lg:hidden mt-2 p-3 rounded-2xl bg-[#060a1e]/95 border border-white/10 shadow-2xl backdrop-blur-2xl pointer-events-auto max-w-sm mx-auto animate-fadeIn">
          <nav className="flex flex-col space-y-1">
            {NAV_ITEMS.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`w-full text-left px-3 py-2 rounded-xl text-xs font-medium transition flex items-center justify-between ${
                    isActive 
                      ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400/30' 
                      : 'text-slate-300 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  <span>{item.label}</span>
                  {isActive && <Sparkles className="w-3.5 h-3.5 text-cyan-400" />}
                </button>
              );
            })}
          </nav>
        </div>
      )}
    </header>
  );
};
