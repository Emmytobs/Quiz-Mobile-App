import { View, Text } from 'react-native'
import React from 'react'
import { Link, Redirect } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ThemedText } from '@/components/ThemedText'

const Screen = () => {
  return (
    // Render the onboarding screen only if the user is logged out; else, render the home screen
    <Redirect href="onboarding" />

    // <SafeAreaView>
    //   <View>
    //     {/* 
    //       The correct full path is '(auth)/login/index'.
    //       However, since the last segment in the path is 'index', we omit it when linking to the page; otherwise, it'll throw an error  
    //     */}
    //     <Link href="(auth)/login">
    //       <ThemedText>Go to login page</ThemedText>
    //     </Link> 
    //     <Link href="(auth)/signup">
    //       <ThemedText>Go to signup page</ThemedText>
    //     </Link>
    //     <Link href="about">
    //       <ThemedText>Go to about page</ThemedText>
    //     </Link>
    //   </View>
    // </SafeAreaView>
  )
}

export default Screen