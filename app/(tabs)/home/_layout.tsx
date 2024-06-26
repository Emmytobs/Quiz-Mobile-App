import React from 'react'
import { Stack } from 'expo-router'

const HomeScreenLayout = () => {
  return (
    <Stack>
      <Stack.Screen 
        name='index'
      />
      <Stack.Screen 
        name='sub-route'
      />
    </Stack>
  )
}

export default HomeScreenLayout