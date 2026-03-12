# create-rn-boilerplate

> Production-ready React Native boilerplate · Expo Bare · 2026 Stack

## Usage

```bash
npx create-rn-boilerplate
```

The CLI will prompt you for:
- **App name** — used as display name and folder name
- **Bundle ID** — e.g. `com.yourcompany.appname`
- **Default language** — en, hi, ar, fr, es
- **Package manager** — npm, yarn, or bun

All library versions are fetched **live from npm** at install time. No stale deps.

---

## What's Included

| Category | Library |
|---|---|
| Framework | Expo Bare Workflow |
| Language | TypeScript (strict) |
| Styling | NativeWind v4 + Tailwind + CVA |
| Navigation | React Navigation v7 |
| State | Redux Toolkit + RTK Query |
| Storage | MMKV |
| Forms | React Hook Form + Zod |
| i18n | i18next (EN + HI out of the box) |
| Toast | react-native-toast-message |
| Splash | react-native-splash-screen |
| SVG | react-native-svg + transformer |
| Testing | Jest + RNTL + MSW |
| Code gen | Plop.js |
| Git hooks | Husky (pre-commit lint, pre-push test) |

---

## After Install

```bash
cd your-app-name

# iOS
npx expo run:ios

# Android
npx expo run:android

# Generate a new screen / component / slice
npm run generate

# Run tests
npm test

# Coverage
npm run test:coverage
```

---

## Project Intelligence

This boilerplate includes a `CLAUDE.md` file in the root.
Add it to a **Claude Project** to give Claude full context of your architecture
on every question — no re-explaining needed.

---

## License

MIT
