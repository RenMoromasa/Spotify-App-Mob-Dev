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
// 🚨 Using 'expo-router' for robust navigation between route groups
import { router } from "expo-router"; 

// The default export function name from the first code block
export default function SpotifyLogin() { 
  // State for inputs and visibility
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // State for focused styles (from second code block)
  const [usernameFocused, setUsernameFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);
  
  // State for validation/loading (from second code block)
  const [error, setError] = useState(""); 
  const [isLoading, setIsLoading] = useState(false); 

  const [fontsLoaded] = useFonts({
    SpotifyCircular: require("../../assets/fonts/CircularStd-Bold.ttf"),
  });

  if (!fontsLoaded) return null;

  // Sign In Logic (from second code block)
  const handleSignIn = async () => {
    setError(""); 

    // --- 1. Basic Validation ---
    if (!username.trim() || !password.trim()) {
      setError("Please enter both username and password.");
      return;
    }
    
    // --- 2. Simulate API Call/Authentication ---
    setIsLoading(true);
    
    try {
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // If successful, navigate to the main app (drawer home)
        router.push("/(drawer)/home"); 
        
    } catch (apiError) {
        setError("Login failed. Check your credentials.");
    } finally {
        setIsLoading(false);
    }
  };


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

          {/* Username Input */}
          <BlurView 
            intensity={50} 
            tint="dark" 
            style={[
                styles.glassContainer,
                usernameFocused && styles.glassContainerFocused,
            ]}>
            <TextInput
              style={styles.input}
              placeholder="Username"
              placeholderTextColor="#aaa"
              value={username}
              onChangeText={(text) => {
                setUsername(text);
                setError(''); 
              }}
              onFocus={() => setUsernameFocused(true)}
              onBlur={() => setUsernameFocused(false)}
              autoCapitalize="none" 
            />
          </BlurView>

          {/* Password Input */}
          <BlurView 
            intensity={50} 
            tint="dark" 
            style={[
                styles.glassContainer,
                passwordFocused && styles.glassContainerFocused,
            ]}>
            <TextInput
              style={styles.input} // Note: Using unified input style
              placeholder="Password"
              placeholderTextColor="#aaa"
              secureTextEntry={!showPassword}
              value={password}
              onChangeText={(text) => {
                setPassword(text);
                setError(''); 
              }}
              onFocus={() => setPasswordFocused(true)}
              onBlur={() => setPasswordFocused(false)}
            />
            {/* Icon and its padding */}
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={{ paddingHorizontal: 10 }}> 
              <Ionicons
                name={showPassword ? "eye-off" : "eye"}
                size={20}
                color="#aaa"
              />
            </TouchableOpacity>
          </BlurView>

          {/* 🚨 Error Display */}
          {error ? (
            <Text style={styles.errorText}>
              {error}
            </Text>
          ) : null}

          {/* Forgot Password (Retaining original button structure but using error margin logic) */}
          <TouchableOpacity style={{ width: "80%" }}>
            <Text style={[styles.forgot, { 
                marginTop: error ? 0 : 0, 
                marginBottom: 45 
            }]}>
                Forgot Password?
            </Text>
          </TouchableOpacity>

          {/* Sign In Button */}
          <TouchableOpacity
            style={[
                styles.signInButtonWrapper,
                { opacity: isLoading ? 0.6 : 1 }
            ]}
            onPress={handleSignIn}
            disabled={isLoading}
          >
            <LinearGradient
              colors={["#0f5f29ff", "#1FB853"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.signInButton}
            >
              <Text style={styles.signInText}>
                {isLoading ? 'Signing In...' : 'Sign In'}
              </Text>
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
            {/* 🚨 Navigation fixed to use router.push and correct path */}
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

// ⚠️ IMPORTANT: Hide the header bar for this specific screen
export const options = {
  headerShown: false,
};

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
    fontSize: 50, // Using the larger font size from the first block
    marginBottom: 60, // Using the larger margin from the first block
    textAlign: "center",
    fontFamily: "SpotifyCircular",
  },
  // ⚠️ Harmonized Input Style
  input: {
    flex: 1,
    color: "white",
    fontSize: 16,
    fontFamily: "SpotifyCircular",
    backgroundColor: "transparent",
    height: "100%", 
    paddingHorizontal: 15,
  },
  // ⚠️ Harmonized Glass Container Style
  glassContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "80%",
    borderRadius: 20,
    marginBottom: 20,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    height: 55,
    paddingHorizontal: 0, // Set to 0 to match signup consistency
    overflow: "hidden",
  },
  // ⚠️ Focused Style
  glassContainerFocused: {
    backgroundColor: "rgba(30, 215, 96, 0.3)",
    borderWidth: 2,
    borderColor: "#1DB954",
  },
  // ⚠️ Centered Error Text (from second code block)
  errorText: {
    color: '#FF4D4D', 
    fontSize: 14,
    fontFamily: "SpotifyCircular",
    alignSelf: 'center', 
    textAlign: 'center', 
    width: '80%', 
    marginBottom: 5,
  },
  forgot: {
    color: "#585c5aff",
    textAlign: "right",
    fontFamily: "SpotifyCircular",
  },
  signInButtonWrapper: { // Wrapper for TouchableOpacity
    width: "80%",
    borderRadius: 30,
    overflow: "hidden",
    marginBottom: 25,
    // Note: marginTop is handled inline based on the error state
  },
  signInButton: {
    width: "100%",
    padding: 15,
    borderRadius: 30,
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
    color: "#22B14C", // Using Spotify Green
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
  // Removed unused styles (usernameContainer, passwordContainer)
});