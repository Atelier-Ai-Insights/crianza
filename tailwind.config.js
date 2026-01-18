/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'sintonia-blue': '#4063B0',    // El azul de tu última imagen
        'sintonia-dark': '#1E293B',    // Gris pizarra para textos
        'sintonia-bone': '#F9F7F2',    // Blanco hueso para fondos
        'sintonia-light': '#F1F5F9',   // Gris muy claro para inputs
      },
    },
  },
  plugins: [],
}
