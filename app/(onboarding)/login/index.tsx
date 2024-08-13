import { View } from "react-native";
import React, { useEffect } from "react";
import { Input } from "~/components/ui/input";
import { SafeAreaView } from "~/components/SafeAreaView";
import { Button } from "~/components/ui/button";
import { Text } from "~/components/ui/text";
import { Link, router } from "expo-router";
import OAuthLoginButtons from "../components/OAuthLoginButtons";
import { useColorScheme } from "~/lib/useColorScheme";
import { cn } from "~/lib/utils";
import { useTranslation } from "react-i18next";
import { useMutation } from "@tanstack/react-query";
import { Controller, useForm } from "react-hook-form";
import Toast from "react-native-toast-message";
import useAxios from "~/lib/hooks/useAxios";
import { type Session, useSession } from "~/stores/session";
import * as EmailValidator from 'email-validator';

const LoginScreen = () => {
  const { isDarkColorScheme } = useColorScheme()
  const { t } = useTranslation("onboarding", { keyPrefix: "AuthScreens" });  
  const axios = useAxios();
  const setSession = useSession(({ setSession }) => setSession)
  const defaultFormValues = {
    email: "",
    password: "",
  }
  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues: defaultFormValues,
  })
  
  const { data, error, isPending, mutate: loginUser } = useMutation({
    mutationFn: async (loginCredentials: typeof defaultFormValues) => {
      try {
        const response = await axios.post<Session>(`/authentication/login/`, loginCredentials)
        return response
      // biome-ignore lint/suspicious/noExplicitAny: <explanation>
      } catch (error: any) {
        throw new Error(error);
      }
    }
  })

  const onSubmit = (data: typeof defaultFormValues) => {
    loginUser(data);
  }

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
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
      <View className="w-full flex-1 gap-y-8">
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

        <Button onPress={handleSubmit(onSubmit)} disabled={isPending}>{isPending ? t("Logging in") : t("Login")}</Button>
        <Link href="(onboarding)/reset-password" asChild>
          <Text className="w-fit ml-auto opacity-50">{t("Forgot Password")}</Text>
        </Link>
        <OAuthLoginButtons />
        <View>
          <Text className="text-primary/50 text-center">{t("Don't have an account?")}{" "} 
            <Link href="(onboarding)/signup" asChild>
              <Text className={cn("text-primary", isDarkColorScheme && "text-brand")}>{t("Create account")}</Text>
            </Link>
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default LoginScreen;
