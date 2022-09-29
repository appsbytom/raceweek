module.exports = {
  content: ['./pages/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  plugins: [require('tailwindcss-radix')()],
  theme: {
    extend: {
      colors: {
        'f1': '#e10600',
        'f2': '#0090D0',
        'f2-accent': '#004267',
        'f3': '#E90300',
        'f3-accent': '#666666',
        'fe': '#14B7ED',
        'wseries': '#440099'
      }
    }
  }
}
