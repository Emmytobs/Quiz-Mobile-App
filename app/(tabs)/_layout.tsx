import { Tabs } from "expo-router";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import React from "react";
import { Pressable, View } from "react-native";
import GroupsIcon from "~/components/icons/Groups";
import HomeIcon from "~/components/icons/Home";
import LibraryIcon from "~/components/icons/Library";
import SettingsIcon from "~/components/icons/Settings";
import { useColorScheme } from "~/lib/useColorScheme";

export default function TabsLayout() {
  const { isDarkColorScheme } = useColorScheme();

  return (
    <View className="flex-1 relative">
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
              <HomeIcon focused={focused} />
            ),
          }}
        />
        <Tabs.Screen
          name="library"
          options={{
            title: "Library",
            tabBarIcon: ({ color, focused, size }) => (
              <LibraryIcon focused={focused} />
            ),
          }}
        />
        <Tabs.Screen
          name="upload"
          options={{
            title: "",
            tabBarIcon: ({ color, focused, size }) => (
              <View className="pb-14">
                <ActionButton />
              </View>
            ),
          }}
        />
        <Tabs.Screen
          name="groups"
          options={{
            title: "Groups",
            tabBarIcon: ({ color, focused, size }) => (
              <GroupsIcon focused={focused} />
            ),
          }}
        />
        <Tabs.Screen
          name="settings"
          options={{
            title: "Settings",
            tabBarIcon: ({ color, focused, size }) => (
              <SettingsIcon focused={focused} />
            ),
          }}
        />
      </Tabs>
    </View>
  );
}

function ActionButton() {
  const { isDarkColorScheme } = useColorScheme();

  return (
    <Pressable
      className={`rounded-full items-center justify-center h-[65px] w-[65px] bg-[#FCA110] border-[6px] ${isDarkColorScheme ? "border-[#0D0D0D]" : "border-white"}`}
      onPress={() => {}}
    >
      <FontAwesome5
        name="plus"
        size={24}
        color={isDarkColorScheme ? "#242424" : "#fff"}
      />
    </Pressable>
  );
}
