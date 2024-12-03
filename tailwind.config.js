/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#8B4513',
        secondary: '#FFA500',
        accent: '#006B3E',
      },
      boxShadow: {
        'neon': '0 0 10px var(--color-secondary), 0 0 20px var(--color-secondary)',
      },
    },
  },
  plugins: [],
};