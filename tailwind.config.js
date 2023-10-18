/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}",
  "./pages/**/*.{js,ts,jsx,tsx,mdx}",
  "./components/**/*.{js,ts,jsx,tsx,mdx}",

  // Or if using `src` directory:
  "./src/**/*.{js,ts,jsx,tsx,mdx}",],
  theme: {
    extend: 
    {      
      keyframes: 
      {
        fading: 
        {
          '0%': {opacity: 0},
          '100%': {opacity:  1},
        },
        bouncing:
        {
          '0%': {transform: 'translateY(0px)'},
          '100%': {transform: 'translateY(15px)'}
        }
      },

      animation: 
      {
        'fade-in': 'fading 1s ease-in-out',        
        'bounce': 'bouncing .3s ease-in 5 alternate-reverse'
      },
    },
    colors:
    {
      'purple': 
      {
        500: '#40128B',
        700: '#630070',
        900: '#250724',
      },
      'pink': '#DD58D6',
      'white':
      {
        100: '#FFE79B',
        300: '#FDF2D2',
      },
      'yellow': '#EDDD4E',
      'green': '#A5FA97',
      'red': '#FFA5A5',
      'black': '#000000'
    }
},
  
  plugins: [],
}

