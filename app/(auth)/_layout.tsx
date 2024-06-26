import { View, Text } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'

const AuthLayout = () => {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name='login/index' // If using an index file, the full path - including the "index" segment has to be specified.
        options={{
          title: "Login"
        }}
      />
      <Stack.Screen
        name='signup/index'
        options={{
          title: "Signup"
        }}
      />
      <Stack.Screen
        name='reset-password/index'
        options={{
          title: "Reset password"
        }}
      />
    </Stack>
  )
}

export default AuthLayout