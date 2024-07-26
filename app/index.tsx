import * as React from 'react';
import { Redirect } from 'expo-router';
import { useSession } from '~/stores/session';

export default function IndexScreen() {
  const session = useSession(({ session }) => session)
  if (!!session) {
    return <Redirect href={"(tabs)/home"} />
  }
  return <Redirect href={"(onboarding)/welcome"} /> 
}
