import React from 'react';
import {
  TouchableOpacity,
  ActivityIndicator,
  View,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { cva, type VariantProps } from 'class-variance-authority';
import { AppText } from '@/components/common/Text';
import { useTheme } from '@/theme';

// ─── CVA Variants ─────────────────────────────────────────────────────────────
const buttonVariants = cva(
  // Base
  'flex-row items-center justify-center rounded-lg',
  {
    variants: {
      variant: {
        primary:   'bg-primary-500 active:bg-primary-700',
        secondary: 'bg-transparent border border-primary-500 active:bg-primary-50',
        ghost:     'bg-transparent active:bg-gray-100',
        danger:    'bg-red-500 active:bg-red-700',
        success:   'bg-green-500 active:bg-green-700',
        outline:   'bg-transparent border border-gray-300 active:bg-gray-50',
      },
      size: {
        xs: 'px-3 py-1.5 rounded-md',
        sm: 'px-4 py-2 rounded-md',
        md: 'px-5 py-3 rounded-lg',
        lg: 'px-6 py-4 rounded-lg',
        xl: 'px-8 py-5 rounded-xl',
      },
      fullWidth: {
        true: 'w-full',
      },
      disabled: {
        true: 'opacity-40',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  }
);

const buttonTextVariants = cva('font-medium', {
  variants: {
    variant: {
      primary:   'text-white',
      secondary: 'text-primary-500',
      ghost:     'text-primary-500',
      danger:    'text-white',
      success:   'text-white',
      outline:   'text-gray-700',
    },
    size: {
      xs: 'text-xs',
      sm: 'text-sm',
      md: 'text-base',
      lg: 'text-lg',
      xl: 'text-xl',
    },
  },
  defaultVariants: {
    variant: 'primary',
    size: 'md',
  },
});

// ─── Icon spacing map ──────────────────────────────────────────────────────────
const iconGap: Record<string, number> = { xs: 4, sm: 4, md: 6, lg: 8, xl: 10 };
const iconSize: Record<string, number> = { xs: 12, sm: 14, md: 16, lg: 18, xl: 20 };

// ─── Types ────────────────────────────────────────────────────────────────────
export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger' | 'success' | 'outline';
export type ButtonSize    = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export interface ButtonProps extends VariantProps<typeof buttonVariants> {
  label?:          string;
  onPress?:        () => void;
  leftIcon?:       React.ReactNode;
  rightIcon?:      React.ReactNode;
  loading?:        boolean;
  disabled?:       boolean;
  fullWidth?:      boolean;
  style?:          ViewStyle;
  labelStyle?:     TextStyle;
  hitSlop?:        number;
  testID?:         string;
  accessibilityLabel?: string;
}

// ─── Component ────────────────────────────────────────────────────────────────
export function Button({
  label,
  onPress,
  leftIcon,
  rightIcon,
  loading = false,
  disabled = false,
  fullWidth = false,
  variant = 'primary',
  size = 'md',
  style,
  labelStyle,
  hitSlop = 8,
  testID = 'button',
  accessibilityLabel,
}: ButtonProps) {
  const { theme } = useTheme();
  const isDisabled = disabled || loading;
  const gap = iconGap[size as string] ?? 6;
  const iSize = iconSize[size as string] ?? 16;

  const spinnerColor =
    variant === 'primary' || variant === 'danger' || variant === 'success'
      ? theme.colors.textInverse
      : theme.colors.primary;

  return (
    <TouchableOpacity
      testID={testID}
      accessibilityLabel={accessibilityLabel ?? label}
      accessibilityRole="button"
      accessibilityState={{ disabled: isDisabled, busy: loading }}
      onPress={onPress}
      disabled={isDisabled}
      hitSlop={{ top: hitSlop, bottom: hitSlop, left: hitSlop, right: hitSlop }}
      activeOpacity={0.8}
      className={buttonVariants({ variant, size, fullWidth, disabled: isDisabled })}
      style={style}
    >
      {/* Left Icon */}
      {!loading && leftIcon && (
        <View style={{ marginRight: gap }}>{leftIcon}</View>
      )}

      {/* Loader replaces left icon when loading */}
      {loading && (
        <ActivityIndicator
          size={iSize}
          color={spinnerColor}
          style={{ marginRight: label ? gap : 0 }}
        />
      )}

      {/* Label */}
      {label && (
        <AppText
          className={buttonTextVariants({ variant, size })}
          style={labelStyle}
          numberOfLines={1}
        >
          {label}
        </AppText>
      )}

      {/* Right Icon */}
      {!loading && rightIcon && (
        <View style={{ marginLeft: gap }}>{rightIcon}</View>
      )}
    </TouchableOpacity>
  );
}
