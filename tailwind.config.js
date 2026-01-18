/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Ahora 'primary' usará lo que definas en el CSS
        primary: 'var(--color-primary)',
        'primary-dark': 'var(--color-primary-dark)',
      },
    },
  },
  plugins: [],
}
