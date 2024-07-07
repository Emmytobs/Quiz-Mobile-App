import { View } from "react-native";
import React from "react";
import { Input } from "~/components/ui/input";
import { SafeAreaView } from "~/components/SafeAreaView";
import { Button } from "~/components/ui/button";
import { Text } from "~/components/ui/text";
import { Link } from "expo-router";
import OAuthLoginButtons from "../components/OAuthLoginButtons";
import { useColorScheme } from "~/lib/useColorScheme";
import { cn } from "~/lib/utils";

const LoginScreen = () => {
  const { isDarkColorScheme } = useColorScheme()
  return (
    <SafeAreaView>
      <View className="w-full flex-1 gap-y-8">
        <Input
          label="Email address"
          labelFor="email"
          aria-labelledbyledBy="email"
          aria-errormessage="inputError"
          placeholder="johndoe@example.com"
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
        <OAuthLoginButtons />
        <View>
          <Text className="text-primary/50 text-center">{"Don't"} have an account?{" "} 
            <Link href="(auth)/signup" asChild>
              <Text className={cn("text-primary", isDarkColorScheme && "text-brand")}>Create account</Text>
            </Link>
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default LoginScreen;
