/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'success-subtle': '#d1e7dd',
        'seagreen':'#00916E',
      },
      scale:{
        '101': '1.01',
        '102': '1.02',
        '103': '1.03'
      },
    },
  },
  plugins: [],
}
