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

export default function SpotifyLogin() {
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [password, setPassword] = useState("");
  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [gender, setGender] = useState("");
  const [focusedInput, setFocusedInput] = useState(null);

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
              uri: "https://storage.googleapis.com/pr-newsroom-wp/1/2023/05/Spotify_Full_Logo_RGB_Green.png",
            }}
            style={styles.logoImage}
            resizeMode="contain"
          />

          <Text style={styles.title}>Sign up to start listening</Text>

          {/* Email */}
          <BlurView
            intensity={50}
            tint="dark"
            style={[
              styles.glassContainer,
              focusedInput === "email" && styles.glassContainerFocused,
            ]}
          >
            <TextInput
              style={styles.input}
              placeholder="Email Address"
              placeholderTextColor="#aaa"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              onFocus={() => setFocusedInput("email")}
              onBlur={() => setFocusedInput(null)}
            />
          </BlurView>

          {/* Full Name */}
          <BlurView
            intensity={50}
            tint="dark"
            style={[
              styles.glassContainer,
              focusedInput === "fullName" && styles.glassContainerFocused,
            ]}
          >
            <TextInput
              style={styles.input}
              placeholder="Full Name"
              placeholderTextColor="#aaa"
              value={fullName}
              onChangeText={setFullName}
              onFocus={() => setFocusedInput("fullName")}
              onBlur={() => setFocusedInput(null)}
            />
          </BlurView>

          {/* Password */}
          <BlurView
            intensity={50}
            tint="dark"
            style={[
              styles.glassContainer,
              focusedInput === "password" && styles.glassContainerFocused,
            ]}
          >
            <TextInput
              style={styles.input}
              placeholder="Password"
              placeholderTextColor="#aaa"
              secureTextEntry={!showPassword}
              value={password}
              onChangeText={setPassword}
              onFocus={() => setFocusedInput("password")}
              onBlur={() => setFocusedInput(null)}
            />
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
              <Ionicons
                name={showPassword ? "eye-off" : "eye"}
                size={20}
                color="#aaa"
                style={{ paddingHorizontal: 10 }}
              />
            </TouchableOpacity>
          </BlurView>

          {/* Date of Birth */}
          <View style={styles.dobSectionInline}>
  <Text style={styles.dobLabelInline}>Date of Birth:</Text>
  <BlurView
    intensity={50}
    tint="dark"
    style={[
      styles.dobBoxInline,
      focusedInput === "month" && styles.glassContainerFocused,
    ]}
  >
    <TextInput
      style={styles.input}
      placeholder="MM"
      placeholderTextColor="#aaa"
      keyboardType="numeric"
      maxLength={2}
      value={month}
      onChangeText={setMonth}
      onFocus={() => setFocusedInput("month")}
      onBlur={() => setFocusedInput(null)}
    />
  </BlurView>

  <BlurView
    intensity={50}
    tint="dark"
    style={[
      styles.dobBoxInline,
      focusedInput === "day" && styles.glassContainerFocused,
    ]}
  >
    <TextInput
      style={styles.input}
      placeholder="DD"
      placeholderTextColor="#aaa"
      keyboardType="numeric"
      maxLength={2}
      value={day}
      onChangeText={setDay}
      onFocus={() => setFocusedInput("day")}
      onBlur={() => setFocusedInput(null)}
    />
  </BlurView>

  <BlurView
    intensity={50}
    tint="dark"
    style={[
      styles.dobBoxInline,
      focusedInput === "year" && styles.glassContainerFocused,
      styles.dobBoxLastInline,
    ]}
  >
    <TextInput
      style={styles.input}
      placeholder="YYYY"
      placeholderTextColor="#aaa"
      keyboardType="numeric"
      maxLength={4}
      value={year}
      onChangeText={setYear}
      onFocus={() => setFocusedInput("year")}
      onBlur={() => setFocusedInput(null)}
    />
  </BlurView>
</View>


          {/* Gender */}
          <View style={styles.genderContainer}>
            {["Male", "Female"].map((g) => (
              <TouchableOpacity
                key={g}
                style={[
                  styles.genderButton,
                  gender === g && styles.genderButtonSelected,
                ]}
                onPress={() => setGender(g)}
              >
                <Text
                  style={[
                    styles.genderText,
                    gender === g && styles.genderTextSelected,
                  ]}
                >
                  {g}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Sign Up Button */}
          <LinearGradient
            colors={["#0f5f29ff", "#1FB853"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.signInButton}
          >
            <Text style={styles.signInText}>Sign Up</Text>
          </LinearGradient>

          {/* Socials */}
          <Text style={styles.orText}>Or Continue Using</Text>
          <View style={styles.socials}>
            {["logo-google", "logo-facebook", "logo-apple"].map((icon) => (
              <BlurView
                key={icon}
                intensity={60}
                tint="dark"
                style={styles.socialGlass}
              >
                <Ionicons name={icon} size={20} color="white" />
              </BlurView>
            ))}
          </View>

          {/* Already have account */}
          <View style={styles.signinRow}>
            <Text style={{ color: "#aaa" }}>Already have an account? </Text>
            <TouchableOpacity>
              <Text style={styles.signin}>Sign In</Text>
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
    marginBottom: 60,
    textAlign: "center",
    fontFamily: "SpotifyCircular",
  },
  input: {
    color: "white",
    fontSize: 16,
    fontFamily: "SpotifyCircular",
    height: "100%",
    backgroundColor: "transparent",
    flex: 1,
    paddingHorizontal: 15,
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
    paddingHorizontal: 0,
  },
  glassContainerFocused: {
    backgroundColor: "rgba(30, 215, 96, 0.3)", // Spotify green highlight
    borderWidth: 2,
    borderColor: "#1DB954",
  },
dobSectionInline: {
  flexDirection: "row",
  alignItems: "center",
  width: "70%",
  marginBottom: 20,
},

dobLabelInline: {
  color: "white",
  fontSize: 16,
  fontFamily: "SpotifyCircular",
  marginRight: 110,
  minWidth: 110, 
},

dobBoxInline: {
  width: "22%",
  borderRadius: 20,
  height: 55,
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: "rgba(255, 255, 255, 0.1)",
  overflow: "hidden",
  paddingHorizontal: 10,
  marginRight: 10,
},

dobBoxLastInline: {
  marginRight: 0,
},

  genderContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "80%",
    marginBottom: 20,
  },
  genderButton: {
    flex: 1,
    paddingVertical: 12,
    marginHorizontal: 5,
    borderRadius: 20,
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.1)",
  },
  genderButtonSelected: { backgroundColor: "#1b9648ff" },
  genderText: { color: "#aaa", fontSize: 16, fontFamily: "SpotifyCircular" },
  genderTextSelected: { color: "white", fontWeight: "bold" },
  signInButton: {
    width: "80%",
    padding: 15,
    borderRadius: 30,
    marginBottom: 20,
    alignItems: "center",
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
  signinRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 30,
  },
  signin: {
    color: "#1DB954",
    fontSize: 16,
    fontFamily: "SpotifyCircular",
  },
});
