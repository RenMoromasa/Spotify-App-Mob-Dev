import React, { useRef, useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  TextInput,
  StatusBar,
  Dimensions,
  ScrollView,
  Animated,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

export default function HomeScreen() {
  const navigation = useNavigation();
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState("All");

  // --- Dynamic Constants DEFINED HERE ---
  const { width } = Dimensions.get("window");
  const SONG_CARD_SIZE = width * 0.4;
  const ARTIST_CARD_SIZE = 100;
  const ALBUM_CARD_SIZE = width * 0.6;
  // -------------------------------------

  // Fake data
  const TRENDING_SONGS = [
    { id: "1", title: "Song One", artist: "Artist A", image: "https://i.scdn.co/image/ab67616d0000b273c0c2e5.jpg" },
    { id: "2", title: "Song Two", artist: "Artist B", image: "https://i.scdn.co/image/ab67616d0000b27398b2d7.jpg" },
  ];
  const POPULAR_ARTISTS = [
    { id: "1", name: "Artist A", image: "https://i.scdn.co/image/ab6761610000e5eb3efc6.jpg" },
    { id: "2", name: "Artist B", image: "https://i.scdn.co/image/ab6761610000e5eb71234.jpg" },
  ];
  const ALBUMS = [
    { id: "1", title: "Album One", image: "https://i.scdn.co/image/ab67616d0000b273abcdef.jpg" },
    { id: "2", title: "Album Two", image: "https://i.scdn.co/image/ab67616d0000b273fedcba.jpg" },
  ];

  // --- RENDER FUNCTIONS UPDATED to use dynamic size constants ---
  const renderSong = ({ item }) => (
    <View style={[styles.songCard, { width: SONG_CARD_SIZE }]}>
      <Image source={{ uri: item.image }} style={[styles.songImage, { height: SONG_CARD_SIZE }]} />
      <Text style={styles.songTitle} numberOfLines={1}>{item.title}</Text>
      <Text style={styles.songArtist} numberOfLines={1}>{item.artist}</Text>
    </View>
  );

  const renderArtist = ({ item }) => (
    <View style={[styles.artistCard, { width: ARTIST_CARD_SIZE }]}>
      <Image
        source={{ uri: item.image }}
        style={[
          styles.artistImage,
          {
            width: ARTIST_CARD_SIZE,
            height: ARTIST_CARD_SIZE,
            borderRadius: ARTIST_CARD_SIZE / 2,
          },
        ]}
      />
      <Text style={styles.artistName} numberOfLines={1}>{item.name}</Text>
    </View>
  );

  const renderAlbum = ({ item }) => (
    <View style={[styles.albumCard, { width: ALBUM_CARD_SIZE }]}>
      <Image source={{ uri: item.image }} style={[styles.albumImage, { height: ALBUM_CARD_SIZE }]} />
      <Text style={styles.albumTitle} numberOfLines={1}>{item.title}</Text>
    </View>
  );
  // -------------------------------------------------------------

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="light-content" />
      <ScrollView contentContainerStyle={{ paddingBottom: 80 }}>
        {/* Header */}
        <View style={styles.header}>
          {/* Profile button (opens drawer) */}
          <TouchableOpacity onPress={() => navigation.openDrawer()} style={styles.circleButton}>
            <Ionicons name="person-circle" size={50} color="#fff" />
          </TouchableOpacity>

          {/* Cylinder filter buttons */}
          <View style={styles.cylinderRow}>
            {["All", "Playlists", "Music"].map((item) => (
              <TouchableOpacity
                key={item}
                style={[
                  styles.cylinderButton,
                  selected === item && styles.cylinderButtonActive,
                ]}
                onPress={() => setSelected(item)}
              >
                <Text
                  style={[
                    styles.cylinderText,
                    selected === item && styles.cylinderTextActive,
                  ]}
                >
                  {item}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Search */}
        <View style={styles.searchRow}>
          <Ionicons name="search" size={18} color="#b3b3b3" />
          <TextInput
            placeholder="Search"
            placeholderTextColor="#b3b3b3"
            value={query}
            onChangeText={setQuery}
            style={styles.searchInput}
          />
        </View>

        {/* Trending Songs */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Trending songs</Text>
          <TouchableOpacity><Text style={styles.showAll}>Show all</Text></TouchableOpacity>
        </View>
        <FlatList
          data={TRENDING_SONGS}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={renderSong}
          keyExtractor={(i) => i.id}
          contentContainerStyle={{ paddingLeft: 16 }}
        />

        {/* Popular Artists */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Popular artists</Text>
          <TouchableOpacity><Text style={styles.showAll}>Show all</Text></TouchableOpacity>
        </View>
        <FlatList
          data={POPULAR_ARTISTS}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={renderArtist}
          keyExtractor={(i) => i.id}
          contentContainerStyle={{ paddingLeft: 16 }}
        />

        {/* Albums */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Popular albums</Text>
          <TouchableOpacity><Text style={styles.showAll}>Show all</Text></TouchableOpacity>
        </View>
        <FlatList
          data={ALBUMS}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={renderAlbum}
          keyExtractor={(i) => i.id}
          contentContainerStyle={{ paddingLeft: 16 }}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

// --- STATIC STYLESHEET ---
// Dynamic width/height styles were removed from here and applied inline.
const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#121212" },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
  },

  circleButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#202020",
    marginRight: 12,
  },

  cylinderRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },

  cylinderButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: "#202020",
  },

  cylinderButtonActive: {
    backgroundColor: "#1DB954", // Spotify green highlight
  },

  cylinderText: {
    color: "#fff",
    fontSize: 13,
    fontWeight: "600",
  },

  cylinderTextActive: {
    color: "#000", // switch to black when highlighted
  },

  searchRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#202020",
    margin: 20,
    paddingHorizontal: 12,
    borderRadius: 8,
    height: 44,
  },
  searchInput: { marginLeft: 8, color: "#fff", flex: 1 },

  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    marginTop: 20,
    marginBottom: 12,
  },
  sectionTitle: { color: "#fff", fontSize: 18, fontWeight: "700" },
  showAll: { color: "#b3b3b3", fontSize: 13 },

  // Only static styles remain here (like margin and border radius)
  songCard: { marginRight: 14 },
  songImage: { borderRadius: 6 },
  songTitle: { color: "#fff", marginTop: 6, fontWeight: "500" },
  songArtist: { color: "#b3b3b3", fontSize: 12 },

  artistCard: { marginRight: 16, alignItems: "center" },
  artistImage: { marginBottom: 6 },
  artistName: { color: "#fff", fontSize: 13, textAlign: "center" },

  albumCard: { marginRight: 16 },
  albumImage: { borderRadius: 8 },
  albumTitle: {
    color: "#fff",
    marginTop: 6,
    fontWeight: "600",
    fontSize: 14,
  },
});