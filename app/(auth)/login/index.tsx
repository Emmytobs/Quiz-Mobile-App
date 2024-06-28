import { View, Text } from 'react-native'
import React from 'react'
import { Link } from 'expo-router'

const LoginScreen = () => {
  return (
    <View>
      <Text>LoginScreen</Text>
      <Link href={"(tabs)/home"}><Text>Go to home page</Text></Link>
    </View>
  )
}

export default LoginScreen