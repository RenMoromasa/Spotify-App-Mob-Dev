import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';

import { Ionicons } from '@expo/vector-icons';
import { HapticTab } from '@/components/HapticTab';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { NavigationContainer } from "@react-navigation/native";
import AuthStack from "./StackNavigator";


export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    
    <Tabs
      screenOptions={{
        headerShown: false,

        tabBarStyle: { display: 'none' }, 

        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
      }}
    >

      {/* HOME */}
      <Tabs.Screen name="index" options={{ title: 'Home' }} />

      {/* EXPLORE */}
      <Tabs.Screen name="explore" options={{ title: 'Explore' }} />

      {/* PROFILE */}
      <Tabs.Screen name="ProfileScreen" options={{ title: 'Profile' }} />

      {/* Hidden Extra Screens */}
      <Tabs.Screen name="PlaylistsScreen" options={{ href: null }} />
      <Tabs.Screen name="SettingsScreen" options={{ href: null }} />
      <Tabs.Screen name="SpotifyLogin" options={{ href: null }} />
      <Tabs.Screen name="SpotifySignup" options={{ href: null }} />

      {/* Optional Showcase */}
      <Tabs.Screen name="component-showcase" options={{ href: null }} />

    </Tabs>
  );
}
