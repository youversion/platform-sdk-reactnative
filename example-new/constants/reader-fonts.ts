/**
 * Reader font settings matching the Kotlin platform-sdk ReaderFontSettings.
 */

export interface FontDefinition {
  fontName: string
  /** React Native fontFamily (for the native settings sheet preview) */
  fontFamily: string
  /** CSS font-family string (for the DOM BibleReader component) */
  cssFontFamily: string
}

export const AVAILABLE_FONT_SIZES = [9, 12, 15, 18, 21, 24] as const

export const DEFAULT_FONT_SIZE = 18

export const fontDefinitions: FontDefinition[] = [
  {
    fontName: "Serif",
    fontFamily: "Georgia",
    cssFontFamily: '"Source Serif 4", Georgia, serif',
  },
  {
    fontName: "Sans Serif",
    fontFamily: "System",
    cssFontFamily: '"Inter", system-ui, sans-serif',
  },
  {
    fontName: "Monospace",
    fontFamily: "Menlo",
    cssFontFamily: '"SF Mono", Menlo, monospace',
  },
]

export const DEFAULT_FONT_DEFINITION = fontDefinitions[0]

export function nextSmallerFontSize(currentSize: number): number {
  const smaller = AVAILABLE_FONT_SIZES.filter((s) => s < currentSize)
  return smaller.length > 0 ? smaller[smaller.length - 1] : AVAILABLE_FONT_SIZES[0]
}

export function nextLargerFontSize(currentSize: number): number {
  const larger = AVAILABLE_FONT_SIZES.filter((s) => s > currentSize)
  return larger.length > 0 ? larger[0] : AVAILABLE_FONT_SIZES[AVAILABLE_FONT_SIZES.length - 1]
}
