/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'selector',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        med: {
          cream: '#fdfbf7',
          sand: '#fcf1d8',
          lemon: '#fde047',
          ocean: '#0284c7',
          navy: '#1e3a8a',
          sky: '#e0f2fe'
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        serif: ['"Playfair Display"', 'serif'],
        hand: ['Caveat', 'cursive'],
      },
      boxShadow: {
        'soft': '0 10px 40px -10px rgba(30, 58, 138, 0.08)',
        'inner-soft': 'inset 0 2px 10px rgba(0, 0, 0, 0.03)'
      }
    },
  },
  plugins: [],
}
