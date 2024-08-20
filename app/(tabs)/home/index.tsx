import React from "react";
import { FlatList, Image, Pressable, ScrollView, View } from "react-native";
import { Text } from "~/components/ui/text";
import * as AvatarPrimitive from "@rn-primitives/avatar";
import { Bell, Filter, SearchIcon } from "lucide-react-native";
import { useSession } from "~/stores/session";
import { useColorScheme } from "~/lib/useColorScheme";
import { Input } from "~/components/ui/input";
import { useTranslation } from "react-i18next";
import * as Progress from "react-native-progress";
import CameraIcon from "~/components/icons/Camera";

export default function HomeScreen() {
  return (
    <ScrollView className="p-4 pt-10" showsVerticalScrollIndicator={false}>
      <Header />
      <Search />
      <Activities />
      <QuickActions />
    </ScrollView>
  );
}

const AVATAR_URI = "https://github.com/mrzachnugent.png";

function Title({ title }: { title: string }) {
  return (
    <Text className="font-interMedium text-md font-medium tracking-wide leading-normal">
      {title}
    </Text>
  );
}

function Header() {
  const { isDarkColorScheme } = useColorScheme();
  const user = useSession((state) => state.session?.user);

  return (
    <View className="flex-row items-center">
      <AvatarPrimitive.Root alt="Avatar" className="mr-3">
        <AvatarPrimitive.Image
          source={{ uri: AVATAR_URI }}
          width={40}
          height={40}
        />
        <AvatarPrimitive.Fallback>
          <Text>ZN</Text>
        </AvatarPrimitive.Fallback>
      </AvatarPrimitive.Root>
      <Text className="font-extrabold">Hi {user?.first_name},</Text>
      <View
        className={`rounded-full ml-auto p-3 relative ${isDarkColorScheme ? "bg-[#161616]" : "bg-[#f6f6f6]"}`}
      >
        <Bell
          color={isDarkColorScheme ? "#fff" : "#0F0F0F"}
          size={22}
          fill={isDarkColorScheme ? "#fff" : "#0F0F0F"}
        />
        <View className="rounded-full bg-[#FCA110] items-center justify-center h-4 w-4 border border-white absolute right-3 top-2">
          <Text className="text-[8px] text-white text-center">3</Text>
        </View>
      </View>
    </View>
  );
}

function Search() {
  const { isDarkColorScheme } = useColorScheme();

  return (
    <View className="flex flex-row gap-4 py-6">
      <View className="flex-1 relative">
        <View className="absolute bottom-5 left-5">
          <SearchIcon
            color={isDarkColorScheme ? "#fff" : "#0F0F0F"}
            size={20}
          />
        </View>
        <Input placeholder="Search for anything" className="pl-14" />
      </View>
      <View
        className={`${isDarkColorScheme ? "bg-[#161616]" : "bg-[#f6f6f6]"} w-2/12 rounded-lg items-center justify-center`}
      >
        <CameraIcon />
      </View>
    </View>
  );
}

function Activities() {
  const { t } = useTranslation("dashboard", { keyPrefix: "DashboardScreens" });

  return (
    <View className="w-full pt-4">
      <Title title={t("Activities")} />

      <FlatList
        contentContainerClassName="my-4 gap-x-4"
        horizontal
        showsHorizontalScrollIndicator={false}
        data={["Hello", "Hi", "Hiii"]}
        renderItem={({ item }) => <Activity />}
      />
    </View>
  );
}

function Activity() {
  const { t } = useTranslation("dashboard", { keyPrefix: "DashboardScreens" });
  const { isDarkColorScheme } = useColorScheme();

  return (
    <View className="w-72 bg-[#FDBE1D] rounded-lg p-4 pt-6">
      <Text className="text-md leading-normal tracking-wide font-medium">
        {t("Last Quiz")}
      </Text>
      <Text className="leading-normal tracking-wide">
        Introduction to Biology
      </Text>
      <View className="mt-4">
        <Text className="text-sm leading-normal tracking-wide font-medium mb-3">
          {t("You scored")} 8/10
        </Text>
        <Progress.Bar
          animated={false}
          progress={0.7}
          width={null}
          height={4}
          color={isDarkColorScheme ? "#fff" : "#161616"}
          unfilledColor={isDarkColorScheme ? "#161616" : "#fff"}
          borderWidth={0}
        />
      </View>
    </View>
  );
}

function QuickActions() {
  const { t } = useTranslation("dashboard", { keyPrefix: "DashboardScreens" });

  return (
    <View className="my-6">
      <Title title={t("Quick Actions")} />

      <View className="flex-row items-center justify-center gap-2 min-w-full my-4">
        <QuickAction
          title={t("Start Quiz")}
          bgColor="bg-[#FBCD27]"
          onPress={() => {}}
        />
        <QuickAction
          title={t("Study Materials")}
          bgColor="bg-[#13D282]"
          onPress={() => {}}
        />
        <QuickAction
          title={t("Create Group")}
          bgColor="bg-[#FCA110]"
          onPress={() => {}}
        />
      </View>
    </View>
  );
}

function QuickAction({
  title,
  bgColor,
  onPress,
}: {
  title: string;
  bgColor: string;
  onPress: () => void;
}) {
  const { isDarkColorScheme } = useColorScheme();

  return (
    <Pressable
      className={`rounded-lg shadow-sm shadow-black/40 items-center justify-center px-4 h-16 ${bgColor} flex-1`}
      onPress={onPress}
    >
      <Text
        className={`${isDarkColorScheme ? "#fff" : "#161616"} text-center leading-normal tracking-wide text-sm font-bold`}
      >
        {title}
      </Text>
    </Pressable>
  );
}
