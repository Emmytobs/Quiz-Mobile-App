// import { useColorScheme as useNativewindColorScheme } from 'nativewind';
import { Appearance, useColorScheme as _useColorScheme } from "react-native";

export function useColorScheme() {
  const _colorScheme = _useColorScheme();
  const colorScheme = !_colorScheme ? "dark" : _colorScheme; // If there's no system default, use the dark color
  const setColorScheme = (colorScheme: "light" | "dark") => {
    Appearance.setColorScheme(colorScheme);
  };

  return {
    colorScheme,
    isDarkColorScheme: colorScheme === "dark",
    setColorScheme,
  };
}
