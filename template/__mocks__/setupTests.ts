import '@testing-library/jest-native/extend-expect';
import { server } from '@/services/api/__mocks__/handlers';

// ── MSW server lifecycle ───────────────────────────────────────────────────────
beforeAll(() => server.listen({ onUnhandledRequest: 'warn' }));
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

// ── Common RN mocks ────────────────────────────────────────────────────────────
jest.mock('react-native-splash-screen', () => ({ hide: jest.fn(), show: jest.fn() }));
jest.mock('react-native-mmkv', () => ({
  MMKV: jest.fn().mockImplementation(() => ({
    getString:  jest.fn(),
    set:        jest.fn(),
    getBoolean: jest.fn(),
    getNumber:  jest.fn(),
    delete:     jest.fn(),
    clearAll:   jest.fn(),
  })),
}));
jest.mock('react-native-config', () => ({ API_BASE_URL: 'http://localhost:3000' }));
jest.mock('react-native-toast-message', () => ({
  default: { show: jest.fn(), hide: jest.fn() },
}));
jest.mock('react-native-vector-icons/MaterialIcons', () => 'Icon');
jest.mock('react-i18next', () => ({
  useTranslation: () => ({ t: (key: string) => key, i18n: { changeLanguage: jest.fn() } }),
  initReactI18next: { type: '3rdParty', init: jest.fn() },
}));
