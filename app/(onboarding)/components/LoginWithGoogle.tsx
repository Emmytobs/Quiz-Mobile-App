import { Pressable } from 'react-native'
import React, { useEffect } from 'react'
import { Image } from 'react-native'
import { useMutation } from '@tanstack/react-query'
import useAxios from '~/lib/hooks/useAxios'
import { Session, useSession } from '~/stores/session'
import { GoogleSignin, isErrorWithCode, statusCodes } from '@react-native-google-signin/google-signin'
import { router } from 'expo-router'
import Toast from 'react-native-toast-message'

const LoginWithGoogle = () => {
  const axios = useAxios()
  const setSession = useSession(({ setSession }) => setSession)
  const { data, error, mutate: loginWithGoogle } = useMutation({
    mutationFn: async (access_token: string) => {
      try {
        const response = await axios.post<Session>("/authentication/social/google/", { access_token })
        return response
      } catch (error) {
        throw new Error(error as any);
      }
    }
  })

  useEffect(() => {
    if (error) {
      Toast.show({
        type: 'error',
        text1: error.message
      });
    }
    if (data) {
      setSession(data.data)
      router.replace("(tabs)/home")
    }
  }, [data, error])

  const handleGoogleAuth = () => {
    GoogleSignin.configure(
      {
        scopes: ['openid', "https://www.googleapis.com/auth/userinfo.profile"],
        iosClientId: process.env.EXPO_PUBLIC_IOS_CLIENT_ID
      }
    );

    const _signIn = async () => {
      try {
        await GoogleSignin.hasPlayServices();
        const userInfo = await GoogleSignin.signIn();
        if (userInfo) {
          const tokens = await GoogleSignin.getTokens();
          loginWithGoogle(tokens.accessToken)
        }
      } catch (error) {
        if (isErrorWithCode(error)) {
          switch (error.code) {
            case statusCodes.SIGN_IN_CANCELLED:
              // user cancelled the login flow
              break;
            case statusCodes.IN_PROGRESS:
              // operation (eg. sign in) already in progress
              break;
            case statusCodes.PLAY_SERVICES_NOT_AVAILABLE:
              // play services not available or outdated
              break;
            default:
            // some other error happened
          }
        } else {
          // an error that's not related to google sign in occurred
        }
      }
    };
    _signIn()
  }

  return (
    <Pressable onPress={handleGoogleAuth}>
      <Image source={require("~/assets/images/screens/google.png")} />
    </Pressable>
  )
}

export default LoginWithGoogle