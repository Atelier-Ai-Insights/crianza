/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // Verde Jade principal para botones y acentos
        primary: '#2D6A4F', 
        
        // Verde más oscuro para estados hover
        'primary-hover': '#1B4332', 
        
        // Color oscuro para el encabezado (Header) basado en la gama jade
        'sintonia-dark': '#1B4332', 
      },
    },
  },
  plugins: [],
}
