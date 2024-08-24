import "~/global.css";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { Theme, ThemeProvider } from "@react-navigation/native";
import { Slot, SplashScreen, Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import * as React from "react";
import { NAV_THEME } from "~/lib/constants";
import { useColorScheme } from "~/lib/useColorScheme";
import { PortalHost } from "@rn-primitives/portal";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useFonts } from "expo-font";
import { getCurrentLocale, useLocale } from "~/stores/locale";
import i18n from "~/assets/translations/i18n";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { StateStorage } from "~/lib/stateStorage";
import { Session, useSession } from "~/stores/session";

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
} from "expo-router";

// Prevent the splash screen from auto-hiding before getting the color scheme.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [isColorSchemeLoaded, setIsColorSchemeLoaded] = React.useState(false);
  const { colorScheme, isDarkColorScheme, setColorScheme } = useColorScheme();
  const { locale, setLocale } = useLocale((state) => state);
  const setSession = useSession(({ setSession }) => setSession);

  const [fontLoaded] = useFonts({
    Satoshi: require("../assets/fonts/Satoshi-Medium.otf"),
    InterMedium: require("../assets/fonts/Inter-Medium.ttf"),
    ManropeSemiBold: require("../assets/fonts/Manrope-SemiBold.ttf"),
  });

  async function loadColorScheme() {
    try {
      const theme = await AsyncStorage.getItem("theme");
      if (!theme) {
        // TODO: Save the theme when there's a color mode switcher
        // await AsyncStorage.setItem('theme', colorScheme);
        return;
      }
      if (theme !== colorScheme) {
        setColorScheme(theme as "dark" | "light");
        return;
      }
    } finally {
      setIsColorSchemeLoaded(true);
    }
  }

  async function loadLocale() {
    const currentLocale = await getCurrentLocale();
    if (currentLocale !== i18n.language) {
      i18n.changeLanguage(currentLocale);
    }
    setLocale(currentLocale);
  }

  async function loadSession() {
    const session = await StateStorage.getItem<Session>("session");
    if (session) {
      setSession(session);
    }
  }

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  React.useEffect(() => {
    loadColorScheme();
    loadLocale();
    loadSession();
  }, []);

  React.useEffect(() => {
    if (fontLoaded && isColorSchemeLoaded && locale) {
      SplashScreen.hideAsync();
    }
  }, [locale, fontLoaded, isColorSchemeLoaded]);

  const queryClient = new QueryClient();

  if (!fontLoaded && !locale) {
    return null;
  }

  return (
    <ThemeProvider value={isDarkColorScheme ? DARK_THEME : LIGHT_THEME}>
      <SafeAreaProvider>
        <QueryClientProvider client={queryClient}>
          <StatusBar style={isDarkColorScheme ? "light" : "dark"} />
          <Slot />
          <PortalHost />
        </QueryClientProvider>
      </SafeAreaProvider>
    </ThemeProvider>
  );
}
