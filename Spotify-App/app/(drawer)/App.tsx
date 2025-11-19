// App.tsx
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createDrawerNavigator, DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import { Ionicons } from "@expo/vector-icons";

import SpotifyLogin from "../(auth)/login";
import SpotifySignup from "../(auth)/signup";
import HomeScreen from "./home";
import Profile from "./profile";
import Settings from "./settings";

export type RootStackParamList = {
  Login: undefined;
  Signup: undefined;
  HomeDrawer: undefined; // now home uses drawer
};

const Stack = createNativeStackNavigator<RootStackParamList>();
const Drawer = createDrawerNavigator();

// Custom Drawer Content
function CustomDrawerContent(props: any) {
  return (
    <DrawerContentScrollView {...props} style={{ backgroundColor: '#121212' }}>
      <DrawerItem
        label="Home"
        labelStyle={{ color: '#fff' }}
        onPress={() => props.navigation.navigate('Home')}
        icon={() => <Ionicons name="home-outline" size={22} color="#fff" />}
      />
      <DrawerItem
        label="Profile"
        labelStyle={{ color: '#fff' }}
        onPress={() => props.navigation.navigate('Profile')}
        icon={() => <Ionicons name="person-outline" size={22} color="#fff" />}
      />
      <DrawerItem
        label="Settings"
        labelStyle={{ color: '#fff' }}
        onPress={() => props.navigation.navigate('Settings')}
        icon={() => <Ionicons name="settings-outline" size={22} color="#fff" />}
      />
    </DrawerContentScrollView>
  );
}

