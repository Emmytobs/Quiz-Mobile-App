import { ScrollView, View } from "react-native";
import React, { useEffect } from "react";
import { Input } from "~/components/ui/input";
import { SafeAreaView } from "~/components/SafeAreaView";
import { Button } from "~/components/ui/button";
import OAuthLoginButtons from "../components/OAuthLoginButtons";
import { Text } from "~/components/ui/text";
import { Link } from "expo-router";
import { useColorScheme } from "~/lib/useColorScheme";
import { cn } from "~/lib/utils";
import useAxios from "~/lib/hooks/axios";
import { Controller, useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import Toast from "react-native-toast-message";
import { useTranslation } from "react-i18next";

const SignupScreen = () => {
  const { isDarkColorScheme } = useColorScheme()
  const { t } = useTranslation("onboarding", { keyPrefix: "AuthScreens" });
  const axios = useAxios();
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
      try {
        const response = await axios.post(`<insert_endpoint_here>`, signupCredentials)
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
      console.log(error)
      Toast.show({
        type: 'error',
        text1: error.message
      });
    }
    if (data) console.log(data)
  }, [data, error]);
  
  return (
    <SafeAreaView>
      <ScrollView className="w-full">
        <View className="gap-y-8">
          <Controller 
            control={control}
            rules={{
              required: true
            }}
            name="fullName"
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                label={t("Full name")}
                className="lowercase"
                labelFor="fullName"
                aria-labelledbyledBy="fullName"
                aria-errormessage="inputError"
                placeholder="John Doe"
                hasError={!!errors["fullName"]}
                errorMessage={"Please enter your full name"}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
          />
          <Controller 
            control={control}
            rules={{
              required: true
            }}
            name="email"
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                label={t("Email")}
                labelFor="email"
                aria-labelledbyledBy="email"
                aria-errormessage="inputError"
                placeholder="johndoe@example.com"
                hasError={!!errors["email"]}
                errorMessage="Please enter your email"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
          />
          <Controller 
            control={control}
            rules={{
              required: true
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
                hasError={!!errors["password"]}
                errorMessage="Please enter your password"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
          />
          <Controller 
            control={control}
            rules={{
              required: true
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
                hasError={!!errors["confirmPassword"]}
                errorMessage="Please re-enter your password"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
          />

          <Button onPress={handleSubmit(onSubmit)} disabled={isPending}>{isPending ? t("Creating...") : t("Create")}</Button>
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
