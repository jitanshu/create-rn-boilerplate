import React from 'react';
import { View } from 'react-native';
import { BaseToast, ErrorToast, type ToastConfig } from 'react-native-toast-message';

export const toastConfig: ToastConfig = {
  success: (props) => (
    <BaseToast
      {...props}
      style={{ borderLeftColor: '#22C55E' }}
      contentContainerStyle={{ paddingHorizontal: 15 }}
      text1Style={{ fontSize: 14, fontWeight: '500' }}
      text2Style={{ fontSize: 12 }}
    />
  ),
  error: (props) => (
    <ErrorToast
      {...props}
      style={{ borderLeftColor: '#EF4444' }}
      text1Style={{ fontSize: 14, fontWeight: '500' }}
      text2Style={{ fontSize: 12 }}
    />
  ),
  info: (props) => (
    <BaseToast
      {...props}
      style={{ borderLeftColor: '#3B82F6' }}
      text1Style={{ fontSize: 14, fontWeight: '500' }}
      text2Style={{ fontSize: 12 }}
    />
  ),
};
