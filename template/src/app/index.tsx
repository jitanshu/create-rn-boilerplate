import React, { useEffect } from 'react';
import { useFonts } from 'expo-font';
import SplashScreen from 'react-native-splash-screen';
import { Providers } from './providers';
import { RootNavigator } from '@/navigation/RootNavigator';

export default function App() {
  const [fontsLoaded] = useFonts({
    'Inter-Regular': require('@/assets/fonts/Inter-Regular.ttf'),
    'Inter-Medium':  require('@/assets/fonts/Inter-Medium.ttf'),
    'Inter-Bold':    require('@/assets/fonts/Inter-Bold.ttf'),
    'Inter-Light':   require('@/assets/fonts/Inter-Light.ttf'),
  });

  useEffect(() => {
    if (fontsLoaded) SplashScreen.hide();
  }, [fontsLoaded]);

  if (!fontsLoaded) return null;

  return (
    <Providers>
      <RootNavigator />
    </Providers>
  );
}
```

---

**2. `src/theme/typography.ts` — no change needed**, fonts are already mapped correctly to `Inter-Regular`, `Inter-Medium` etc. If someone wants to swap fonts they just change the string values here and drop new `.ttf` files in the fonts folder.

---

**3. `src/assets/fonts/` — add your font files here**

Download Inter from [rsms.me/inter](https://rsms.me/inter) and place these files:
```
src/assets/fonts/
├── Inter-Regular.ttf
├── Inter-Medium.ttf
├── Inter-Bold.ttf
└── Inter-Light.ttf