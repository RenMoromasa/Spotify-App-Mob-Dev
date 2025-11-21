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
import { useNavigation } from "@react-navigation/native"; 
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

export default function HomeScreen() { 
    const navigation = useNavigation();
    const [query, setQuery] = useState("");
    const [selected, setSelected] = useState("All");

    const { width } = Dimensions.get("window");
    const SONG_CARD_SIZE = 300;
    const ARTIST_CARD_SIZE = 100;
    const ALBUM_CARD_SIZE = 300;

const TRENDING_SONGS = [
    { id: "1", title: "Song One", artist: "Artist A", image: require("../../assets/images/cover.jpg") },
    { id: "2", title: "Song Two", artist: "Artist B", image: require("../../assets/images/cover.jpg") },
];

const POPULAR_ARTISTS = [
    { id: "1", name: "Artist A", image: require("../../assets/images/cover.jpg") },
    { id: "2", name: "Artist B", image: require("../../assets/images/cover.jpg") },
];

const ALBUMS = [
    { id: "1", title: "Playlist One", image: require("../../assets/images/cover.jpg") },
    { id: "2", title: "Playlist Two", image: require("../../assets/images/cover.jpg") },
];

const RECENTLY_PLAYED = [
    { id: "rp1", title: "Last Song 1", artist: "Artist C", image: require("../../assets/images/cover.jpg") },
    { id: "rp2", title: "Last Song 2", artist: "Artist D", image: require("../../assets/images/cover.jpg") },
    { id: "rp3", title: "Last Song 3", artist: "Artist E", image: require("../../assets/images/cover.jpg") },
];

const FAVORITE_ALBUM_DATA = [
    { id: "fa1", title: "My Top Playlist", image: require("../../assets/images/cover.jpg") },
];

const FAVORITE_SONGS = [
    { id: "fs1", title: "Fav Song 1", artist: "Fav Artist X", image: require("../../assets/images/cover.jpg") },
    { id: "fs2", title: "Fav Song 2", artist: "Fav Artist Y", image: require("../../assets/images/cover.jpg") },
];

    const renderSong = ({ item }) => (
        <View style={[styles.songCard, { width: SONG_CARD_SIZE }]}>
            <Image source={item.image} style={[styles.songImage, { height: SONG_CARD_SIZE }]} />
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
    <TouchableOpacity 
        style={[styles.albumCard, { width: ALBUM_CARD_SIZE }]}
        onPress={() => {
            router.push({
                pathname: "/PlaylistsScreen",
                params: {
                    playlistId: item.id,
                    playlistTitle: item.title,
                },
            });
        }}
    >
        <Image source={item.image}  style={[styles.albumImage, { height: ALBUM_CARD_SIZE }]} />
        <Text style={styles.albumTitle} numberOfLines={1}>{item.title}</Text>
    </TouchableOpacity>
);


    return (
        <SafeAreaView style={styles.safe}>
            <StatusBar barStyle="light-content" />
            <ScrollView contentContainerStyle={{ paddingBottom: 80 }}>
                
                {/* Header */}
                <View style={styles.header}>
                    
                    {/* LEFT: Menu button (opens drawer) */}
                    <TouchableOpacity onPress={() => navigation.openDrawer()} style={styles.circleButton}>
                        <Ionicons name="menu" size={30} color="#fff" />
                    </TouchableOpacity>
                      {/* HEADER TITLE */}
                   <Text style={styles.headerTitle}>Home</Text>

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

                    <View style={{ flex: 1 }} />
                  {/* Profile Picture */}
                  <TouchableOpacity
                      onPress={() => router.push("/ProfileScreen")}
                      style={styles.profileContainer}
                  >
                      <Image
                          source={require("../../assets/images/friend.jpg")}
                          style={styles.profileImage}
                      />
                  </TouchableOpacity>
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

                {/* --- Recently Played --- */}
                <View style={styles.sectionHeader}>
                    <Text style={styles.sectionTitle}>Recently Played</Text>
                    <TouchableOpacity><Text style={styles.showAll}>Show all</Text></TouchableOpacity>
                </View>
                <FlatList
                    data={RECENTLY_PLAYED}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    renderItem={renderSong}
                    keyExtractor={(i) => i.id}
                    contentContainerStyle={{ paddingLeft: 16 }}
                />
                <View style={{ marginTop: 10 }} />


                {/* --- Your Favorite Album --- */}
                {FAVORITE_ALBUM_DATA.length > 0 && (
                    <>
                        <View style={styles.sectionHeader}>
                            <Text style={styles.sectionTitle}>Your Favorite Playlist</Text>
                            <TouchableOpacity><Text style={styles.showAll}>Show All</Text></TouchableOpacity>
                        </View>
                        <View style={{ paddingLeft: 16, marginBottom: 20 }}>
                            {renderAlbum({ item: FAVORITE_ALBUM_DATA[0] })}
                        </View>
                    </>
                )}

                {/* --- Your Favorite Songs --- */}
                <View style={styles.sectionHeader}>
                    <Text style={styles.sectionTitle}>Your Favorite Songs</Text>
                    <TouchableOpacity><Text style={styles.showAll}>Show all</Text></TouchableOpacity>
                </View>
                <FlatList
                    data={FAVORITE_SONGS}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    renderItem={renderSong}
                    keyExtractor={(i) => i.id}
                    contentContainerStyle={{ paddingLeft: 16 }}
                />
                <View style={{ marginTop: 10 }} />

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
                    <Text style={styles.sectionTitle}>Popular Playlists</Text>
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


// --- STYLESHEET FIXED ---
const styles = StyleSheet.create({
    safe: { flex: 1, backgroundColor: "#121212" },

    header: {
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 20,
        paddingVertical: 18,
        justifyContent: "space-between",
        marginBottom: 10,
    },

    circleButton: {
        width: 55,
        height: 55,
        borderRadius: 30,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#202020",
        marginRight: 10,
    },

    cylinderRow: {
        flexDirection: "row",
        alignItems: "center",
        gap: 12,
        marginLeft: 10,
        marginTop: 10,
        marginBottom: 10,
    },

    cylinderButton: {
        paddingHorizontal: 18,
        paddingVertical: 10,
        borderRadius: 25,
        backgroundColor: "#202020",
    },

    cylinderButtonActive: {
        backgroundColor: "#1DB954",
    },

    cylinderText: {
        color: "#fff",
        fontSize: 13,
        fontWeight: "600",
    },

    cylinderTextActive: {
        color: "#000",
    },

    profileContainer: {
        width: 55,
        height: 55,
        borderRadius: 27,
        overflow: "hidden",
        backgroundColor: "#202020",
        justifyContent: "center",
        alignItems: "center",
        marginLeft: 10,
    },

    profileImage: {
        width: "100%",
        height: "100%",
        resizeMode: "cover",
    },

    searchRow: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#202020",
        marginHorizontal: 20,
        marginTop: 10,
        paddingHorizontal: 14,
        borderRadius: 10,
        height: 46,
    },

    searchInput: { marginLeft: 10, color: "#fff", flex: 1 },

    sectionHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: 20,
        marginTop: 30,
        marginBottom: 14,
    },

    sectionTitle: { color: "#fff", fontSize: 20, fontWeight: "700" },

    showAll: { color: "#b3b3b3", fontSize: 13 },

    headerTitle: {
        color: "#fff",
        fontSize: 24,
        fontWeight: "bold",
        textAlign: "center",
        flex: 0.06,
    },

    // --- SONG CARDS ---
    songCard: {
        width: 300,
        marginRight: 22,
        marginLeft: 6,
    },

    songImage: {
        width: 300,
        height: 300,
        borderRadius: 8,
    },

    songTitle: {
        color: "#fff",
        marginTop: 8,
        fontWeight: "600",
        fontSize: 14,
    },

    songArtist: {
        color: "#b3b3b3",
        fontSize: 12,
        marginTop: 2,
    },

    // --- ARTIST CARDS ---
    artistCard: {
        marginRight: 22,
        marginLeft: 4,
        alignItems: "center",
    },

    artistImage: {
        marginBottom: 8,
        width: 100,
        height: 100,
        borderRadius: 50,
    },

    artistName: {
        color: "#fff",
        fontSize: 14,
        textAlign: "center",
        marginTop: 2,
    },

    // --- ALBUM CARDS ---
    albumCard: {
        width: 300,
        marginRight: 25,
        marginLeft: 6,
        marginBottom: 25,
    },

    albumImage: {
        width: 300,
        height: 300,
        borderRadius: 12,
    },

    albumTitle: {
        color: "#fff",
        marginTop: 8,
        fontWeight: "700",
        fontSize: 15,
    },
});
