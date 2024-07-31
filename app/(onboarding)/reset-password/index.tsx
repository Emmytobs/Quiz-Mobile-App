import { View, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { Input } from "~/components/ui/input";
import { SafeAreaView } from "~/components/SafeAreaView";
import { Button } from "~/components/ui/button";
import { Text } from "~/components/ui/text";
import { useColorScheme } from "~/lib/useColorScheme";
import { cn } from "~/lib/utils";
import { Link } from "expo-router";

const ResetPasswordScreen = () => {
  const { isDarkColorScheme } = useColorScheme();
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const handleSendCode = () => {
    setStep(2);
  };

  const handleVerifyOtp = () => {
    setStep(3);
  };

  const handleResetPassword = () => {
    console.log("Password reset successfully");
  };

  return (
    <SafeAreaView>
      <View className="w-full flex-1 gap-y-8">
        {step === 1 && (
          <>
            <Text className="text-primary text-[1.3em]">
              Let's help you get back on board
            </Text>
            <Text className="text-primary/50 text-[1em] mb-0">
              Enter your Email Address to receive reset code
            </Text>
            <Input
              className="mt-0 lowercase"
              label=""
              labelFor="email"
              aria-labelledby="email"
              aria-errormessage="inputError"
              placeholder="Email address"
              value={email}
              onChangeText={setEmail}
            />
            <Button onPress={handleSendCode}>Send Code</Button>
            <Text className="text-primary/50 text-center">
              Go back to{" "}
              <Link href="(auth)/login" asChild>
                <Text
                  className={cn(
                    "text-primary",
                    isDarkColorScheme && "text-brand"
                  )}
                >
                  Login
                </Text>
              </Link>
            </Text>
          </>
        )}

        {step === 2 && (
          <>
            <Text className="text-primary text-[1.3em]">
              Enter 6-digit code
            </Text>
            <Text className="text-primary/50 text-[1em] mb-0">
              Enter your code we sent to {email}
            </Text>
            <Input
              labelFor="otp"
              aria-labelledby="otp"
              aria-errormessage="inputError"
              placeholder="123456"
              value={otp}
              onChangeText={setOtp}
            />
            <Button onPress={handleVerifyOtp}>Verify OTP</Button>
          </>
        )}

        {step === 3 && (
          <>
            <Text className="text-primary/50 text-[1em] mb-0">
              Should contain minimum of 8 characters including 1 uppercase, 1
              lowercase and 1 digit number.
            </Text>
            <View className="mb-[7em]">
              <Input
                labelFor="newPassword"
                aria-labelledby="newPassword"
                aria-errormessage="inputError"
                placeholder="New password"
                secureTextEntry
                value={newPassword}
                onChangeText={setNewPassword}
                className="my-[1.5em]"
              />
              <Input
                labelFor="confirmPassword"
                aria-labelledby="confirmPassword"
                aria-errormessage="inputError"
                placeholder="Confirm new password"
                secureTextEntry
                value={newPassword}
                onChangeText={setNewPassword}
              />
            </View>
            <Button onPress={handleResetPassword}>Confirm</Button>
          </>
        )}

        {step > 1 && step !== 3 && (
          <View>
            <Text className="text-primary/50">
              Didn't get code?{" "}
              <TouchableOpacity onPress={() => setStep(1)}>
                <Text
                  className={cn(
                    "text-primary",
                    isDarkColorScheme && "text-brand"
                  )}
                >
                  Resend code
                </Text>
              </TouchableOpacity>
            </Text>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

export default ResetPasswordScreen;
