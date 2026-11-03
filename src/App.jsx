import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ResumeProvider, useResume } from './context/ResumeContext';
import { NavigationProvider, useNavigation } from './context/NavigationContext';
import { ProfileProvider, useProfile } from './context/ProfileContext';
import { Sidebar } from './components/Sidebar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Skills } from './components/Skills';
import { Projects } from './components/Projects';
import { Experience } from './components/Experience';
import { Certifications } from './components/Certifications';
import { Contact } from './components/Contact';
import { ResumeSettingsModal } from './components/ResumeSettingsModal';
import { ProfileDropdown } from './components/ProfileDropdown';
import { ProfileModal } from './components/ProfileModal';
import { MobileNav } from './components/MobileNav';

const ToastNotification = () => {
  const { toastMessage } = useResume();
  const { profileToast } = useProfile();

  const activeMessage = profileToast?.message || toastMessage;
  if (!activeMessage) return null;

  const isError = profileToast?.type === 'error';

  return (
    <div className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-50 px-4 py-2.5 rounded-2xl ${
      isError 
        ? 'bg-[#1e1414]/95 border border-rose-500/50 text-rose-300' 
        : 'bg-[#14151e]/95 border border-[#c89658]/50 text-[#e6bc86]'
    } text-xs font-mono shadow-2xl backdrop-blur-xl animate-fadeIn flex items-center gap-2`}>
      {activeMessage}
    </div>
  );
};

function AppContent() {
  const { activeTab } = useNavigation();

  return (
    <div className="relative min-h-screen w-full bg-[#0c0d12] text-slate-100 flex items-center justify-center p-3 sm:p-6 lg:p-8 overflow-x-hidden selection:bg-[#c89658]/30 selection:text-[#fae5ca]">
      
      {/* Top-Right Profile Avatar & Dropdown */}
      <ProfileDropdown />

      {/* Background Soft Atmospheric Ambient Gold Lights (Matches Reference) */}
      <div className="fixed top-1/4 right-[15%] w-[420px] h-[420px] rounded-full bg-[#c89658]/[0.07] blur-[120px] pointer-events-none" />
      <div className="fixed bottom-10 left-[20%] w-[350px] h-[350px] rounded-full bg-[#c89658]/[0.04] blur-[100px] pointer-events-none" />
      
      {/* Subtle warm backdrop circles */}
      <div className="fixed top-20 right-[28%] w-64 h-64 rounded-full border border-white/[0.02] pointer-events-none" />
      <div className="fixed bottom-16 right-[18%] w-96 h-96 rounded-full border border-white/[0.02] pointer-events-none" />

      {/* Main SnapFolio Container: Left Sidebar + Center/Right Workstation Area */}
      <div className="relative z-10 w-full max-w-7xl flex flex-col md:flex-row items-center md:items-start gap-6 lg:gap-10 my-auto">
        
        {/* Left Floating Sidebar Navigation (Desktop only) */}
        <Sidebar />

        {/* Main Content Wrapper — includes mobile nav + content area */}
        <div className="flex-1 w-full flex flex-col rounded-[28px] bg-[#121319]/60 border border-white/[0.06] shadow-[0_12px_40px_rgba(0,0,0,0.4)] backdrop-blur-xl overflow-hidden">
          
          {/* Mobile Top Horizontal Navigation */}
          <MobileNav />

          {/* Center/Right Dynamic Content Area (Smooth In-Place Crossfade with Vertical Scrolling) */}
          <main className={`flex-1 w-full p-5 sm:p-8 lg:p-10 md:min-h-[580px] md:max-h-[86vh] overflow-y-auto custom-scrollbar scroll-smooth flex flex-col ${
            activeTab === 'home' ? 'justify-center' : 'justify-start'
          }`}>
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 8, scale: 0.99 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.99 }}
              transition={{ duration: 0.24, ease: 'easeOut' }}
              className={`w-full ${activeTab === 'home' ? 'my-auto' : 'pt-1 pb-8'}`}
            >
              {activeTab === 'home' && <Hero />}
              {activeTab === 'about' && <About />}
              {activeTab === 'skills' && <Skills />}
              {activeTab === 'projects' && <Projects />}
              {activeTab === 'experience' && <Experience />}
              {activeTab === 'certifications' && <Certifications />}
              {activeTab === 'contact' && <Contact />}
            </motion.div>
          </AnimatePresence>
        </main>
        </div>

      </div>

      {/* Dedicated My Profile Modal (View & Edit Modes) */}
      <ProfileModal />

      {/* Changeable Resume Settings Modal */}
      <ResumeSettingsModal />

      {/* Toast Feedback Notification */}
      <ToastNotification />
    </div>
  );
}

export default function App() {
  return (
    <ResumeProvider>
      <NavigationProvider>
        <ProfileProvider>
          <AppContent />
        </ProfileProvider>
      </NavigationProvider>
    </ResumeProvider>
  );
}
