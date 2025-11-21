import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  ScrollView,
  FlatList,
  Pressable,
  Platform,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { useFonts } from "expo-font";
import { router } from "expo-router";

export default function ProfileScreen({ user = {}, onEditProfile, onNavigate }) {
  const [fontsLoaded] = useFonts({
    SpotifyCircular: require("../../assets/fonts/CircularStd-Bold.ttf"),
  });

  if (!fontsLoaded) return null;

  const playlist = [
    { id: 1, name: "PlayList 0" },
    { id: 2, name: "PlayList 1" },
    { id: 3, name: "PlayList 2" },
    { id: 4, name: "PlayList 3" },
    { id: 5, name: "PlayList 4" },
  ];

  const {
    name = "Von Rayn Malingin",
    email = "von.rayn@gmail.com",
    followers = 512,
    following = 1024,
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
          <TouchableOpacity onPress={() => router.push("/home")}>
            <Ionicons name="chevron-back" size={32} color="white" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Profile</Text>
          <TouchableOpacity onPress={() => onNavigate?.("Settings")}>
            <MaterialCommunityIcons name="dots-vertical" size={28} color="white" />
          </TouchableOpacity>
        </View>

        {/* Profile */}
        <View style={styles.profileRow}>
          <View style={styles.profileIconWrapper}>
            <Image
              source={require("../../assets/images/friend.jpg")}
              style={styles.profileIcon}
            />
          </View>
          <View style={styles.profileInfo}>
            <Text style={styles.username}>{name}</Text>
            <Text style={styles.followers}>
              <Text style={styles.boldNumber}>{followers}</Text> Followers •{" "}
              <Text style={styles.boldNumber}>{following}</Text> Following
            </Text>
            {premium && (
              <View style={styles.premiumBadge}>
                <Text style={styles.premiumText}>Premium</Text>
              </View>
            )}
          </View>
        </View>

        {/* Edit Button */}
        <TouchableOpacity style={styles.editProfile} onPress={onEditProfile}>
          <Text style={styles.editButtonText}>Edit Profile</Text>
        </TouchableOpacity>

        {/* Playlists */}
        <View style={styles.box2}>
          <Text style={styles.sectionTitle}>Playlists</Text>
          <FlatList
            data={playlist}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <Pressable style={styles.listItem}>
                <View style={styles.listThumb}>
                  <Image
                    source={require("@/assets/images/background.jpg")}
                    style={styles.listThumb}
                  />
                </View>
                <View style={styles.listTextContainer}>
                  <Text style={styles.listText}>{item.name}</Text>
                  <Text style={styles.listSubText}>Playlist • User</Text>
                </View>
              </Pressable>
            )}
          />
        </View>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingTop: Platform.OS === "ios" ? 60 : 40,
    paddingBottom: 40,
    paddingHorizontal: 10,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  headerTitle: {
    color: "#fff",
    fontSize: 28,
    fontFamily: "SpotifyCircular",
    fontWeight: "bold",
  },
  profileRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  profileIconWrapper: {
    width: 120,
    height: 120,
    borderRadius: 60,
    overflow: "hidden",
    backgroundColor: "green",
  },
  profileIcon: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  profileInfo: {
    marginLeft: 15,
    flex: 1,
  },
  username: {
    color: "white",
    fontSize: 25,
    fontWeight: "bold",
    fontFamily: "SpotifyCircular",
  },
  followers: {
    color: "#B3B3B3",
    fontSize: 13,
    marginTop: 4,
  },
  boldNumber: {
    fontWeight: "bold",
    color: "white",
  },
  premiumBadge: {
    backgroundColor: "#FACC15",
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 4,
    marginTop: 8,
    alignSelf: "flex-start",
  },
  premiumText: {
    color: "#000",
    fontSize: 14,
    fontWeight: "600",
    fontFamily: "SpotifyCircular",
  },
  editProfile: {
    width: "100%",
    backgroundColor: "#22C55E",
    borderRadius: 30,
    paddingVertical: 14,
    alignItems: "center",
    marginBottom: 20,
  },
  editButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
    fontFamily: "SpotifyCircular",
  },
  box2: {
    flex: 1,
  },
  sectionTitle: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  listItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#222",
  },
  listThumb: {
    width: 80,
    height: 80,
    backgroundColor: "blue",
    marginRight: 15,
  },
  listTextContainer: {
    flexDirection: "column",
  },
  listText: {
    fontSize: 16,
    color: "white",
    fontWeight: "500",
  },
  listSubText: {
    fontSize: 13,
    color: "#aaa",
  },
});
