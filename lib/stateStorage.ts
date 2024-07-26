import AsyncStorage from "@react-native-async-storage/async-storage";
import { StateStorage } from "zustand/middleware";

interface CustomStateStorage extends StateStorage {
  getItem: <T = string>(name: string) => T | null | Promise<T | null>;
}

const StateStorageImpl: CustomStateStorage = {
  async setItem(name, value) {
    let formattedValue = JSON.parse(value)['state'][name] // TODO: Figure out why Zustand calls setItem with the object `{state: { [name]: [value] }}`
    if (formattedValue === null) return; // TODO: setItem gets called upon initial render. Figure out why
    formattedValue = typeof formattedValue === "string" ? formattedValue : JSON.stringify(formattedValue);
    await AsyncStorage.setItem(name, formattedValue)
  },
  async getItem<T = string>(name: string): Promise<T | null> {
    const item = (await AsyncStorage.getItem(name)) 
    return item === null ? item : JSON.parse(item) as T
  },
  async removeItem(name) {
    await AsyncStorage.removeItem(name);
  },
};

export {
  StateStorageImpl as StateStorage
}