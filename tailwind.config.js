/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  corePlugins: {
    accentColor: false,
    textOpacity: false,
    backgroundOpacity: false,
    borderOpacity: false,
    ringColor: false,
    ringOffsetColor: false,
    ringOffsetWidth: false,
    ringOpacity: false,
    ringWidth: false,
  },
  theme: {
    extend: {
      colors: {
        gray: {
          light: '#F5F5F5',
          dark: '#EEEEEE',
        },
      },
    },
    fontFamily: {
      sans: ['Roboto', '-apple-system', 'Arial', 'sans-serif'],
    },
    fontWeight: {
      normal: 400,
      medium: 500,
      bold: 700,
    },
  },
  plugins: [],
}
