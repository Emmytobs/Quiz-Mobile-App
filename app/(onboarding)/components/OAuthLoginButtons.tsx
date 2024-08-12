import { View, Image, Platform } from 'react-native'
import React from 'react'
import { Separator } from '~/components/ui/separator'
import { useColorScheme } from '~/lib/useColorScheme'
import { Text } from '~/components/ui/text'
import { useTranslation } from 'react-i18next'
import LoginWithGoogle from './LoginWithGoogle'

const OAuthLoginButtons = () => {
  const { isDarkColorScheme } = useColorScheme()
  const { t } = useTranslation("onboarding", { keyPrefix: "AuthScreens" });
  

  return (
    <View className="gap-y-8">
      <View className="flex flex-row items-center justify-center overflow-hidden">
        <Separator />
        <Text className="mx-2 opacity-50">{t("or continue with")}</Text>
        <Separator />
      </View>
      <View className="flex-row justify-center gap-x-8">
        <LoginWithGoogle />
        <Image source={require("~/assets/images/screens/facebook.png")} />
        {
          Platform.OS === 'ios' ?
            (
              isDarkColorScheme ?
              <Image source={require("~/assets/images/screens/apple-light.png")} /> :
              <Image source={require("~/assets/images/screens/apple.png")} />
            ) : null
        }
      </View>
    </View>
  )
}

export default OAuthLoginButtons