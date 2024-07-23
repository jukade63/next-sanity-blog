import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: "class", // or 'media' or 'class
  theme: {
    gridTemplateRows: {
      // Adds a new utility for grid-template-rows
      'fixed-300': '300px',
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
export default config
