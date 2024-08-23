import { View, ScrollView } from "react-native";
import React from "react";
import UpcomingIcon from "~/components/icons/notifications/Upcoming";
import { Separator } from "~/components/ui/separator";
import { useColorScheme } from "~/lib/useColorScheme";
import { Text } from "~/components/ui/text";

export default function Notifications() {
  const { isDarkColorScheme } = useColorScheme();

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      className={`flex-1 ${isDarkColorScheme ? "bg-[#0D0D0D]" : "bg-[#F3F3F3]"} px-4 gap-10`}
    >
      <NotificationsGroup />
      <NotificationsGroup />
    </ScrollView>
  );
}

function NotificationsGroup() {
  const { isDarkColorScheme } = useColorScheme();

  return (
    <View className="py-5">
      <Text className="text-[20px] font-satoshi font-medium tracking-wide leading-normal pl-2">
        Today
      </Text>
      <View className="rounded-lg bg-white shadow shadow-black/20 mt-4">
        <NotificationItem />
        <Separator
          className={`${isDarkColorScheme ? "bg-[#212121]" : "bg-[##EAEAEA]"}`}
        />
        <NotificationItem />
        <Separator />
        <NotificationItem />
      </View>
    </View>
  );
}

function NotificationItem() {
  const { isDarkColorScheme } = useColorScheme();

  return (
    <View
      className={`w-full flex-row items-center gap-5 p-5 ${isDarkColorScheme ? "bg-[#1C1C1CCC]" : "bg-white"}`}
    >
      <View className="bg-[#EF930333] p-3 rounded-lg">
        <UpcomingIcon />
      </View>

      <View className="gap-1.5 w-10/12">
        <Text
          className="font-medium text-[15px] leading-normal tracking-wide"
          numberOfLines={1}
        >
          Score 300 & above
        </Text>
        <Text
          className="text-[12px] leading-normal tracking-wide"
          numberOfLines={1}
        >
          Upcoming quiz at 12pm today. Stay alert
        </Text>
      </View>

      <Text className="ml-auto self-start text-[12px] leading-normal tracking-wide">
        8:04am
      </Text>
    </View>
  );
}
