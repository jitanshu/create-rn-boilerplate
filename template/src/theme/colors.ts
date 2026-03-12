export const palette = {
  // Neutrals
  white:   '#FFFFFF',
  black:   '#000000',
  gray50:  '#F9FAFB',
  gray100: '#F3F4F6',
  gray200: '#E5E7EB',
  gray300: '#D1D5DB',
  gray400: '#9CA3AF',
  gray500: '#6B7280',
  gray600: '#4B5563',
  gray700: '#374151',
  gray800: '#1F2937',
  gray900: '#111827',

  // Brand
  primary50:  '#EFF6FF',
  primary100: '#DBEAFE',
  primary400: '#60A5FA',
  primary500: '#3B82F6',
  primary600: '#2563EB',
  primary700: '#1D4ED8',
  primary900: '#1E3A8A',

  // Semantic
  success500: '#22C55E',
  success600: '#16A34A',
  warning500: '#F59E0B',
  warning600: '#D97706',
  error500:   '#EF4444',
  error600:   '#DC2626',
  info500:    '#3B82F6',
} as const;

export type ThemeColors = typeof lightColors;

export const lightColors = {
  // Backgrounds
  background:        palette.white,
  backgroundSecondary: palette.gray50,
  surface:           palette.white,
  surfaceSecondary:  palette.gray100,

  // Text
  textPrimary:       palette.gray900,
  textSecondary:     palette.gray600,
  textDisabled:      palette.gray400,
  textInverse:       palette.white,
  textPlaceholder:   palette.gray400,

  // Brand
  primary:           palette.primary500,
  primaryDark:       palette.primary700,
  primaryLight:      palette.primary400,
  primarySurface:    palette.primary50,

  // Borders
  border:            palette.gray200,
  borderFocus:       palette.primary500,
  borderError:       palette.error500,

  // Semantic
  success:           palette.success500,
  warning:           palette.warning500,
  error:             palette.error500,
  info:              palette.info500,

  // Misc
  overlay:           'rgba(0,0,0,0.5)',
  shadow:            palette.black,
} as const;

export const darkColors: ThemeColors = {
  background:        palette.gray900,
  backgroundSecondary: palette.gray800,
  surface:           palette.gray800,
  surfaceSecondary:  palette.gray700,

  textPrimary:       palette.white,
  textSecondary:     palette.gray400,
  textDisabled:      palette.gray600,
  textInverse:       palette.gray900,
  textPlaceholder:   palette.gray600,

  primary:           palette.primary400,
  primaryDark:       palette.primary600,
  primaryLight:      palette.primary400,
  primarySurface:    palette.primary900,

  border:            palette.gray700,
  borderFocus:       palette.primary400,
  borderError:       palette.error500,

  success:           palette.success500,
  warning:           palette.warning500,
  error:             palette.error500,
  info:              palette.info500,

  overlay:           'rgba(0,0,0,0.7)',
  shadow:            palette.black,
} as const;
