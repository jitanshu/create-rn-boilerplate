import React from 'react';
import { View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Screen } from '@/components/layout/Screen';
import { AppText } from '@/components/common/Text';
import { Button } from '@/components/common/Button';
import { useAppDispatch, useAppSelector } from '@/hooks/useAppDispatch';
import { logout } from '@/store/slices/authSlice';

export function HomeScreen() {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const user = useAppSelector((s) => s.auth.user);

  return (
    <Screen testID="home-screen">
      <View className="flex-1 px-6 justify-center items-center">
        <AppText variant="h2" align="center" className="mb-2">
          {t('home.welcome', { name: user?.name ?? 'User' })}
        </AppText>
        <AppText variant="caption" align="center" className="mb-12">
          Your boilerplate is ready. Start building.
        </AppText>
        <Button
          label={t('auth.logout')}
          variant="outline"
          onPress={() => dispatch(logout())}
          size="md"
        />
      </View>
    </Screen>
  );
}
