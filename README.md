# 🚀 Jitan Boilerplate

> Production-ready React Native boilerplate · Expo Bare · 2026 Stack

A fully configured, scalable React Native starter built for developers who don't want to spend the first week of every project wiring up the same tools. Answer 4 questions, start building.

---

## Quick Start

```bash
npx create-rn-boilerplate
```

The CLI will ask:

| Prompt | Example |
|---|---|
| App name | `MyApp` |
| Bundle ID | `com.company.myapp` |
| Default language | `en` / `hi` / `ar` / `fr` / `es` |
| Package manager | `npm` / `yarn` / `bun` |

> All library versions are fetched **live from npm at install time** — no stale dependencies, ever. If your selected package manager is not installed, it automatically falls back to npm.

---

## What's Inside

| Category | Library | Why |
|---|---|---|
| Framework | Expo Bare Workflow | Full native access + OTA ready, no sandbox |
| Language | TypeScript (strict mode) | Catch bugs at compile time |
| Styling | NativeWind v4 + Tailwind CSS | Utility-first styling in RN |
| Variants | class-variance-authority (CVA) | Component variant system without style bloat |
| Navigation | React Navigation v7 | Industry standard, native stack |
| State (server) | RTK Query | Data fetching + caching built into Redux |
| State (client) | Redux Toolkit | Predictable global state |
| Storage | MMKV | 10x faster than AsyncStorage |
| Forms | React Hook Form + Zod | Best-in-class validation, zero re-renders |
| i18n | i18next + react-i18next | Multi-language with typed keys |
| Toast | react-native-toast-message | Customised success / error / info toasts |
| Splash | react-native-splash-screen | Native splash, dismissed on app ready |
| SVG | react-native-svg + transformer | Import `.svg` files as React components |
| HTTP | Axios | Request/response interceptors |
| Testing | Jest + jest-expo + RNTL + MSW | Real tests, real assertions |
| Code gen | Plop.js | Generate screens, components, slices in one command |
| Git hooks | Husky + lint-staged | Lint on commit, test on push |
| Env vars | react-native-config | Typed `.env` variables |
| Icons | react-native-vector-icons | Icon sets |
| Fonts | expo-font | Custom font loading with fallback support |

---

## Folder Structure

```
src/
├── app/
│   ├── index.tsx              # Root component — hides splash on mount
│   └── providers.tsx          # All providers in one place (Redux, Theme, Toast, i18n)
│
├── navigation/
│   ├── RootNavigator.tsx      # Auth gate: Onboarding → Auth → App
│   ├── AuthNavigator.tsx      # Login, Register
│   ├── AppNavigator.tsx       # Home, Profile (add new app screens here)
│   └── types.ts               # All ParamList types + screen prop helpers
│
├── screens/
│   ├── auth/                  # LoginScreen, RegisterScreen (+ .test.tsx colocated)
│   ├── home/                  # HomeScreen
│   └── onboarding/            # OnboardingScreen
│
├── components/
│   ├── common/
│   │   ├── Button/            # 6 variants × 5 sizes × leftIcon/rightIcon/loading
│   │   ├── Input/             # 4 sizes × addons × label/hint/error/charCount
│   │   ├── Text/              # AppText with 11 variants
│   │   ├── Icon/              # SVG wrapper with theme color resolution
│   │   └── Toast/             # Custom toast config
│   └── layout/
│       ├── Screen/            # SafeArea + StatusBar + scroll + keyboard avoiding
│       └── Header/            # Extendable header component
│
├── store/
│   ├── index.ts               # Store config — exports RootState, AppDispatch
│   ├── rootReducer.ts         # Combined reducers
│   └── slices/
│       ├── authSlice.ts       # user, token, isAuthenticated — persists token to MMKV
│       └── appSlice.ts        # themeMode, language, isOnboarded
│
├── services/
│   ├── api/
│   │   ├── endpoints.ts       # RTK Query base — extend with injectEndpoints()
│   │   └── __mocks__/
│   │       └── handlers.ts    # MSW mock handlers for tests
│   └── storage/
│       └── mmkv.ts            # StorageService — typed get/set/delete/object helpers
│
├── hooks/
│   ├── useAppDispatch.ts      # Typed useAppDispatch + useAppSelector
│   └── useTheme.ts            # Theme hook re-export
│
├── i18n/
│   ├── index.ts               # i18next config — add new languages here
│   └── resources/
│       ├── en/translation.json
│       └── hi/translation.json
│
├── theme/
│   ├── index.ts               # ThemeProvider + useTheme() hook
│   ├── colors.ts              # Light + dark color tokens
│   ├── typography.ts          # Font family, size, weight, line height
│   └── spacing.ts             # Spacing scale, border radius, shadows
│
├── utils/
│   ├── helpers.ts             # capitalize, truncate, isDefined, uid, formatCurrency
│   └── validators.ts          # Zod schemas — loginSchema, registerSchema
│
├── constants/
│   ├── config.ts              # APP_CONFIG from env vars
│   └── routes.ts              # ROUTES constant object
│
└── types/
    ├── env.d.ts               # NativeConfig types for react-native-config
    └── global.d.ts            # SVG, image, NativeWind type declarations

generators/                    # Plop.js templates
__mocks__/                     # Global Jest mocks + MSW setup
```

