import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ThemeMode } from '@/theme';

interface AppState {
  themeMode:   ThemeMode;
  language:    string;
  isOnboarded: boolean;
  isLoading:   boolean;
}

const initialState: AppState = {
  themeMode:   'system',
  language:    '{{DEFAULT_LANG}}',
  isOnboarded: false,
  isLoading:   false,
};

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setThemeMode(state, action: PayloadAction<ThemeMode>) {
      state.themeMode = action.payload;
    },
    setLanguage(state, action: PayloadAction<string>) {
      state.language = action.payload;
    },
    setOnboarded(state, action: PayloadAction<boolean>) {
      state.isOnboarded = action.payload;
    },
    setAppLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
    },
  },
});

export const { setThemeMode, setLanguage, setOnboarded, setAppLoading } = appSlice.actions;
export default appSlice.reducer;
