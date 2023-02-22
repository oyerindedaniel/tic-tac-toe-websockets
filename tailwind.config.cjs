/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    screens: {
      sm: { min: '640px' },

      md: { min: '768px' },

      lg: { min: '1024px' },

      xl: { min: '1280px' },

      '2xl': { min: '1536px' }
    },
    fontFamily: {
      inter: ['Inter', 'sans-serif']
    },
    extend: {
      colors: {
        primary: {
          'dark-violet': 'hsl(256, 26%, 20%)',
          'grayish-blue': 'hsl(216, 30%, 68%)'
        },
        neutral: {
          'very-dark-violet': 'hsl(270, 9%, 17%)',
          'dark-grayish-violet': 'hsl(273, 4%, 51%)',
          'very-light-gray': 'hsl(0, 0%, 98%)'
        }
      }
    }
  },
  plugins: []
};
