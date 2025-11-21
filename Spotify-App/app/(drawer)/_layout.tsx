// app/(drawer)/_layout.tsx
import { Drawer } from "expo-router/drawer";
import { Slot } from "expo-router";
import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { DrawerContentScrollView } from "@react-navigation/drawer";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useFonts } from "expo-font";
import { createStackNavigator, CardStyleInterpolators } from "@react-navigation/stack";
import SignUpScreen from "../(tabs)/SpotifySignup";

const Stack = createStackNavigator();

function SignUpStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="SignUp"
        component={SignUpScreen}
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

export default function DrawerRoot() {
  const [fontsLoaded] = useFonts({
    SpotifyCircular: require("../../assets/fonts/CircularStd-Bold.ttf"),
  });

  if (!fontsLoaded) return null;

  return <DrawerLayout />;
}

function CustomDrawerContent(props: any) {
  return (
    <View style={styles.drawerContainer}>
      <DrawerContentScrollView {...props} style={styles.drawerScrollView}>
        <View style={styles.drawerHeader}>
          <Text style={styles.drawerHeaderText}>Menu</Text>
        </View>

        <TouchableOpacity
          style={styles.drawerItem}
          onPress={() => {
            props.navigation.closeDrawer();
            router.push("/(drawer)/home");
          }}
        >
          <Ionicons name="home-outline" size={24} color="#fff" />
          <Text style={styles.drawerItemText}>Home</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.drawerItem}
          onPress={() => {
            props.navigation.closeDrawer();
            // router.push("/(drawer)/whats-new");
          }}
        >
          <Ionicons name="flame-outline" size={24} color="#fff" />
          <Text style={styles.drawerItemText}>What's New</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.drawerItem}
          onPress={() => {
            props.navigation.closeDrawer();
            // router.push("/(drawer)/recents");
          }}
        >
          <Ionicons name="time-outline" size={24} color="#fff" />
          <Text style={styles.drawerItemText}>Recents</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.drawerItem}
          onPress={() => {
            props.navigation.closeDrawer();
            router.push("/(drawer)/SettingsScreen");
          }}
        >
          <Ionicons name="settings-outline" size={24} color="#fff" />
          <Text style={styles.drawerItemText}>Settings & Privacy</Text>
        </TouchableOpacity>
      </DrawerContentScrollView>
    </View>
  );
}

// ------------------------
// Drawer Layout
// ------------------------
function DrawerLayout() {
  return (
    <Drawer
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        headerShown: false,
        drawerPosition: "left",
        drawerType: "front",
        drawerStyle: {
          backgroundColor: "#121212",
          width: 260,
        },
        drawerLabelStyle: {
          color: "#fff",
          fontFamily: "SpotifyCircular",
        },
      }}
    >
      <Drawer.Screen name="home" options={{ title: "Home" }} />
      <Drawer.Screen name="whats-new" options={{ title: "What's New" }} />
      <Drawer.Screen name="recents" options={{ title: "Recents" }} />
      <Drawer.Screen name="settings" options={{ title: "Settings & Privacy" }} />
    </Drawer>
  );
}

// ------------------------
// STYLES
// ------------------------
const styles = StyleSheet.create({
  drawerContainer: {
    flex: 1,
    backgroundColor: "#121212",
  },
  drawerScrollView: {
    backgroundColor: "#121212",
  },
  drawerHeader: {
    paddingHorizontal: 20,
    paddingVertical: 30,
    borderBottomWidth: 1,
    borderBottomColor: "#333",
    marginBottom: 10,
  },
  drawerHeaderText: {
    color: "#fff",
    fontSize: 24,
    fontFamily: "SpotifyCircular",
  },
  drawerItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 15,
    marginVertical: 2,
  },
  drawerItemText: {
    color: "#fff",
    fontSize: 16,
    fontFamily: "SpotifyCircular",
    marginLeft: 10,
  },
});
