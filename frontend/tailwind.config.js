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
        background: {
          primary: '#050509',
          midnight: '#080B16',
          navy: '#0B1020',
          card: '#11162B',
          cardHover: '#171E38',
        },
        brand: {
          purple: '#7C3AED',
          violet: '#A855F7',
          blue: '#2563EB',
          cyan: '#22D3EE',
          magenta: '#D946EF',
          emerald: '#10B981',
          amber: '#F59E0B',
          coral: '#F43F5E',
        },
        text: {
          primary: '#F8FAFC',
          secondary: '#94A3B8',
          muted: '#64748B',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Space Grotesk', 'Inter', 'sans-serif'],
      },
      boxShadow: {
        'glow-purple': '0 0 25px -5px rgba(124, 58, 237, 0.45)',
        'glow-cyan': '0 0 25px -5px rgba(34, 211, 238, 0.45)',
        'glow-magenta': '0 0 25px -5px rgba(217, 70, 239, 0.45)',
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'hero-gradient': 'linear-gradient(135deg, rgba(124, 58, 237, 0.15) 0%, rgba(34, 211, 238, 0.1) 100%)',
      }
    },
  },
  plugins: [],
}
