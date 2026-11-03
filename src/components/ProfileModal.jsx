import React, { useState, useEffect, useRef } from 'react';
import { 
  X, 
  User, 
  Mail, 
  Phone, 
  Calendar, 
  MapPin, 
  Home, 
  ShieldCheck, 
  Edit3, 
  Upload, 
  Trash2, 
  Check, 
  AlertCircle, 
  Sparkles,
  Lock,
  RotateCcw,
  CheckCircle2
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useProfile } from '../context/ProfileContext';
import { GENDER_OPTIONS, validateProfile } from '../services/profileStorage';

export const ProfileModal = () => {
  const { 
    profile, 
    isProfileOpen, 
    modalMode, 
    isSaving, 
    closeProfile, 
    switchToEdit, 
    switchToView, 
    saveProfileData,
    resetToDefault
  } = useProfile();

  // Local state for the editable form
  const [formData, setFormData] = useState({ ...profile });
  const [photoPreview, setPhotoPreview] = useState(profile.profilePhoto);
  const [formErrors, setFormErrors] = useState({});
  const [photoError, setPhotoError] = useState(null);
  const fileInputRef = useRef(null);

  // Sync form data with active profile whenever modal opens or profile changes
  useEffect(() => {
    if (isProfileOpen) {
      setFormData({ ...profile });
      setPhotoPreview(profile.profilePhoto);
      setFormErrors({});
      setPhotoError(null);
    }
  }, [isProfileOpen, profile]);

  if (!isProfileOpen) return null;

  // Handle text input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (name === 'sameAsPermanent') {
      setFormData(prev => ({
        ...prev,
        sameAsPermanent: checked,
        currentAddress: checked ? prev.permanentAddress : prev.currentAddress
      }));
    } else if (name === 'permanentAddress' && formData.sameAsPermanent) {
      setFormData(prev => ({
        ...prev,
        permanentAddress: value,
        currentAddress: value
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }

    // Clear field-specific error as user types
    if (formErrors[name]) {
      setFormErrors(prev => {
        const updated = { ...prev };
        delete updated[name];
        return updated;
      });
    }
  };

  // Helper to optimize large images up to 10MB for clean display and reliable storage
  const processImageFile = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          const MAX_DIMENSION = 1000;
          let width = img.width;
          let height = img.height;

          if (width > height) {
            if (width > MAX_DIMENSION) {
              height = Math.round((height * MAX_DIMENSION) / width);
              width = MAX_DIMENSION;
            }
          } else {
            if (height > MAX_DIMENSION) {
              width = Math.round((width * MAX_DIMENSION) / height);
              height = MAX_DIMENSION;
            }
          }

          const canvas = document.createElement('canvas');
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0, width, height);

          // Return high-quality compressed data URL
          const outputType = file.type === 'image/png' ? 'image/png' : 'image/jpeg';
          const dataUrl = canvas.toDataURL(outputType, 0.9);
          resolve(dataUrl);
        };
        img.onerror = () => reject(new Error('Failed to load image.'));
        img.src = e.target.result;
      };
      reader.onerror = () => reject(new Error('Failed to read image file.'));
      reader.readAsDataURL(file);
    });
  };

  // Handle profile photo upload with live preview (Max 10MB)
  const handlePhotoUpload = async (e) => {
    setPhotoError(null);
    const file = e.target.files && e.target.files[0];
    if (!file) return;

    // Verify it's an image
    if (!file.type.startsWith('image/')) {
      setPhotoError('Please select a valid image file (PNG, JPG, or WEBP).');
      return;
    }

    // Max 10MB limit
    const MAX_SIZE = 10 * 1024 * 1024; // 10MB
    if (file.size > MAX_SIZE) {
      setPhotoError('Image file size must be less than 10MB.');
      return;
    }

    try {
      const optimizedDataUrl = await processImageFile(file);
      setPhotoPreview(optimizedDataUrl);
      setFormData(prev => ({ ...prev, profilePhoto: optimizedDataUrl }));
    } catch (err) {
      setPhotoError('Failed to process image file. Please try another image.');
    }
  };

  // Remove photo and revert to initials avatar
  const handleRemovePhoto = () => {
    setPhotoPreview(null);
    setFormData(prev => ({ ...prev, profilePhoto: null }));
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  // Form submission handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    setPhotoError(null);

    // Run validation
    const validation = validateProfile(formData);
    if (!validation.isValid) {
      setFormErrors(validation.errors);
      return;
    }

    const result = await saveProfileData(formData);
    if (!result.success) {
      // Error message is already displayed by context
    }
  };

  // Format date of birth nicely for view mode (e.g., "May 14, 2003")
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

  // Fallback initials
  const getInitials = (name) => {
    if (!name) return 'U';
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
                <span>{modalMode === 'view' ? 'My Profile' : 'Edit Profile'}</span>
                <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-[#c89658]/15 border border-[#c89658]/30 text-[#e4b57d] flex items-center gap-1">
                  <Lock className="w-3 h-3" />
                  <span>Private</span>
                </span>
              </h3>
              <p className="text-xs text-slate-400">
                {modalMode === 'view' 
                  ? 'Personal credentials and residential details' 
                  : 'Update personal details and profile photograph'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* View / Edit Mode Switcher Pills */}
            <div className="hidden sm:flex items-center p-1 rounded-xl bg-black/40 border border-white/10 text-xs">
              <button
                type="button"
                onClick={switchToView}
                className={`px-3 py-1 rounded-lg transition-all ${
                  modalMode === 'view' 
                    ? 'bg-[#c89658] text-[#0d0e12] font-semibold shadow' 
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                View
              </button>
              <button
                type="button"
                onClick={switchToEdit}
                className={`px-3 py-1 rounded-lg transition-all ${
                  modalMode === 'edit' 
                    ? 'bg-[#c89658] text-[#0d0e12] font-semibold shadow' 
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Edit
              </button>
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
        </div>

        {/* ======================================================== */}
        {/* VIEW MODE: Clean showcase of all details                 */}
        {/* ======================================================== */}
        {modalMode === 'view' && (
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

            {/* Addresses Section */}
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

            {/* Footer Buttons for View Mode */}
            <div className="pt-4 border-t border-white/10 flex items-center justify-between">
              <button
                type="button"
                onClick={closeProfile}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-300 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 transition"
              >
                Close
              </button>

              <button
                type="button"
                onClick={switchToEdit}
                className="px-5 py-2 rounded-xl text-xs font-semibold bg-[#c89658] hover:bg-[#d8a568] text-[#0d0e12] shadow-[0_4px_20px_rgba(200,150,88,0.35)] transition-all flex items-center gap-2 active:scale-95"
              >
                <Edit3 className="w-3.5 h-3.5" />
                <span>Edit Profile</span>
              </button>
            </div>

          </div>
        )}

        {/* ======================================================== */}
        {/* EDIT MODE: Interactive validated form                    */}
        {/* ======================================================== */}
        {modalMode === 'edit' && (
          <form onSubmit={handleSubmit} className="space-y-5">
            
            {/* Photo Upload & Live Preview Section */}
            <div className="p-4 rounded-2xl bg-black/40 border border-white/10 flex flex-col sm:flex-row items-center gap-4">
              <div className="relative w-20 h-20 rounded-2xl overflow-hidden bg-slate-900 border-2 border-[#c89658]/50 flex items-center justify-center shrink-0 shadow-lg">
                {photoPreview ? (
                  <img src={photoPreview} alt="Preview" className="w-full h-full object-cover" />
                ) : (
                  <span className="font-display font-extrabold text-xl text-[#e6bc86]">
                    {getInitials(formData.fullName)}
                  </span>
                )}
              </div>

              <div className="space-y-2 text-center sm:text-left flex-1">
                <div>
                  <h4 className="text-xs font-bold text-white tracking-wide">
                    Profile Photograph
                  </h4>
                  <p className="text-[11px] text-slate-400">
                    Upload a square PNG, JPG, or WEBP (Max 10MB).
                  </p>
                </div>

                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 pt-1">
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/png,image/jpeg,image/webp,image/jpg"
                    onChange={handlePhotoUpload}
                    className="hidden"
                  />
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-medium border border-white/15 transition flex items-center gap-1.5"
                  >
                    <Upload className="w-3.5 h-3.5 text-[#c89658]" />
                    <span>Upload New Photo</span>
                  </button>

                  {photoPreview && (
                    <button
                      type="button"
                      onClick={handleRemovePhoto}
                      className="px-3 py-1.5 rounded-xl bg-rose-950/40 hover:bg-rose-900/60 text-rose-300 text-xs font-medium border border-rose-800/40 transition flex items-center gap-1.5"
                    >
                      <Trash2 className="w-3.5 h-3.5 text-rose-400" />
                      <span>Remove</span>
                    </button>
                  )}
                </div>

                {photoError && (
                  <p className="text-[11px] text-rose-400 flex items-center gap-1 mt-1">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                    <span>{photoError}</span>
                  </p>
                )}
              </div>
            </div>

            {/* Input Grid: Full Name, DOB, Gender, Email, Phone */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              {/* Full Name */}
              <div className="space-y-1">
                <label className="block text-xs font-medium text-slate-300">
                  Full Name <span className="text-[#c89658]">*</span>
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="e.g. Madhan S"
                  className={`w-full px-3.5 py-2 text-xs rounded-xl bg-black/50 border text-slate-100 placeholder-slate-500 focus:outline-none transition ${
                    formErrors.fullName 
                      ? 'border-rose-500 focus:border-rose-400' 
                      : 'border-white/10 focus:border-[#c89658]'
                  }`}
                />
                {formErrors.fullName && (
                  <p className="text-[10px] text-rose-400">{formErrors.fullName}</p>
                )}
              </div>

              {/* Date of Birth */}
              <div className="space-y-1">
                <label className="block text-xs font-medium text-slate-300">
                  Date of Birth <span className="text-[#c89658]">*</span>
                </label>
                <input
                  type="date"
                  name="dob"
                  value={formData.dob}
                  max={new Date().toISOString().split('T')[0]}
                  onChange={handleChange}
                  className={`w-full px-3.5 py-2 text-xs rounded-xl bg-black/50 border text-slate-100 placeholder-slate-500 focus:outline-none transition ${
                    formErrors.dob 
                      ? 'border-rose-500 focus:border-rose-400' 
                      : 'border-white/10 focus:border-[#c89658]'
                  }`}
                />
                {formErrors.dob && (
                  <p className="text-[10px] text-rose-400">{formErrors.dob}</p>
                )}
              </div>

              {/* Gender */}
              <div className="space-y-1">
                <label className="block text-xs font-medium text-slate-300">
                  Gender <span className="text-[#c89658]">*</span>
                </label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  className={`w-full px-3.5 py-2 text-xs rounded-xl bg-black/50 border text-slate-100 focus:outline-none transition ${
                    formErrors.gender 
                      ? 'border-rose-500 focus:border-rose-400' 
                      : 'border-white/10 focus:border-[#c89658]'
                  }`}
                >
                  {GENDER_OPTIONS.map((opt) => (
                    <option key={opt} value={opt} className="bg-[#14151e] text-white">
                      {opt}
                    </option>
                  ))}
                </select>
                {formErrors.gender && (
                  <p className="text-[10px] text-rose-400">{formErrors.gender}</p>
                )}
              </div>

              {/* Email Address */}
              <div className="space-y-1">
                <label className="block text-xs font-medium text-slate-300">
                  Email Address <span className="text-[#c89658]">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="e.g. madhan@example.com"
                  className={`w-full px-3.5 py-2 text-xs rounded-xl bg-black/50 border text-slate-100 placeholder-slate-500 focus:outline-none transition ${
                    formErrors.email 
                      ? 'border-rose-500 focus:border-rose-400' 
                      : 'border-white/10 focus:border-[#c89658]'
                  }`}
                />
                {formErrors.email && (
                  <p className="text-[10px] text-rose-400">{formErrors.email}</p>
                )}
              </div>

              {/* Phone Number (Optional) */}
              <div className="space-y-1 sm:col-span-2">
                <label className="block text-xs font-medium text-slate-300">
                  Phone Number <span className="text-slate-400 text-[10px]">(Optional)</span>
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="e.g. +91 8248358213"
                  className={`w-full px-3.5 py-2 text-xs rounded-xl bg-black/50 border text-slate-100 placeholder-slate-500 focus:outline-none transition ${
                    formErrors.phone 
                      ? 'border-rose-500 focus:border-rose-400' 
                      : 'border-white/10 focus:border-[#c89658]'
                  }`}
                />
                {formErrors.phone && (
                  <p className="text-[10px] text-rose-400">{formErrors.phone}</p>
                )}
              </div>

            </div>

            {/* Addresses Section */}
            <div className="space-y-3 pt-2 border-t border-white/10">
              <h5 className="text-xs font-mono uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                <Home className="w-3.5 h-3.5 text-[#c89658]" />
                <span>Addresses</span>
              </h5>

              {/* Permanent Address */}
              <div className="space-y-1">
                <label className="block text-xs font-medium text-slate-300">
                  Permanent Address <span className="text-[#c89658]">*</span>
                </label>
                <textarea
                  name="permanentAddress"
                  rows={2}
                  value={formData.permanentAddress}
                  onChange={handleChange}
                  placeholder="House / Street / City / State / Pincode"
                  className={`w-full px-3.5 py-2 text-xs rounded-xl bg-black/50 border text-slate-100 placeholder-slate-500 focus:outline-none transition resize-none ${
                    formErrors.permanentAddress 
                      ? 'border-rose-500 focus:border-rose-400' 
                      : 'border-white/10 focus:border-[#c89658]'
                  }`}
                />
                {formErrors.permanentAddress && (
                  <p className="text-[10px] text-rose-400">{formErrors.permanentAddress}</p>
                )}
              </div>

              {/* Sync Checkbox */}
              <div className="flex items-center gap-2.5 pt-1">
                <input
                  type="checkbox"
                  id="sameAsPermanent"
                  name="sameAsPermanent"
                  checked={formData.sameAsPermanent}
                  onChange={handleChange}
                  className="w-4 h-4 rounded text-[#c89658] bg-black/60 border-white/20 focus:ring-[#c89658] cursor-pointer"
                />
                <label htmlFor="sameAsPermanent" className="text-xs text-slate-300 cursor-pointer select-none">
                  Current address is same as permanent address
                </label>
              </div>

              {/* Current Address */}
              {!formData.sameAsPermanent && (
                <div className="space-y-1 pt-1 animate-fadeIn">
                  <label className="block text-xs font-medium text-slate-300">
                    Current Address <span className="text-[#c89658]">*</span>
                  </label>
                  <textarea
                    name="currentAddress"
                    rows={2}
                    value={formData.currentAddress}
                    onChange={handleChange}
                    placeholder="Current residence address"
                    className={`w-full px-3.5 py-2 text-xs rounded-xl bg-black/50 border text-slate-100 placeholder-slate-500 focus:outline-none transition resize-none ${
                      formErrors.currentAddress 
                        ? 'border-rose-500 focus:border-rose-400' 
                        : 'border-white/10 focus:border-[#c89658]'
                    }`}
                  />
                  {formErrors.currentAddress && (
                    <p className="text-[10px] text-rose-400">{formErrors.currentAddress}</p>
                  )}
                </div>
              )}
            </div>

            {/* Footer Buttons for Edit Mode */}
            <div className="pt-4 border-t border-white/10 flex items-center justify-between">
              <button
                type="button"
                onClick={switchToView}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-300 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 transition"
              >
                Cancel
              </button>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={resetToDefault}
                  title="Reset to default initial data"
                  className="px-3 py-2 rounded-xl text-xs text-slate-400 hover:text-[#c89658] hover:bg-white/5 transition flex items-center gap-1"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Reset Defaults</span>
                </button>

                <button
                  type="submit"
                  disabled={isSaving}
                  className="px-5 py-2 rounded-xl text-xs font-semibold bg-[#c89658] hover:bg-[#d8a568] text-[#0d0e12] shadow-[0_4px_20px_rgba(200,150,88,0.35)] transition-all flex items-center gap-2 active:scale-95 disabled:opacity-50"
                >
                  <Check className="w-3.5 h-3.5" />
                  <span>{isSaving ? 'Saving...' : 'Save Changes'}</span>
                </button>
              </div>
            </div>

          </form>
        )}

      </div>
    </div>
  );
};
