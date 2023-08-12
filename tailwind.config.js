/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        mobile: "360px",
        tab: "600px",
      },

      colors: {
        overlay: "#00000083",
      }
    },
  },
  plugins: [],
}