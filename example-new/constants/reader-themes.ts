/**
 * Reader color themes matching the Kotlin platform-sdk ReaderThemes.
 *
 * Each theme defines a full color palette so the settings drawer
 * adapts its tint to the selected reader theme.
 */

export interface ReaderColorScheme {
  isDark: boolean
  background: string
  foreground: string
  /** Settings drawer surface – offset from background */
  drawerSurface: string
  borderPrimaryColor: string
  borderSecondaryColor: string
  buttonSecondaryColor: string
}

export interface ReaderTheme {
  id: number
  name: string
  colorScheme: ReaderColorScheme
}

// ── Theme definitions ───────────────────────────────────────────────

export const PureWhite: ReaderColorScheme = {
  isDark: false,
  background: '#FFFFFF',
  foreground: '#121212',
  drawerSurface: '#EDEBEB',
  borderPrimaryColor: '#DDDBDB',
  borderSecondaryColor: '#BFBDBD',
  buttonSecondaryColor: '#DDDBDB',
}

export const Sepia: ReaderColorScheme = {
  isDark: false,
  background: '#F6EFEE',
  foreground: '#121212',
  drawerSurface: '#E8DFDD',
  borderPrimaryColor: '#D6CBCA',
  borderSecondaryColor: '#B8ADAB',
  buttonSecondaryColor: '#D6CBCA',
}

export const PaperGray: ReaderColorScheme = {
  isDark: false,
  background: '#EDEFEF',
  foreground: '#121212',
  drawerSurface: '#DFE1E1',
  borderPrimaryColor: '#CDD0D0',
  borderSecondaryColor: '#AFB2B2',
  buttonSecondaryColor: '#CDD0D0',
}

export const Cream: ReaderColorScheme = {
  isDark: false,
  background: '#FEF5EB',
  foreground: '#121212',
  drawerSurface: '#F0E5D9',
  borderPrimaryColor: '#DED2C4',
  borderSecondaryColor: '#C0B4A6',
  buttonSecondaryColor: '#DED2C4',
}

export const Charcoal: ReaderColorScheme = {
  isDark: true,
  background: '#2B3031',
  foreground: '#FFFFFF',
  drawerSurface: '#383E3F',
  borderPrimaryColor: '#4A5152',
  borderSecondaryColor: '#636A6B',
  buttonSecondaryColor: '#4A5152',
}

export const MidnightBlue: ReaderColorScheme = {
  isDark: true,
  background: '#1C2A3B',
  foreground: '#FFFFFF',
  drawerSurface: '#283848',
  borderPrimaryColor: '#3A4C5E',
  borderSecondaryColor: '#536778',
  buttonSecondaryColor: '#3A4C5E',
}

export const TrueBlack: ReaderColorScheme = {
  isDark: true,
  background: '#121212',
  foreground: '#FFFFFF',
  drawerSurface: '#1E1E1E',
  borderPrimaryColor: '#333333',
  borderSecondaryColor: '#4D4D4D',
  buttonSecondaryColor: '#333333',
}

export const readerThemes: ReaderTheme[] = [
  { id: 1, name: 'Pure White', colorScheme: PureWhite },
  { id: 2, name: 'Sepia', colorScheme: Sepia },
  { id: 3, name: 'Paper Gray', colorScheme: PaperGray },
  { id: 4, name: 'Cream', colorScheme: Cream },
  { id: 5, name: 'Charcoal', colorScheme: Charcoal },
  { id: 6, name: 'Midnight Blue', colorScheme: MidnightBlue },
  { id: 7, name: 'True Black', colorScheme: TrueBlack },
]
