import { Platform } from 'react-native';

export const fontFamily = {
  regular: Platform.select({ ios: 'Inter-Regular',  android: 'Inter-Regular' }),
  medium:  Platform.select({ ios: 'Inter-Medium',   android: 'Inter-Medium' }),
  bold:    Platform.select({ ios: 'Inter-Bold',     android: 'Inter-Bold' }),
  light:   Platform.select({ ios: 'Inter-Light',    android: 'Inter-Light' }),
} as const;

export const fontSize = {
  xs:   10,
  sm:   12,
  base: 14,
  md:   16,
  lg:   18,
  xl:   20,
  '2xl': 24,
  '3xl': 28,
  '4xl': 32,
  '5xl': 40,
} as const;

export const lineHeight = {
  tight:   1.2,
  normal:  1.5,
  relaxed: 1.75,
} as const;

export const fontWeight = {
  light:   '300',
  regular: '400',
  medium:  '500',
  bold:    '700',
} as const;

export type FontSize = keyof typeof fontSize;
export type FontFamily = keyof typeof fontFamily;
