import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { storage } from '@/services/storage/mmkv';

export interface User {
  id:       string;
  name:     string;
  email:    string;
  avatar?:  string;
}

interface AuthState {
  user:          User | null;
  token:         string | null;
  isAuthenticated: boolean;
  isLoading:     boolean;
}

const TOKEN_KEY = 'auth_token';

const initialState: AuthState = {
  user:            null,
  token:           storage.getString(TOKEN_KEY) ?? null,
  isAuthenticated: !!storage.getString(TOKEN_KEY),
  isLoading:       false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials(state, action: PayloadAction<{ user: User; token: string }>) {
      state.user            = action.payload.user;
      state.token           = action.payload.token;
      state.isAuthenticated = true;
      storage.set(TOKEN_KEY, action.payload.token);
    },
    setUser(state, action: PayloadAction<User>) {
      state.user = action.payload;
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
    },
    logout(state) {
      state.user            = null;
      state.token           = null;
      state.isAuthenticated = false;
      storage.delete(TOKEN_KEY);
    },
  },
});

export const { setCredentials, setUser, setLoading, logout } = authSlice.actions;
export default authSlice.reducer;
