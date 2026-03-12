import authReducer, {
  setCredentials, setUser, setLoading, logout,
} from './authSlice';

const mockUser = { id: '1', name: 'Jitanshu', email: 'j@test.com' };
const mockToken = 'mock-token-123';

describe('authSlice', () => {
  const initialState = {
    user: null, token: null, isAuthenticated: false, isLoading: false,
  };

  it('returns initial state', () => {
    expect(authReducer(undefined, { type: '@@INIT' })).toMatchObject({
      user: null, isAuthenticated: false, isLoading: false,
    });
  });

  it('setCredentials sets user, token and isAuthenticated', () => {
    const state = authReducer(initialState as any, setCredentials({ user: mockUser, token: mockToken }));
    expect(state.user).toEqual(mockUser);
    expect(state.token).toBe(mockToken);
    expect(state.isAuthenticated).toBe(true);
  });

  it('setUser updates user without touching token', () => {
    const base = { ...initialState, token: mockToken, isAuthenticated: true, user: mockUser };
    const updated = { ...mockUser, name: 'Updated' };
    const state = authReducer(base as any, setUser(updated));
    expect(state.user?.name).toBe('Updated');
    expect(state.token).toBe(mockToken);
  });

  it('setLoading toggles loading state', () => {
    const state = authReducer(initialState as any, setLoading(true));
    expect(state.isLoading).toBe(true);
  });

  it('logout clears all auth state', () => {
    const loggedIn = {
      user: mockUser, token: mockToken, isAuthenticated: true, isLoading: false,
    };
    const state = authReducer(loggedIn as any, logout());
    expect(state.user).toBeNull();
    expect(state.token).toBeNull();
    expect(state.isAuthenticated).toBe(false);
  });
});
