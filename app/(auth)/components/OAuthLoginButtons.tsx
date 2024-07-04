import { View, Image } from 'react-native'
import React from 'react'
import { Separator } from '~/components/ui/separator'
import { useColorScheme } from '~/lib/useColorScheme'
import { Text } from '~/components/ui/text'

const OAuthLoginButtons = () => {
  const { isDarkColorScheme } = useColorScheme()
  return (
    <View className="gap-y-8">
      <View className="flex flex-row items-center justify-center overflow-hidden">
        <Separator />
        <Text className="mx-2 opacity-50">or continue with</Text>
        <Separator />
      </View>
      <View className="flex-row justify-center gap-x-8">
        <Image source={require("~/assets/images/screens/google.png")} />
        <Image source={require("~/assets/images/screens/facebook.png")} />
        {
          isDarkColorScheme ?
          <Image source={require("~/assets/images/screens/apple-light.png")} /> :
          <Image source={require("~/assets/images/screens/apple.png")} />
        }
      </View>
    </View>
  )
}

export default OAuthLoginButtons