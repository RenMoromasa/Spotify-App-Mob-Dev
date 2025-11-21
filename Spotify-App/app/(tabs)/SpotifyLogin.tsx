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
import SignUpOverlay from "../../components/SignUpOverlay";
import { useNavigation } from "@react-navigation/native";

const navigation = useNavigation();

export default function SpotifyLogin() { 
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [usernameFocused, setUsernameFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);
  const [error, setError] = useState(""); 
  const [isLoading, setIsLoading] = useState(false); 
  const [showSignUp, setShowSignUp] = useState(false); // <-- overlay state

  const [fontsLoaded] = useFonts({
    SpotifyCircular: require("../../assets/fonts/CircularStd-Bold.ttf"),
  });

  if (!fontsLoaded) return null;

  const handleSignIn = async () => {
    setError(""); 
    if (!username.trim() || !password.trim()) {
      setError("Please enter both username and password.");
      return;
    }
    
    setIsLoading(true);
    try {
        await new Promise(resolve => setTimeout(resolve, 1000));
        router.push("/(drawer)/home"); 
    } catch {
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
          <Image
            source={{
              uri: "https://storage.googleapis.com/pr-newsroom-wp/1/2023/05/Spotify_Primary_Logo_RGB_Green.png",
            }}
            style={styles.logoImage}
            resizeMode="contain"
          />
          <Text style={styles.title}>Log in to Spotify</Text>

          {/* Username Input */}
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
              onChangeText={(text) => {
                setUsername(text);
                setError(""); 
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
            ]}
          >
            <TextInput
              style={styles.input}
              placeholder="Password"
              placeholderTextColor="#aaa"
              secureTextEntry={!showPassword}
              value={password}
              onChangeText={(text) => {
                setPassword(text);
                setError(""); 
              }}
              onFocus={() => setPasswordFocused(true)}
              onBlur={() => setPasswordFocused(false)}
            />
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={{ paddingHorizontal: 10 }}> 
              <Ionicons
                name={showPassword ? "eye-off" : "eye"}
                size={20}
                color="#aaa"
              />
            </TouchableOpacity>
          </BlurView>

          {error ? (
            <Text style={styles.errorText}>{error}</Text>
          ) : null}

          <TouchableOpacity style={{ width: "80%" }}>
            <Text style={[styles.forgot, { marginBottom: 45 }]}>
              Forgot Password?
            </Text>
          </TouchableOpacity>

          {/* Sign In Button */}
          <TouchableOpacity
            style={[styles.signInButtonWrapper, { opacity: isLoading ? 0.6 : 1 }]}
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
                {isLoading ? "Signing In..." : "Sign In"}
              </Text>
            </LinearGradient>
          </TouchableOpacity>

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

          {/* Sign Up */}
          <View style={styles.signupRow}>
            <Text style={{ color: "#aaa" }}>Don’t have an account? </Text>
            <TouchableOpacity onPress={() => navigation.navigate("SpotifySignup")}>
              <Text style={styles.signup}>Sign Up</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>

        {/* --- Sign-up Overlay --- */}
        {showSignUp && <SignUpOverlay onClose={() => setShowSignUp(true)} />}
      </LinearGradient>
    </KeyboardAvoidingView>
  );
}

export const options = { headerShown: false };

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  logoImage: { width: 250, height: 90, marginBottom: 20 },
  title: { color: "white", fontSize: 50, marginBottom: 60, textAlign: "center", fontFamily: "SpotifyCircular" },
  input: { flex: 1, color: "white", fontSize: 16, fontFamily: "SpotifyCircular", backgroundColor: "transparent", height: "100%", paddingHorizontal: 15 },
  glassContainer: { flexDirection: "row", alignItems: "center", width: "80%", borderRadius: 20, marginBottom: 20, backgroundColor: "rgba(255, 255, 255, 0.1)", height: 55, paddingHorizontal: 0, overflow: "hidden" },
  glassContainerFocused: { backgroundColor: "rgba(30, 215, 96, 0.3)", borderWidth: 2, borderColor: "#1DB954" },
  errorText: { color: "#FF4D4D", fontSize: 14, fontFamily: "SpotifyCircular", alignSelf: "center", textAlign: "center", width: "80%", marginBottom: 5 },
  forgot: { color: "#585c5aff", textAlign: "right", fontFamily: "SpotifyCircular" },
  signInButtonWrapper: { width: "80%", borderRadius: 30, overflow: "hidden", marginBottom: 25 },
  signInButton: { width: "100%", padding: 15, borderRadius: 30, alignItems: "center", justifyContent: "center", alignSelf: "center" },
  signInText: { color: "white", fontSize: 18, fontFamily: "SpotifyCircular" },
  orText: { color: "#22B14C", marginBottom: 15, fontSize: 14, fontFamily: "SpotifyCircular" },
  socials: { flexDirection: "row", marginBottom: 30, justifyContent: "center" },
  socialGlass: { padding: 18, borderRadius: 50, marginHorizontal: 10, overflow: "hidden", backgroundColor: "rgba(255, 255, 255, 0.1)" },
  signupRow: { flexDirection: "row", alignItems: "center", marginBottom: 30 },
  signup: { color: "#1DB954", fontSize: 16, fontFamily: "SpotifyCircular" },
});
