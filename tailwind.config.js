module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundColor: {
        'dacxi-blue': '#000032',
        'dacxi-purple': '#AA69FF',
      },
      textColor: {
        'dacxi-blue': '#000032',
        'dacxi-purple': '#AA69FF',
      },
      borderColor: {
        'dacxi-purple': '#AA69FF',
      },

      fontFamily:{
        sans: ['Poppins', 'sans-serif'],
      }
    },
  },
  plugins: [],
}