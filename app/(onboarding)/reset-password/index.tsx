import { View, TouchableOpacity, TextInput } from "react-native";
import React, { useState, useRef, useEffect } from "react";
import { Input } from "~/components/ui/input";
import { SafeAreaView } from "~/components/SafeAreaView";
import { Button } from "~/components/ui/button";
import { Text } from "~/components/ui/text";
import { useColorScheme } from "~/lib/useColorScheme";
import { cn } from "~/lib/utils";
import { Link, router } from "expo-router";
import { useMutation } from "@tanstack/react-query";
import useAxios from "~/lib/hooks/useAxios";
import Toast from "react-native-toast-message";
import { useTranslation } from "react-i18next";
import { Controller, useForm } from "react-hook-form";

const OTPInput = ({ length, value, onChange }) => {
  const inputs = useRef([]);

  const focusNext = (index) => {
    if (index < length - 1 && inputs.current[index + 1]) {
      inputs.current[index + 1].focus();
    }
  };

  const focusPrevious = (index) => {
    if (index > 0 && inputs.current[index - 1]) {
      inputs.current[index - 1].focus();
    }
  };

  const handleChange = (text, index) => {
    const newOTP = value.split("");
    newOTP[index] = text;
    onChange(newOTP.join(""));

    if (text !== "") {
      focusNext(index);
    }
  };

  return (
    <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
      {Array(length)
        .fill()
        .map((_, index) => (
          <TextInput
            key={index}
            ref={(ref) => (inputs.current[index] = ref)}
            style={{
              width: 40,
              height: 50,
              borderColor: "gray",
              borderWidth: 1,
              textAlign: "center",
              fontSize: 18,
            }}
            keyboardType="number-pad"
            maxLength={1}
            value={value[index] || ""}
            onChangeText={(text) => handleChange(text, index)}
            onKeyPress={({ nativeEvent }) => {
              if (nativeEvent.key === "Backspace" && !value[index]) {
                focusPrevious(index);
              }
            }}
          />
        ))}
    </View>
  );
};

const ResetPasswordScreen = () => {
  const { isDarkColorScheme } = useColorScheme();
  const { t } = useTranslation("onboarding", { keyPrefix: "AuthScreens" });
  const axios = useAxios();
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const sendOtpMutation = useMutation({
    mutationFn: async (email) => {
      try {
        const response = await axios.post("/authentication/otp/send_otp/", {
          address: email,
          otp_type: "FORGOT_PASSWORD",
          channel: "email",
        });
        return response.data;
      } catch (error) {
        throw new Error(error.response?.data?.message || error.message);
      }
    },
  });

  const validateOtpMutation = useMutation({
    mutationFn: async (otpData) => {
      const { address, otp } = otpData;
      try {
        const response = await axios.post("/authentication/otp/validate_otp/", {
          address,
          otp,
        });
        return response.data;
      } catch (error) {
        throw new Error(error.response?.data?.message || error.message);
      }
    },
  });

  const resetPasswordMutation = useMutation({
    mutationFn: async (resetCredentials) => {
      const { email, otp, newPassword } = resetCredentials;
      try {
        const response = await axios.post(`/authentication/reset_password/`, {
          address: email,
          otp,
          newPassword,
        });
        return response.data;
      } catch (error) {
        throw new Error(error.response?.data?.message || error.message);
      }
    },
  });

  const handleSendCode = () => {
    sendOtpMutation.mutate(email, {
      onSuccess: () => setStep(2),
      onError: (error) => {
        Toast.show({
          type: "error",
          text1: error.message || "Failed to send OTP. Please try again.",
        });
      },
    });
  };

  const handleVerifyOtp = () => {
    validateOtpMutation.mutate(
      { address: email, otp },
      {
        onSuccess: () => setStep(3),
        onError: (error) => {
          Toast.show({
            type: "error",
            text1: error.message || "Invalid OTP. Please try again.",
          });
        },
      }
    );
  };

  const handleResetPassword = () => {
    resetPasswordMutation.mutate(
      { email, otp, newPassword },
      {
        onSuccess: (data) => {
          Toast.show({
            type: "success",
            text1: "Password reset successfully",
          });
          router.replace("(auth)/login");
        },
        onError: (error) => {
          Toast.show({
            type: "error",
            text1:
              error.message || "Failed to reset password. Please try again.",
          });
        },
      }
    );
  };

  useEffect(() => {
    if (sendOtpMutation.isError) {
      Toast.show({
        type: "error",
        text1:
          sendOtpMutation.error.message ||
          "An error occurred. Please try again.",
      });
    }
    if (validateOtpMutation.isError) {
      Toast.show({
        type: "error",
        text1:
          validateOtpMutation.error.message ||
          "An error occurred. Please try again.",
      });
    }
    if (resetPasswordMutation.isError) {
      Toast.show({
        type: "error",
        text1:
          resetPasswordMutation.error.message ||
          "An error occurred. Please try again.",
      });
    }
  }, [
    sendOtpMutation.isError,
    validateOtpMutation.isError,
    resetPasswordMutation.isError,
  ]);

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
            <Controller
              control={control}
              name="email"
              rules={{
                required: t("Please enter your email address"),
                pattern: {
                  value: /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/,
                  message: t("Please enter a valid email address"),
                },
              }}
              render={({ field: { onChange, value } }) => (
                <Input
                  label={t("Email Address")}
                  placeholder="Email address"
                  value={value}
                  onChangeText={onChange}
                  errorMessage={errors.email?.message}
                />
              )}
            />
            <Button
              onPress={handleSendCode}
              disabled={sendOtpMutation.isLoading}
            >
              Send Code
            </Button>
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
              Enter the code we sent to {email}
            </Text>
            <OTPInput length={6} value={otp} onChange={setOtp} />
            <Button onPress={handleVerifyOtp}>Verify OTP</Button>
          </>
        )}

        {step === 3 && (
          <>
            <Text className="text-primary/50 text-[1em] mb-0">
              Should contain a minimum of 8 characters including 1 uppercase, 1
              lowercase, and 1 digit number.
            </Text>
            <View className="mb-[7em]">
              <Input
                label={t("New Password")}
                placeholder="New password"
                secureTextEntry
                value={newPassword}
                onChangeText={setNewPassword}
                className="my-[1.5em]"
              />
              <Button
                onPress={handleResetPassword}
                disabled={resetPasswordMutation.isLoading}
              >
                {resetPasswordMutation.isLoading
                  ? t("Resetting...")
                  : t("Reset Password")}
              </Button>
            </View>
          </>
        )}
      </View>
    </SafeAreaView>
  );
};

export default ResetPasswordScreen;
