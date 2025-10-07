/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        'neon-cyan': '#00ffff',
        'neon-blue': '#0080ff',
        'cyber-dark': '#0a0a0a',
        'cyber-gray': '#1a1a1a',
      },
      fontFamily: {
        'cyber': ['Orbitron', 'monospace'],
        'roboto': ['Roboto', 'sans-serif'],
      },
      animation: {
        'pulse-neon': 'pulse-neon 2s infinite',
        'slide-in': 'slide-in 0.8s ease-out',
        'fade-in': 'fade-in 1s ease-in',
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        'pulse-neon': {
          '0%, 100%': { textShadow: '0 0 5px #00ffff, 0 0 10px #00ffff, 0 0 15px #00ffff' },
          '50%': { textShadow: '0 0 2px #00ffff, 0 0 5px #00ffff, 0 0 8px #00ffff' },
        },
        'slide-in': {
          'from': { transform: 'translateX(-100%)', opacity: '0' },
          'to': { transform: 'translateX(0)', opacity: '1' },
        },
        'fade-in': {
          'from': { opacity: '0' },
          'to': { opacity: '1' },
        },
        'glow': {
          'from': { boxShadow: '0 0 20px #00ffff' },
          'to': { boxShadow: '0 0 30px #00ffff, 0 0 40px #00ffff' },
        },
      },
    },
  },
  plugins: [],
}