/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Adjust this path if your files are in a different directory
  ],
  theme: {
    extend: {
      colors: {
        lightGreen: '#DCF8C6',
        customWhite: '#FFFFFF', 
      },
    },
  },
  plugins: [],
}
