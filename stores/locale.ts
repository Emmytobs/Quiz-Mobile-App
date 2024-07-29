import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { getLocales } from 'expo-localization';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { defaultLocale, supportedLocales } from "~/lib/constants";
import { StateStorage } from "~/lib/stateStorage";

type Locale = typeof supportedLocales[number]
interface LocaleStore {
  locale: Locale | null;
  setLocale: (locale: Locale) => void
}

async function getCurrentLocale(): Promise<Locale> {
  const localeInStorage = await AsyncStorage.getItem("locale") as Locale
  if (localeInStorage) {
    return localeInStorage
  }
  const currentLocale = getLocales()[0].languageCode;
  const currentLocaleNotSupported = currentLocale && !supportedLocales.includes(currentLocale);
  if (
    !currentLocale || currentLocaleNotSupported
  ) {
    return defaultLocale;
  }
  return currentLocale;
}

const useLocale = create( 
  persist<LocaleStore>(
    (set) => ({
      locale: null,
      setLocale: (locale: Locale) => {
        set({ locale });
      }
    }),
    {
      name: 'locale',
      storage: createJSONStorage(() => StateStorage)
    }
  )
)

export {
  getCurrentLocale,
  useLocale
}