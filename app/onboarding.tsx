import React, { useState } from "react";
import { Dimensions, Image, Pressable, View } from "react-native";
import { Text } from "~/components/ui/text";
import { SafeAreaView } from "~/components/SafeAreaView";
import { Button } from "~/components/ui/button";
import { Link } from "expo-router";
import Carousel from "react-native-reanimated-carousel";

const OnboardingScreen = () => {
  const { width } = Dimensions.get("window")
  const [activeCarouselIndex, setActiveCarouselIndex] = useState(0);

  const carouselItems = [
    {
      text: "Quiz Dash App helps you conquer your studies with ease.",
      imageSource: require("../assets/images/screens/onboarding/slide-1.png")
    },
    {
      text: "Upload your study materials and let Dash organize them for efficient learning.",
      imageSource: require("../assets/images/screens/onboarding/slide-2.png")
    },
    {
      text: "Create personalized quizzes from your study guides and track your progress.",
      imageSource: require("../assets/images/screens/onboarding/slide-3.png")
    },
    {
      text: "Join study groups and compete with friends to ace your next exam!",
      imageSource: require("../assets/images/screens/onboarding/slide-4.png")
    },
  ]

  return (
    <SafeAreaView>
      <Carousel
        loop={false}
        width={width}
        autoPlay={false}
        data={carouselItems}
        scrollAnimationDuration={300}
        onSnapToItem={(index) => setActiveCarouselIndex(index)}
        renderItem={({ item, index }) => (
            <View key={`carouselItem-${index}`} className="w-[90%] items-center mx-auto">
              <Image
                source={item.imageSource}
                className="mt-5"
              />
              <Text className="text-center text-lg mt-2">
                {item.text}
              </Text>
            </View>
        )}
      />
      <View className="flex-row justify-center gap-x-2">
        {
          carouselItems.map((_, index) => (
            <View
              key={`indicator-${index}`}
              className={`rounded-[1px] h-[4px] w-[28px] ${activeCarouselIndex === index ? "bg-brand" : "bg-primary/30"}`}
            ></View>
          ))
        }
      </View>
      <View className="md:max-w-[30em] flex flex-wrap flex-row justify-between items-center gap-y-5 my-7 mx-auto w-full md:flex-row">
        <Text className="text-center text-sm text-primary/50 my-2 mx-auto flex-row flex-wrap items-center">
          By clicking Get started, you agree to our{" "}
          <Text className="text-sm">Terms of Service</Text> and{" "}
          <Text className="text-sm">Privacy Policy</Text>{" "}
        </Text>
        <Link href="(auth)/signup" asChild>
          <Button className="w-full md:w-[49%] capitalize">Get started</Button>
        </Link>
        <Link href="(auth)/login" asChild>
          <Button className="w-full md:w-[49%]" variant="secondary">Login</Button>
        </Link>
      </View>
    </SafeAreaView>
  );
};

export default OnboardingScreen;
