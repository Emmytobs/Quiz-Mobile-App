import { Tabs } from 'expo-router'
import React from 'react'

const CustomTabBar = (props: any) => {
  return null;
}

const TabsLayout = () => {
  return (
    <Tabs initialRouteName='home'>
      <Tabs.Screen 
        name='home'
        options={{
          title: 'Home',
        }}
      />
      <Tabs.Screen 
        name='library'
        options={{
          title: 'Library'
        }}
      />
      <Tabs.Screen 
        name='upload'
        options={{
          title: 'Upload'
        }}
      />
      <Tabs.Screen 
        name='groups'
        options={{
          title: 'Groups'
        }}
      />
      <Tabs.Screen 
        name='profile'
        options={{
          title: 'Profile'
        }}
      />
    </Tabs>
  )
}

export default TabsLayout