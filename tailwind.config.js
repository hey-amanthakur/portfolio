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
          400: '#ff6b35', // Saffron Orange (accent for emphasis)
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
          400: '#2ec4b6', // Teal (legacy light-mode accent)
          500: '#10b981',
          600: '#059669',
          700: '#047857',
          800: '#065f46',
          900: '#064e3b',
        },
        // Phosphor-green CRT palette for dark mode
        dark: {
          bg: '#0a0e0a',       // near-black with green hint
          surface: '#0f1410',  // panel
          border: '#1c2a1c',   // subtle phosphor border
          text: '#a8e6a8',     // primary phosphor green
          muted: '#5e8a5e',    // dim phosphor
        },
        light: {
          bg: '#FAF9F6',
          surface: '#FFFFFF',
          border: '#E8E5DF',
          text: '#1A1917',
          muted: '#73706B',
        },
        // CRT-specific accents
        crt: {
          bright: '#00ff66',   // active cursor / highlights
          dim: '#3a5a3a',      // grid lines
          warn: '#ffb000',     // amber accent
          err: '#ff5555',
        }
      },
      fontFamily: {
        display: ['"Plus Jakarta Sans"', 'sans-serif'],
        body: ['Outfit', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      animation: {
        'bounce-slow': 'bounce 3s infinite',
        'spin-slow': 'spin 8s linear infinite',
        'float': 'float 4s ease-in-out infinite',
        'float-delayed': 'float 4s ease-in-out infinite 2s',
        'blink': 'blink 1s step-end infinite',
        'blink-fast': 'blink 0.6s step-end infinite',
        'scanline': 'scanline 8s linear infinite',
        'flicker': 'flicker 4s infinite',
        'typewriter': 'typewriter 2.5s steps(40, end) forwards',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        blink: {
          '0%, 50%': { opacity: '1' },
          '51%, 100%': { opacity: '0' },
        },
        scanline: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100vh)' },
        },
        flicker: {
          '0%, 19.999%, 22%, 62.999%, 64%, 64.999%, 70%, 100%': { opacity: '1' },
          '20%, 21.999%, 63%, 63.999%, 65%, 69.999%': { opacity: '0.94' },
        },
        typewriter: {
          'from': { width: '0' },
          'to': { width: '100%' },
        },
      },
      borderRadius: {
        'xl-playful': '1.5rem',
        '2xl-playful': '2rem',
      },
      boxShadow: {
        'flat-light': '4px 4px 0px 0px #1A1917',
        'flat-dark': '4px 4px 0px 0px #a8e6a8',
        'flat-primary': '6px 6px 0px 0px #ff6b35',
        'flat-secondary': '6px 6px 0px 0px #2ec4b6',
        'crt-glow': '0 0 8px rgba(0, 255, 102, 0.45), 0 0 24px rgba(0, 255, 102, 0.15)',
        'crt-glow-strong': '0 0 12px rgba(0, 255, 102, 0.7), 0 0 36px rgba(0, 255, 102, 0.25)',
        'crt-glow-amber': '0 0 8px rgba(255, 176, 0, 0.45), 0 0 24px rgba(255, 176, 0, 0.18)',
      }
    },
  },
  plugins: [],
}
