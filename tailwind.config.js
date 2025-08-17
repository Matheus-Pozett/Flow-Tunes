// tailwind.config.js
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'login-blue': '#003BE5',
        'cyan': '#00D5E2',
      },
      backgroundImage: {
        'login': "url('src/images/login.svg')",
        'loading': "url('src/images/carregamento1.svg')",
        'notfound': "url('src/images/background-erro.svg')",
      },
      screens: {
        'xs': '475px',
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
        '2xl': '1536px',
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
      },
      aspectRatio: {
        'square': '1 / 1',
      },
    },
  },
  plugins: [],
}