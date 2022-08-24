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
        'status-yes': '#209B51',
        'status-no': '#AA3222',
        'status-planned': '#207E9B',
        'status-unknown': '#6B3379',
      },
    },
  },
  plugins: [],
}
