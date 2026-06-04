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
        primary: {
          50: '#fff3eb',
          100: '#ffe3d1',
          200: '#ffc4a3',
          300: '#ff9d6b',
          400: '#ff6b35', // Saffron Orange
          500: '#ff4c15',
          600: '#e63507',
          700: '#bf2505',
          800: '#981e09',
          900: '#7a1b0b',
        },
        secondary: {
          50: '#ecfdf5',
          100: '#d1fae5',
          200: '#a7f3d0',
          300: '#6ee7b7',
          400: '#2ec4b6', // Fresh Mint/Teal
          500: '#10b981',
          600: '#059669',
          700: '#047857',
          800: '#065f46',
          900: '#064e3b',
        },
        dark: {
          bg: '#0F0E17',
          surface: '#1F1E26',
          border: '#2E2C38',
          text: '#F0EDF5',
          muted: '#A7A4B2',
        },
        light: {
          bg: '#FAF9F6',
          surface: '#FFFFFF',
          border: '#E8E5DF',
          text: '#1A1917',
          muted: '#73706B',
        }
      },
      fontFamily: {
        display: ['"Plus Jakarta Sans"', 'sans-serif'],
        body: ['Outfit', 'sans-serif'],
      },
      animation: {
        'bounce-slow': 'bounce 3s infinite',
        'spin-slow': 'spin 8s linear infinite',
        'float': 'float 4s ease-in-out infinite',
        'float-delayed': 'float 4s ease-in-out infinite 2s',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      },
      borderRadius: {
        'xl-playful': '1.5rem',
        '2xl-playful': '2rem',
      },
      boxShadow: {
        'flat-light': '4px 4px 0px 0px #1A1917',
        'flat-dark': '4px 4px 0px 0px #F0EDF5',
        'flat-primary': '6px 6px 0px 0px #ff6b35',
        'flat-secondary': '6px 6px 0px 0px #2ec4b6',
      }
    },
  },
  plugins: [],
}
