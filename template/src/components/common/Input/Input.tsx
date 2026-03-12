import React, { useState, forwardRef } from 'react';
import {
  TextInput,
  View,
  TouchableOpacity,
  TextInputProps,
  ViewStyle,
  TextStyle,
  NativeSyntheticEvent,
  TextInputFocusEventData,
} from 'react-native';
import { cva, type VariantProps } from 'class-variance-authority';
import { AppText } from '@/components/common/Text';
import { useTheme } from '@/theme';

// ─── CVA Variants ─────────────────────────────────────────────────────────────
const containerVariants = cva(
  'flex-row items-center border rounded-lg bg-white dark:bg-gray-800 overflow-hidden',
  {
    variants: {
      size: {
        sm: 'min-h-[36px] px-3',
        md: 'min-h-[48px] px-4',
        lg: 'min-h-[56px] px-4',
        xl: 'min-h-[120px] px-4 items-start py-3', // textarea
      },
      state: {
        default:  'border-gray-300 dark:border-gray-600',
        focused:  'border-primary-500',
        error:    'border-red-500',
        disabled: 'border-gray-200 bg-gray-50 dark:bg-gray-900 opacity-60',
        success:  'border-green-500',
      },
    },
    defaultVariants: {
      size:  'md',
      state: 'default',
    },
  }
);

const inputTextVariants = cva('flex-1 text-gray-900 dark:text-white p-0 m-0', {
  variants: {
    size: {
      sm: 'text-sm',
      md: 'text-base',
      lg: 'text-lg',
      xl: 'text-base',
    },
  },
  defaultVariants: { size: 'md' },
});

// ─── Types ────────────────────────────────────────────────────────────────────
export type InputSize  = 'sm' | 'md' | 'lg' | 'xl';
export type InputState = 'default' | 'focused' | 'error' | 'disabled' | 'success';

export interface InputProps extends Omit<TextInputProps, 'style'> {
  label?:          string;
  hint?:           string;
  error?:          string;
  success?:        string;
  leftIcon?:       React.ReactNode;
  rightIcon?:      React.ReactNode;
  leftAddon?:      React.ReactNode;   // attached prefix (e.g. "+91")
  rightAddon?:     React.ReactNode;   // attached suffix (e.g. ".com")
  size?:           InputSize;
  disabled?:       boolean;
  showCharCount?:  boolean;
  maxLength?:      number;
  containerStyle?: ViewStyle;
  inputStyle?:     TextStyle;
  labelStyle?:     TextStyle;
  testID?:         string;
  onClear?:        () => void;
}

// ─── Component ────────────────────────────────────────────────────────────────
export const Input = forwardRef<TextInput, InputProps>(function Input(
  {
    label,
    hint,
    error,
    success,
    leftIcon,
    rightIcon,
    leftAddon,
    rightAddon,
    size = 'md',
    disabled = false,
    showCharCount = false,
    maxLength,
    containerStyle,
    inputStyle,
    labelStyle,
    testID = 'input',
    onClear,
    value,
    onFocus,
    onBlur,
    multiline,
    ...rest
  },
  ref
) {
  const { theme } = useTheme();
  const [isFocused, setIsFocused] = useState(false);
  const isMultiline = multiline || size === 'xl';

  const state: InputState = disabled
    ? 'disabled'
    : error
    ? 'error'
    : success
    ? 'success'
    : isFocused
    ? 'focused'
    : 'default';

  const handleFocus = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
    setIsFocused(true);
    onFocus?.(e);
  };

  const handleBlur = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
    setIsFocused(false);
    onBlur?.(e);
  };

  const charCount = typeof value === 'string' ? value.length : 0;

  return (
    <View style={containerStyle} testID={`${testID}-wrapper`}>
      {/* Label */}
      {label && (
        <AppText
          className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
          style={labelStyle}
        >
          {label}
        </AppText>
      )}

      {/* Input Container */}
      <View className={containerVariants({ size, state })}>
        {/* Left Addon — attached prefix */}
        {leftAddon && (
          <View className="pr-3 border-r border-gray-200 dark:border-gray-600 mr-3 self-stretch justify-center">
            {leftAddon}
          </View>
        )}

        {/* Left Icon */}
        {leftIcon && !leftAddon && (
          <View className="mr-2">{leftIcon}</View>
        )}

        {/* TextInput */}
        <TextInput
          ref={ref}
          testID={testID}
          value={value}
          editable={!disabled}
          maxLength={maxLength}
          multiline={isMultiline}
          textAlignVertical={isMultiline ? 'top' : 'center'}
          placeholderTextColor={theme.colors.textPlaceholder}
          onFocus={handleFocus}
          onBlur={handleBlur}
          className={inputTextVariants({ size })}
          style={[{ fontFamily: theme.fontFamily.regular }, inputStyle]}
          {...rest}
        />

        {/* Clear button */}
        {onClear && value && !disabled && (
          <TouchableOpacity
            onPress={onClear}
            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
            className="ml-2"
            testID={`${testID}-clear`}
          >
            <AppText className="text-gray-400 text-base">✕</AppText>
          </TouchableOpacity>
        )}

        {/* Right Icon */}
        {rightIcon && !rightAddon && (
          <View className="ml-2">{rightIcon}</View>
        )}

        {/* Right Addon — attached suffix */}
        {rightAddon && (
          <View className="pl-3 border-l border-gray-200 dark:border-gray-600 ml-3 self-stretch justify-center">
            {rightAddon}
          </View>
        )}
      </View>

      {/* Bottom row — hint/error/success + char count */}
      <View className="flex-row justify-between mt-1">
        <View className="flex-1">
          {error && (
            <AppText className="text-xs text-red-500" testID={`${testID}-error`}>
              {error}
            </AppText>
          )}
          {success && !error && (
            <AppText className="text-xs text-green-500">{success}</AppText>
          )}
          {hint && !error && !success && (
            <AppText className="text-xs text-gray-400">{hint}</AppText>
          )}
        </View>

        {showCharCount && maxLength && (
          <AppText className="text-xs text-gray-400 ml-2">
            {charCount}/{maxLength}
          </AppText>
        )}
      </View>
    </View>
  );
});