---

## Available Scripts

```bash
# Development
npx expo run:ios              # Run on iOS simulator
npx expo run:android          # Run on Android emulator
expo start                    # Start Metro bundler only

# Testing
npm test                      # Run all tests once
npm run test:watch            # Watch mode
npm run test:coverage         # Coverage report

# Code Quality
npm run lint                  # ESLint check
npm run lint:fix              # ESLint auto-fix
npm run format                # Prettier format all src files

# Code Generation
npm run generate              # Interactive — screen / component / slice

# Native
npm run prebuild              # expo prebuild — regenerates android/ and ios/ folders
```

---

## Components

### Button

```tsx
import { Button } from '@/components/common/Button';

// Variants: primary | secondary | ghost | danger | success | outline
// Sizes:    xs | sm | md | lg | xl

<Button label="Submit" onPress={handleSubmit} />
<Button label="Cancel" variant="ghost" size="sm" />
<Button label="Delete" variant="danger" loading={isDeleting} />
<Button label="Go" rightIcon={<Icon icon={ArrowRight} size={16} />} />
<Button label="Upload" leftIcon={<Icon icon={Upload} size={16} />} />
<Button label="Both" leftIcon={<Icon icon={Star} size={16} />} rightIcon={<Icon icon={Arrow} size={16} />} />
<Button label="Submit" fullWidth size="lg" disabled={!isValid} />
```

### Input

```tsx
import { Input } from '@/components/common/Input';

// Sizes: sm | md | lg | xl (xl = multiline textarea)

<Input label="Email" placeholder="Enter email" keyboardType="email-address" />
<Input label="Bio" size="xl" showCharCount maxLength={200} />
<Input label="Phone" leftAddon={<AppText>+91</AppText>} />
<Input label="Website" rightAddon={<AppText>.com</AppText>} />
<Input label="Search" leftIcon={<Icon icon={SearchIcon} size={16} />} />
<Input label="Password" rightIcon={<Icon icon={EyeIcon} size={16} />} secureTextEntry />
<Input error="This field is required" />
<Input hint="We'll never share your email" />
<Input success="Looks good!" />
<Input value={value} onClear={() => setValue('')} />
```

### AppText

```tsx
import { AppText } from '@/components/common/Text';

// Variants: h1 | h2 | h3 | h4 | h5 | body | bodyLg | bodySm
//           caption | label | link | error | success
// Align:    left | center | right
// Weight:   light | regular | medium | bold

<AppText variant="h1">Heading 1</AppText>
<AppText variant="body" align="center">Centered paragraph</AppText>
<AppText variant="caption" weight="medium">Small medium text</AppText>
<AppText variant="error">Something went wrong</AppText>
<AppText variant="link" onPress={handlePress}>Click here</AppText>
```

### Screen

```tsx
import { Screen } from '@/components/layout/Screen';

<Screen>...</Screen>
<Screen scrollable>...</Screen>
<Screen scrollable refreshing={loading} onRefresh={refetch}>...</Screen>
<Screen keyboardAvoiding={false}>...</Screen>
<Screen safeEdges={['top']}>...</Screen>
<Screen statusBarStyle="light-content">...</Screen>
```

### Icon

```tsx
import { Icon } from '@/components/common/Icon';
import MyIcon from '@/assets/svgs/my-icon.svg';

<Icon icon={MyIcon} size={24} />
<Icon icon={MyIcon} size={20} color="primary" />       // resolves from theme tokens
<Icon icon={MyIcon} size={16} color="textSecondary" /> // any theme color key
<Icon icon={MyIcon} size={24} color="#FF0000" />       // or raw hex
```

### Toast

