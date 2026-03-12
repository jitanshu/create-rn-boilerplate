import React from 'react';
import { View } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useTranslation } from 'react-i18next';
import Toast from 'react-native-toast-message';
import { Screen } from '@/components/layout/Screen';
import { AppText } from '@/components/common/Text';
import { Input } from '@/components/common/Input';
import { Button } from '@/components/common/Button';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { setCredentials } from '@/store/slices/authSlice';
import type { AuthScreenProps } from '@/navigation/types';

const schema = z.object({
  email:    z.string().email('validation.emailInvalid'),
  password: z.string().min(8, 'validation.passwordMin'),
});

type FormData = z.infer<typeof schema>;

export function LoginScreen({ navigation }: AuthScreenProps<'Login'>) {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const { control, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { email: '', password: '' },
  });

  const onSubmit = async (data: FormData) => {
    try {
      // Replace with real API call via RTK Query
      await new Promise(r => setTimeout(r, 1000));
      dispatch(setCredentials({
        user:  { id: '1', name: 'User', email: data.email },
        token: 'mock-token',
      }));
      Toast.show({ type: 'success', text1: t('auth.loginSuccess') });
    } catch {
      Toast.show({ type: 'error', text1: t('common.error') });
    }
  };

  return (
    <Screen scrollable keyboardAvoiding testID="login-screen">
      <View className="flex-1 px-6 justify-center">
        <AppText variant="h2" className="mb-2">{t('auth.login')}</AppText>
        <AppText variant="caption" className="mb-8">
          Welcome back! Sign in to continue.
        </AppText>

        <Controller
          control={control}
          name="email"
          render={({ field: { onChange, value, onBlur } }) => (
            <Input
              testID="email-input"
              label={t('auth.email')}
              placeholder={t('auth.emailPlaceholder')}
              keyboardType="email-address"
              autoCapitalize="none"
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              error={errors.email ? t(errors.email.message as any) : undefined}
              containerStyle={{ marginBottom: 16 }}
            />
          )}
        />

        <Controller
          control={control}
          name="password"
          render={({ field: { onChange, value, onBlur } }) => (
            <Input
              testID="password-input"
              label={t('auth.password')}
              placeholder={t('auth.passwordPlaceholder')}
              secureTextEntry
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              error={errors.password ? t(errors.password.message as any) : undefined}
              containerStyle={{ marginBottom: 24 }}
            />
          )}
        />

        <Button
          testID="login-button"
          label={t('auth.login')}
          onPress={handleSubmit(onSubmit)}
          loading={isSubmitting}
          fullWidth
          size="lg"
        />

        <Button
          label={t('auth.register')}
          variant="ghost"
          onPress={() => navigation.navigate('Register')}
          fullWidth
          size="md"
          style={{ marginTop: 12 }}
        />
      </View>
    </Screen>
  );
}
