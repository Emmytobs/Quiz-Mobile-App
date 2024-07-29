import { ScrollView, View } from "react-native";
import React, { useEffect } from "react";
import { Input } from "~/components/ui/input";
import { SafeAreaView } from "~/components/SafeAreaView";
import { Button } from "~/components/ui/button";
import OAuthLoginButtons from "../components/OAuthLoginButtons";
import { Text } from "~/components/ui/text";
import { Link, router } from "expo-router";
import { useColorScheme } from "~/lib/useColorScheme";
import { cn } from "~/lib/utils";
import useAxios from "~/lib/hooks/useAxios";
import { Controller, useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import Toast from "react-native-toast-message";
import { useTranslation } from "react-i18next";
import { useSession } from "~/stores/session";
import * as EmailValidator from 'email-validator';

const SignupScreen = () => {
  const { isDarkColorScheme } = useColorScheme()
  const { t } = useTranslation("onboarding", { keyPrefix: "AuthScreens" });
  const axios = useAxios();
  const setSession = useSession(({ setSession }) => setSession)
  const defaultFormValues = {
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  }
  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues: defaultFormValues,
  })
  
  const { data, error, isPending, mutate: signupUser } = useMutation({
    mutationFn: async (signupCredentials: typeof defaultFormValues) => {
      const { fullName: full_name, email, password: password1, confirmPassword: password2 } = signupCredentials
      try {
        const response = await axios.post(
          `/authentication/sign-up/`, 
          { full_name, email, password1, password2 }
        )
        return response
      } catch (error) {
        throw new Error(error as any);
      }
    }
  })

  const onSubmit = (data: typeof defaultFormValues) => {
    signupUser(data);
  }

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
  }, [data, error]);
  
  return (
    <SafeAreaView>
      <ScrollView className="w-full">
        <View className="gap-y-8">
          <Controller 
            control={control}
            rules={{
              required: {
                message: t("Please enter your full name"),
                value: true
              },
            }}
            name="fullName"
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                label={t("Full name")}
                labelFor="fullName"
                aria-labelledbyledBy="fullName"
                aria-errormessage="inputError"
                placeholder="John Doe"
                hasError={!!errors.fullName}
                errorMessage={errors.fullName?.message}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
          />
          <Controller 
            control={control}
            rules={{
              required: {
                message: t("Please enter a valid email"),
                value: true
              },
              validate: {
                invalidEmail: (value) => {
                  return EmailValidator.validate(value) || t("Please enter a valid email")
                }
              }
            }}
            name="email"
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                label={t("Email")}
                labelFor="email"
                aria-labelledbyledBy="email"
                aria-errormessage="inputError"
                placeholder="johndoe@example.com"
                hasError={!!errors.email}
                errorMessage={errors.email?.message}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
          />
          <Controller 
            control={control}
            rules={{
              required: {
                message: t("Please enter your password"),
                value: true,
              },
              minLength: {
                message: t("Password must contain at least 4 characters"),
                value: 4
              }
            }}
            name="password"
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                label={t("Password")}
                labelFor="password"
                aria-labelledbyledBy="password"
                aria-errormessage="inputError"
                placeholder="* * * * * *"
                secureTextEntry
                hasError={!!errors.password}
                errorMessage={errors.password?.message}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
          />
          <Controller 
            control={control}
            rules={{
              required: {
                message: t("Please re-enter your password"),
                value: true,
              },
              validate: {
                passwordMismatch: (value, formValues) => {
                  return value === formValues.password || t("Passwords don't match")
                }
              }
            }}
            name="confirmPassword"
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                label={t("Confirm Password")}
                labelFor="confirmPassword"
                aria-labelledbyledBy="confirmPassword"
                aria-errormessage="inputError"
                placeholder="* * * * * *"
                secureTextEntry
                hasError={!!errors.confirmPassword}
                errorMessage={errors.confirmPassword?.message}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
          />

          <Button onPress={handleSubmit(onSubmit)} disabled={isPending}>{isPending ? t("Creating") : t("Create")}</Button>
          <OAuthLoginButtons />
          <View>
            <Text className="text-primary/50 text-center">{t("Already have an account?")} {" "}
              <Link href="(onboarding)/login" asChild>
                <Text className={cn("text-primary", isDarkColorScheme && "text-brand")}>{t("Login")}</Text>
              </Link>
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignupScreen;
