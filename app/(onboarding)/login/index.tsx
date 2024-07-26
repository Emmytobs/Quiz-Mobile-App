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
import useAxios from "~/lib/hooks/axios";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod"
import { Session, useSession } from "~/stores/session";

const loginSchema = z.object({
  email: z.string().email({
    message: "Please enter your email",
  }),
  password: z
    .string({ 
      message: "Please enter your password",
    })
    .min(4, { message: "Password must contain at least 4 characters" }),
})

const LoginScreen = () => {
  const { isDarkColorScheme } = useColorScheme()
  const { t } = useTranslation("onboarding", { keyPrefix: "AuthScreens" });
  const axios = useAxios();
  const setSession = useSession(({ setSession }) => setSession)
  const defaultFormValues = {
    email: "test3@email1.com",
    password: "newpassword",
  }
  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues: defaultFormValues,
    resolver: zodResolver(loginSchema)
  })
  
  const { data, error, isPending, mutate: loginUser } = useMutation({
    mutationFn: async (loginCredentials: typeof defaultFormValues) => {
      try {
        const response = await axios.post<Session>(`/authentication/login/`, loginCredentials)
        return response
      } catch (error) {
        throw new Error(error as any);
      }
    }
  })

  const onSubmit = (data: typeof defaultFormValues) => {
    loginUser(data);
  }

  useEffect(() => {
    if (error) {
      console.log(error)
      Toast.show({
        type: 'error',
        text1: error.message
      });
    }
    if (data) {
      // console.log(data)
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
              hasError={!!errors.password}
              errorMessage={errors.password?.message}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
        />

        <Button onPress={handleSubmit(onSubmit)} disabled={isPending}>{isPending ? t("Logging in") : t("Login")}</Button>
        <Link href="(auth)/reset-password" asChild>
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
