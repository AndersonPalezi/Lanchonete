/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./**/*.{html,js}"],
  theme: {
    extend: {
      fontFamily:{
        "sans":["Roboto","san-serif"]
      },
      backgroundImage: {
        "home": "url('/assets/logo-hamburger.svg')"
      }
    },
  },
  plugins: [],
}
