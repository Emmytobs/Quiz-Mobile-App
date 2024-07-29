import { registerRootComponent } from 'expo';
import { ExpoRoot } from 'expo-router';
import "./assets/translations/i18n"
import Toast from 'react-native-toast-message';
import toastConfig from "~/lib/toast"

// https://docs.expo.dev/router/reference/troubleshooting/#expo_router_app_root-not-defined

// Must be exported or Fast Refresh won't update the context
export function App() {
  const ctx = require.context('./app');
  return (
    <>
      <ExpoRoot context={ctx} />
      <Toast config={toastConfig} />
    </>
  )
}

registerRootComponent(App);
