import React from "react";
import { View } from "react-native";
import { Text } from "~/components/ui/text";
import * as AvatarPrimitive from "@rn-primitives/avatar";
import { Bell, Filter, SearchIcon } from "lucide-react-native";
import { useSession } from "~/stores/session";
import type { User } from "~/stores/session";
import { useColorScheme } from "~/lib/useColorScheme";
import { Input } from "~/components/ui/input";

export default function HomeScreen() {
  const user = useSession((state) => state.session?.user);

  return (
    <View className="flex-1 p-4 pt-10">
      <Header user={user} />
      <Search />
    </View>
  );
}

const AVATAR_URI = "https://github.com/mrzachnugent.png";

function Header({ user }: { user: User | undefined }) {
  const { isDarkColorScheme } = useColorScheme();

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
    <View className="flex flex-row gap-4">
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
        className={`isDarkColorScheme ? "bg-[#161616]" : "bg-[#f6f6f6]"} p-4 rounded-lg items-center justify-center`}
      >
        <Filter
          color={isDarkColorScheme ? "#fff" : "#0F0F0F"}
          size={20}
          fill={isDarkColorScheme ? "#fff" : "#0F0F0F"}
        />
      </View>
    </View>
  );
}
