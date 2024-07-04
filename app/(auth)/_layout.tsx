import React from 'react'
import { Stack } from 'expo-router'
import { StackScreenBackButton } from '~/components/StackScreenBackButton'

const AuthLayout = () => {
  return (
    <Stack>
      <Stack.Screen
        name='login/index' // If using an index file, the full path - including the "index" segment - has to be specified.
        options={{
          title: "Login",
          headerTitle: "Login",
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
          title: "Create Account",
          headerTitle: "Create Account",
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
