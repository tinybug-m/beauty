/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html'],
  theme: {
    extend: {
      colors: {
        brand: {
          brown: '#4A2C1D',
          'brown-dark': '#382014',
          'brown-light': '#5D3926',
          amber: '#C68B59',
          'amber-hover': '#B37845',
          terracotta: '#D47A46',
          cream: '#FAF7F2',
          sand: '#F4EEE5',
          muted: '#7A6E65',
          card: '#FFFFFF',
          dark: '#1C1512',
        },
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'system-ui', '-apple-system', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 10px 30px -10px rgba(74, 44, 29, 0.08)',
        elevated: '0 20px 40px -15px rgba(74, 44, 29, 0.15)',
        glass: '0 8px 32px 0 rgba(0, 0, 0, 0.12)',
      },
    },
  },
  plugins: [require('@tailwindcss/forms'), require('@tailwindcss/container-queries')],
};
