import '~/global.css';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { Theme, ThemeProvider } from '@react-navigation/native';
import { SplashScreen, Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import * as React from 'react';
import { NAV_THEME } from '~/lib/constants';
import { useColorScheme } from '~/lib/useColorScheme';
import { PortalHost } from '@rn-primitives/portal';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useFonts } from 'expo-font';
import { getCurrentLocale, useLocale } from '~/stores/locale';

const LIGHT_THEME: Theme = {
  dark: false,
  colors: NAV_THEME.light,
};
const DARK_THEME: Theme = {
  dark: true,
  colors: NAV_THEME.dark,
};

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

// Prevent the splash screen from auto-hiding before getting the color scheme.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [isColorSchemeLoaded, setIsColorSchemeLoaded] = React.useState(false);
  const { colorScheme, isDarkColorScheme, setColorScheme } = useColorScheme()
  const { locale, setLocale } = useLocale((state) => state)

  const [fontLoaded] = useFonts({
    Satoshi: require('../assets/fonts/Satoshi-Medium.otf'),
  });

  async function loadColorScheme() {
    try {
      const theme = await AsyncStorage.getItem('theme');
      // For web only:
      // if (Platform.OS === 'web') {
      //   // Adds the background color to the html element to prevent white background on overscroll.
      //   document.documentElement.classList.add('bg-background');
      // }
      if (!theme) {
        // TODO: Save the theme when there's a color mode switcher
        // await AsyncStorage.setItem('theme', colorScheme);
        return;
      }
      if (theme !== colorScheme) {
        setColorScheme(theme as 'dark' | 'light');
        return;
      }
    }
    finally {
      setIsColorSchemeLoaded(true);
    }
  }
  loadColorScheme();

  (async () => {
    const currentLocale = await getCurrentLocale();
    setLocale(currentLocale)
  })()

  React.useEffect(() => {
    if (fontLoaded && isColorSchemeLoaded && locale) {
      SplashScreen.hideAsync();
    }
  }, [locale, fontLoaded, isColorSchemeLoaded]);

  if (!fontLoaded && !locale) {
    return null;
  }

  return (
    <ThemeProvider value={isDarkColorScheme ? DARK_THEME : LIGHT_THEME}>
      <SafeAreaProvider>
        <StatusBar style={isDarkColorScheme ? 'light' : 'dark'} />
        <Stack>
          <Stack.Screen
            name="(onboarding)"
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="index"
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="(tabs)"
            options={{ headerShown: false }}
          />
        </Stack>
        <PortalHost />
      </SafeAreaProvider>
    </ThemeProvider>
  );
}
