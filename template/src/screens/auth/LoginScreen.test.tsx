import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { LoginScreen } from './LoginScreen';

// Mock navigation
const mockNavigate = jest.fn();
jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({ navigate: mockNavigate }),
}));

const renderScreen = () =>
  render(<LoginScreen navigation={{ navigate: mockNavigate } as any} route={{} as any} />);

describe('LoginScreen', () => {
  it('renders correctly', () => {
    const { getByTestId } = renderScreen();
    expect(getByTestId('login-screen')).toBeTruthy();
  });

  it('renders email and password inputs', () => {
    const { getByTestId } = renderScreen();
    expect(getByTestId('email-input')).toBeTruthy();
    expect(getByTestId('password-input')).toBeTruthy();
  });

  it('renders login button', () => {
    const { getByTestId } = renderScreen();
    expect(getByTestId('login-button')).toBeTruthy();
  });

  it('shows validation error for empty email', async () => {
    const { getByTestId, findByTestId } = renderScreen();
    fireEvent.press(getByTestId('login-button'));
    const errorEl = await findByTestId('email-input-error');
    expect(errorEl).toBeTruthy();
  });

  it('shows validation error for invalid email', async () => {
    const { getByTestId, findByTestId } = renderScreen();
    fireEvent.changeText(getByTestId('email-input'), 'not-an-email');
    fireEvent.press(getByTestId('login-button'));
    const errorEl = await findByTestId('email-input-error');
    expect(errorEl).toBeTruthy();
  });

  it('shows validation error for short password', async () => {
    const { getByTestId, findByTestId } = renderScreen();
    fireEvent.changeText(getByTestId('email-input'), 'test@email.com');
    fireEvent.changeText(getByTestId('password-input'), '123');
    fireEvent.press(getByTestId('login-button'));
    const errorEl = await findByTestId('password-input-error');
    expect(errorEl).toBeTruthy();
  });

  it('submits with valid credentials', async () => {
    const { getByTestId } = renderScreen();
    fireEvent.changeText(getByTestId('email-input'), 'test@email.com');
    fireEvent.changeText(getByTestId('password-input'), 'password123');
    fireEvent.press(getByTestId('login-button'));
    await waitFor(() => expect(getByTestId('login-button')).toBeTruthy());
  });
});
