import { Pressable } from "react-native";
import React from "react";
import { ArrowLeft2 } from "iconsax-react-native";
import { useRouter } from "expo-router";
import { useColorScheme } from "~/lib/useColorScheme";

export default function BackButton() {
  const router = useRouter();
  const { isDarkColorScheme } = useColorScheme();

  return (
    <Pressable
      onPress={() => router.canGoBack() && router.back()}
      aria-label="back-button"
      className={`${isDarkColorScheme ? "bg-[#252525]" : "bg-white"} rounded-xl shadow-sm shadow-black/40 p-2`}
    >
      <ArrowLeft2 size="24" color={isDarkColorScheme ? "#ffffff" : "#101010"} />
    </Pressable>
  );
}
