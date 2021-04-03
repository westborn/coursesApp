const production = !process.env.ROLLUP_WATCH // or some other env var like NODE_ENV
const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  future: {
    // for tailwind 2.0 compat
    purgeLayersByDefault: true,
    removeDeprecatedGapUtilities: true,
  },
  purge: {
    content: [
      './src/**/*.svelte',
      // may also want to include base index.html
    ],
    enabled: production, // disable purge in dev
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontFamily: {
      sans: ['Poppins', ...defaultTheme.fontFamily.sans],
      serif: defaultTheme.fontFamily.serif,
    },
    extend: {
      // http://sitehero.nl/uicolors to generate colors from the base
      colors: {
        primary: {
          base: '#72a951', //hsl(97, 35%, 49%)
          50: '#f4f8f1', //  hsl(97, 35%, 95%)
          100: '#eef5ea', // hsl(97, 35%, 93%)
          200: '#d8e8cf', // hsl(97, 35%, 86%)
          300: '#b5d2a2', // hsl(97, 35%, 72%)
          400: '#8ebb72', // hsl(97, 35%, 59%)
          500: '#699b4b', // hsl(97, 35%, 45%)
          600: '#547c3c', // hsl(97, 35%, 36%)
          700: '#42602e', // hsl(97, 35%, 27%)
          800: '#364f26', // hsl(97, 35%, 22%)
          900: '#314823', // hsl(97, 35%, 20%)
        },
        secondary: {
          base: '#D25F15', //hsl(23, 81%, 49%)
          50: '#fef6f1', //  hsl(23, 81%, 95%)
          100: '#fdf0e8', // hsl(23, 81%, 93%)
          200: '#fadecc', // hsl(23, 81%, 86%)
          300: '#f4bc99', // hsl(23, 81%, 72%)
          400: '#ef9862', // hsl(23, 81%, 59%)
          500: '#e26518', // hsl(23, 81%, 45%)
          600: '#b45113', // hsl(23, 81%, 36%)
          700: '#8f400f', // hsl(23, 81%, 27%)
          800: '#73340c', // hsl(23, 81%, 22%)
          900: '#6a300b', // hsl(23, 81%, 20%)
        },
      },
    },
  },
  variants: {
    extend: {
      backgroundColor: ['active'],
    },
  },
  plugins: [require('@tailwindcss/line-clamp'), require('@tailwindcss/custom-forms')],
}
