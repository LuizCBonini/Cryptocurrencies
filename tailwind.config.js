module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {

      colors: {
        'dacxi-blue': '#000032',
        'dacxi-purple': '#AA69FF',
      },

      fontFamily:{
        sans: ['Poppins', 'sans-serif'],
      }
    },
  },
  plugins: [],
}