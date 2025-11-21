import { StyleSheet, Text, View, Pressable, ScrollView } from "react-native";
import React from "react";
import { router } from "expo-router";

import Feather from "@expo/vector-icons/Feather";
import Ionicons from "@expo/vector-icons/Ionicons";
import AntDesign from "@expo/vector-icons/AntDesign";
import Foundation from "@expo/vector-icons/Foundation";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

export default function Settings() {
  return (
    <View style={styles.container}>
      {/* HEADER */}
      <View style={styles.topBar}>
        <Pressable onPress={() => router.back()}>
          <Ionicons name="chevron-back" size={24} color="white" />
        </Pressable>

        <Text style={styles.title}>Settings</Text>

        <Pressable>
          <FontAwesome name="search" size={22} color="white" />
        </Pressable>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* ACCOUNT */}
        <Pressable
          style={styles.item}
          onPress={() => router.push("/(tabs)/settings/AccountScreen")}
        >
          <MaterialCommunityIcons name="account-circle-outline" size={26} color="white" />
          <View style={styles.itemText}>
            <Text style={styles.itemTitle}>Account</Text>
            <Text style={styles.itemSubtitle}>Username • Close account</Text>
          </View>
        </Pressable>

        {/* CONTENT & DISPLAY */}
        <Pressable
          style={styles.item}
          onPress={() => router.push("/(tabs)/settings/ContentDisplayScreen")}
        >
          <MaterialCommunityIcons name="music-note-half" size={26} color="white" />
          <View style={styles.itemText}>
            <Text style={styles.itemTitle}>Content and display</Text>
            <Text style={styles.itemSubtitle}>Canvas • App language</Text>
          </View>
        </Pressable>

        {/* PLAYBACK */}
        <Pressable
          style={styles.item}
          onPress={() => router.push("/(tabs)/settings/PlaybackScreen")}
        >
          <AntDesign name="sound" size={26} color="white" />
          <View style={styles.itemText}>
            <Text style={styles.itemTitle}>Playback</Text>
            <Text style={styles.itemSubtitle}>High quality • Gapless</Text>
          </View>
        </Pressable>

        {/* PRIVACY */}
        <Pressable
          style={styles.item}
          onPress={() => router.push("/(tabs)/settings/PrivacyScreen")}
        >
          <Feather name="lock" size={26} color="white" />
          <View style={styles.itemText}>
            <Text style={styles.itemTitle}>Privacy and social</Text>
            <Text style={styles.itemSubtitle}>Private session • Sharing</Text>
          </View>
        </Pressable>

        {/* NOTIFICATIONS */}
        <Pressable
          style={styles.item}
          onPress={() => router.push("/(tabs)/settings/NotificationsScreen")}
        >
          <Ionicons name="notifications-outline" size={26} color="white" />
          <View style={styles.itemText}>
            <Text style={styles.itemTitle}>Notifications</Text>
            <Text style={styles.itemSubtitle}>Push • Email</Text>
          </View>
        </Pressable>

        {/* APPS & DEVICES */}
        <Pressable
          style={styles.item}
          onPress={() => router.push("/(tabs)/settings/DevicesScreen")}
        >
          <MaterialIcons name="computer" size={26} color="white" />
          <View style={styles.itemText}>
            <Text style={styles.itemTitle}>Apps and devices</Text>
            <Text style={styles.itemSubtitle}>Spotify Connect • Devices</Text>
          </View>
        </Pressable>

        {/* DATA SAVER */}
        <Pressable
          style={styles.item}
          onPress={() => router.push("/(tabs)/settings/DataSaverScreen")}
        >
          <MaterialCommunityIcons name="download-circle-outline" size={26} color="white" />
          <View style={styles.itemText}>
            <Text style={styles.itemTitle}>Data-saving and offline</Text>
            <Text style={styles.itemSubtitle}>Data saver • Offline mode</Text>
          </View>
        </Pressable>

        {/* MEDIA QUALITY */}
        <Pressable
          style={styles.item}
          onPress={() => router.push("/(tabs)/settings/MediaQualityScreen")}
        >
          <Foundation name="graph-bar" size={26} color="white" />
          <View style={styles.itemText}>
            <Text style={styles.itemTitle}>Media quality</Text>
            <Text style={styles.itemSubtitle}>Wi-Fi • Cellular</Text>
          </View>
        </Pressable>

        {/* ABOUT */}
        <Pressable
          style={styles.item}
          onPress={() => router.push("/(tabs)/settings/AboutSupportScreen")}
        >
          <AntDesign name="exclamationcircleo" size={26} color="white" />
          <View style={styles.itemText}>
            <Text style={styles.itemTitle}>About and support</Text>
            <Text style={styles.itemSubtitle}>Version • Help</Text>
          </View>
        </Pressable>

        {/* LOGOUT */}
        <Pressable style={styles.logoutButton} onPress={() => router.push("/")}>
          <Text style={styles.logoutText}>Log out</Text>
        </Pressable>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#121212", paddingTop: 30 },
  topBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 15,
    paddingVertical: 14,
    borderBottomColor: "#2a2a2a",
    borderBottomWidth: 0.5,
  },
  title: { fontSize: 18, fontWeight: "700", color: "white" },
  scrollContent: { paddingVertical: 10 },
  item: {
    flexDirection: "row",
    alignItems: "center",
    padding: 18,
    borderBottomColor: "#2a2a2a",
    borderBottomWidth: 0.5,
  },
  itemText: { marginLeft: 15, flex: 1 },
  itemTitle: { color: "white", fontSize: 16, fontWeight: "600" },
  itemSubtitle: { color: "#b3b3b3", fontSize: 13, marginTop: 2 },
  logoutButton: {
    marginTop: 40,
    marginHorizontal: 120,
    backgroundColor: "white",
    paddingVertical: 15,
    borderRadius: 25,
    alignItems: "center",
  },
  logoutText: { color: "black", fontSize: 16, fontWeight: "700" },
});
