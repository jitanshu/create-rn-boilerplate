import React from 'react';
import { View } from 'react-native';
import { Screen } from '@/components/layout/Screen';
import { AppText } from '@/components/common/Text';
import { Button } from '@/components/common/Button';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { setOnboarded } from '@/store/slices/appSlice';

export function OnboardingScreen() {
  const dispatch = useAppDispatch();

  return (
    <Screen testID="onboarding-screen">
      <View className="flex-1 px-6 justify-center items-center">
        <AppText variant="h1" align="center" className="mb-4">{{APP_NAME}}</AppText>
        <AppText variant="body" align="center" className="mb-12 text-gray-500">
          Built with the 2026 React Native stack.
        </AppText>
        <Button
          label="Get Started"
          onPress={() => dispatch(setOnboarded(true))}
          fullWidth
          size="lg"
        />
      </View>
    </Screen>
  );
}
