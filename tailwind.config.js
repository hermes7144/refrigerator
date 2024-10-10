

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: '#016bc3',
      },
      backgroundImage: {
        banner: `url('/images/banner.jpg')`
      }
    },
  },
  plugins: [require('daisyui'), require('tailwind-scrollbar')({ nocompatible: true })
  ],


}