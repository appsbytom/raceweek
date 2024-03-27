/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./pages/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './series/config.ts'],
  plugins: [require('tailwindcss-radix')(), require('@tailwindcss/forms')({ strategy: 'class' })]
}
