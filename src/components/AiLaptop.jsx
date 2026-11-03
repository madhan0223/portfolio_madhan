import React, { useState } from 'react';
import { 
  Terminal, 
  Brain, 
  GitBranch, 
  BarChart2, 
  Sparkles,
  Layers,
  Code2
} from 'lucide-react';

export const AiLaptop = () => {
  const [activeTab, setActiveTab] = useState('neural'); // 'neural' | 'python' | 'pipeline' | 'analytics'

  return (
    <div className="relative w-full max-w-[360px] mx-auto select-none">
      
      {/* Sleek Minimal Floating Tech Pill at Top */}
      <div className="flex items-center justify-center gap-2 mb-2">
        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-medium bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 backdrop-blur-md">
          Python
        </span>
        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-medium bg-purple-950/60 border border-purple-500/30 text-purple-300 backdrop-blur-md">
          SQL
        </span>
        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-medium bg-emerald-950/60 border border-emerald-500/30 text-emerald-300 backdrop-blur-md">
          Machine Learning
        </span>
      </div>

      {/* Futuristic Holographic Glass Terminal (High Translucency, Compact Frame) */}
      <div className="relative rounded-2xl bg-[#070a1a]/65 border border-cyan-400/30 shadow-[0_8px_32px_rgba(0,0,0,0.5)] backdrop-blur-xl p-3 overflow-hidden">
        
        {/* Terminal Header Bar */}
        <div className="flex items-center justify-between pb-2 mb-2 border-b border-white/10">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-rose-500/80" />
            <span className="w-2 h-2 rounded-full bg-amber-500/80" />
            <span className="w-2 h-2 rounded-full bg-emerald-500/80" />
            <span className="ml-1 text-[10px] font-mono text-slate-400">
              ai-workspace
            </span>
          </div>

          {/* Minimal View Switcher Tabs */}
          <div className="flex items-center gap-1 bg-black/40 p-0.5 rounded-lg border border-white/10 text-[10px] font-mono">
            <button
              onClick={() => setActiveTab('neural')}
              className={`px-2 py-0.5 rounded transition ${
                activeTab === 'neural' 
                  ? 'bg-cyan-500/30 text-cyan-300 border border-cyan-400/50' 
                  : 'text-slate-400 hover:text-white'
              }`}
              title="Neural Classifier"
            >
              Neural
            </button>
            <button
              onClick={() => setActiveTab('python')}
              className={`px-2 py-0.5 rounded transition ${
                activeTab === 'python' 
                  ? 'bg-purple-500/30 text-purple-300 border border-purple-400/50' 
                  : 'text-slate-400 hover:text-white'
              }`}
              title="Python Code"
            >
              Code
            </button>
            <button
              onClick={() => setActiveTab('pipeline')}
              className={`px-2 py-0.5 rounded transition ${
                activeTab === 'pipeline' 
                  ? 'bg-emerald-500/30 text-emerald-300 border border-emerald-400/50' 
                  : 'text-slate-400 hover:text-white'
              }`}
              title="ETL Pipeline"
            >
              Pipeline
            </button>
            <button
              onClick={() => setActiveTab('analytics')}
              className={`px-2 py-0.5 rounded transition ${
                activeTab === 'analytics' 
                  ? 'bg-amber-500/30 text-amber-300 border border-amber-400/50' 
                  : 'text-slate-400 hover:text-white'
              }`}
              title="Data Analytics"
            >
              Stats
            </button>
          </div>
        </div>

        {/* Display Area */}
        <div className="h-[155px] rounded-xl bg-black/40 border border-white/5 p-2.5 overflow-hidden font-mono relative flex flex-col justify-between">
          
          {/* View 1: Animated AI Neural Network */}
          {activeTab === 'neural' && (
            <div className="h-full flex flex-col justify-between animate-fadeIn">
              <div className="flex items-center justify-between text-[10px] text-cyan-300 border-b border-cyan-900/30 pb-1">
                <span className="flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-cyan-400" />
                  RAG & Vision Architecture
                </span>
                <span className="text-[9px] text-emerald-400 bg-emerald-950/50 px-1.5 py-0.2 rounded border border-emerald-800/40">
                  LIVE
                </span>
              </div>

              {/* Compact SVG Neural Net Diagram */}
              <div className="flex-1 flex items-center justify-center my-0.5">
                <svg className="w-full h-20" viewBox="0 0 260 85">
                  <line x1="30" y1="20" x2="110" y2="30" stroke="rgba(0,240,255,0.4)" strokeWidth="1.2" strokeDasharray="2 2" />
                  <line x1="30" y1="45" x2="110" y2="30" stroke="rgba(0,240,255,0.5)" strokeWidth="1.2" />
                  <line x1="30" y1="70" x2="110" y2="60" stroke="rgba(0,240,255,0.4)" strokeWidth="1.2" />
                  <line x1="110" y1="30" x2="180" y2="30" stroke="rgba(168,85,247,0.5)" strokeWidth="1.2" />
                  <line x1="110" y1="60" x2="180" y2="60" stroke="rgba(16,185,129,0.5)" strokeWidth="1.2" />
                  <line x1="180" y1="30" x2="230" y2="45" stroke="rgba(0,240,255,0.7)" strokeWidth="1.5" />
                  <line x1="180" y1="60" x2="230" y2="45" stroke="rgba(0,240,255,0.7)" strokeWidth="1.5" />

                  <circle cx="30" cy="20" r="5" fill="#00f0ff" opacity="0.9" />
                  <circle cx="30" cy="45" r="5" fill="#00f0ff" opacity="0.9" />
                  <circle cx="30" cy="70" r="5" fill="#00f0ff" opacity="0.9" />

                  <circle cx="110" cy="30" r="6" fill="#a855f7" opacity="0.9" />
                  <circle cx="110" cy="60" r="6" fill="#a855f7" opacity="0.9" />

                  <circle cx="180" cy="30" r="6" fill="#10b981" opacity="0.9" />
                  <circle cx="180" cy="60" r="6" fill="#10b981" opacity="0.9" />

                  <circle cx="230" cy="45" r="7" fill="#00f0ff" className="animate-pulse" />
                </svg>
              </div>

              <div className="flex items-center justify-between text-[9px] text-slate-400">
                <span>Model: Ollama + LBPH</span>
                <span className="text-cyan-300">Accuracy: Verified</span>
              </div>
            </div>
          )}

          {/* View 2: Python Code Terminal */}
          {activeTab === 'python' && (
            <div className="h-full flex flex-col justify-between text-[10px] leading-tight animate-fadeIn">
              <div className="text-slate-300 space-y-0.5">
                <p><span className="text-purple-400">import</span> pandas <span className="text-purple-400">as</span> pd</p>
                <p><span className="text-purple-400">import</span> numpy <span className="text-purple-400">as</span> np</p>
                <p><span className="text-cyan-400">def</span> <span className="text-amber-300">etl_pipeline</span>(data):</p>
                <p className="pl-3">df = pd.read_csv(data)</p>
                <p className="pl-3 text-purple-400">return <span className="text-cyan-300">df.describe()</span></p>
              </div>
              <div className="flex items-center gap-1 text-[9px] text-emerald-400 pt-1 border-t border-white/5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block animate-ping" />
                <span>Ready · 0 syntax errors</span>
              </div>
            </div>
          )}

          {/* View 3: Data Pipeline DAG */}
          {activeTab === 'pipeline' && (
            <div className="h-full flex flex-col justify-between text-[10px] animate-fadeIn">
              <div className="text-emerald-300 text-[10px] font-semibold flex items-center justify-between">
                <span>Data Engineering DAG</span>
                <span className="text-[9px] text-slate-400">Pandas ETL</span>
              </div>
              <div className="grid grid-cols-3 gap-1 my-auto text-center text-[9px]">
                <div className="p-1.5 rounded bg-cyan-950/50 border border-cyan-800/40">
                  <span className="text-cyan-200">Raw DB</span>
                </div>
                <div className="p-1.5 rounded bg-purple-950/50 border border-purple-800/40">
                  <span className="text-purple-200">Cleaning</span>
                </div>
                <div className="p-1.5 rounded bg-emerald-950/50 border border-emerald-800/40">
                  <span className="text-emerald-200">ML Output</span>
                </div>
              </div>
              <div className="text-[9px] text-slate-400 text-center">
                Automated continuous workflow
              </div>
            </div>
          )}

          {/* View 4: Analytics Dashboard */}
          {activeTab === 'analytics' && (
            <div className="h-full flex flex-col justify-between text-[10px] animate-fadeIn">
              <div className="flex items-center justify-between text-[10px] text-amber-300">
                <span>Power BI & Matplotlib</span>
                <span className="text-[9px] text-slate-400">EDA Metrics</span>
              </div>
              <div className="flex items-end justify-between gap-1.5 h-16 my-auto px-1 border-b border-white/10 pb-1">
                <div className="w-full bg-cyan-500/70 rounded-t h-10" />
                <div className="w-full bg-purple-500/70 rounded-t h-14" />
                <div className="w-full bg-emerald-500/70 rounded-t h-11" />
                <div className="w-full bg-amber-500/70 rounded-t h-15" />
              </div>
              <div className="flex items-center justify-between text-[9px] text-slate-400">
                <span>EDA Distribution</span>
                <span className="text-cyan-300">10k+ rows</span>
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
