
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html",
  ],
  theme: {
    extend: {
      colors: {
        mittelgrau: 'var(--mittelgrau)',
        hellblau: 'var(--hellblau)',
      },
    },
  },
  plugins: [],
}