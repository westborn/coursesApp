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
      colors: {
        'u3a-green': 'rgba(114, 169, 81, 1)',
        'u3a-green-100': 'rgba(114, 169, 81, 0.1)',
        'u3a-green-200': 'rgba(114, 169, 81, 0.2)',
        'u3a-green-300': 'rgba(114, 169, 81, 0.3)',
        'u3a-green-400': 'rgba(114, 169, 81, 0.4)',
        'u3a-green-500': 'rgba(114, 169, 81, 0.5)',
        'u3a-green-600': 'rgba(114, 169, 81, 0.6)',
        'u3a-green-700': 'rgba(114, 169, 81, 0.7)',
        'u3a-green-800': 'rgba(114, 169, 81, 0.8)',
        'u3a-green-900': 'rgba(114, 169, 81, 0.9)',
        'u3a-orange': 'rgba(210, 95, 21, 1)',
        'u3a-orange-100': 'rgba(210, 95, 21, 0.1)',
        'u3a-orange-200': 'rgba(210, 95, 21, 0.2)',
        'u3a-orange-300': 'rgba(210, 95, 21, 0.3)',
        'u3a-orange-400': 'rgba(210, 95, 21, 0.4)',
        'u3a-orange-500': 'rgba(210, 95, 21, 0.5)',
        'u3a-orange-600': 'rgba(210, 95, 21, 0.6)',
        'u3a-orange-700': 'rgba(210, 95, 21, 0.7)',
        'u3a-orange-800': 'rgba(210, 95, 21, 0.8)',
        'u3a-orange-900': 'rgba(210, 95, 21, 0.9)',
        'u3a-blue': 'rgba(0, 194, 223, 1)',
        'u3a-blue-100': 'rgba(0, 194, 223, 0.1)',
        'u3a-blue-200': 'rgba(0, 194, 223, 0.2)',
        'u3a-blue-300': 'rgba(0, 194, 223, 0.3)',
        'u3a-blue-400': 'rgba(0, 194, 223, 0.4)',
        'u3a-blue-500': 'rgba(0, 194, 223, 0.5)',
        'u3a-blue-600': 'rgba(0, 194, 223, 0.6)',
        'u3a-blue-700': 'rgba(0, 194, 223, 0.7)',
        'u3a-blue-800': 'rgba(0, 194, 223, 0.8)',
        'u3a-blue-900': 'rgba(0, 194, 223, 0.9)',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require('@tailwindcss/line-clamp')],
}
