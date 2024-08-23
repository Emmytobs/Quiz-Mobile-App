import { Pressable } from "react-native";
import React from "react";
import { ArrowLeft2 } from "iconsax-react-native";
import { useRouter } from "expo-router";

export default function BackButton() {
  const router = useRouter();

  return (
    <Pressable
      onPress={() => router.canGoBack() && router.back()}
      aria-label="back-button"
      className="bg-white rounded-xl shadow-sm shadow-black/40 p-2"
    >
      <ArrowLeft2 size="24" color="#101010" />
    </Pressable>
  );
}
