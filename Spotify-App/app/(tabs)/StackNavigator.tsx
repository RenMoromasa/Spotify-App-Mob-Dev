import React from "react";
import { createStackNavigator, CardStyleInterpolators } from "@react-navigation/stack";
import SpotifyLogin from "./SpotifyLogin";
import SpotifySignup from "./SpotifySignup";

const Stack = createStackNavigator();

export default function AuthStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Login" component={SpotifyLogin} />
      <Stack.Screen
        name="Signup"
        component={SpotifySignup}
        options={{
          cardStyleInterpolator: CardStyleInterpolators.forFadeFromBottomAndroid,
          transitionSpec: {
            open: { animation: "timing", config: { duration: 200 } },
            close: { animation: "timing", config: { duration: 200 } },
          },
        }}
      />
    </Stack.Navigator>
  );
}