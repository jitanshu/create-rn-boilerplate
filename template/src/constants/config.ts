import Config from 'react-native-config';

export const APP_CONFIG = {
  env:        Config.APP_ENV ?? 'development',
  apiBaseUrl: Config.API_BASE_URL ?? 'https://api.example.com',
  isDev:      __DEV__,
  sentryDsn:  Config.SENTRY_DSN,
} as const;
