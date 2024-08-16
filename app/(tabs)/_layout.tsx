import { Tabs } from "expo-router";
import {
  Group,
  Home,
  LibraryBig,
  Plus,
  SettingsIcon,
} from "lucide-react-native";
import React from "react";
import { Pressable, Settings, View } from "react-native";
import { useColorScheme } from "~/lib/useColorScheme";

const CustomTabBar = (props: any) => {
  return null;
};

export default function TabsLayout() {
  const { isDarkColorScheme } = useColorScheme();

  return (
    <>
      <ActionButton />
      <Tabs
        initialRouteName="home"
        screenOptions={{
          headerShown: false,
          tabBarStyle: {
            backgroundColor: isDarkColorScheme ? "#ffffff" : "#0f0f0f",
            height: 66,
            marginHorizontal: 16,
            marginBottom: 10,
            borderRadius: 12,
            paddingBottom: 6,
            paddingTop: 10,
            justifyContent: "center",
          },
          tabBarInactiveTintColor: isDarkColorScheme ? "#242424" : "#E8E8E8",
          tabBarActiveTintColor: isDarkColorScheme ? "#EF9303" : "#FCA110",
          tabBarIconStyle: {
            fontSize: 20,
          },
          tabBarLabelStyle: {
            fontFamily: "ManropeSemiBold",
            fontSize: 11,
            color: isDarkColorScheme ? "#242424" : "#E8E8E8",
          },
        }}
      >
        <Tabs.Screen
          name="home"
          options={{
            title: "Home",
            tabBarIcon: ({ color, focused, size }) => (
              <Home color={color} fill={color} size={size} />
            ),
          }}
        />
        <Tabs.Screen
          name="library"
          options={{
            title: "Library",
            tabBarIcon: ({ color, focused, size }) => (
              <LibraryBig
                color={color}
                // fill={focused ? color : undefined}
                size={size}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="groups"
          options={{
            title: "Groups",
            tabBarIcon: ({ color, focused, size }) => (
              <Group
                color={color}
                fill={focused ? color : undefined}
                size={size}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="settings"
          options={{
            title: "Settings",
            tabBarIcon: ({ color, focused, size }) => (
              <SettingsIcon
                color={color}
                fill={focused === true ? color : undefined}
                size={size}
              />
            ),
          }}
        />
      </Tabs>
    </>
  );
}

function ActionButton() {
  return (
    <Pressable
      className="rounded-full items-center justify-center h-20 w-20 bg-[#FCA110] border-8 border-[#0D0D0D absolute bottom-14 left-44 z-50"
      onPress={() => {}}
    >
      <Plus color={"#0D0D0D"} fill={"#0D0D0D"} />
    </Pressable>
  );
}
