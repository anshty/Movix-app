/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",      // root App.js ko include kare
    "./screens/**/*.{js,jsx,ts,tsx}",  // agar screens folder hai
    "./components/**/*.{js,jsx,ts,tsx}" // agar components folder hai
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {},
  },
  plugins: [],
}
