/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: { // Add this block
        sans: ['Lato', 'sans-serif']
      },
      colors: {
        gray: {
          700: '#2e2e2e',
          800: '#1f1f1f',
          900: '#121212',
        }
      }
    },
  },
  plugins: [],
}
