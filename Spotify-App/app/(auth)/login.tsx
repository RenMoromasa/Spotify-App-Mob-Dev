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
import { router } from "expo-router";

export default function SpotifyLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [usernameFocused, setUsernameFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);

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
          <Image
            source={{
              uri: "https://storage.googleapis.com/pr-newsroom-wp/1/2023/05/Spotify_Primary_Logo_RGB_Green.png",
            }}
            style={styles.logoImage}
            resizeMode="contain"
          />

          <Text style={styles.title}>Log in to Spotify</Text>

          {/* Username */}
          <BlurView
            intensity={50}
            tint="dark"
            style={[
              styles.glassContainer,
              usernameFocused && styles.glassContainerFocused,
            ]}
          >
            <TextInput
              style={styles.input}
              placeholder="Username"
              placeholderTextColor="#aaa"
              value={username}
              onChangeText={setUsername}
              onFocus={() => setUsernameFocused(true)}
              onBlur={() => setUsernameFocused(false)}
            />
          </BlurView>

          {/* Password */}
          <BlurView
            intensity={50}
            tint="dark"
            style={[
              styles.glassContainer,
              passwordFocused && styles.glassContainerFocused,
            ]}
          >
            <TextInput
              style={styles.input}
              placeholder="Password"
              placeholderTextColor="#aaa"
              secureTextEntry={!showPassword}
              value={password}
              onChangeText={setPassword}
              onFocus={() => setPasswordFocused(true)}
              onBlur={() => setPasswordFocused(false)}
            />
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
              <Ionicons
                name={showPassword ? "eye-off" : "eye"}
                size={20}
                color="#aaa"
              />
            </TouchableOpacity>
          </BlurView>

          {/* Sign In */}
          <TouchableOpacity
            style={{
              width: "80%",
              borderRadius: 30,
              overflow: "hidden",
              marginBottom: 25,
            }}
            onPress={() => router.push("/(drawer)/home")}
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

          {/* Signup link */}
          <View style={styles.signupRow}>
            <Text style={{ color: "#aaa" }}>Don’t have an account? </Text>
            <TouchableOpacity onPress={() => router.push("/(auth)/signup")}>
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
  logoImage: { width: 250, height: 90, marginBottom: 20 },
  title: {
    color: "white",
    fontSize: 40,
    marginBottom: 40,
    textAlign: "center",
    fontFamily: "SpotifyCircular",
  },
  input: {
    flex: 1,
    color: "white",
    fontSize: 16,
    fontFamily: "SpotifyCircular",
    backgroundColor: "transparent",
  },
  signInButton: {
    width: "100%",
    padding: 15,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  signInText: {
    color: "white",
    fontSize: 18,
    fontFamily: "SpotifyCircular",
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
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    height: 55,
    paddingHorizontal: 10,
  },
  glassContainerFocused: {
    backgroundColor: "rgba(30, 215, 96, 0.3)",
    borderWidth: 2,
    borderColor: "#1DB954",
  },
});
