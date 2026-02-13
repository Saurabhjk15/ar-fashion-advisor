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
        primary: "#C6A75E", // Luxury Gold
        "primary-hover": "#E4C987",
        "background-dark": "#0A0A0B", // Deep Black
        "surface-card": "#141417", // Card Background
        "text-primary": "#F5F3EE", // Off-white text
        "accent-gold": "#D4AF37",
        "gold-light": "#f1e5ac",
        "charcoal-dark": "#050505",
        "luxury-charcoal": "#0F0F0F",
        "luxury-cream": "#F5F3EE",
      },
      fontFamily: {
        display: ['"Space Grotesk"', '"Cinzel"', 'serif'],
        sans: ['"Inter"', 'system-ui', 'sans-serif'],
        luxury: ['"Cinzel"', 'serif'],
      },
      backgroundImage: {
        'luxury-gradient': 'radial-gradient(circle at top, #1a1a1a 0%, #050505 100%)',
        'gold-gradient': 'linear-gradient(135deg, #D4AF37 0%, #F3E5AB 50%, #AA8A2E 100%)',
      },
      animation: {
        'scan': 'scan 3s linear infinite',
        'pulse-gold': 'pulse-gold 2s infinite',
        'fade-in': 'fadeIn 0.8s ease-out forwards',
        'slide-up': 'slideUp 0.8s ease-out forwards',
        'ping-slow': 'ping 3s cubic-bezier(0, 0, 0.2, 1) infinite',
      },
      keyframes: {
        scan: {
          '0%, 100%': { top: '0%' },
          '50%': { top: '100%' },
        },
        'pulse-gold': {
          '0%': { boxShadow: '0 0 0 0 rgba(198, 167, 94, 0.4)' },
          '70%': { boxShadow: '0 0 0 10px rgba(198, 167, 94, 0)' },
          '100%': { boxShadow: '0 0 0 0 rgba(198, 167, 94, 0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      boxShadow: {
        'gold': '0 0 15px rgba(212, 175, 55, 0.2)',
        'gold-lg': '0 0 25px rgba(198, 167, 94, 0.35)',
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/container-queries'),
  ],
}
