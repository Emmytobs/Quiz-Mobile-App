import { View, Text, Image } from 'react-native'
import React from 'react'
import { Stack, router } from 'expo-router'
import { Button } from '~/components/ui/button'
import { Sun, ChevronLeft } from '~/lib/icons'

const AuthLayout = () => {
  return (
    <Stack>
      <Stack.Screen
        name='login/index' // If using an index file, the full path - including the "index" segment has to be specified.
        options={{
          title: "Login"
        }}
      />
      <Stack.Screen
        name='signup/index'
        options={{
          title: "Create Account",
          headerTitle: "Create Account",
          headerTitleAlign: 'center',
          headerLeft: ({ canGoBack }) => (
            canGoBack ?
              <Button 
                variant="icon" 
                size="icon" 
                onPress={() => router.back()} 
                noText
                className='native:outline-4 native:outline-primary rounded-md h-10' // TODO: Add a border around the button
              >
                <ChevronLeft className='text-primary' />
              </Button> :
              null
          ),
          headerShadowVisible: false
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