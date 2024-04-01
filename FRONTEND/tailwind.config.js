/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,jsx}", "node_modules/flowbite-react/lib/esm/**/*.js","node_modules/flowbite-react/lib/esm/**/*.jsx"],
  darkMode: 'class',
  theme: {
    extend: {
      colors:{
        'Verde-oscuro-800':'#20331B',
        'Verde-oscuro-600':'#354C2B',
        'Verde-oscuro-400':'#4E6530',
        'Verde-claro-800':'#859864',
        'Verde-claro-600':'#A4B17B',
        'Verde-claro-400':'#E3F4AE',
        'Marron-900':'#191A19',
        'Marron-800':'#757253',
        'Marron-600':'#857A3B',
        'Marron-400':'#E0C899',
      }
      ,
      fontFamily:{
        'texto':['Klee One','sans-serif'],
        'titulo':['Margarine','sans-serif']
      }
    },
  },
  plugins: [require("flowbite/plugin")],
}

