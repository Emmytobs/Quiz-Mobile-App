import React from "react";
import { Image, View } from "react-native";
import { Text } from "~/components/ui/text";
import { SafeAreaView } from "~/components/SafeAreaView";
import { Button } from "~/components/ui/button";

const OnboardingScreen = () => {
  return (
    <SafeAreaView>
      <Image
        source={require("../assets/images/screens/onboarding/slide-1-image.png")}
        className="mt-5 mx-auto"
      />
      <Text className="text-center text-lg mt-2">
        Quiz Dash App helps you conquer your studies with ease.
      </Text>
      <Text className="text-center text-sm text-primary/50 my-2">
        By clicking Get started, you agree to our{" "}
        <Text className="text-sm">Terms of Service</Text> and{" "}
        <Text className="text-sm">Privacy Policy</Text>{" "}
      </Text>
      <View className="md:max-w-[30em] flex flex-wrap flex-row justify-between items-center gap-y-5 mt-10 mx-auto w-full md:flex-row">
        <Button className="w-full md:w-[49%] capitalize">Get started</Button>
        <Button className="w-full md:w-[49%]" variant="secondary">
          Login
        </Button>
      </View>
    </SafeAreaView>
  );
};

export default OnboardingScreen;
