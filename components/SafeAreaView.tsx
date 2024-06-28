import { cssInterop } from "nativewind";
import { SafeAreaView } from "react-native-safe-area-context";

// This allows you to use tailwind css classes on the third-party SafeAreaView component
cssInterop(SafeAreaView, {
  className: {
    target: "style",
  },
});

export { SafeAreaView }