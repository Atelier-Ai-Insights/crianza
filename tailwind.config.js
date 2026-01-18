/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'sintonia-blue': '#1E3A8A',    // Azul Acero Profesional
        'sintonia-dark': '#111827',    // Gris casi negro para Headers
        'sintonia-bone': '#F9F7F2',    // Blanco Hueso (Fondo cálido)
        'sintonia-slate': '#475569',   // Gris para textos
      },
    },
  },
  plugins: [],
}
