# {{APP_NAME}} — Claude Project Reference

> This file is read by Claude to understand the project without re-explanation.
> Keep it updated as the project evolves.

---

## Stack

| Layer | Library |
|---|---|
| Framework | Expo Bare (React Native) |
| Language | TypeScript (strict mode) |
| Styling | NativeWind v4 + Tailwind + CVA (class-variance-authority) |
| Navigation | React Navigation v7 — Native Stack |
| State (server) | RTK Query via `src/services/api/endpoints.ts` |
| State (client) | Redux Toolkit slices in `src/store/slices/` |
| State (persistent) | MMKV via `src/services/storage/mmkv.ts` |
| Forms | React Hook Form + Zod schemas in `src/utils/validators.ts` |
| i18n | i18next — resources in `src/i18n/resources/{lang}/translation.json` |
| Toast | react-native-toast-message — config in `src/components/common/Toast/` |
| Splash | react-native-splash-screen — hidden in `src/app/index.tsx` |
| SVG | react-native-svg + transformer — all SVGs in `src/assets/svgs/` |
| Testing | Jest + jest-expo + RNTL + MSW |
| Code gen | Plop.js — `npm run generate` |
| Git hooks | Husky — pre-commit (lint-staged), pre-push (jest --bail) |

---

## Folder Map

```
src/
├── app/
│   ├── index.tsx          → Root component. Hides splash screen on mount.
│   └── providers.tsx      → All providers: Redux, ThemeProvider, Toast, i18n import
│
├── navigation/
│   ├── RootNavigator.tsx  → Auth gate: Onboarding → Auth → App based on Redux state
│   ├── AuthNavigator.tsx  → Login, Register
│   ├── AppNavigator.tsx   → Home, Profile (add new app screens here)
│   └── types.ts           → All ParamList types and screen prop helpers
│
├── screens/
│   ├── auth/              → LoginScreen, RegisterScreen (+ .test.tsx colocated)
│   ├── home/              → HomeScreen
│   └── onboarding/        → OnboardingScreen
│
├── components/
│   ├── common/
│   │   ├── Button/        → Variants: primary|secondary|ghost|danger|success|outline
│   │   │                    Sizes: xs|sm|md|lg|xl
│   │   │                    Props: leftIcon, rightIcon, loading, disabled, fullWidth
│   │   ├── Input/         → Sizes: sm|md|lg|xl(textarea)
│   │   │                    Props: leftIcon, rightIcon, leftAddon, rightAddon,
│   │   │                           label, hint, error, success, showCharCount, onClear
│   │   ├── Text/          → AppText with variants: h1-h5, body, bodyLg, bodySm,
│   │   │                    caption, label, link, error, success
│   │   ├── Icon/          → SVG icon wrapper — resolves color from theme tokens
│   │   └── Toast/         → Custom toast config (success, error, info)
│   └── layout/
│       ├── Screen/        → SafeAreaView + StatusBar + optional scroll + KeyboardAvoiding
│       └── Header/        → (extend as needed)
│
├── store/
│   ├── index.ts           → configureStore — exports RootState, AppDispatch
│   ├── rootReducer.ts     → combines auth, app, api slices
│   └── slices/
│       ├── authSlice.ts   → user, token, isAuthenticated — persists token in MMKV
│       └── appSlice.ts    → themeMode, language, isOnboarded
│
├── services/
│   ├── api/
│   │   ├── endpoints.ts   → RTK Query base API (apiSlice) — extend with .injectEndpoints()
│   │   └── __mocks__/
│   │       └── handlers.ts → MSW request handlers for tests
│   └── storage/
│       └── mmkv.ts        → StorageService with typed get/set/delete/getObject/setObject
│
├── hooks/
│   ├── useAppDispatch.ts  → typed useAppDispatch + useAppSelector
│   └── useTheme.ts        → re-exported from theme/index.ts
│
├── i18n/
│   ├── index.ts           → i18next init — add new languages here
│   └── resources/
│       ├── en/translation.json
│       └── hi/translation.json
│
├── theme/
│   ├── index.ts           → ThemeProvider, useTheme() hook, buildTheme()
│   ├── colors.ts          → lightColors, darkColors, palette
│   ├── typography.ts      → fontFamily, fontSize, lineHeight, fontWeight
│   └── spacing.ts         → spacing, borderRadius, shadow
│
├── utils/
│   ├── helpers.ts         → capitalize, truncate, isDefined, uid, formatCurrency
│   └── validators.ts      → Zod schemas: loginSchema, registerSchema
│
├── constants/
│   ├── config.ts          → APP_CONFIG from react-native-config env vars
│   └── routes.ts          → ROUTES constant object
│
└── types/
    ├── env.d.ts           → NativeConfig interface for react-native-config
    └── global.d.ts        → SVG, image, and NativeWind type declarations
```

---

## Key Conventions

**Imports — always use `@/` alias**
```ts
import { Button } from '@/components/common/Button';
import { useTheme } from '@/theme';
```

**Colors — never hardcode hex**
```ts
// ✅ correct
const { theme } = useTheme();
style={{ backgroundColor: theme.colors.primary }}

// ✅ also correct (NativeWind)
className="bg-primary-500"

// ❌ never
style={{ backgroundColor: '#3B82F6' }}
```

**Text — always use AppText, never raw RN Text**
```tsx
// ✅
<AppText variant="h2">Title</AppText>

// ❌
<Text style={{ fontSize: 24 }}>Title</Text>
```

**Strings — always use i18n t(), never hardcode**
```tsx
const { t } = useTranslation();
<AppText>{t('home.title')}</AppText>
```

**API calls — RTK Query only, never raw fetch/axios in components**
```ts
// ✅ add to src/services/api/endpoints.ts via injectEndpoints
export const authApi = apiSlice.injectEndpoints({ endpoints: (build) => ({
  login: build.mutation({ query: (body) => ({ url: '/auth/login', method: 'POST', body }) })
})});
```

**Forms — always React Hook Form + Zod**
```ts
const schema = z.object({ email: emailSchema, password: passwordSchema });
const { control, handleSubmit } = useForm({ resolver: zodResolver(schema) });
```

**Persistent data — MMKV StorageService only**
```ts
import { StorageService } from '@/services/storage/mmkv';
StorageService.setString('key', 'value');
```

**Server state → RTK Query. Client/UI state → Redux slice. Persisted state → MMKV**

---

## Adding a New Screen

1. Run `npm run generate` → choose `screen`
2. Add route name to `src/constants/routes.ts`
3. Add param type to `src/navigation/types.ts`
4. Add `<Stack.Screen>` to the appropriate navigator

## Adding a New API Endpoint

```ts
// In src/services/api/endpoints.ts
export const myApi = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    getUser: build.query<User, string>({ query: (id) => `/users/${id}` }),
  }),
});
export const { useGetUserQuery } = myApi;
```

## Adding a New Language

1. Create `src/i18n/resources/{langCode}/translation.json`
2. Import and register in `src/i18n/index.ts`
3. Update `Language` type in `src/i18n/index.ts`

## Running Tests

```bash
npm test                  # run all tests
npm run test:watch        # watch mode
npm run test:coverage     # coverage report
```

## Code Generation

```bash
npm run generate          # interactive — screen | component | slice
```

---

## Environment Variables

Defined in `.env`, accessed via `Config.VAR_NAME` (react-native-config).
Types in `src/types/env.d.ts`. Never use `process.env` directly in RN.

```
API_BASE_URL=https://api.example.com
APP_ENV=development
SENTRY_DSN=
```
