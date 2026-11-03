import React from 'react';
import { useNavigation } from '../context/NavigationContext';

/**
 * 4K Ultra-Clear Pristine Anime Background
 * Displays the exact 4K artwork with Naruto, Zoro, Luffy, and Asta:
 * - 100% Crisp, original quality
 * - Zero artificial lines, zero distortions, zero moving canvas artifacts
 * - Dynamic contrast adaptation: subtle gradient for text readability in workspace mode,
 *   and 100% uninhibited full-brightness in Background View mode.
 */
export const AnimeBackground = () => {
  const { isBackgroundOnly } = useNavigation();

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none bg-[#050713]">
      
      {/* 4K Master Landscape Image (100% Crisp, Untouched, Completely Clear) */}
      <div 
        className="absolute inset-0 w-full h-full bg-cover bg-center transition-all duration-500 ease-out"
        style={{
          backgroundImage: `url('/images/anime/cinematic-anime-bg.jpg')`,
          filter: isBackgroundOnly 
            ? 'brightness(1.0) contrast(1.0) saturate(1.0)' 
            : 'brightness(0.92) contrast(1.04) saturate(1.05)',
        }}
      />

      {/* Subtle Readability Vignette for Workspace Mode (Fades to 0% in Background View) */}
      <div 
        className={`absolute inset-0 bg-gradient-to-b from-[#050713]/40 via-transparent to-[#050713]/65 pointer-events-none transition-opacity duration-500 ${
          isBackgroundOnly ? 'opacity-0' : 'opacity-100'
        }`} 
      />
      <div 
        className={`absolute inset-0 bg-gradient-to-r from-[#050713]/45 via-transparent to-[#050713]/45 pointer-events-none transition-opacity duration-500 ${
          isBackgroundOnly ? 'opacity-0' : 'opacity-100'
        }`} 
      />
    </div>
  );
};
