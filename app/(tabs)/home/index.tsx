import { View } from 'react-native'
import React from 'react'
import { Link, router } from 'expo-router'
import { useSession } from '~/stores/session'
import { Text } from '~/components/ui/text'
import { Button } from '~/components/ui/button'
import { StateStorage } from '~/lib/stateStorage'

const HomeScreen = () => {
  const { session } = useSession(({ session }) => ({ session }))
  const logoutUser = () => {
    useSession.persist.clearStorage()
    router.replace("(onboarding)/welcome")
  }
  
  return (
    <View>
      <Text>Welcome {session?.user.first_name}</Text>
      {/* <Link href="(tabs)/home/sub-route">Go to sub route in Home Screen</Link> */}
      <Button onPress={logoutUser}>Logout</Button>
    </View>
  )
}

export default HomeScreen