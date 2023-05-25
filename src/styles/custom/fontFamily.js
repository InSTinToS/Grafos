const { fontFamily } = require('tailwindcss/defaultTheme')

module.exports = {
  primary: ['var(--urbanist-font)', ...fontFamily.sans],
  serif: ['var(--urbanist-font)', ...fontFamily.serif]
}
