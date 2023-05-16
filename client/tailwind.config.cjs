/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#F5385D',
      },
      boxShadow: {
        '3xl': 'rgba(0, 0, 0, 0.35) 0px 5px 15px',
      },
    },
  },
  plugins: [],
};
