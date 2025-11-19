import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  ScrollView,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useFonts } from "expo-font";

export default function ProfileScreen({ user = {}, onEditProfile, onNavigate }) {
  const [fontsLoaded] = useFonts({
    SpotifyCircular: require("../../assets/fonts/CircularStd-Bold.ttf"),
  });

  if (!fontsLoaded) return null;
  
  const {
    name = "Von Rayn Malingin",
    email = "von.rayn@gmail.com",
    followers = 0,
    following = 0,
    premium = false,
  } = user;

  return (
    <LinearGradient
      colors={["#000000", "#121212", "#242427ff"]}
      locations={[0, 0.7, 1]}
      start={{ x: 0, y: 0.5 }}
      end={{ x: 0, y: 0 }}
      style={{ flex: 1 }}
    >
      <ScrollView contentContainerStyle={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Profile</Text>
          <TouchableOpacity onPress={() => onNavigate?.("Settings")}>
            <Ionicons name="settings-outline" size={28} color="#fff" />
          </TouchableOpacity>
        </View>

        {/* Profile Picture */}
        <View style={styles.profileContainer}>
          <View style={styles.imageWrapper}>
            <Image
              source={require("C:/Users/Ren/Documents/Github/Spotify-App/Spotify-App-Mob-Dev/Spotify-App/assets/images/friend.jpg")}
              style={styles.profileImage}
            />
            <TouchableOpacity
              style={styles.cameraButton}
              onPress={onEditProfile}
            >
              <Ionicons name="camera" size={20} color="#fff" />
            </TouchableOpacity>
          </View>

          <Text style={styles.name}>{name}</Text>
          <Text style={styles.email}>{email}</Text>

          {premium && (
            <View style={styles.premiumBadge}>
              <Text style={styles.premiumText}>Premium</Text>
            </View>
          )}

          {/* Followers / Following */}
          <View style={styles.followRow}>
            <View style={styles.followBlock}>
              <Text style={styles.followNumber}>
                {followers.toLocaleString()}
              </Text>
              <Text style={styles.followLabel}>Followers</Text>
            </View>
            <View style={styles.followBlock}>
              <Text style={styles.followNumber}>
                {following.toLocaleString()}
              </Text>
              <Text style={styles.followLabel}>Following</Text>
            </View>
          </View>
        </View>

        {/* Edit Profile Button */}
        <TouchableOpacity
          style={styles.editButton}
          onPress={onEditProfile}
        >
          <Text style={styles.editButtonText}>Edit Profile</Text>
        </TouchableOpacity>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: "center",
    paddingTop: Platform.OS === "ios" ? 60 : 40,
    paddingBottom: 40,
  },
  header: {
    width: "90%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 30,
  },
  headerTitle: {
    color: "#fff",
    fontSize: 28,
    fontFamily: "SpotifyCircular",
    fontWeight: "bold",
  },
  profileContainer: {
    alignItems: "center",
    width: "100%",
  },
  imageWrapper: {
    position: "relative",
  },
  profileImage: {
    width: 128,
    height: 128,
    borderRadius: 64,
    borderWidth: 4,
    borderColor: "#fff",
  },
  cameraButton: {
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: "#22C55E",
    padding: 8,
    borderRadius: 20,
  },
  name: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
    fontFamily: "SpotifyCircular",
    marginTop: 16,
  },
  email: {
    color: "#D1D5DB",
    fontSize: 16,
    marginTop: 4,
    fontFamily: "SpotifyCircular",
  },
  premiumBadge: {
    backgroundColor: "#FACC15",
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 4,
    marginTop: 8,
  },
  premiumText: {
    color: "#000",
    fontSize: 14,
    fontWeight: "600",
    fontFamily: "SpotifyCircular",
  },
  followRow: {
    flexDirection: "row",
    marginTop: 16,
    justifyContent: "center",
    width: "80%",
    marginBottom: 20,
  },
  followBlock: {
    flex: 1,
    alignItems: "center",
  },
  followNumber: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    fontFamily: "SpotifyCircular",
  },
  followLabel: {
    color: "#D1D5DB",
    fontSize: 14,
    fontFamily: "SpotifyCircular",
  },
  editButton: {
    width: "90%",
    backgroundColor: "#22C55E",
    borderRadius: 30,
    paddingVertical: 14,
    alignItems: "center",
  },
  editButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
    fontFamily: "SpotifyCircular",
  },
});
