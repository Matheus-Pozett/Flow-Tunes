/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme')

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'login': "url('/src/images/login.svg')",
      },
      colors: {
        'login-blue': '#003BE5',
      },
      fontFamily: {
        'sans': ['"Epilogue"', ...defaultTheme.fontFamily.sans],
      }
    },
  },
  plugins: [],
}