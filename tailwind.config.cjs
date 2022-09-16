/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    container: {
      center: true
    },
    fontFamily: {
      poppins: ['Poppins'],
      NotoSans: ['Noto Sans']
    },
    extend: {
      fontSize: {
        us: '.625rem'
      },
      spacing: {
        16.5: '68px'
      }
    }
  },
  plugins: [require('@tailwindcss/typography')]
}
