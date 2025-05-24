/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
        nunito: ['Nunito', 'sans-serif'],
      },
    },
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
  ],
}

