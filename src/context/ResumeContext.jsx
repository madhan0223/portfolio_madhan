import React, { createContext, useContext, useState, useEffect } from 'react';
import { profileData } from '../data/profile';

const ResumeContext = createContext(null);

const STORAGE_KEY_URL = 'madhan_portfolio_resume_url';
const STORAGE_KEY_NAME = 'madhan_portfolio_resume_name';
const STORAGE_KEY_DATE = 'madhan_portfolio_resume_date';
const STORAGE_KEY_SOURCE = 'madhan_portfolio_resume_source'; // 'default' | 'upload' | 'link'

export const ResumeProvider = ({ children }) => {
  const [resumeUrl, setResumeUrl] = useState(profileData.resumePath);
  const [resumeFileName, setResumeFileName] = useState(profileData.resumeFileName);
  const [sourceType, setSourceType] = useState('default'); // 'default', 'upload', 'link'
  const [lastUpdated, setLastUpdated] = useState(null);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  // Load saved preference from localStorage on mount
  useEffect(() => {
    try {
      const savedUrl = localStorage.getItem(STORAGE_KEY_URL);
      const savedName = localStorage.getItem(STORAGE_KEY_NAME);
      const savedDate = localStorage.getItem(STORAGE_KEY_DATE);
      const savedSource = localStorage.getItem(STORAGE_KEY_SOURCE);

      if (savedUrl && savedSource && savedSource !== 'default') {
        setResumeUrl(savedUrl);
        if (savedName) setResumeFileName(savedName);
        if (savedDate) setLastUpdated(savedDate);
        setSourceType(savedSource);
      }
    } catch (e) {
      console.warn('Could not read resume preferences from localStorage', e);
    }
  }, []);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  // Upload local PDF file
  const updateWithFile = (file) => {
    return new Promise((resolve, reject) => {
      if (!file) return reject(new Error('No file provided'));
      if (file.type !== 'application/pdf' && !file.name.endsWith('.pdf')) {
        return reject(new Error('Please select a valid PDF file.'));
      }

      const reader = new FileReader();
      reader.onload = () => {
        const base64Data = reader.result;
        try {
          localStorage.setItem(STORAGE_KEY_URL, base64Data);
          localStorage.setItem(STORAGE_KEY_NAME, file.name || 'Madhan_S_Resume.pdf');
          const nowStr = new Date().toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
          });
          localStorage.setItem(STORAGE_KEY_DATE, nowStr);
          localStorage.setItem(STORAGE_KEY_SOURCE, 'upload');

          setResumeUrl(base64Data);
          setResumeFileName(file.name || 'Madhan_S_Resume.pdf');
          setSourceType('upload');
          setLastUpdated(nowStr);
          showToast(`Resume updated successfully: ${file.name}`);
          resolve(true);
        } catch (err) {
          // If localStorage quota exceeded, create an in-memory object URL
          console.warn('Storage quota limit hit; falling back to in-memory URL', err);
          const blobUrl = URL.createObjectURL(file);
          setResumeUrl(blobUrl);
          setResumeFileName(file.name || 'Madhan_S_Resume.pdf');
          setSourceType('upload');
          showToast(`Resume loaded in current session: ${file.name}`);
          resolve(true);
        }
      };
      reader.onerror = (err) => reject(err);
      reader.readAsDataURL(file);
    });
  };

  // Update with external URL (e.g. Google Drive, GitHub raw)
  const updateWithUrl = (customUrl, customName = 'Madhan_S_Resume.pdf') => {
    if (!customUrl || !customUrl.trim()) {
      throw new Error('Please enter a valid URL.');
    }
    const cleanUrl = customUrl.trim();
    const nowStr = new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });

    try {
      localStorage.setItem(STORAGE_KEY_URL, cleanUrl);
      localStorage.setItem(STORAGE_KEY_NAME, customName);
      localStorage.setItem(STORAGE_KEY_DATE, nowStr);
      localStorage.setItem(STORAGE_KEY_SOURCE, 'link');
    } catch (e) {
      console.warn(e);
    }

    setResumeUrl(cleanUrl);
    setResumeFileName(customName);
    setSourceType('link');
    setLastUpdated(nowStr);
    showToast('Resume link saved successfully!');
  };

  // Reset to default static PDF
  const resetToDefault = () => {
    try {
      localStorage.removeItem(STORAGE_KEY_URL);
      localStorage.removeItem(STORAGE_KEY_NAME);
      localStorage.removeItem(STORAGE_KEY_DATE);
      localStorage.removeItem(STORAGE_KEY_SOURCE);
    } catch (e) {
      console.warn(e);
    }
    setResumeUrl(profileData.resumePath);
    setResumeFileName(profileData.resumeFileName);
    setSourceType('default');
    setLastUpdated(null);
    showToast('Reset to default resume (Madhan_S_Resume.pdf)');
  };

  // Trigger download action safely
  const downloadResume = () => {
    try {
      const link = document.createElement('a');
      link.href = resumeUrl;
      link.download = resumeFileName;
      link.target = '_blank';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      showToast('Downloading Madhan S Resume...');
    } catch (err) {
      console.error('Download failed, opening directly:', err);
      window.open(resumeUrl, '_blank');
    }
  };

  // Trigger view in new tab
  const viewResume = () => {
    window.open(resumeUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <ResumeContext.Provider
      value={{
        resumeUrl,
        resumeFileName,
        sourceType,
        lastUpdated,
        isSettingsOpen,
        openSettings: () => setIsSettingsOpen(true),
        closeSettings: () => setIsSettingsOpen(false),
        updateWithFile,
        updateWithUrl,
        resetToDefault,
        downloadResume,
        viewResume,
        toastMessage
      }}
    >
      {children}
    </ResumeContext.Provider>
  );
};

export const useResume = () => {
  const context = useContext(ResumeContext);
  if (!context) {
    throw new Error('useResume must be used within a ResumeProvider');
  }
  return context;
};
