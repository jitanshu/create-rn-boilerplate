declare module 'react-native-config' {
  export interface NativeConfig {
    API_BASE_URL:  string;
    APP_ENV:       'development' | 'staging' | 'production';
    SENTRY_DSN?:   string;
  }
  const Config: NativeConfig;
  export default Config;
}
