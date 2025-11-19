import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Animated,
  Pressable,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { BlurView } from "expo-blur";
import { useFonts } from "expo-font";

export default function SettingsScreen({ onNavigate }) {
  const [darkMode, setDarkMode] = useState(true);
  const [notifications, setNotifications] = useState(true);
  const [highQuality, setHighQuality] = useState(false);

  const [fontsLoaded] = useFonts({
    SpotifyCircular: require("../../assets/fonts/CircularStd-Bold.ttf"),
  });

  if (!fontsLoaded) return null;

  const handleLogout = () => {
    console.log("Logout triggered");
  };

  const ToggleSwitch = ({ value, onChange }) => {
    const translateX = new Animated.Value(value ? 22 : 2);

    const toggle = () => {
      Animated.timing(translateX, {
        toValue: value ? 2 : 22,
        duration: 200,
        useNativeDriver: false,
      }).start();
      onChange(!value);
    };

    return (
      <Pressable
        onPress={toggle}
        style={[
          styles.toggleTrack,
          { backgroundColor: value ? "#22C55E" : "#4B5563" },
        ]}
      >
        <Animated.View style={[styles.toggleCircle, { transform: [{ translateX }] }]} />
      </Pressable>
    );
  };

  return (
    <LinearGradient
      colors={["#000000", "#121212", "#242427ff"]}
      locations={[0, 0.7, 1]}
      start={{ x: 0, y: 0.5 }}
      end={{ x: 0, y: 0 }}
      style={{ flex: 1 }}
    >
      <ScrollView
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled"
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => onNavigate("Profile")}>
            <Ionicons name="arrow-back" size={28} color="#1DB954" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Settings</Text>
        </View>

        {/* Playback */}
        <BlurView intensity={50} tint="dark" style={styles.card}>
          <Text style={styles.cardTitle}>Playback</Text>
          <View style={styles.row}>
            <Text style={styles.label}>High Quality Audio</Text>
            <ToggleSwitch value={highQuality} onChange={setHighQuality} />
          </View>
        </BlurView>

        {/* Notifications */}
        <BlurView intensity={50} tint="dark" style={styles.card}>
          <Text style={styles.cardTitle}>Notifications</Text>
          <View style={styles.row}>
            <Text style={styles.label}>Push Notifications</Text>
            <ToggleSwitch value={notifications} onChange={setNotifications} />
          </View>
        </BlurView>

        {/* Appearance */}
        <BlurView intensity={50} tint="dark" style={styles.card}>
          <Text style={styles.cardTitle}>Appearance</Text>
          <View style={styles.row}>
            <Text style={styles.label}>Dark Mode</Text>
            <ToggleSwitch value={darkMode} onChange={setDarkMode} />
          </View>
        </BlurView>

        {/* Logout */}
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: "center",
    padding: 20,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    marginBottom: 30,
  },
  headerTitle: {
    color: "#fff",
    fontSize: 32,
    fontWeight: "bold",
    marginLeft: 10,
    fontFamily: "SpotifyCircular",
  },
  card: {
    width: "90%",
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
    flexDirection: "column",
    backgroundColor: "rgba(255,255,255,0.1)",
  },
  cardTitle: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 12,
    fontFamily: "SpotifyCircular",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  label: {
    color: "#D1D5DB",
    fontSize: 16,
    fontFamily: "SpotifyCircular",
  },
  logoutButton: {
    width: "90%",
    backgroundColor: "#DC2626",
    borderRadius: 30,
    paddingVertical: 15,
    marginTop: 30,
    alignItems: "center",
  },
  logoutText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
    fontFamily: "SpotifyCircular",
  },
  toggleTrack: {
    width: 44,
    height: 22,
    borderRadius: 12,
    justifyContent: "center",
    padding: 2,
  },
  toggleCircle: {
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: "#fff",
  },
});