```tsx
import Toast from 'react-native-toast-message';

Toast.show({ type: 'success', text1: 'Saved!', text2: 'Your changes were saved.' });
Toast.show({ type: 'error',   text1: 'Failed', text2: 'Something went wrong.' });
Toast.show({ type: 'info',    text1: 'Heads up', text2: 'New update available.' });
```

---

## Navigation

The app uses a 3-level navigation gate in `RootNavigator`:

```
Not onboarded  →  OnboardingScreen
Onboarded, not logged in  →  AuthNavigator (Login / Register)
Logged in  →  AppNavigator (Home / Profile / ...)
```

**Adding a new screen:**

```bash
npm run generate   # choose: screen
```

Or manually:

1. Create `src/screens/featureName/MyScreen.tsx`
2. Add route to `src/constants/routes.ts`
3. Add param type to `src/navigation/types.ts`
4. Add `<Stack.Screen>` to the appropriate navigator

**Typed navigation:**

```ts
// In your screen component
import type { AppScreenProps } from '@/navigation/types';

export function ProfileScreen({ navigation, route }: AppScreenProps<'Profile'>) {
  const { userId } = route.params;
  navigation.navigate('Home');
}
```

---

## State Management

```
Server data    →  RTK Query
UI/app state   →  Redux slice
Persisted data →  MMKV StorageService
```

**RTK Query — server state:**
```ts
const { data, isLoading, error } = useGetUserQuery(userId);
const [updateUser, { isLoading: isSaving }] = useUpdateUserMutation();
```

**Redux — client/UI state:**
```ts
const dispatch = useAppDispatch();
const themeMode = useAppSelector((s) => s.app.themeMode);
dispatch(setThemeMode('dark'));
```

**MMKV — persistent storage:**
```ts
import { StorageService } from '@/services/storage/mmkv';

StorageService.setString('key', 'value');
StorageService.getString('key');
StorageService.setObject<UserPrefs>('prefs', { notifications: true });
StorageService.getObject<UserPrefs>('prefs');
StorageService.delete('key');
```

**Adding a new Redux slice:**
```bash
npm run generate   # choose: slice
```

---

## Adding a New API Endpoint

```ts
// src/services/api/endpoints.ts
export const userApi = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    getUser: build.query<User, string>({
      query: (id) => `/users/${id}`,
      providesTags: ['User'],
    }),
    updateUser: build.mutation<User, Partial<User>>({
      query: (body) => ({ url: '/users/me', method: 'PUT', body }),
      invalidatesTags: ['User'],
    }),
  }),
});

export const { useGetUserQuery, useUpdateUserMutation } = userApi;
```

---

## Forms

```tsx
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema, type LoginForm } from '@/utils/validators';

const {
  control,
  handleSubmit,
  formState: { errors, isSubmitting },
} = useForm<LoginForm>({
  resolver: zodResolver(loginSchema),
  defaultValues: { email: '', password: '' },
});

// In JSX
<Controller
  control={control}
  name="email"
  render={({ field: { onChange, value, onBlur } }) => (
    <Input
      value={value}
      onChangeText={onChange}
      onBlur={onBlur}
      error={errors.email?.message}
    />
  )}
/>
```

---

## Theme System

```ts
import { useTheme } from '@/theme';

const { theme, setMode } = useTheme();

// Access tokens
theme.colors.primary
theme.colors.background
theme.colors.textPrimary
theme.colors.error
theme.isDark

// Change mode programmatically
setMode('dark');    // force dark
setMode('light');   // force light
setMode('system');  // follow device setting
```

**Never hardcode colors:**
```tsx
// ✅ correct
style={{ backgroundColor: theme.colors.surface }}
className="bg-primary-500 dark:bg-gray-800"

// ❌ wrong
style={{ backgroundColor: '#3B82F6' }}
```

---

## Multi-Language (i18n)

**Using translations:**
```tsx
import { useTranslation } from 'react-i18next';

const { t } = useTranslation();

<AppText>{t('auth.login')}</AppText>
<AppText>{t('home.welcome', { name: user.name })}</AppText>
```

**Adding a new language:**

1. Create `src/i18n/resources/de/translation.json`
2. Register in `src/i18n/index.ts`:

```ts
import de from './resources/de/translation.json';

export const resources = {
  en: { translation: en },
  hi: { translation: hi },
  de: { translation: de },  // add here
} as const;
```

**Switching language at runtime:**
```ts
import i18n from '@/i18n';
i18n.changeLanguage('hi');
```

**Never hardcode strings in components.** Always use `t()`.

---

## Environment Variables

Copy `.env.example` to `.env` and fill in your values:

