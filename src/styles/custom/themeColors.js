const generateColorClass =
  variable =>
  ({ opacityValue }) =>
    opacityValue
      ? `rgba(var(--${variable}), ${opacityValue})`
      : `rgb(var(--${variable}))`

module.exports = {
  primary: {
    50: generateColorClass('colors-primary-50'),
    100: generateColorClass('colors-primary-100'),
    200: generateColorClass('colors-primary-200'),
    300: generateColorClass('colors-primary-300'),
    400: generateColorClass('colors-primary-400'),
    500: generateColorClass('colors-primary-500'),
    600: generateColorClass('colors-primary-600'),
    700: generateColorClass('colors-primary-700'),
    800: generateColorClass('colors-primary-800'),
    900: generateColorClass('colors-primary-900')
  },
  secondary: {
    50: generateColorClass('colors-secondary-50'),
    100: generateColorClass('colors-secondary-100'),
    200: generateColorClass('colors-secondary-200'),
    300: generateColorClass('colors-secondary-300'),
    400: generateColorClass('colors-secondary-400'),
    500: generateColorClass('colors-secondary-500'),
    600: generateColorClass('colors-secondary-600'),
    700: generateColorClass('colors-secondary-700'),
    800: generateColorClass('colors-secondary-800'),
    900: generateColorClass('colors-secondary-900')
  },
  tertiary: {
    50: generateColorClass('colors-tertiary-50'),
    100: generateColorClass('colors-tertiary-100'),
    200: generateColorClass('colors-tertiary-200'),
    300: generateColorClass('colors-tertiary-300'),
    400: generateColorClass('colors-tertiary-400'),
    500: generateColorClass('colors-tertiary-500'),
    600: generateColorClass('colors-tertiary-600'),
    700: generateColorClass('colors-tertiary-700'),
    800: generateColorClass('colors-tertiary-800'),
    900: generateColorClass('colors-tertiary-900')
  },
  success: {
    50: generateColorClass('colors-success-50'),
    100: generateColorClass('colors-success-100'),
    200: generateColorClass('colors-success-200'),
    300: generateColorClass('colors-success-300'),
    400: generateColorClass('colors-success-400'),
    500: generateColorClass('colors-success-500'),
    600: generateColorClass('colors-success-600'),
    700: generateColorClass('colors-success-700'),
    800: generateColorClass('colors-success-800'),
    900: generateColorClass('colors-success-900')
  },

  error: {
    DEFAULT: '#DA100B',
    50: '#FAA4A2',
    100: '#F9918F',
    200: '#F76B68',
    300: '#F54641',
    400: '#F3201A',
    500: '#DA100B',
    600: '#A50C08',
    700: '#6F0806',
    800: '#3A0403',
    900: '#040000'
  },
  info: {
    DEFAULT: '#048AD3',
    50: '#92D7FD',
    100: '#7ED0FD',
    200: '#56C1FC',
    300: '#2EB3FB',
    400: '#06A4FA',
    500: '#048AD3',
    600: '#03669C',
    700: '#024265',
    800: '#011E2E',
    900: '#000000'
  },
  warning: {
    50: '#fefcf7',
    100: '#fef9ef',
    200: '#fbf1d7',
    300: '#f9e9bf',
    400: '#f5d88e',
    500: '#F0C75E',
    600: '#d8b355',
    700: '#b49547',
    800: '#907738',
    900: '#76622e'
  },

  black: {
    50: '#000000',
    100: '#000000',
    200: '#000000',
    300: '#000000',
    400: '#000000',
    500: '#000000',
    600: '#000000',
    700: '#000000',
    800: '#000000',
    900: '#000000'
  },
  white: {
    50: '#FFFFFF',
    100: '#FFFFFF',
    200: '#FFFFFF',
    300: '#FFFFFF',
    400: '#FFFFFF',
    500: '#FFFFFF',
    600: '#FFFFFF',
    700: '#FFFFFF',
    800: '#FFFFFF',
    900: '#FFFFFF'
  }
}
