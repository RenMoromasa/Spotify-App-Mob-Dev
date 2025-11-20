import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SpotifyLogin from "./SpotifyLogin"; 
import HomeScreen from "./PlaylistsScreen";
import SignupScreen from "./SpotifySignup";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator 
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Login" component={SpotifyLogin} />
        <Stack.Screen name="Home" component={PlaylistScreen} />
        <Stack.Screen name="Signup" component={SignupScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
