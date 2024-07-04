import { View } from "react-native";
import React from "react";
import { Input } from "~/components/ui/input";
import { SafeAreaView } from "~/components/SafeAreaView";
import { Button } from "~/components/ui/button";
import OAuthLoginButtons from "../components/OAuthLoginButtons";
import { Text } from "~/components/ui/text";
import { Link } from "expo-router";

const SignupScreen = () => {
  return (
    <SafeAreaView>
      <View className="w-full gap-y-8">
        <Input
          label="Full name"
          className="lowercase"
          labelFor="fullName"
          aria-labelledbyledBy="fullName"
          aria-errormessage="inputError"
          placeholder="John Doe"
        />
        <Input
          label="Email"
          labelFor="email"
          aria-labelledbyledBy="email"
          aria-errormessage="inputError"
          placeholder="johndoe@example.com"
        />
        <Input
          label="Password"
          labelFor="password"
          aria-labelledbyledBy="password"
          aria-errormessage="inputError"
          placeholder="* * * * * *"
          secureTextEntry
        />
        <Input
          label="Confirm Password"
          labelFor="confirmPassword"
          aria-labelledbyledBy="confirmPassword"
          aria-errormessage="inputError"
          placeholder="* * * * * *"
          secureTextEntry
        />

        <Button>Create</Button>
        <OAuthLoginButtons />
        <View>
          <Text className="text-primary/50 text-center">Already have an account? <Link href="(auth)/login" asChild><Text>Login</Text></Link></Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default SignupScreen;