```bash
cp .env.example .env
```

```
API_BASE_URL=https://api.yourapp.com
APP_ENV=development
SENTRY_DSN=your-dsn-here
```

Access in code:
```ts
import Config from 'react-native-config';

Config.API_BASE_URL  // string, typed
Config.APP_ENV       // 'development' | 'staging' | 'production'
```

Add new variables to both `.env` and `src/types/env.d.ts`.

---

## SVG Usage

Place `.svg` files in `src/assets/svgs/` and import as React components:

```tsx
import MyIcon from '@/assets/svgs/my-icon.svg';

// Raw usage
<MyIcon width={24} height={24} color="#000" />

// Via Icon wrapper (recommended — resolves theme colors)
<Icon icon={MyIcon} size={24} color="primary" />
```

---

## Custom Fonts

Font files live in `src/assets/fonts/`. Inter is configured by default.

**To swap fonts:**
1. Drop your `.ttf` files in `src/assets/fonts/`
2. Update font names in `src/theme/typography.ts`
3. Update the `require()` paths in `src/app/index.tsx`

**Download Inter:** [rsms.me/inter](https://rsms.me/inter)

The app will not render until fonts are loaded — splash screen stays visible until fonts are ready, then hides automatically.

## Testing

Tests are **colocated** with source files:

```
Button.tsx
Button.test.tsx   ← sits right next to it
```

```bash
npm test                    # run all
npm run test:watch          # watch mode
npm run test:coverage       # coverage report
```

**Mocking API calls with MSW:**
```ts
// src/services/api/__mocks__/handlers.ts
import { http, HttpResponse } from 'msw';

export const handlers = [
  http.get('*/users/me', () =>
    HttpResponse.json({ id: '1', name: 'Test User' })
  ),
  http.post('*/auth/login', () =>
    HttpResponse.json({ token: 'mock-token', user: { id: '1' } })
  ),
];
```

**What's tested out of the box:**
- `Button` — renders, onPress, disabled state, loading state, icons
- `Input` — renders, validation errors, char count, clear button, disabled
- `LoginScreen` — renders, form validation, submission
- `authSlice` — all reducers, token persistence
- `helpers` — all utility functions

---

## Git Hooks

| Hook | Trigger | Action |
|---|---|---|
| `pre-commit` | `git commit` | Runs ESLint + Prettier on staged files |
| `pre-push` | `git push` | Runs Jest with `--bail` — blocks push if any test fails |

---

## Code Generation

```bash
npm run generate
```

| Generator | What it creates |
|---|---|
| `screen` | `ScreenName.tsx` + `ScreenName.test.tsx` in chosen feature folder |
| `component` | `ComponentName.tsx` + `ComponentName.test.tsx` + `index.ts` |
| `slice` | `nameSlice.ts` + `nameSlice.test.ts` with standard shape |

---

## Absolute Imports

Always use `@/` — never relative paths:

```ts
// ✅
import { Button } from '@/components/common/Button';
import { useTheme } from '@/theme';
import { StorageService } from '@/services/storage/mmkv';

// ❌
import { Button } from '../../../components/common/Button';
```

---

## Key Conventions

| Rule | Detail |
|---|---|
| No hardcoded colors | Always use `theme.colors.*` or NativeWind classes |
| No hardcoded strings | Always use `t('key')` from i18next |
| No raw RN `Text` | Always use `<AppText>` |
| No raw fetch/axios in components | Always use RTK Query endpoints |
| No `process.env` | Always use `react-native-config` Config object |
| Forms | Always React Hook Form + Zod, never uncontrolled inputs |
| No raw RN fonts | Always load via `expo-font`, define in `theme/typography.ts` |

---

## AI-Assisted Development

This boilerplate ships with `CLAUDE.md` — a structured reference file describing the entire architecture, conventions, folder map, and patterns.

**How to use:**
1. Open [claude.ai](https://claude.ai) on desktop
2. Create a new **Project**
3. Paste the contents of `CLAUDE.md` into the Project knowledge
4. Every conversation inside that project has full context of your codebase

Ask things like:
- *"Add a cart feature with RTK Query"*
- *"Why is my theme hook not working on this screen"*
- *"Generate a notifications slice following the same pattern as authSlice"*

No re-explaining your stack on every question.

---

## Requirements

| Tool | Version |
|---|---|
| Node.js | >= 18 |
| npm | >= 9 |
| Xcode | Latest (for iOS) |
| Android Studio | Latest (for Android) |

---

## License

MIT © Jitanshu