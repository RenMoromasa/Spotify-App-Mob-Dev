// app/(tabs)/PlaylistsScreen.tsx
import React from "react";
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  StatusBar,
  Dimensions,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

const { width } = Dimensions.get("window");

export default function PlaylistsScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const { playlistTitle, playlistId } = route.params;

  // Dummy data for tracks (replace with real API/data if needed)
  const TRACKS = [
    { id: "1", title: "bad", duration: "4:23" },
    { id: "2", title: "sunny days", duration: "4:08" },
    { id: "3", title: "peach eyes", duration: "3:05" },
    { id: "4", title: "evening glow", duration: "3:36" },
    { id: "5", title: "pink horizon", duration: "0:59" },
    { id: "6", title: "pink", duration: "4:27" },
  ];

  const renderTrack = ({ item, index }) => (
    <View style={styles.trackRow}>
      <Text style={styles.trackIndex}>{index + 1}</Text>
      <View style={{ flex: 1 }}>
        <Text style={styles.trackTitle}>{item.title}</Text>
      </View>
      <Text style={styles.trackDuration}>{item.duration}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="light-content" />
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={28} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{playlistTitle}</Text>
      </View>

      <View style={styles.albumInfo}>
        <View style={styles.coverContainer}>
          <Image
            source={require("../../assets/images/cover.jpg")}
            style={styles.albumImage}
          />
          <TouchableOpacity style={styles.playButton}>
            <Ionicons name="play" size={28} color="#fff" />
          </TouchableOpacity>
        </View>

        <Text style={styles.albumType}>Album</Text>
        <Text style={styles.albumTitle}>{playlistTitle}</Text>
        <Text style={styles.albumMeta}>
          wave to earth • 2023 • {TRACKS.length} songs
        </Text>
      </View>

      <FlatList
        data={TRACKS}
        keyExtractor={(item) => item.id}
        renderItem={renderTrack}
        contentContainerStyle={{ paddingHorizontal: 20, paddingTop: 20 }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#121212" },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  headerTitle: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
    marginLeft: 20,
  },
  albumInfo: {
    alignItems: "center",
    marginTop: 20,
  },
  coverContainer: {
    position: "relative",
  },
  albumImage: {
    width: 400,
    height: 400,
    borderRadius: 12,
    resizeMode: "cover",
  },
  playButton: {
    position: "absolute",
    bottom: 15,
    right: 15,
    backgroundColor: "#1DB954",
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  albumType: {
    color: "#b3b3b3",
    fontSize: 12,
    marginTop: 10,
  },
  albumTitle: {
    color: "#fff",
    fontSize: 32,
    fontWeight: "bold",
    marginTop: 5,
    textAlign: "center",
  },
  albumMeta: {
    color: "#b3b3b3",
    fontSize: 14,
    marginTop: 5,
  },
  trackRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 0.5,
    borderBottomColor: "#333",
  },
  trackIndex: {
    color: "#b3b3b3",
    width: 25,
  },
  trackTitle: {
    color: "#fff",
    fontSize: 16,
  },
  trackDuration: {
    color: "#b3b3b3",
    marginLeft: 10,
  },
});
