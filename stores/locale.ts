import { create } from "zustand";
import { createJSONStorage, persist, StateStorage } from "zustand/middleware";
import { getLocales } from 'expo-localization';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { defaultLocale, supportedLocales } from "~/lib/constants";

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

const asyncStorage: StateStorage = {
  async setItem(name, value) {
    const formattedValue = JSON.parse(value)['state'][name] // TODO: Figure out why Zustand calls setItem with the object `{state: { [name]: [value] }}`
    if (formattedValue === null) return; // TODO: setItem gets called upon initial render. Figure out why
    await AsyncStorage.setItem(name, formattedValue)
  },
  async getItem(name) {
    const item = (await AsyncStorage.getItem(name)) 
    return item
  },
  // not implemented until we need to remove the locale from async storage
  removeItem(name) {
  },
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
      storage: createJSONStorage(() => asyncStorage)
    }
  )
)

export {
  getCurrentLocale,
  useLocale
}