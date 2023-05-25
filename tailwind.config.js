const sizes = require('./src/styles/custom/sizes.js')
const shadow = require('./src/styles/custom/shadow.js')
const border = require('./src/styles/custom/border.js')
const radius = require('./src/styles/custom/radius.js')
const screens = require('./src/styles/custom/screens.js')
const fontSize = require('./src/styles/custom/fontSize.js')
const fontFamily = require('./src/styles/custom/fontFamily.js')
const themeColors = require('./src/styles/custom/themeColors.js')

/** @type {import('tailwindcss').Config} */
module.exports = {
  plugins: [],
  content: ['./src/**/*.{js,ts,jsx,tsx}', '!./node_modules'],
  theme: {
    screens,
    fontSize,
    fontFamily,
    size: sizes,
    spacing: sizes,
    boxShadow: shadow,
    borderWidth: border,
    borderRadius: radius,
    extend: { colors: themeColors }
  }
}
