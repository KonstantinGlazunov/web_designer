/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class'],
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        glass: 'rgba(255,255,255,0.58)',
        'glass-dark': 'rgba(15,23,42,0.65)',
        'page-light': '#f8fafc',
        'page-dark': '#050816',
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'organic-gradient':
          'radial-gradient(circle at 16% 18%, rgba(59,130,246,0.45), transparent 22%), radial-gradient(circle at 70% 10%, rgba(139,92,246,0.36), transparent 24%), radial-gradient(circle at 48% 70%, rgba(34,197,94,0.24), transparent 22%), linear-gradient(145deg, #050816 0%, #101d4a 40%, #0f6d60 100%)',
      },
      boxShadow: {
        glow: '0 28px 120px rgba(15, 23, 42, 0.10)',
      },
    },
  },
  plugins: [],
}
