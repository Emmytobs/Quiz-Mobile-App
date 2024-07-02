import { View } from 'react-native'
import React from 'react'
import { Input } from '~/components/ui/input'
import { SafeAreaView } from '~/components/SafeAreaView'
import { Button } from '~/components/ui/button'

const SignupScreen = () => {
  return (
    <SafeAreaView>
      <View className="w-full flex-1 gap-y-10">
        <Input
          label="First name"
          labelFor='firstName'
          aria-labelledbyledBy='firstName'
          aria-errormessage='inputError'
        />
        <Input
          label="Email"
          labelFor='email'
          aria-labelledbyledBy='email'
          aria-errormessage='inputError'
        />
        <Input
          label="Password"
          labelFor='password'
          aria-labelledbyledBy='password'
          aria-errormessage='inputError'
          secureTextEntry
        />
        <Input
          label="Confirm Password"
          labelFor='confirmPassword'
          aria-labelledbyledBy='confirmPassword'
          aria-errormessage='inputError'
          secureTextEntry
        />
      </View>

      <View className='w-full'>
        <Button>Create</Button>
      </View>
    </SafeAreaView>
  )
}

export default SignupScreen