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
import { useTranslation } from "react-i18next";
import { TranslationNamespaces } from "~/assets/translations";

const LoginScreen = () => {
  const { isDarkColorScheme } = useColorScheme()
  const { t } = useTranslation<TranslationNamespaces, "AuthScreens">("onboarding", { keyPrefix: "AuthScreens" });

  return (
    <SafeAreaView>
      <View className="w-full flex-1 gap-y-8">
        <Input
          label={t("Email")}
          labelFor="email"
          aria-labelledbyledBy="email"
          aria-errormessage="inputError"
          placeholder="johndoe@example.com"
        />
        <Input
          label={t("Password")}
          labelFor="password"
          aria-labelledbyledBy="password"
          aria-errormessage="inputError"
          placeholder="* * * * * *"
          secureTextEntry
        />
        <Button>{t("Login")}</Button>
        <Link href="(onboarding)/reset-password" asChild>
          <Text className="w-fit ml-auto opacity-50">{t("Forgot Password")}</Text>
        </Link>
        <OAuthLoginButtons />
        <View>
          <Text className="text-primary/50 text-center">{t("Don't have an account?")}{" "} 
            <Link href="(onboarding)/signup" asChild>
              <Text className={cn("text-primary", isDarkColorScheme && "text-brand")}>{t("Create account")}</Text>
            </Link>
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default LoginScreen;
