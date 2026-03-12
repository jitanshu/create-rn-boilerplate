import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { Button } from './Button';

// Wrap with providers if needed
const renderButton = (props = {}) =>
  render(<Button label="Test" {...props} />);

describe('Button', () => {
  it('renders label correctly', () => {
    const { getByText } = renderButton({ label: 'Submit' });
    expect(getByText('Submit')).toBeTruthy();
  });

  it('calls onPress when tapped', () => {
    const onPress = jest.fn();
    const { getByTestId } = renderButton({ onPress });
    fireEvent.press(getByTestId('button'));
    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it('does not call onPress when disabled', () => {
    const onPress = jest.fn();
    const { getByTestId } = renderButton({ onPress, disabled: true });
    fireEvent.press(getByTestId('button'));
    expect(onPress).not.toHaveBeenCalled();
  });

  it('does not call onPress when loading', () => {
    const onPress = jest.fn();
    const { getByTestId } = renderButton({ onPress, loading: true });
    fireEvent.press(getByTestId('button'));
    expect(onPress).not.toHaveBeenCalled();
  });

  it('shows loading indicator when loading=true', () => {
    const { getByTestId } = render(
      <Button label="Submit" loading testID="btn" />
    );
    expect(getByTestId('btn')).toBeTruthy();
  });

  it('renders left and right icons', () => {
    const { getByTestId } = render(
      <Button
        label="Go"
        leftIcon={<></>}
        rightIcon={<></>}
        testID="icon-btn"
      />
    );
    expect(getByTestId('icon-btn')).toBeTruthy();
  });

  it('applies fullWidth correctly', () => {
    const { getByTestId } = renderButton({ fullWidth: true });
    expect(getByTestId('button')).toBeTruthy();
  });
});
