import React from 'react';
import { View } from 'react-native';
import { Screen } from '@/components/layout/Screen';
import { AppText } from '@/components/common/Text';
import { Button } from '@/components/common/Button';
import type { AuthScreenProps } from '@/navigation/types';

export function RegisterScreen({ navigation }: AuthScreenProps<'Register'>) {
  return (
    <Screen testID="register-screen">
      <View className="flex-1 px-6 justify-center">
        <AppText variant="h2" className="mb-8">Create Account</AppText>
        <Button
          label="Already have an account? Login"
          variant="ghost"
          onPress={() => navigation.navigate('Login')}
          fullWidth
        />
      </View>
    </Screen>
  );
}
