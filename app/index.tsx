import * as React from 'react';
import { Redirect } from 'expo-router';

export default function IndexScreen() {
  return <Redirect href={"onboarding"} />
}
