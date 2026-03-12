import React from 'react';
import {
  View,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  ViewStyle,
  StatusBar,
  RefreshControl,
} from 'react-native';
import { SafeAreaView, Edge } from 'react-native-safe-area-context';
import { useTheme } from '@/theme';

export interface ScreenProps {
  children:         React.ReactNode;
  scrollable?:      boolean;
  keyboardAvoiding?: boolean;
  safeEdges?:       Edge[];
  style?:           ViewStyle;
  contentStyle?:    ViewStyle;
  statusBarStyle?:  'light-content' | 'dark-content' | 'default';
  refreshing?:      boolean;
  onRefresh?:       () => void;
  testID?:          string;
}

export function Screen({
  children,
  scrollable = false,
  keyboardAvoiding = true,
  safeEdges = ['top', 'bottom'],
  style,
  contentStyle,
  statusBarStyle,
  refreshing,
  onRefresh,
  testID = 'screen',
}: ScreenProps) {
  const { theme } = useTheme();

  const barStyle = statusBarStyle ?? (theme.isDark ? 'light-content' : 'dark-content');
  const bg = theme.colors.background;

  const inner = scrollable ? (
    <ScrollView
      contentContainerStyle={[{ flexGrow: 1 }, contentStyle]}
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}
      refreshControl={
        onRefresh ? (
          <RefreshControl
            refreshing={!!refreshing}
            onRefresh={onRefresh}
            tintColor={theme.colors.primary}
          />
        ) : undefined
      }
    >
      {children}
    </ScrollView>
  ) : (
    <View style={[{ flex: 1 }, contentStyle]}>{children}</View>
  );

  const content = keyboardAvoiding ? (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      {inner}
    </KeyboardAvoidingView>
  ) : (
    inner
  );

  return (
    <SafeAreaView
      testID={testID}
      edges={safeEdges}
      style={[{ flex: 1, backgroundColor: bg }, style]}
    >
      <StatusBar barStyle={barStyle} backgroundColor={bg} />
      {content}
    </SafeAreaView>
  );
}
