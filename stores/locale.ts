import { create } from "zustand";
import { createJSONStorage, persist, StateStorage } from "zustand/middleware";
import { getLocales } from 'expo-localization';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { defaultLocale, supportedLocales } from "~/lib/constants";

type Locales = typeof supportedLocales[number]
interface LocaleStore {
  locale: Locales | null;
  setLocale: (locale: Locales) => void
}

async function getCurrentLocale(): Promise<Locales> {
  const localeInStorage = await AsyncStorage.getItem("locale") as Locales
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

const asyncStorage: StateStorage = {
  async setItem(name, value) {
    await AsyncStorage.setItem(name, value)    
  },
  async getItem(name) {
    return (await AsyncStorage.getItem(name)) || null;
  },
  // not implemented until we need to remove the locale from async storage
  removeItem(name) {
  },
}

const useLocale = create( 
  persist<LocaleStore>(
    (set) => ({
      locale: null,
      setLocale: (locale: Locales) => {
        set({ locale });
      }
    }),
    {
      name: 'locale',
      storage: createJSONStorage(() => asyncStorage)
    }
  )
)

export {
  getCurrentLocale,
  useLocale
}