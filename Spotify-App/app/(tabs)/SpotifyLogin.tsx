import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useFonts } from "expo-font";
import { BlurView } from "expo-blur";
import { useNavigation } from "@react-navigation/native";

export default function SpotifyLogin() {
  const navigation = useNavigation();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
const [isUsernameFocused, setIsUsernameFocused] = useState(false);
  const [fontsLoaded] = useFonts({
    SpotifyCircular: require("../../assets/fonts/CircularStd-Bold.ttf"),
  });

  if (!fontsLoaded) return null;

  return (
    <KeyboardAvoidingView
    style={{ flex: 1 }}
    behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
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
        {/* Spotify Logo */}
        <Image
          source={{
            uri: "https://storage.googleapis.com/pr-newsroom-wp/1/2023/05/Spotify_Primary_Logo_RGB_Green.png",
          }}
          style={styles.logoImage}
          resizeMode="contain"
        />

        {/* Title */}
        <Text style={styles.title}>Log in to Spotify</Text>

        <BlurView intensity={50} tint="dark" style={styles.glassContainer}>
        <TextInput
            style={styles.input}
            placeholder="Username"
            placeholderTextColor="#aaa"
            value={username}
            onChangeText={setUsername}
            onFocus={() => setIsUsernameFocused(true)}
            onBlur={() => setIsUsernameFocused(false)}
        />
        </BlurView>

        <BlurView intensity={50} tint="dark" style={styles.glassContainer}>
        <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor="#aaa"
            secureTextEntry={!showPassword}
            value={password}
            onChangeText={setPassword}
        />
        <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Ionicons
            name={showPassword ? "eye-off" : "eye"}
            size={20}
            color="#aaa"
            />
        </TouchableOpacity>
        </BlurView>

        {/* Forgot Password */}
        <TouchableOpacity style={{ width: "80%" }}>
          <Text style={styles.forgot}>Forgot Password?</Text>
        </TouchableOpacity>

        {/* Sign In */}
        <TouchableOpacity
          style={{
            width: "80%",
            borderRadius: 30,
            overflow: "hidden",
            marginBottom: 25,
          }}
          onPress={() => navigation.navigate("Home")}
        >
          <LinearGradient
            colors={["#0f5f29ff", "#1FB853"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.signInButton}
          >
            <Text style={styles.signInText}>Sign In</Text>
          </LinearGradient>
        </TouchableOpacity>

        {/* Social Sign In */}
        <Text style={styles.orText}>Or Continue Using</Text>
        <View style={styles.socials}>
            <BlurView intensity={60} tint="dark" style={styles.socialGlass}>
            <Ionicons name="logo-google" size={20} color="white" />
            </BlurView>
          <BlurView intensity={60} tint="dark" style={styles.socialGlass}>
            <Ionicons name="logo-facebook" size={20} color="white" />
          </BlurView>
         <BlurView intensity={60} tint="dark" style={styles.socialGlass}>
            <Ionicons name="logo-apple" size={20} color="white" />
          </BlurView>
        </View>

        {/* Signup */}
        <View style={styles.signupRow}>
            <Text style={{ color: "#aaa" }}>Don’t have an account? </Text>
            <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
              <Text style={styles.signup}>Sign Up</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </LinearGradient>
    </KeyboardAvoidingView>

  );
}

const styles = StyleSheet.create({
    container: {
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    },
  logoImage: {
    width: 250 ,
    height: 90,
    marginBottom: 20,
  },
  title: {
    color: "white",
    fontSize: 50,
    marginBottom: 60,
    textAlign: "center",
    fontFamily: "SpotifyCircular",
  },
usernameContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "80%",
    backgroundColor: "#121212",
    borderRadius: 20,
    marginBottom: 20,
    paddingLeft: 20,
    },
input: {
  flex: 1,
  color: "white",
  fontSize: 16,
  fontFamily: "SpotifyCircular",
  height: "100%",
  width: "100%",
  backgroundColor: "transparent",
},
passwordContainer: {
        flexDirection: "row",
        alignItems: "center",
        width: "80%",
        backgroundColor: "#121212",
        borderRadius: 20,
        marginBottom: 15,
        paddingLeft: 20,
    },
  forgot: {
    color: "#585c5aff",
    textAlign: "right",
    marginBottom: 45,
    fontFamily: "SpotifyCircular",
  },
  signInButton: {
    width: "100%",
    padding: 15,
    borderRadius: 30,
    marginBottom: 10,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
  },
  signInText: {
    color: "white",
    fontSize: 18,
    fontFamily: "SpotifyCircular",
  },
  orText: {
    color: "#22B14C",
    marginBottom: 15,
    fontSize: 14,
    fontFamily: "SpotifyCircular",
  },
  socials: {
    flexDirection: "row",
    marginBottom: 30,
    justifyContent: "center",
  },
socialGlass: {
  padding: 18,
  borderRadius: 50,
  marginHorizontal: 10,
  overflow: "hidden",
  backgroundColor: "rgba(255, 255, 255, 0.1)",
},
  signupRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 30,
  },
  signup: {
    color: "#1DB954",
    fontSize: 16,
    fontFamily: "SpotifyCircular",
  },
glassContainer: {
  flexDirection: "row",
  alignItems: "center",
  width: "80%",
  borderRadius: 20,
  marginBottom: 20,
  overflow: "hidden",
  backgroundColor: "rgba(255, 255, 255, 0.1)", 
  height: 55,
  paddingHorizontal: 10,
},
});
