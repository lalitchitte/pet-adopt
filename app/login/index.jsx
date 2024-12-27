import { View, Text, Image, Pressable } from "react-native";
import React, { useCallback, useEffect } from "react";
import Colors from "@/constants/Colors";
import * as WebBrowser from "expo-web-browser";
import { Link, router } from "expo-router";
import { useOAuth } from "@clerk/clerk-expo";
import * as Linking from "expo-linking";

export const useWarmUpBrowser = () => {
  useEffect(() => {
    // Warm up the android browser to improve UX
    // https://docs.expo.dev/guides/authentication/#improving-user-experience
    void WebBrowser.warmUpAsync();
    return () => {
      void WebBrowser.coolDownAsync();
    };
  }, []);
};

WebBrowser.maybeCompleteAuthSession();

const LoginScreen = () => {
  useWarmUpBrowser();
  const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });

  const onPress = useCallback(async () => {
    try {
      const { createdSessionId, signIn, signUp, setActive } =
        await startOAuthFlow({
          redirectUrl: Linking.createURL("/(tabs)/home", {
            scheme: "myapp",
          }),
        });

      if (createdSessionId) {
      } else {
        // Use signIn or signUp returned from startOAuthFlow
        // for next steps, such as MFA
      }
    } catch (err) {
      console.error("OAuth Error", err.message);
    }
  }, []);

  return (
    <View
      style={{
        backgroundColor: "white",
        height: "100%",
      }}
    >
      <Image
        style={{ width: "100%", height: 400 }}
        source={require("./../../assets/images/login.png")}
      />

      <View
        style={{
          padding: 20,
          display: "flex",
          alignItems: "center",
        }}
      >
        <Text
          style={{
            fontFamily: "outfit-bold",
            fontSize: 30,
            textAlign: "center",
          }}
        >
          Ready to make a new friend
        </Text>
        <Text
          style={{
            fontFamily: "outfit",
            color: Colors.GRAY,
            fontSize: 18,
            textAlign: "center",
          }}
        >
          Let's adopt the pet which you like and make there life happy again
        </Text>

        <Pressable
          style={{
            padding: 14,
            backgroundColor: Colors.PRIMARY,
            width: "100%",
            borderRadius: 14,
            marginTop: 30,
          }}
          onPress={() => {
            router.push("/(tabs)/home");
          }}
        >
          <Text
            style={{
              fontFamily: "outfit-medium",
              textAlign: "center",
              fontSize: 20,
            }}
          >
            Get Started
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

export default LoginScreen;
