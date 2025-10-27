/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
    extend: {
      colors: {
        primary: '#00D9FF',
        'primary-dark': '#0077BE',
        'bg-primary': '#0A0E27',
        'bg-secondary': '#151B3D',
        'bg-tertiary': '#1E2746',
        'text-primary': '#FFFFFF',
        'text-secondary': '#A0B3D9',
        'text-muted': '#6B7FA8',
        'border-color': '#1E2A5B',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Rajdhani', 'system-ui', 'sans-serif'],
      },
      animation: {
        'pulse-slow': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'glow': 'glow 3s ease-in-out infinite',
        'circuit': 'circuit 20s linear infinite',
      },
      keyframes: {
        glow: {
          '0%, 100%': { filter: 'drop-shadow(0 0 10px rgba(0, 217, 255, 0.5))' },
          '50%': { filter: 'drop-shadow(0 0 20px rgba(0, 217, 255, 0.8))' },
        },
        circuit: {
          '0%': { backgroundPosition: '0 0, 0 0' },
          '100%': { backgroundPosition: '100px 0, 0 100px' },
        },
      },
    },
  },
  plugins: [],
}

