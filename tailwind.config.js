/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily:{
        happyMonkey:["Happy Monkey","sans-serif"],
        sedan:["Sedan SC","sans-serif"]
      }
    },
  },
  plugins: [],
}

