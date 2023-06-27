/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        title: 'Poppins_700Bold',
        body: 'Poppins_500Medium',
        alt: 'Poppins_700Bold_Italic',
        loginTitle: './assets/Pokemon Hollow.ttf'
      },
    },
  },
  plugins: [],
}
