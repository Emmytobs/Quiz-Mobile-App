import React from 'react'
import { Stack } from 'expo-router'
import { StackScreenBackButton } from '~/components/StackScreenBackButton'
import { useTranslation } from 'react-i18next';

const AuthLayout = () => {
  const { t } = useTranslation("onboarding", { keyPrefix: "AuthScreens" });

  return (
    <Stack>
      <Stack.Screen
        name='welcome'
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name='login/index' // If using an index file, the full path - including the "/index" segment - has to be specified.
        options={{
          title: t("Login"),
          headerTitle: t("Login"),
          headerTitleAlign: "center",
          headerLeft: ({ canGoBack }) =>
            canGoBack ? (
              <StackScreenBackButton />
            ) : null,
          headerShadowVisible: false,
        }}
      />
      <Stack.Screen
        name="signup/index"
        options={{
          title: t("Create account"),
          headerTitle: t("Create account"), 
          headerTitleAlign: "center",
          headerLeft: ({ canGoBack }) =>
            canGoBack ? (
              <StackScreenBackButton />
            ) : null,
          headerShadowVisible: false,
        }}
      />
      <Stack.Screen
        name="reset-password/index"
        options={{
          title: "Password Reset",
        }}
      />
      <Stack.Screen
        name="otp/index"
        options={{
          title: "Password Reset",
        }}
      />
    </Stack>
  );
};

export default AuthLayout;
