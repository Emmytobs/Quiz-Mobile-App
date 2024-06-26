import { View, Text } from 'react-native'
import React from 'react'
import { Link } from 'expo-router'
import { ThemedText } from '@/components/ThemedText'

const LoginScreen = () => {
  return (
    <View>
      <ThemedText>LoginScreen</ThemedText>
      <Link href={"(tabs)/home"}><ThemedText>Go to home page</ThemedText></Link>
    </View>
  )
}

export default LoginScreen