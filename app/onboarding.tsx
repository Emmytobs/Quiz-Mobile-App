import { Dimensions, Image, StyleSheet, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ThemedText } from '@/components/ThemedText'
import Button from '@/components/Button'
import { Text, getThemes } from 'tamagui'
// import { Button } from 'tamagui'

const { width } = Dimensions.get("window")

const OnboardingScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Image 
        source={require("../assets/images/screens/onboarding/slide-1-image.png")}
        style={styles.image}
      />
      <Text style={styles.blurbText}>Quiz Dash App helps you conquer your studies with ease.</Text>
      <Text style={styles.privacyText}>
        By clicking Get started, you agree to our
        {" "}<Text style={[{ "fontSize": styles.privacyText.fontSize }]}>Terms of Service</Text>{" "} 
        and
        {" "}<Text style={[{ "fontSize": styles.privacyText.fontSize }]}>Privacy Policy</Text>{" "}
      </Text>

      <View style={styles.buttonGroup}>
        <Button style={styles.ctaButton}>Get started</Button>
        <Button variant='secondary' style={styles.ctaButton}>Login</Button>
      </View>
    </SafeAreaView>
  )
}

export default OnboardingScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  blurbText: {
    textAlign: 'center',
    fontSize: 22,
    width: width * 0.86,
    marginHorizontal: 'auto',
    marginTop: 10
  },
  privacyText: {
    textAlign: "center",
    fontSize: 14,
    width: width * 0.86,
    marginHorizontal: 'auto',
    color: "#828282",
    marginTop: 40
  },
  image: {
    marginTop: 20
  },
  buttonGroup: {
    rowGap: 20,
    marginTop: 40
  },
  ctaButton: {
    width: width * 0.9
  }
})