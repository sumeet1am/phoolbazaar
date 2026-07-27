/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        floral: {
          emerald: '#064e3b',
          leaf: '#15803d',
          sage: '#ecfdf5',
          rose: '#f43f5e',
          petal: '#fb7185',
          softpink: '#fff1f2',
          marigold: '#f97316',
          lotus: '#a855f7',
          gold: '#eab308',
          cream: '#fdfbf7',
          dark: '#0f172a',
          glass: 'rgba(255, 255, 255, 0.75)'
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'sans-serif'],
        serif: ['Playfair Display', 'serif'],
        handwriting: ['Sacramento', 'cursive']
      },
      boxShadow: {
        'glass': '0 8px 32px 0 rgba(31, 38, 135, 0.07)',
        'bloom': '0 12px 30px -4px rgba(244, 63, 94, 0.25)',
        'emerald-glow': '0 10px 25px -5px rgba(21, 128, 61, 0.3)',
      },
      animation: {
        'float-slow': 'float 6s ease-in-out infinite',
        'pulse-subtle': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'spin-slow': 'spin 12s linear infinite',
        'sway': 'sway 4s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-15px) rotate(6deg)' },
        },
        sway: {
          '0%, 100%': { transform: 'rotate(-4deg)' },
          '50%': { transform: 'rotate(4deg)' },
        }
      }
    },
  },
  plugins: [],
}
