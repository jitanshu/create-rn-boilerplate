import React from 'react';
import { View, ViewStyle } from 'react-native';
import { useTheme } from '@/theme';
import { type ThemeColors } from '@/theme/colors';

export type IconColor = keyof ThemeColors | string;

export interface IconProps {
  icon:         React.FC<{ width: number; height: number; color: string }>;
  size?:        number;
  color?:       IconColor;
  style?:       ViewStyle;
  testID?:      string;
}

export function Icon({
  icon: SvgIcon,
  size = 24,
  color,
  style,
  testID = 'icon',
}: IconProps) {
  const { theme } = useTheme();

  const resolvedColor =
    color && color in theme.colors
      ? theme.colors[color as keyof ThemeColors]
      : (color as string) ?? theme.colors.textPrimary;

  return (
    <View testID={testID} style={style}>
      <SvgIcon width={size} height={size} color={resolvedColor} />
    </View>
  );
}
