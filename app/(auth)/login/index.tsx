import { View, Text } from "react-native";
import React from "react";
import { Input } from "~/components/ui/input";
import { SafeAreaView } from "~/components/SafeAreaView";
import { Button } from "~/components/ui/button";
import { Link } from "expo-router";

const LoginScreen = () => {
  return (
    <SafeAreaView>
      <View className="w-full flex-1 gap-y-10">
        <Input
          label="Email address"
          labelFor="email"
          aria-labelledbyledBy="email"
          aria-errormessage="inputError"
          placeholder="Example@gmail.com"
        />
        <Input
          label="Password"
          labelFor="password"
          aria-labelledbyledBy="password"
          aria-errormessage="inputError"
          placeholder="* * * * * *"
          secureTextEntry
        />
        <Button>Login</Button>
        <Link href="(auth)/reset-password" asChild>
          <Text className="w-fit ml-auto opacity-50">Forgot Password?</Text>
        </Link>
        <View className="my-2 flex flex-row items-center justify-center overflow-hidden">
          <View className="w-full h-[1px] bg-black opacity-15"></View>
          <Text className="mx-2 opacity-50">or continue with</Text>
          <View className="w-full h-[1px] bg-black opacity-15"></View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default LoginScreen;
