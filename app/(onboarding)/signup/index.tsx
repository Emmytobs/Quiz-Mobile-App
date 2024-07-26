import { View } from "react-native";
import React from "react";
import { Input } from "~/components/ui/input";
import { SafeAreaView } from "~/components/SafeAreaView";
import { Button } from "~/components/ui/button";
import OAuthLoginButtons from "../components/OAuthLoginButtons";
import { Text } from "~/components/ui/text";
import { Link } from "expo-router";
import { useColorScheme } from "~/lib/useColorScheme";
import { cn } from "~/lib/utils";
import { useTranslation } from "react-i18next";
import { TranslationNamespaces } from "~/assets/translations";

const SignupScreen = () => {
  const { isDarkColorScheme } = useColorScheme()
  const { t } = useTranslation<TranslationNamespaces, "AuthScreens">("onboarding", { keyPrefix: "AuthScreens" });

  return (
    <SafeAreaView>
      <View className="w-full gap-y-8">
        <Input
          label={t("Full name")}
          className="lowercase"
          labelFor="fullName"
          aria-labelledbyledBy="fullName"
          aria-errormessage="inputError"
          placeholder="John Doe"
        />
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
        <Input
          label={t("Confirm Password")}
          labelFor="confirmPassword"
          aria-labelledbyledBy="confirmPassword"
          aria-errormessage="inputError"
          placeholder="* * * * * *"
          secureTextEntry
        />

        <Button>{t("Create")}</Button>
        <OAuthLoginButtons />
        <View>
          <Text className="text-primary/50 text-center">{t("Already have an account?")} {" "}
            <Link href="(onboarding)/login" asChild>
              <Text className={cn("text-primary", isDarkColorScheme && "text-brand")}>{t("Login")}</Text>
            </Link>
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default SignupScreen;
