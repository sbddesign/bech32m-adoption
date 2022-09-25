/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      'sans': ['Nunito', 'ui-sans-serif', 'system-ui'],
      'display': ['Sniglet', 'ui-sans-serif', 'system-ui'],
      'mono': ['ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', 'Liberation Mono', 'Courier New', 'monospace']
    },
    extend: {
      dropShadow: {
        'hard-small': '8px 8px 0 rgba(6,28,54,0.20)',
        'hard-small-vertical': '0 -8px 0 rgba(6,28,54,0.10)',
        'hard-small-vertical-down': '0 8px 0 rgba(6,28,54,0.10)',
        'hard': '16px 16px 0 rgba(6,28,54,0.20)',
        'hard-subtle': '0 8px 0 rgba(6,28,54,0.10)'
      },
      colors: {
        'orange': '#FF9500',
        'blue-gray': '#ECF3F4',
        'green': '#67C37B',
        'green-light': '#C0EBC9',
        'red': '#E09D8E',
        'red-light': '#F4DED9',
        'status-yes': '#209B51',
        'status-no': '#AA3222',
        'status-planned': '#207E9B',
        'status-unknown': '#6B3379',
      },
    },
  },
  plugins: [],
}
