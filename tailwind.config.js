// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        playfair: ['Playfair Display', 'serif'],
        inter: ['Inter', 'sans-serif'],
        mono: ['IBM Plex Mono', 'monospace'],
      },
      colors: {
        anios: {
          black: '#050505',
          dark: '#0B0B0F',
          darker: '#111114',
          indigo: '#5B5FEF',
          text: '#F5F5F5',
          muted: '#B3B3BD',
          subtle: '#71717A',
        },
      },
      backgroundColor: {
        'glow': 'rgba(91, 95, 239, 0.18)',
      },
    },
  },
  plugins: [],
};