import type { NativeStackScreenProps } from '@react-navigation/native-stack';

// ─── Auth Stack ───────────────────────────────────────────────────────────────
export type AuthStackParamList = {
  Login:    undefined;
  Register: undefined;
};

// ─── App Stack ────────────────────────────────────────────────────────────────
export type AppStackParamList = {
  Home:    undefined;
  Profile: { userId: string };
};

// ─── Root ─────────────────────────────────────────────────────────────────────
export type RootStackParamList = {
  Auth:        { screen?: keyof AuthStackParamList };
  App:         { screen?: keyof AppStackParamList };
  Onboarding:  undefined;
};

// ─── Screen props helpers ─────────────────────────────────────────────────────
export type AuthScreenProps<T extends keyof AuthStackParamList> =
  NativeStackScreenProps<AuthStackParamList, T>;

export type AppScreenProps<T extends keyof AppStackParamList> =
  NativeStackScreenProps<AppStackParamList, T>;
