import React from 'react';
import { Text, TextProps, TextStyle } from 'react-native';
import { cva, type VariantProps } from 'class-variance-authority';

const textVariants = cva('text-gray-900 dark:text-white', {
  variants: {
    variant: {
      h1:      'text-4xl font-bold',
      h2:      'text-3xl font-bold',
      h3:      'text-2xl font-bold',
      h4:      'text-xl font-bold',
      h5:      'text-lg font-medium',
      body:    'text-base font-regular',
      bodyLg:  'text-lg font-regular',
      bodySm:  'text-sm font-regular',
      caption: 'text-xs text-gray-500 dark:text-gray-400',
      label:   'text-sm font-medium',
      link:    'text-base text-primary-500 underline',
      error:   'text-sm text-red-500',
      success: 'text-sm text-green-500',
    },
    align: {
      left:    'text-left',
      center:  'text-center',
      right:   'text-right',
    },
    weight: {
      light:   'font-light',
      regular: 'font-normal',
      medium:  'font-medium',
      bold:    'font-bold',
    },
  },
  defaultVariants: {
    variant: 'body',
    align:   'left',
  },
});

export interface AppTextProps extends TextProps, VariantProps<typeof textVariants> {
  style?: TextStyle;
  children?: React.ReactNode;
}

export function AppText({
  variant,
  align,
  weight,
  className,
  style,
  children,
  ...rest
}: AppTextProps) {
  return (
    <Text
      className={textVariants({ variant, align, weight, className } as any)}
      style={style}
      {...rest}
    >
      {children}
    </Text>
  );
}
