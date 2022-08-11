/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      'sans': ['Roboto', 'ui-sans-serif', 'system-ui'],
      'display': ['Sniglet', 'ui-sans-serif', 'system-ui']
    },
    extend: {
      dropShadow: {
        'hard': '16px 16px 0 rgba(6,28,54,0.20)'
      },
      colors: {
        'status-yes': '#C8EED3',
        'status-no': '#FFD7D7',
        'status-planned': '#CBDDFF',
        'status-unknown': '#FAFCBE',
      },
    },
  },
  plugins: [],
}
