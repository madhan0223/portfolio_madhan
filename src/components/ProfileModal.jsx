import React, { useEffect } from 'react';
import { 
  X, 
  User, 
  Mail, 
  Phone, 
  Calendar, 
  MapPin, 
  Home, 
  ShieldCheck, 
  Lock,
  CheckCircle2
} from 'lucide-react';
import { useProfile } from '../context/ProfileContext';

export const ProfileModal = () => {
  const { 
    profile, 
    isProfileOpen, 
    closeProfile 
  } = useProfile();

  // Close modal on Escape key press
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isProfileOpen) {
        closeProfile();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isProfileOpen, closeProfile]);

  if (!isProfileOpen) return null;

  // Format date of birth nicely (e.g., "September 2, 2005")
  const formatDob = (dobString) => {
    if (!dobString) return 'Not set';
    try {
      const d = new Date(dobString + 'T00:00:00');
      if (isNaN(d.getTime())) return dobString;
      return d.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    } catch {
      return dobString;
    }
  };

  // Fallback initials monogram (e.g. "Madhan S" -> "MS")
  const getInitials = (name) => {
    if (!name) return 'MS';
    const parts = name.trim().split(/\s+/);
    if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 lg:p-6 bg-black/85 backdrop-blur-md animate-fadeIn"
      onClick={closeProfile}
    >
      <div 
        className="relative w-full max-w-2xl bg-[#14151e] border border-[#c89658]/40 rounded-3xl p-5 sm:p-8 shadow-[0_20px_60px_rgba(0,0,0,0.85)] text-slate-100 max-h-[92vh] overflow-y-auto custom-scrollbar flex flex-col justify-between"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Bar */}
        <div className="flex items-center justify-between pb-4 mb-4 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-[#c89658]/15 border border-[#c89658]/30 text-[#e4b57d]">
              <User className="w-5 h-5 text-[#c89658]" />
            </div>
            <div>
              <h3 className="text-lg sm:text-xl font-bold text-white tracking-wide flex items-center gap-2">
                <span>My Profile</span>
                <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-[#c89658]/15 border border-[#c89658]/30 text-[#e4b57d] flex items-center gap-1">
                  <Lock className="w-3 h-3" />
                  <span>Private</span>
                </span>
              </h3>
              <p className="text-xs text-slate-400">
                Personal credentials and residential records
              </p>
            </div>
          </div>

          {/* Close Button */}
          <button 
            onClick={closeProfile}
            aria-label="Close modal"
            className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* ======================================================== */}
        {/* VIEW MODE: Verified Candidate Profile Display            */}
        {/* ======================================================== */}
        <div className="space-y-6">
          
          {/* Top Candidate Avatar Banner */}
          <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-black/60 to-[#181a24] border border-white/10 flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-5 text-center sm:text-left">
            <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden bg-slate-900 border-2 border-[#c89658]/50 shadow-[0_0_20px_rgba(200,150,88,0.25)] flex items-center justify-center shrink-0">
              {profile.profilePhoto ? (
                <img src={profile.profilePhoto} alt={profile.fullName} className="w-full h-full object-cover" />
              ) : (
                <span className="font-display font-extrabold text-2xl text-[#e6bc86]">
                  {getInitials(profile.fullName)}
                </span>
              )}
              <span className="absolute bottom-1 right-1 w-3 h-3 rounded-full bg-emerald-400 border-2 border-[#121319]" />
            </div>

            <div className="space-y-1.5 min-w-0 flex-1">
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                <h4 className="text-xl font-bold text-white tracking-wide">
                  {profile.fullName}
                </h4>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" />
                  <span>Verified Profile</span>
                </span>
              </div>
              <p className="text-xs text-[#e4b57d] font-mono">
                {profile.email}
              </p>
              <p className="text-[11px] text-slate-400">
                Gender: <span className="text-white font-medium">{profile.gender}</span> • DOB: <span className="text-white font-medium">{formatDob(profile.dob)}</span>
              </p>
            </div>
          </div>

          {/* Information Grid: Personal + Contact */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            
            {/* Date of Birth */}
            <div className="p-3.5 rounded-2xl bg-black/40 border border-white/10 flex items-start gap-3">
              <div className="p-2 rounded-xl bg-purple-500/15 border border-purple-500/30 text-purple-400 shrink-0">
                <Calendar className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <span className="text-[11px] text-slate-400 block font-mono">Date of Birth</span>
                <span className="text-xs sm:text-sm font-semibold text-white block mt-0.5">
                  {formatDob(profile.dob)}
                </span>
                <span className="text-[10px] text-slate-400 font-mono">({profile.dob})</span>
              </div>
            </div>

            {/* Gender */}
            <div className="p-3.5 rounded-2xl bg-black/40 border border-white/10 flex items-start gap-3">
              <div className="p-2 rounded-xl bg-cyan-500/15 border border-cyan-500/30 text-cyan-400 shrink-0">
                <User className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <span className="text-[11px] text-slate-400 block font-mono">Gender</span>
                <span className="text-xs sm:text-sm font-semibold text-white block mt-0.5">
                  {profile.gender}
                </span>
                <span className="text-[10px] text-slate-400 font-mono">Confidential record</span>
              </div>
            </div>

            {/* Email Address */}
            <div className="p-3.5 rounded-2xl bg-black/40 border border-white/10 flex items-start gap-3">
              <div className="p-2 rounded-xl bg-blue-500/15 border border-blue-500/30 text-blue-400 shrink-0">
                <Mail className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <span className="text-[11px] text-slate-400 block font-mono">Email Address</span>
                <span className="text-xs sm:text-sm font-semibold text-white block mt-0.5 truncate">
                  {profile.email}
                </span>
              </div>
            </div>

            {/* Phone Number */}
            <div className="p-3.5 rounded-2xl bg-black/40 border border-white/10 flex items-start gap-3">
              <div className="p-2 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 shrink-0">
                <Phone className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <span className="text-[11px] text-slate-400 block font-mono">Phone Number</span>
                <span className="text-xs sm:text-sm font-semibold text-white block mt-0.5">
                  {profile.phone || <span className="text-slate-400 font-normal italic">Not provided</span>}
                </span>
              </div>
            </div>

          </div>

          {/* Residential Addresses Section */}
          <div className="space-y-3">
            <h5 className="text-xs font-mono uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-[#c89658]" />
              <span>Residential Addresses</span>
            </h5>

            {/* Permanent Address */}
            <div className="p-4 rounded-2xl bg-black/40 border border-white/10 space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-mono text-[#e4b57d] flex items-center gap-1">
                  <Home className="w-3.5 h-3.5" />
                  Permanent Address
                </span>
                <span className="text-[10px] text-slate-400 font-mono">Primary Residence</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed pt-0.5">
                {profile.permanentAddress}
              </p>
            </div>

            {/* Current Address */}
            <div className="p-4 rounded-2xl bg-black/40 border border-white/10 space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-mono text-cyan-400 flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5" />
                  Current Address
                </span>
                {profile.sameAsPermanent && (
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-cyan-950/60 border border-cyan-500/40 text-cyan-300">
                    Same as Permanent
                  </span>
                )}
              </div>
              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed pt-0.5">
                {profile.currentAddress}
              </p>
            </div>
          </div>

          {/* Privacy Safeguard Notice */}
          <div className="p-3.5 rounded-2xl bg-[#0c0d12]/90 border border-[#c89658]/20 flex items-start gap-2.5 text-xs text-slate-300">
            <ShieldCheck className="w-4 h-4 text-[#c89658] shrink-0 mt-0.5" />
            <p className="text-[11px] leading-relaxed text-slate-400">
              <strong className="text-[#e4b57d]">Privacy Protected:</strong> Date of birth, gender, and residential addresses are strictly confidential to your profile account and are never shown publicly on your portfolio website.
            </p>
          </div>

          {/* Footer Action */}
          <div className="pt-4 border-t border-white/10 flex items-center justify-end">
            <button
              type="button"
              onClick={closeProfile}
              className="px-5 py-2 rounded-xl text-xs font-semibold text-slate-200 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 transition"
            >
              Close Profile
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
