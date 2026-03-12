import React, { createContext, useContext, useState, useEffect } from 'react';
import { useColorScheme } from 'react-native';
import { lightColors, darkColors, type ThemeColors } from './colors';
import { spacing, borderRadius, shadow } from './spacing';
import { fontFamily, fontSize, lineHeight, fontWeight } from './typography';

export type ThemeMode = 'light' | 'dark' | 'system';

export interface Theme {
  colors:       ThemeColors;
  spacing:      typeof spacing;
  borderRadius: typeof borderRadius;
  shadow:       typeof shadow;
  fontFamily:   typeof fontFamily;
  fontSize:     typeof fontSize;
  lineHeight:   typeof lineHeight;
  fontWeight:   typeof fontWeight;
  isDark:       boolean;
  mode:         ThemeMode;
}

const buildTheme = (isDark: boolean, mode: ThemeMode): Theme => ({
  colors:       isDark ? darkColors : lightColors,
  spacing,
  borderRadius,
  shadow,
  fontFamily,
  fontSize,
  lineHeight,
  fontWeight,
  isDark,
  mode,
});

interface ThemeContextValue {
  theme:     Theme;
  setMode:   (mode: ThemeMode) => void;
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const systemScheme = useColorScheme();
  const [mode, setMode] = useState<ThemeMode>('system');

  const isDark =
    mode === 'dark' || (mode === 'system' && systemScheme === 'dark');

  const theme = buildTheme(isDark, mode);

  return (
    <ThemeContext.Provider value={{ theme, setMode }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider');
  return ctx;
}

export { lightColors, darkColors, spacing, borderRadius, shadow, fontFamily, fontSize };
