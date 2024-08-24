import React from "react";
import { Stack } from "expo-router";
import BackButton from "~/components/icons/BackButton";
import { useColorScheme } from "~/lib/useColorScheme";

export default function NotificationsLayout() {
  const { isDarkColorScheme } = useColorScheme();

  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          headerShown: true,
          headerShadowVisible: false,
          headerTitle: "Notifications",
          headerTitleStyle: {
            fontFamily: "Satoshi",
            fontSize: 20,
            color: isDarkColorScheme ? "#fff" : "#0F0F0F",
            fontWeight: "500",
          },
          headerTitleAlign: "center",
          headerStyle: {
            backgroundColor: isDarkColorScheme ? "#0D0D0D" : "#F3F3F3",
          },
          headerLeft: () => <BackButton />,
        }}
      />
    </Stack>
  );
}
