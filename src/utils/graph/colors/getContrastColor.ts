export const getContrastColor = (hexColor: string): 'dark' | 'light' => {
  const cleanHexColor = hexColor.replace('#', '')

  const red = parseInt(cleanHexColor.substring(0, 2), 16)
  const green = parseInt(cleanHexColor.substring(2, 2), 16)
  const blue = parseInt(cleanHexColor.substring(4, 2), 16)

  const luminance = (0.299 * red + 0.587 * green + 0.114 * blue) / 255

  const threshold = 0.5

  return luminance > threshold ? 'dark' : 'light'
}
