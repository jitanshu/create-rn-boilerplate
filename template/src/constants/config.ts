import Constants from 'expo-constants';

const extra = Constants.expoConfig?.extra ?? {};

export const APP_CONFIG = {
  env:        extra.APP_ENV ?? 'development',
  apiBaseUrl: extra.API_BASE_URL ?? 'https://api.example.com',
  isDev:      __DEV__,
} as const;