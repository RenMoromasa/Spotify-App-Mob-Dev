import React, { useRef, useState } from 'react';
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
  Animated,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
const { width } = Dimensions.get('window');
const CARD_SIZE = width * 0.09;   // songs
const ALBUM_SIZE = width * 0.90; // albums (smaller)


const TRENDING_SONGS = [
  { id: '1', title: 'SPEED DEMON', artist: 'Justin Bieber', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f2/Justin_Bieber_-_Swag_II.svg/1200px-Justin_Bieber_-_Swag_II.svg.png' },
  { id: '2', title: 'Sandali', artist: 'Cup of Joe', image: 'https://upload.wikimedia.org/wikipedia/en/thumb/a/a4/Sandali_Cup_of_Joe_Cover.jpg/250px-Sandali_Cup_of_Joe_Cover.jpg' },
  { id: '3', title: 'Vibrate', artist: 'La Mave', image: 'https://via.placeholder.com/300x300.png?text=Vibrate' },
];

const POPULAR_ARTISTS = [
  { id: 'a1', name: 'Cup of Joe', image: 'https://via.placeholder.com/300x300.png?text=Cup+of+Joe' },
  { id: 'a2', name: 'Earl Agustin', image: 'https://via.placeholder.com/300x300.png?text=Earl+Agustin' },
  { id: 'a3', name: 'NIKI', image: 'https://via.placeholder.com/300x300.png?text=NIKI' },
];

const ALBUMS = [
  { id: 'al1', title: 'December Avenue', image: 'https://via.placeholder.com/300x300.png?text=December+Avenue' },
  { id: 'al2', title: 'Sundown', image: 'https://via.placeholder.com/300x300.png?text=Sundown' },
];

export default function SpotifyHome() {
  const [query, setQuery] = useState('');
  const pulse = useRef(new Animated.Value(1)).current;

  const onPressPlay = () => {
    Animated.sequence([
      Animated.timing(pulse, { toValue: 1.15, duration: 120, useNativeDriver: true }),
      Animated.timing(pulse, { toValue: 1, duration: 120, useNativeDriver: true }),
    ]).start();
  };

  const renderSong = ({ item }) => (
    <View style={styles.songCard}>
      <Image source={{ uri: item.image }} style={styles.songImage} />
      <Text style={styles.songTitle} numberOfLines={1}>{item.title}</Text>
      <Text style={styles.songArtist} numberOfLines={1}>{item.artist}</Text>
    </View>
  );

  const renderArtist = ({ item }) => (
    <View style={styles.artistCard}>
      <Image source={{ uri: item.image }} style={styles.artistImage} />
      <Text style={styles.artistName} numberOfLines={1}>{item.name}</Text>
    </View>
  );

  const renderAlbum = ({ item }) => (
    <View style={styles.albumCard}>
      <Image source={{ uri: item.image }} style={styles.albumImage} />
      <Text style={styles.albumTitle} numberOfLines={1}>{item.title}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="light-content" />
      <ScrollView contentContainerStyle={{ paddingBottom: 80 }}>
        
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.h1}>Good evening</Text>
          <TouchableOpacity>
            <Ionicons name="person-circle" size={40} color="#fff" />
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
          <Text style={styles.sectionTitle}>Popular albums and singles</Text>
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

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#121212' },
  header: { flexDirection: 'row', justifyContent: 'space-between', padding: 16 },
  h1: { color: '#fff', fontSize: 24, fontWeight: '700' },
  searchRow: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#202020', margin: 16, paddingHorizontal: 12, borderRadius: 8, height: 44 },
  searchInput: { marginLeft: 8, color: '#fff', flex: 1 },

  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 16, marginTop: 20, marginBottom: 12 },
  sectionTitle: { color: '#fff', fontSize: 20, fontWeight: '700' },
  showAll: { color: '#b3b3b3', fontSize: 13 },

  songCard: { width: CARD_SIZE, marginRight: 14 },
  songImage: { width: '100%', height: CARD_SIZE, borderRadius: 6 },
  songTitle: { color: '#fff', marginTop: 6, fontWeight: '400' },
  songArtist: { color: '#b3b3b3', fontSize: 12 },

  artistCard: { width: 40, marginRight: 14, alignItems: 'center' },
  artistImage: { width: 90, height: 90, borderRadius: 45, marginBottom: 6 },
  artistName: { color: '#fff', fontSize: 13, textAlign: 'center' },

albumCard: { width: ALBUM_SIZE, marginRight: 14 },
albumImage: { width: '100%', height: ALBUM_SIZE, borderRadius: 6 },
albumTitle: { color: '#fff', marginTop: 6, fontWeight: '600', fontSize: 13 },

});
