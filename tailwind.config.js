/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        gold: {
          DEFAULT: '#c89658',
          light: '#dfb27c',
          dark: '#a8753a',
          glow: 'rgba(200, 150, 88, 0.35)',
        },
        dark: {
          bg: '#0c0d12',
          surface: '#13141b',
          card: '#181922',
          border: 'rgba(255, 255, 255, 0.08)',
        },
        anime: {
          dark: '#050713',
          card: 'rgba(13, 18, 36, 0.75)',
          border: 'rgba(139, 92, 246, 0.25)',
          cyan: '#00f0ff',
          violet: '#8b5cf6',
          purple: '#a855f7',
          emerald: '#10b981',
          sunset: '#f97316',
          gold: '#f59e0b',
        },
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'sans-serif'],
        mono: ['Fira Code', 'JetBrains Mono', 'monospace'],
        display: ['Rajdhani', 'Orbitron', 'sans-serif'],
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float-slow': 'float 6s ease-in-out infinite',
        'float-medium': 'float 4s ease-in-out infinite',
        'glow-spin': 'spin 12s linear infinite',
        'scan-line': 'scan 3s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        scan: {
          '0%': { top: '0%' },
          '100%': { top: '100%' },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
      boxShadow: {
        'neon-cyan': '0 0 20px rgba(0, 240, 255, 0.35)',
        'neon-violet': '0 0 25px rgba(139, 92, 246, 0.35)',
        'neon-emerald': '0 0 20px rgba(16, 185, 129, 0.35)',
        'neon-sunset': '0 0 20px rgba(249, 115, 22, 0.35)',
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.45)',
      },
    },
  },
  plugins: [],
};
