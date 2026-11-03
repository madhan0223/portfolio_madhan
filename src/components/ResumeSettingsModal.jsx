import React, { useState, useRef } from 'react';
import { useResume } from '../context/ResumeContext';
import { 
  X, 
  Upload, 
  FileText, 
  Link as LinkIcon, 
  RotateCcw, 
  CheckCircle2, 
  ExternalLink, 
  Download,
  AlertCircle,
  FileCheck
} from 'lucide-react';

export const ResumeSettingsModal = () => {
  const { 
    isSettingsOpen, 
    closeSettings, 
    resumeUrl, 
    resumeFileName, 
    sourceType, 
    lastUpdated,
    updateWithFile, 
    updateWithUrl, 
    resetToDefault,
    downloadResume,
    viewResume
  } = useResume();

  const [activeTab, setActiveTab] = useState('upload'); // 'upload' | 'link'
  const [customUrlInput, setCustomUrlInput] = useState('');
  const [customNameInput, setCustomNameInput] = useState('Madhan_S_Resume.pdf');
  const [dragActive, setDragActive] = useState(false);
  const [statusMessage, setStatusMessage] = useState(null);
  const fileInputRef = useRef(null);

  if (!isSettingsOpen) return null;

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      await processUploadedFile(file);
    }
  };

  const handleFileInputChange = async (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      await processUploadedFile(file);
    }
  };

  const processUploadedFile = async (file) => {
    setStatusMessage(null);
    try {
      await updateWithFile(file);
      setStatusMessage({ type: 'success', text: `Loaded: ${file.name}` });
    } catch (err) {
      setStatusMessage({ type: 'error', text: err.message || 'Failed to upload PDF.' });
    }
  };

  const handleSaveUrl = (e) => {
    e.preventDefault();
    setStatusMessage(null);
    try {
      updateWithUrl(customUrlInput, customNameInput);
      setStatusMessage({ type: 'success', text: 'Custom link saved successfully!' });
      setCustomUrlInput('');
    } catch (err) {
      setStatusMessage({ type: 'error', text: err.message || 'Invalid URL' });
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div 
        className="relative w-full max-w-lg bg-[#14151e] border border-[#c89658]/40 rounded-3xl p-6 shadow-2xl text-slate-100"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-4 mb-4 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-[#c89658]/15 border border-[#c89658]/30 text-[#e4b57d]">
              <FileText className="w-5 h-5 text-[#c89658]" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white tracking-wide flex items-center gap-2">
                Resume Settings
                <span className="text-xs px-2 py-0.5 rounded-full bg-[#c89658]/15 border border-[#c89658]/30 text-[#e4b57d] font-mono">
                  Changeable
                </span>
              </h3>
              <p className="text-xs text-slate-400">Update or upload your portfolio resume</p>
            </div>
          </div>
          <button 
            onClick={closeSettings}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Current Active Resume Status Card */}
        <div className="p-3.5 mb-5 rounded-2xl bg-black/40 border border-white/10 flex items-start justify-between gap-3">
          <div className="flex items-start gap-2.5">
            <FileCheck className="w-5 h-5 text-[#c89658] shrink-0 mt-0.5" />
            <div>
              <div className="text-xs font-semibold text-slate-300 flex items-center gap-2">
                <span>Active Resume:</span>
                <span className="text-[#e4b57d] font-mono text-[11px] bg-[#c89658]/15 px-2 py-0.5 rounded border border-[#c89658]/30">
                  {resumeFileName}
                </span>
              </div>
              <p className="text-[11px] text-slate-400 mt-1">
                Source: <span className="text-white capitalize">{sourceType === 'default' ? 'Built-in (Madhan_S_Resume.pdf)' : sourceType}</span>
                {lastUpdated && ` • Updated: ${lastUpdated}`}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5 shrink-0">
            <button
              onClick={viewResume}
              title="View in new tab"
              className="p-1.5 rounded-lg text-xs bg-white/5 hover:bg-white/10 text-slate-200 border border-white/10 transition flex items-center gap-1"
            >
              <ExternalLink className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={downloadResume}
              title="Test download"
              className="p-1.5 rounded-lg text-xs bg-[#c89658]/20 hover:bg-[#c89658]/40 text-[#e4b57d] border border-[#c89658]/40 transition flex items-center gap-1"
            >
              <Download className="w-3.5 h-3.5 text-[#c89658]" />
            </button>
          </div>
        </div>

        {/* Tabs for Upload vs Cloud Link */}
        <div className="flex items-center gap-2 mb-4 p-1 rounded-xl bg-black/50 border border-white/10">
          <button
            onClick={() => setActiveTab('upload')}
            className={`flex-1 py-1.5 px-3 rounded-lg text-xs font-medium transition-all flex items-center justify-center gap-1.5 ${
              activeTab === 'upload' 
                ? 'bg-[#c89658] text-[#0d0e12] font-semibold shadow-md' 
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Upload className="w-3.5 h-3.5" />
            Upload PDF File
          </button>
          <button
            onClick={() => setActiveTab('link')}
            className={`flex-1 py-1.5 px-3 rounded-lg text-xs font-medium transition-all flex items-center justify-center gap-1.5 ${
              activeTab === 'link' 
                ? 'bg-[#c89658] text-[#0d0e12] font-semibold shadow-md' 
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <LinkIcon className="w-3.5 h-3.5" />
            External Cloud Link
          </button>
        </div>

        {/* Tab 1: Upload PDF */}
        {activeTab === 'upload' && (
          <div>
            <div
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`border-2 border-dashed rounded-2xl p-6 text-center cursor-pointer transition-all ${
                dragActive 
                  ? 'border-[#c89658] bg-[#c89658]/10' 
                  : 'border-[#c89658]/30 hover:border-[#c89658]/60 bg-black/20'
              }`}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf,application/pdf"
                onChange={handleFileInputChange}
                className="hidden"
              />
              <Upload className="w-8 h-8 mx-auto text-[#c89658] mb-2 animate-bounce" />
              <p className="text-sm font-semibold text-slate-200">
                Click or drag & drop new resume PDF here
              </p>
              <p className="text-xs text-slate-400 mt-1">
                Upload your updated resume PDF
              </p>
            </div>
            <p className="text-[11px] text-slate-400 mt-2">
              💡 <span className="text-slate-300">Tip:</span> Uploading here immediately updates the "Resume" button without needing to redeploy.
            </p>
          </div>
        )}

        {/* Tab 2: Custom URL Link */}
        {activeTab === 'link' && (
          <form onSubmit={handleSaveUrl} className="space-y-3">
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                Cloud Resume URL (Google Drive, GitHub raw, etc.)
              </label>
              <input
                type="url"
                required
                placeholder="https://drive.google.com/file/d/..."
                value={customUrlInput}
                onChange={(e) => setCustomUrlInput(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-xl bg-black/50 border border-white/10 focus:border-[#c89658] focus:outline-none text-slate-200"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                Display File Name
              </label>
              <input
                type="text"
                value={customNameInput}
                onChange={(e) => setCustomNameInput(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-xl bg-black/50 border border-white/10 focus:border-[#c89658] focus:outline-none text-slate-200"
              />
            </div>
            <button
              type="submit"
              className="w-full py-2.5 px-4 rounded-xl bg-[#c89658] hover:bg-[#d8a568] text-[#0d0e12] text-xs font-semibold shadow-md transition"
            >
              Save Custom Resume Link
            </button>
          </form>
        )}

        {/* Feedback Message */}
        {statusMessage && (
          <div className={`mt-3 p-2.5 rounded-xl text-xs flex items-center gap-2 ${
            statusMessage.type === 'success' 
              ? 'bg-emerald-950/60 border border-emerald-500/40 text-emerald-300' 
              : 'bg-rose-950/60 border border-rose-500/40 text-rose-300'
          }`}>
            {statusMessage.type === 'success' ? <CheckCircle2 className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
            <span>{statusMessage.text}</span>
          </div>
        )}

        {/* Footer controls: Reset to Default & Close */}
        <div className="mt-5 pt-3 border-t border-white/10 flex items-center justify-between">
          <button
            onClick={() => {
              resetToDefault();
              setStatusMessage({ type: 'success', text: 'Reset to default static PDF.' });
            }}
            className="text-xs text-slate-400 hover:text-[#c89658] flex items-center gap-1.5 transition"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Reset to Default PDF
          </button>

          <button
            onClick={closeSettings}
            className="px-4 py-1.5 text-xs font-semibold rounded-xl bg-white/10 hover:bg-white/20 text-white border border-white/10 transition"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
