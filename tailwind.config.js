/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      height: {
        'calc-minus-100': 'calc(100vh - 100px)',
      },
    },
  },
  plugins: [],
}