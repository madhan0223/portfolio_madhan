import React, { useRef, useState, useEffect } from 'react';
import { 
  Briefcase, 
  Sparkles, 
  Building2, 
  CheckCircle2, 
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  Layers
} from 'lucide-react';
import { experienceData } from '../data/experience';
import { useNavigation } from '../context/NavigationContext';

export const Experience = () => {
  const { setActiveTab } = useNavigation();
  const scrollRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  // Check scroll position to dynamically disable / highlight navigation buttons
  const checkScrollPosition = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 15);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 15);
    }
  };

  useEffect(() => {
    checkScrollPosition();
    window.addEventListener('resize', checkScrollPosition);
    return () => window.removeEventListener('resize', checkScrollPosition);
  }, []);

  // Programmatic smooth horizontal scroll
  const handleScroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = 440;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section id="experience" className="pt-1 pb-10 sm:pb-14 relative z-10 max-w-7xl mx-auto px-1 sm:px-2 select-none">
      
      {/* Section Header with Navigation Controls */}
      <div className="flex items-center justify-between mb-4">
        {/* Quick Back Button */}
        <button
          onClick={() => setActiveTab('home')}
          className="px-3 py-1 rounded-full text-xs font-mono text-slate-300 hover:text-cyan-300 bg-white/5 hover:bg-white/10 border border-white/10 transition flex items-center gap-1.5 group"
          title="Return to Home workspace"
        >
          <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
          <span className="hidden sm:inline">Workspace</span>
        </button>

        {/* Section Title */}
        <div className="text-center">
          <h2 className="text-2xl sm:text-3xl font-display font-extrabold text-white tracking-tight">
            Internship <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#c89658] to-[#eed2ad]">Experience</span>
          </h2>
          <div className="w-16 h-0.5 bg-gradient-to-r from-[#c89658] to-[#eed2ad] rounded-full mx-auto mt-1" />
        </div>

        {/* Right Controls: Arrow Buttons & Badge */}
        <div className="flex items-center gap-2">
          {/* Arrow navigation buttons */}
          <div className="flex items-center gap-1 bg-[#121319]/90 border border-white/10 rounded-full p-0.5">
            <button
              onClick={() => handleScroll('left')}
              disabled={!canScrollLeft}
              aria-label="Scroll left"
              className={`p-1.5 rounded-full transition-all ${
                canScrollLeft 
                  ? 'text-white hover:text-[#c89658] hover:bg-white/10' 
                  : 'text-slate-600 cursor-not-allowed'
              }`}
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => handleScroll('right')}
              disabled={!canScrollRight}
              aria-label="Scroll right"
              className={`p-1.5 rounded-full transition-all ${
                canScrollRight 
                  ? 'text-white hover:text-[#c89658] hover:bg-white/10' 
                  : 'text-slate-600 cursor-not-allowed'
              }`}
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#c89658]/15 border border-[#c89658]/30 text-[#e4b57d] text-xs font-mono hidden sm:flex">
            <Sparkles className="w-3.5 h-3.5 text-[#c89658]" />
            <span>3 Internships</span>
          </div>
        </div>
      </div>

      {/* Continuous Straight Horizontal Track (No Zigzag) */}
      <div 
        ref={scrollRef}
        onScroll={checkScrollPosition}
        className="flex flex-row items-stretch gap-5 sm:gap-6 overflow-x-auto custom-scrollbar scroll-smooth snap-x snap-mandatory py-4 px-1"
      >
        {experienceData.map((item, index) => (
          <div
            key={item.id}
            className="w-[85vw] sm:w-[380px] lg:w-[420px] shrink-0 snap-start glass-card glass-card-hover p-6 sm:p-7 rounded-3xl border border-white/10 hover:border-[#c89658]/60 hover:shadow-[0_8px_30px_rgba(200,150,88,0.2)] flex flex-col justify-between group transition-all duration-300 relative overflow-hidden"
          >
            {/* Top gold highlight line */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#c89658] via-[#eed2ad] to-[#c89658] opacity-70 group-hover:opacity-100 transition-opacity" />

            <div>
              {/* Card Header: Intern badge + Type badge */}
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="text-[11px] font-mono font-semibold px-2.5 py-0.5 rounded-full bg-[#c89658]/15 border border-[#c89658]/35 text-[#e4b57d]">
                  Intern 0{index + 1}
                </span>
                <span className={`text-[11px] font-mono font-semibold px-2.5 py-0.5 rounded-full border ${item.badgeColor}`}>
                  {item.type}
                </span>
              </div>

              {/* Role Title */}
              <h3 className="text-lg sm:text-xl font-display font-bold text-white group-hover:text-[#c89658] transition-colors mt-1">
                {item.role}
              </h3>

              {/* Company */}
              <div className="flex items-center gap-2 text-xs text-slate-400 font-mono mt-1.5 mb-4">
                <Building2 className="w-4 h-4 text-[#c89658] shrink-0" />
                <span className="text-slate-200 font-medium">{item.company}</span>
              </div>

              {/* Highlights Bullets */}
              <ul className="space-y-2.5 mb-5 text-xs text-slate-300 leading-relaxed">
                {item.highlights.map((point, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#c89658] shrink-0 mt-0.5" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Card Footer: Tech tags + verification note */}
            <div className="pt-4 border-t border-white/10 space-y-3">
              <div className="flex flex-wrap gap-1.5">
                {item.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="text-[10px] px-2.5 py-0.5 rounded-lg bg-[#14151e] border border-white/10 text-slate-300 font-mono group-hover:border-[#c89658]/40 group-hover:text-[#e4b57d] transition-colors"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <div className="flex items-center justify-between text-[11px] text-slate-400 font-mono pt-1">
                <span className="flex items-center gap-1 text-emerald-400">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Resume Verified</span>
                </span>
                <span className="text-slate-500">{item.period}</span>
              </div>
            </div>

          </div>
        ))}
      </div>

      {/* Horizontal Scroll Hint */}
      <div className="flex items-center justify-center gap-2 pt-2 text-[11px] text-slate-400 font-mono">
        <span>← Scroll horizontally or use arrows to view all internships →</span>
      </div>

    </section>
  );
};
