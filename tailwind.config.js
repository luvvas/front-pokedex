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
          normal: 'rgb(75 85 99)',
          fighting: 'rgb(220 38 38)',
          flying: 'rgb(202 138 4)',
          poison: 'rgb(22 163 74)',
          ground: 'rgb(234 88 12)',
          rock: 'rgb(75 85 99);',
          bug: 'rgb(234 88 12)',
          ghost: 'rgb(75 85 99)',
          steel: '#rgb(75 85 99);',
          fire: 'rgb(220 38 38)',
          water: 'rgb(37 99 235)',
          grass: 'rgb(5 150 105)',
          electric: 'rgb(202 138 4)',
          psychic: 'rgb(147 51 234)',
          ice: 'rgb(37 99 235)',
          dragon: 'rgb(220 38 38)',
          fairy: 'rgb(147 51 234)',
          unknown: 'rgb(75 85 99);',
          shadow: 'rgb(75 85 99);',
        },
      }
    },
  },
  plugins: [],
}
