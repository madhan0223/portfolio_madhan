import React from 'react';

export const AiWorkspaceCard = () => {
  return (
    <div className="relative select-none group w-full max-w-[460px] lg:max-w-[480px]">
      
      {/* Soft Warm-Gold Ambient Glow Behind Card */}
      <div className="absolute -inset-1 bg-gradient-to-tr from-[#c89658]/30 via-[#c89658]/10 to-transparent rounded-[38px] blur-xl opacity-70 group-hover:opacity-90 transition-opacity" />

      {/* Outer Curved Container with Warm Amber Accent Border */}
      <div className="relative rounded-[32px] p-2 bg-[#14151b] border-2 border-[#c89658]/50 shadow-[0_16px_50px_rgba(0,0,0,0.8)] overflow-hidden">
        
        {/* Workspace Photograph / Illustration */}
        <div className="relative rounded-[24px] overflow-hidden bg-black/60 aspect-[16/11]">
          <img 
            src="/images/workspace/ai-workspace-card.png"
            alt="ML Engineer Workspace Setup"
            className="w-full h-full object-cover object-center group-hover:scale-[1.02] transition-transform duration-700"
          />
          
          {/* Subtle Warm Lighting Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
        </div>

      </div>
    </div>
  );
};
