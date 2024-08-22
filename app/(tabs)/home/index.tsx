import React from "react";
import {
  FlatList,
  Pressable,
  ScrollView,
  View,
  ViewabilityConfig,
} from "react-native";
import { Text } from "~/components/ui/text";
import * as AvatarPrimitive from "@rn-primitives/avatar";
import { Bell, SearchIcon } from "lucide-react-native";
import { useSession } from "~/stores/session";
import { useColorScheme } from "~/lib/useColorScheme";
import { Input } from "~/components/ui/input";
import { useTranslation } from "react-i18next";
import * as Progress from "react-native-progress";
import CameraIcon from "~/components/icons/Camera";

const hasActivities = true;
const studyTips: any[] = [
  {
    id: 1,
    title: "Stay focused",
    description: "Set specific study times and prioritize your tasks",
    bgColor: "bg-[#FDB704]",
  },
  {
    id: 2,
    title: "Take breaks",
    description: "Give yourself a break when you feel overwhelmed",
    bgColor: "bg-[##FBC70E4D]",
  },
  {
    id: 3,
    title: "Review materials",
    description: "Review your study materials before class",
    bgColor: "bg-[##11BA734D]",
  },
  {
    id: 4,
    title: "Set reminders",
    description: "Schedule notifications for study breaks",
    bgColor: "bg-[#EF93034D]",
  },
  {
    id: 5,
    title: "Practice active recall",
    description: "Use active recall exercises to help you recall information",
    bgColor: "bg-[#EF9303]",
  },
];

export default function HomeScreen() {
  return (
    <ScrollView className="p-4 pt-10" showsVerticalScrollIndicator={false}>
      <Header />
      <Search />
      <StudyTips />
      <QuickActions />
      {hasActivities ? <Activities /> : <NoActvity />}
    </ScrollView>
  );
}

const AVATAR_URI = "https://github.com/mrzachnugent.png";

function Title({ title }: { title: string }) {
  const { isDarkColorScheme } = useColorScheme();

  return (
    <Text
      className={`font-interMedium text-md font-medium tracking-wide leading-normal ${isDarkColorScheme ? "text-white" : "text-black"}`}
    >
      {title}
    </Text>
  );
}

function Header() {
  const { isDarkColorScheme } = useColorScheme();
  const user = useSession((state) => state.session?.user);

  return (
    <View className="flex-row items-center mt-5">
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

function QuickActions() {
  const { t } = useTranslation("dashboard", { keyPrefix: "DashboardScreens" });

  return (
    <View className="my-6">
      <Title title={t("Quick Actions")} />

      <View className="flex-row items-center justify-center gap-2 min-w-full my-4">
        <QuickAction
          title={t("Start Quiz")}
          bgColor="bg-[#FBC70E4D]"
          onPress={() => {}}
        />
        <QuickAction
          title={t("Study Materials")}
          bgColor="bg-[#11BA734D]"
          onPress={() => {}}
        />
        <QuickAction
          title={t("Create Group")}
          bgColor="bg-[#EF93034D]"
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
      className={`rounded-xl items-center justify-center px-4 h-16 ${bgColor} flex-1`}
      onPress={onPress}
    >
      <Text
        className={`${isDarkColorScheme ? "#fff" : "#0F0F0F"} text-center leading-normal tracking-wide text-sm font-medium`}
      >
        {title}
      </Text>
    </Pressable>
  );
}

function NoActvity() {
  const { t } = useTranslation("dashboard", { keyPrefix: "DashboardScreens" });

  return (
    <View className="w-full pt-4">
      <Title title={t("Activities")} />

      <View className="my-4">
        <ActivityCard bgColor="bg-[#D9D9D9]">
          <Text className="text-md leading-normal tracking-wide font-medium text-black">
            {t("No recent activities yet")}
          </Text>
          <Text className="my-6 leading-normal tracking-wider font-normal text-sm text-black w-11/12">
            {t(
              "When you engage in different activities, your recent activities will appear here"
            )}
          </Text>
        </ActivityCard>
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

function ActivityCard({
  bgColor,
  children,
}: {
  bgColor: string;
  children: React.ReactNode;
}) {
  return <View className={`${bgColor} rounded-xl p-4 pt-6`}>{children}</View>;
}

function Activity() {
  const { t } = useTranslation("dashboard", { keyPrefix: "DashboardScreens" });
  const { isDarkColorScheme } = useColorScheme();

  return (
    <ActivityCard bgColor="bg-[#FDBE1D]">
      <View className="w-[22rem]">
        <Text className="text-md leading-normal tracking-wide font-medium">
          {t("Last Quiz")}
        </Text>
        <Text className="leading-normal tracking-wide">
          Introduction to Biology
        </Text>
        <View className="mt-7">
          <Text className="text-sm leading-normal tracking-wide font-medium mb-4">
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
    </ActivityCard>
  );
}

function StudyTips() {
  const { t } = useTranslation("dashboard", { keyPrefix: "DashboardScreens" });
  const { isDarkColorScheme } = useColorScheme();

  const [currentCarouselIndex, setCurrentCarouselIndex] = React.useState(0);
  const carouselRef = React.useRef<any>(null);

  const viewabilityConfig: ViewabilityConfig = {
    itemVisiblePercentThreshold: 51,
  };

  const onViewableItemsChanged = React.useRef(({ viewableItems }: any) => {
    if (viewableItems.length > 0) {
      setCurrentCarouselIndex(viewableItems[0].index ?? 0);
    }
  });

  return (
    <View className="w-full pt-4">
      <Title title={t("Study Tips")} />
      <FlatList
        contentContainerClassName="my-4"
        ref={carouselRef}
        onScrollToIndexFailed={() => {}}
        viewabilityConfig={viewabilityConfig}
        onViewableItemsChanged={onViewableItemsChanged.current}
        data={studyTips}
        renderItem={({ item }) => {
          return (
            <View className="mr-4 max-w-96">
              <ActivityCard bgColor={item.bgColor}>
                <Title title={item.title} />
                <Text
                  className={`my-6 leading-normal tracking-wider font-normal text-sm ${isDarkColorScheme ? "text-white" : "text-black"} w-11/12`}
                >
                  {item.description}
                </Text>
              </ActivityCard>
            </View>
          );
        }}
        showsHorizontalScrollIndicator={false}
        horizontal
      />

      <View
        style={{ width: "100%" }}
        className="flex-row items-center justify-center gap-2 mt-4"
      >
        {studyTips.map((_, index) => {
          return (
            <Pressable
              style={{
                width: 8,
                height: 8,
                borderRadius: 50,
                backgroundColor:
                  currentCarouselIndex === index ? "#939393" : "#D9D9D9",
              }}
              key={index}
              onPress={() => {
                carouselRef.current.scrollToIndex({
                  animated: true,
                  index,
                  viewOffset: 0,
                  viewPosition: 0,
                });
              }}
            />
          );
        })}
      </View>
    </View>
  );
}
