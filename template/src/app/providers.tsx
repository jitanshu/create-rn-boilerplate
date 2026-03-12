import React from 'react';
import { Provider as ReduxProvider } from 'react-redux';
import Toast from 'react-native-toast-message';
import { store } from '@/store';
import { ThemeProvider } from '@/theme';
import { toastConfig } from '@/components/common/Toast';
import '@/i18n';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ReduxProvider store={store}>
      <ThemeProvider>
        {children}
        <Toast config={toastConfig} />
      </ThemeProvider>
    </ReduxProvider>
  );
}
