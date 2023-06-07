/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        title: 'Poppins_700Bold',
        body: 'Poppins_500Medium',
        alt: 'Poppins_700Bold_Italic'
      },
      colors: {
        pokemon: {
          black: '#4b5563',
          blue: '#60a5fa',
          brown: '#422006',
          gray: '#4b5563',
          green: '#4ade80',
          pink: '#db2777',
          purple: '#9333ea',
          red: '#f87171',
          white: '#475569',
          yellow: '#ca8a04',
        },
      }
    },
  },
  plugins: [],
}
