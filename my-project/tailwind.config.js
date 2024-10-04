/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.jsx"
  ],
  theme: {
    extend: {
      fontFamily: {
        anton: ["Anton", "sans-serif"]
      }
    },
  },
  plugins: [],
  safelist: [
    'bg-amber-400',
    'bg-rose-900'
  ]
}