import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { Input } from './Input';

describe('Input', () => {
  it('renders without crashing', () => {
    const { getByTestId } = render(<Input testID="input" />);
    expect(getByTestId('input')).toBeTruthy();
  });

  it('renders label when provided', () => {
    const { getByText } = render(<Input label="Email" />);
    expect(getByText('Email')).toBeTruthy();
  });

  it('renders error message', () => {
    const { getByTestId } = render(
      <Input testID="input" error="Required field" />
    );
    expect(getByTestId('input-error')).toBeTruthy();
  });

  it('shows hint when no error', () => {
    const { getByText } = render(<Input hint="Enter your email" />);
    expect(getByText('Enter your email')).toBeTruthy();
  });

  it('is not editable when disabled', () => {
    const { getByTestId } = render(<Input testID="input" disabled />);
    expect(getByTestId('input').props.editable).toBe(false);
  });

  it('calls onChangeText when typing', () => {
    const onChangeText = jest.fn();
    const { getByTestId } = render(
      <Input testID="input" onChangeText={onChangeText} />
    );
    fireEvent.changeText(getByTestId('input'), 'hello');
    expect(onChangeText).toHaveBeenCalledWith('hello');
  });

  it('shows char count when showCharCount and maxLength provided', () => {
    const { getByText } = render(
      <Input value="Hi" maxLength={100} showCharCount />
    );
    expect(getByText('2/100')).toBeTruthy();
  });

  it('calls onClear when clear button pressed', () => {
    const onClear = jest.fn();
    const { getByTestId } = render(
      <Input testID="input" value="some text" onClear={onClear} />
    );
    fireEvent.press(getByTestId('input-clear'));
    expect(onClear).toHaveBeenCalledTimes(1);
  });
});
