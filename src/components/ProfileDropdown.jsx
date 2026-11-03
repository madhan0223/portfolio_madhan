import React, { useState, useRef, useEffect } from 'react';
import { 
  User, 
  Settings, 
  ChevronDown, 
  ShieldCheck, 
  Sparkles,
  ExternalLink 
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useProfile } from '../context/ProfileContext';
import { useResume } from '../context/ResumeContext';

export const ProfileDropdown = () => {
  const { profile, openProfile } = useProfile();
  const { openSettings } = useResume();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  const handleOpenMyProfile = () => {
    setIsOpen(false);
    openProfile('view');
  };

  const handleOpenSettings = () => {
    setIsOpen(false);
    openSettings();
  };

  // Get initials for fallback avatar (e.g. "Madhan S" -> "MS")
  const getInitials = (name) => {
    if (!name) return 'U';
    const parts = name.trim().split(/\s+/);
    if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  };

  return (
    <div 
      ref={dropdownRef} 
      className="fixed top-3.5 right-3.5 sm:top-5 sm:right-6 lg:top-6 lg:right-8 z-40 select-none"
    >
      {/* Top-Right Circular Profile Avatar Button */}
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        aria-label="User Profile Menu"
        aria-expanded={isOpen}
        className={`group relative flex items-center gap-2 p-1 sm:p-1.5 rounded-full bg-[#121319]/90 border backdrop-blur-xl transition-all duration-300 shadow-[0_8px_25px_rgba(0,0,0,0.5)] ${
          isOpen 
            ? 'border-[#c89658] ring-2 ring-[#c89658]/30 shadow-[0_0_20px_rgba(200,150,88,0.35)]' 
            : 'border-white/10 hover:border-[#c89658]/60 hover:shadow-[0_0_15px_rgba(200,150,88,0.25)]'
        }`}
      >
        {/* Avatar circle */}
        <div className="relative w-9 h-9 sm:w-10 sm:h-10 rounded-full overflow-hidden bg-gradient-to-br from-[#1a1c27] to-[#0c0d12] border border-white/10 flex items-center justify-center shrink-0">
          {profile.profilePhoto ? (
            <img 
              src={profile.profilePhoto} 
              alt={profile.fullName} 
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center font-display font-bold text-xs sm:text-sm text-[#e6bc86] bg-gradient-to-br from-[#c89658]/25 to-purple-600/20">
              {getInitials(profile.fullName)}
            </div>
          )}

          {/* Glowing Green Online Status Indicator */}
          <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-[#121319] shadow-sm" />
        </div>

        {/* Small dropdown chevron indicator */}
        <div className="pr-1 hidden sm:flex items-center text-slate-400 group-hover:text-[#c89658] transition-colors">
          <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${isOpen ? 'rotate-180 text-[#c89658]' : ''}`} />
        </div>
      </button>

      {/* Modern Floating Glass Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.95 }}
            transition={{ duration: 0.18, ease: 'easeOut' }}
            className="absolute right-0 mt-2.5 w-64 sm:w-72 rounded-2xl bg-[#14151e]/95 border border-[#c89658]/35 shadow-[0_16px_50px_rgba(0,0,0,0.7)] backdrop-blur-2xl p-2.5 text-slate-100 overflow-hidden"
          >
            {/* Top User Snippet Header */}
            <div className="px-3 py-2.5 mb-2 rounded-xl bg-white/[0.03] border border-white/[0.05] flex items-center gap-3">
              <div className="w-10 h-10 rounded-full overflow-hidden bg-slate-900 border border-white/10 shrink-0 flex items-center justify-center">
                {profile.profilePhoto ? (
                  <img src={profile.profilePhoto} alt={profile.fullName} className="w-full h-full object-cover" />
                ) : (
                  <span className="font-bold text-xs text-[#e6bc86]">{getInitials(profile.fullName)}</span>
                )}
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-xs font-bold text-white truncate tracking-wide">
                  {profile.fullName}
                </p>
                <p className="text-[11px] text-slate-400 font-mono truncate">
                  {profile.email}
                </p>
              </div>
            </div>

            {/* Dropdown Menu Items */}
            <div className="space-y-1">
              {/* 1. My Profile */}
              <button
                onClick={handleOpenMyProfile}
                className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-medium text-slate-200 hover:text-white hover:bg-white/[0.06] transition-all group text-left"
              >
                <div className="p-1.5 rounded-lg bg-[#c89658]/15 border border-[#c89658]/30 text-[#e4b57d] group-hover:scale-105 transition-transform">
                  <User className="w-4 h-4 text-[#c89658]" />
                </div>
                <div className="flex-1">
                  <span className="font-semibold block">My Profile</span>
                  <span className="text-[10px] text-slate-400 font-normal">View personal info & addresses</span>
                </div>
              </button>

              {/* Divider */}
              <div className="my-1.5 border-t border-white/[0.08]" />

              {/* 2. Settings (Linked to Resume Settings) */}
              <button
                onClick={handleOpenSettings}
                className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-medium text-slate-300 hover:text-[#c89658] hover:bg-white/[0.04] transition-all group text-left"
              >
                <div className="p-1.5 rounded-lg bg-white/[0.05] border border-white/10 text-slate-400 group-hover:text-[#c89658] group-hover:border-[#c89658]/40 transition-colors">
                  <Settings className="w-4 h-4 group-hover:rotate-45 transition-transform" />
                </div>
                <div className="flex-1">
                  <span className="font-semibold block">Settings</span>
                  <span className="text-[10px] text-slate-400 font-normal">Resume & portfolio preferences</span>
                </div>
              </button>
            </div>

            {/* Privacy note in footer */}
            <div className="mt-2 pt-2 border-t border-white/[0.06] px-2 flex items-center gap-1.5 text-[10px] text-slate-400">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span>Private profile data is never shown publicly</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
