import React, { useState } from "react";
import { Dimensions, Image, View } from "react-native";
import { Text } from "~/components/ui/text";
import { SafeAreaView } from "~/components/SafeAreaView";
import { Button } from "~/components/ui/button";
import { Link } from "expo-router";
import Carousel from "react-native-reanimated-carousel";
import * as WebBrowser from "expo-web-browser"
import { useTranslation } from "react-i18next";

const WelcomeScreen = () => {
  const { width } = Dimensions.get("window")
  const [activeCarouselIndex, setActiveCarouselIndex] = useState(0);
  const { t } = useTranslation("onboarding", { keyPrefix: "WelcomeScreen" });
  const { t: cT } = useTranslation("common");

  const carouselItems = [
    {
      text: t("carousel.slide-1"),
      imageSource: require("../../assets/images/screens/welcome/slide-1.png")
    },
    {
      text: t("carousel.slide-2"),
      imageSource: require("../../assets/images/screens/welcome/slide-2.png")
    },
    {
      text: t("carousel.slide-3"),
      imageSource: require("../../assets/images/screens/welcome/slide-3.png")
    },
    {
      text: t("carousel.slide-4"),
      imageSource: require("../../assets/images/screens/welcome/slide-4.png")
    },
  ]

  const openWebBrowser = async (url: string) => {
    await WebBrowser.openBrowserAsync(url);
  }

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
          {t("terms.prefix")}{" "}
          <Link href="#" onPress={() => openWebBrowser("https://quizdash.app/terms-and-conditions")}>
            <Text className="text-sm">{t("Terms of Service")}</Text>
          </Link> {cT("and")}{" "}
          <Link href="#" onPress={() => openWebBrowser("https://quizdash.app/privacy-policy")}>
            <Text className="text-sm">{t("Privacy Policy")}</Text>.
          </Link>
        </Text>
        <Link href="(onboarding)/signup" asChild>
          <Button className="w-full md:w-[49%] capitalize">{t("Get started")}</Button>
        </Link>
        <Link href="(onboarding)/login" asChild>
          <Button className="w-full md:w-[49%]" variant="secondary">{t("Login")}</Button>
        </Link>
      </View>
    </SafeAreaView>
  );
};

export default WelcomeScreen;
