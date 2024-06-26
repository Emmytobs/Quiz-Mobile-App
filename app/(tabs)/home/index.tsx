import { View, Text } from 'react-native'
import React from 'react'
import { Link } from 'expo-router'

const HomeScreen = () => {
  return (
    <View>
      <Text>HomeScreen</Text>
      <Link href="(tabs)/home/sub-route">Go to sub route in Home Screen</Link>
    </View>
  )
}

export default HomeScreen