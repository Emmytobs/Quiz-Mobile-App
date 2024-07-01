import { cssInterop } from "nativewind";
import { SafeAreaView, SafeAreaViewProps } from "react-native-safe-area-context";

// This allows you to use tailwind css classes on the third-party SafeAreaView component
cssInterop(SafeAreaView, {
  className: {
    target: "style",
  },
});

function _SafeAreaView({className, ...props}: SafeAreaViewProps) {
  return <SafeAreaView className={`flex-1 justify-center items-center w-[90%] mx-auto ${className}`} {...props}></SafeAreaView>
}

export { _SafeAreaView as SafeAreaView }