import React, { createContext, useContext, useState, useEffect } from 'react';
import { profileStorage, DEFAULT_PROFILE, validateProfile } from '../services/profileStorage';
import { useResume } from './ResumeContext';

const ProfileContext = createContext(null);

export const ProfileProvider = ({ children }) => {
  const [profile, setProfile] = useState(DEFAULT_PROFILE);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [modalMode, setModalMode] = useState('view'); // 'view' | 'edit'
  const [isSaving, setIsSaving] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  // Safely access toast notification from ResumeContext if available
  let showToast = null;
  try {
    const resumeCtx = useResume();
    if (resumeCtx && resumeCtx.toastMessage !== undefined) {
      // In ResumeContext, showToast is internal but we can trigger toast by calling a method or managing toast directly
    }
  } catch (e) {
    // optional fallback
  }

  // Local feedback toast state for profile actions
  const [profileToast, setProfileToast] = useState(null);

  const triggerToast = (msg, type = 'success') => {
    setProfileToast({ message: msg, type });
    setTimeout(() => {
      setProfileToast(null);
    }, 4000);
  };

  // Load persisted profile on mount
  useEffect(() => {
    const loaded = profileStorage.loadProfile();
    setProfile(loaded);
  }, []);

  const openProfile = (mode = 'view') => {
    setModalMode(mode);
    setErrorMessage(null);
    setIsProfileOpen(true);
  };

  const closeProfile = () => {
    setIsProfileOpen(false);
    setErrorMessage(null);
  };

  const switchToEdit = () => {
    setModalMode('edit');
    setErrorMessage(null);
  };

  const switchToView = () => {
    setModalMode('view');
    setErrorMessage(null);
  };

  const saveProfileData = async (updatedData) => {
    setIsSaving(true);
    setErrorMessage(null);
    try {
      const saved = await profileStorage.saveProfile(updatedData);
      setProfile(saved);
      setIsSaving(false);
      setModalMode('view');
      triggerToast('Profile updated and saved successfully!');
      return { success: true, profile: saved };
    } catch (err) {
      setIsSaving(false);
      const msg = err.message || 'Failed to save profile';
      setErrorMessage(msg);
      triggerToast(msg, 'error');
      return { success: false, error: msg };
    }
  };

  const resetToDefault = () => {
    const reset = profileStorage.resetProfile();
    setProfile(reset);
    setModalMode('view');
    triggerToast('Profile reset to initial defaults.');
  };

  return (
    <ProfileContext.Provider
      value={{
        profile,
        isProfileOpen,
        modalMode,
        isSaving,
        errorMessage,
        profileToast,
        openProfile,
        closeProfile,
        switchToEdit,
        switchToView,
        saveProfileData,
        resetToDefault,
        validateProfile
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
};

export const useProfile = () => {
  const context = useContext(ProfileContext);
  if (!context) {
    throw new Error('useProfile must be used within a ProfileProvider');
  }
  return context;
};
