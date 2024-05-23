/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors :{
        'primary' : '#f5167e',
        'secondary' : '#242565'
      }
    },
  },
  plugins: [],
}

