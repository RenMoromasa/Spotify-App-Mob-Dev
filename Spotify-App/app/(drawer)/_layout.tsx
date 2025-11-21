// app/(drawer)/_layout.tsx
import { Drawer } from "expo-router/drawer";
import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { DrawerContentScrollView } from "@react-navigation/drawer";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

// Custom Drawer Content
function CustomDrawerContent(props: any) {
  return (
    <View style={styles.drawerContainer}>
      <DrawerContentScrollView {...props} style={styles.drawerScrollView}>
        <View style={styles.drawerHeader}>
          <Text style={styles.drawerHeaderText}>Menu</Text>
        </View>

        {/* Home */}
        <TouchableOpacity
          style={styles.drawerItem}
          onPress={() => {
            props.navigation.closeDrawer();
            router.push("/(drawer)/home");
          }}
        >
          <Ionicons name="home-outline" size={24} color="#fff" style={styles.drawerIcon} />
          <Text style={styles.drawerItemText}>Home</Text>
        </TouchableOpacity>

        {/* What's New */}
        <TouchableOpacity
          style={styles.drawerItem}
          onPress={() => {
            props.navigation.closeDrawer();
            router.push("/(drawer)/whats-new");
          }}
        >
          <Ionicons name="flame-outline" size={24} color="#fff" style={styles.drawerIcon} />
          <Text style={styles.drawerItemText}>What's New</Text>
        </TouchableOpacity>

        {/* Recents */}
        <TouchableOpacity
          style={styles.drawerItem}
          onPress={() => {
            props.navigation.closeDrawer();
            router.push("/(drawer)/recents");
          }}
        >
          <Ionicons name="time-outline" size={24} color="#fff" style={styles.drawerIcon} />
          <Text style={styles.drawerItemText}>Recents</Text>
        </TouchableOpacity>

        {/* Settings & Privacy */}
        <TouchableOpacity
          style={styles.drawerItem}
          onPress={() => {
            props.navigation.closeDrawer();
            router.push("/(drawer)/SettingsScreen");
          }}
        >
          <Ionicons name="settings-outline" size={24} color="#fff" style={styles.drawerIcon} />
          <Text style={styles.drawerItemText}>Settings & Privacy</Text>
        </TouchableOpacity>
      </DrawerContentScrollView>
    </View>
  );
}

export default function DrawerLayout() {
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
          fontFamily: "CircularStd", // 🔥 font change here
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
    fontWeight: "bold",
    fontFamily: "CircularStd", // 🔥 use Circular Std here too
  },
  drawerItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 15,
    marginVertical: 2,
  },
  drawerIcon: {
    marginRight: 15,
    width: 24,
  },
  drawerItemText: {
    color: "#fff",
    fontSize: 16,
    fontFamily: "CircularStd", // 🔥 changed
  },
});
