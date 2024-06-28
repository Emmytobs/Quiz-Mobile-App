import React from 'react'
import { Image, View } from 'react-native'
import { Text } from '~/components/ui/text'
import { SafeAreaView } from '~/components/SafeAreaView'
import { Button } from '~/components/ui/button'

const OnboardingScreen = () => {
  return (
    <SafeAreaView className='items-center'>
      <Image 
        source={require("../assets/images/screens/onboarding/slide-1-image.png")}
        className='mt-5'
      />
      <Text
        className="text-center text-lg mt-2"
      >
        Quiz Dash App helps you conquer your studies with ease.
      </Text>
      <Text className="text-center text-sm text-primary/50">
        By clicking Get started, you agree to our
        {" "}<Text className='text-sm'>Terms of Service</Text>{" "}
        and
        {" "}<Text className='text-sm'>Privacy Policy</Text>{" "}
      </Text>
      <View className='flex flex-col items-center gap-y-5 mt-10 w-full'>
        <Button className="w-[90%]">Get started</Button>
        <Button className="w-[90%]" variant='secondary'>Login</Button>
      </View>
    </SafeAreaView>
  )
}

export default OnboardingScreen