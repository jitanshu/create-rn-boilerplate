import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './resources/en/translation.json';
import hi from './resources/hi/translation.json';

export const resources = { en: { translation: en }, hi: { translation: hi } } as const;

export type Language = keyof typeof resources;

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng:           '{{DEFAULT_LANG}}',
    fallbackLng:   'en',
    interpolation: { escapeValue: false },
    compatibilityJSON: 'v4',
  });

export default i18n;
