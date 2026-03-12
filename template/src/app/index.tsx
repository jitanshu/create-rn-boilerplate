import React, { useEffect } from 'react';
import SplashScreen from 'react-native-splash-screen';
import { Providers } from './providers';
import { RootNavigator } from '@/navigation/RootNavigator';

export default function App() {
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <Providers>
      <RootNavigator />
    </Providers>
  );
}
