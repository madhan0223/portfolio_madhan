import React, { createContext, useContext, useState, useEffect } from 'react';

const NavigationContext = createContext(null);

export const NavigationProvider = ({ children }) => {
  const [activeTab, setActiveTab] = useState('home'); // 'home' | 'about' | 'skills' | 'projects' | 'experience' | 'education' | 'certifications' | 'contact'
  const [isBackgroundOnly, setIsBackgroundOnly] = useState(false);

  const navigateTo = (tabId) => {
    setActiveTab(tabId);
    if (isBackgroundOnly) {
      setIsBackgroundOnly(false);
    }
  };

  const toggleBackgroundOnly = () => {
    setIsBackgroundOnly((prev) => !prev);
  };

  // Keyboard shortcut: Press ESC to exit Background View
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isBackgroundOnly) {
        setIsBackgroundOnly(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isBackgroundOnly]);

  return (
    <NavigationContext.Provider 
      value={{ 
        activeTab, 
        setActiveTab: navigateTo,
        isBackgroundOnly,
        setIsBackgroundOnly,
        toggleBackgroundOnly
      }}
    >
      {children}
    </NavigationContext.Provider>
  );
};

export const useNavigation = () => {
  const context = useContext(NavigationContext);
  if (!context) {
    throw new Error('useNavigation must be used within a NavigationProvider');
  }
  return context;
};
