// app/(drawer)/_layout.tsx
import { Drawer } from "expo-router/drawer";
import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { DrawerContentScrollView } from "@react-navigation/drawer";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

// Custom Right Drawer Content
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
            router.push("/(drawer)/profile");
          }}
        >
          <Ionicons name="person-outline" size={24} color="#fff" style={styles.drawerIcon} />
          <Text style={styles.drawerItemText}>My Profile</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.drawerItem}
          onPress={() => {
            props.navigation.closeDrawer();
            router.push("/(drawer)/settings");
          }}
        >
          <Ionicons name="settings-outline" size={24} color="#fff" style={styles.drawerIcon} />
          <Text style={styles.drawerItemText}>Settings</Text>
        </TouchableOpacity>
      </DrawerContentScrollView>
    </View>
  );
}

export default function DrawerLayout() {
  return (
    <Drawer
      screenOptions={{
        headerShown: false,
        drawerPosition: "left",
        drawerType: "front",
        drawerStyle: {
          backgroundColor: "#121212",
          width: 240,
        },
        drawerLabelStyle: { color: "#fff" },
      }}
    >
      <Drawer.Screen name="home" options={{ title: "Home" }} />
      <Drawer.Screen name="profile" options={{ title: "Profile" }} />
      <Drawer.Screen name="settings" options={{ title: "Settings" }} />
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
    fontFamily: "SpotifyCircular",
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
    fontFamily: "SpotifyCircular",
  },
});