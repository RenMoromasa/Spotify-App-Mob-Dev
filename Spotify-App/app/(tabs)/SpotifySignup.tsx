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
// 🚨 Use router for navigating between groups
import { router } from "expo-router"; 

// IMPORTANT: Hide the header
export const options = {
    headerShown: false,
};

export default function SpotifySignup() {
  // --- STATE DEFINITIONS ---
  // Inputs
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [password, setPassword] = useState("");
  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [gender, setGender] = useState("");
  // UI/Logic States
  const [focusedInput, setFocusedInput] = useState<string | null>(null);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [fontsLoaded] = useFonts({
    SpotifyCircular: require("../../assets/fonts/CircularStd-Bold.ttf"),
  });

  // Function to clear error when any input changes
  const clearErrorOnChange = (setter) => (text) => {
    setter(text);
    setError('');
  };

  if (!fontsLoaded) return null;

  const handleSignUp = async () => {
    setError("");

    // --- 1. Basic Validation ---
    if (!email.trim() || !fullName.trim() || !password.trim() || !day.trim() || !month.trim() || !year.trim() || !gender) {
      setError("Please fill in all required fields.");
      return;
    }

    // Basic length check for DOB (Using 2-digit format for MM/DD/YY based on previous corrections)
    if (month.length !== 2 || day.length !== 2 || year.length !== 2) {
        setError("Please ensure Date of Birth is entered correctly (MM/DD/YY).");
        return;
    }

    // --- 2. Simulating API Call/Authentication ---
    setIsLoading(true);
    
    try {
        await new Promise(resolve => setTimeout(resolve, 1500));
        // If successful, navigate to the main app (drawer home)
        router.push("/(tabs)/SpotifyLogin"); 
        
    } catch (apiError) {
        setError("Sign up failed. Please try again later.");
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
        <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
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
            style={[styles.glassContainer, focusedInput === "email" && styles.glassContainerFocused]}
          >
            <TextInput
              style={styles.input}
              placeholder="Email Address"
              placeholderTextColor="#aaa"
              value={email}
              onChangeText={clearErrorOnChange(setEmail)}
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
            style={[styles.glassContainer, focusedInput === "fullName" && styles.glassContainerFocused]}
          >
            <TextInput
              style={styles.input}
              placeholder="Full Name"
              placeholderTextColor="#aaa"
              value={fullName}
              onChangeText={clearErrorOnChange(setFullName)}
              onFocus={() => setFocusedInput("fullName")}
              onBlur={() => setFocusedInput(null)}
            />
          </BlurView>

          {/* Password */}
          <BlurView
            intensity={50}
            tint="dark"
            style={[styles.glassContainer, focusedInput === "password" && styles.glassContainerFocused]}
          >
            <TextInput
              style={styles.input}
              placeholder="Password"
              placeholderTextColor="#aaa"
              secureTextEntry={!showPassword}
              value={password}
              onChangeText={clearErrorOnChange(setPassword)}
              onFocus={() => setFocusedInput("password")}
              onBlur={() => setFocusedInput(null)}
            />
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={{ paddingHorizontal: 10 }}>
              <Ionicons
                name={showPassword ? "eye-off" : "eye"}
                size={20}
                color="#aaa"
              />
            </TouchableOpacity>
          </BlurView>

          {/* Date of Birth (Using the structure/style developed in previous steps) */}
          <View style={[styles.inlineFieldWrapper, { marginBottom: 10 }]}>
            <Text style={styles.inlineLabel}>Date Of Birth:</Text> 
            <View style={styles.dobSectionInline}> 
              {["MM", "DD", "YY"].map((placeholder, i) => (
                <BlurView
                  key={placeholder}
                  intensity={50}
                  tint="dark"
                  style={[
                    styles.dobBoxInline,
                    styles.glassContainer,
                    { width: '30%', marginBottom: 0 },
                    focusedInput === placeholder.toLowerCase() && styles.glassContainerFocused,
                    i !== 2 && { marginRight: 10 },
                  ]}
                >
                 <TextInput
                    style={styles.dobInput}
                    placeholder={placeholder}
                    placeholderTextColor="#aaa"
                    keyboardType="numeric"
                    maxLength={2}
                    value={placeholder === "MM" ? month : placeholder === "DD" ? day : year}
                    onChangeText={
                      placeholder === "MM" ? clearErrorOnChange(setMonth) : placeholder === "DD" ? clearErrorOnChange(setDay) : clearErrorOnChange(setYear)
                    }
                    onFocus={() => setFocusedInput(placeholder.toLowerCase())}
                    onBlur={() => setFocusedInput(null)}
                  />
                </BlurView>
              ))}
            </View>
          </View>

          {/* Gender */}
          <View style={styles.inlineFieldWrapper}>
            <Text style={styles.inlineLabel}>Gender:</Text> 
            <View style={styles.genderContainerInline}>
              {["Male", "Female", "Other"].map((g) => ( // Added 'Other' for completeness
                <TouchableOpacity
                  key={g}
                  style={[styles.genderButton, gender === g && styles.genderButtonSelected]}
                  onPress={() => { setGender(g); setError(''); }}
                >
                  <Text
                    style={[styles.genderText, gender === g && styles.genderTextSelected]}
                  >
                    {g}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
          
          {/* 🚨 Error Display (Centered) */}
          {error ? (
            <Text style={styles.errorText}>
              {error}
            </Text>
          ) : null}

          {/* Sign Up Button */}
          <TouchableOpacity
            style={[
              styles.signUpButtonWrapper, // Using centralized sign-up button style
              { 
                marginTop: error ? 10 : 20,
                opacity: isLoading ? 0.6 : 1,
              }
            ]}
            onPress={handleSignUp}
            disabled={isLoading}
          >
            <LinearGradient
              colors={["#0f5f29ff", "#1FB853"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.signInButton}
            >
              <Text style={styles.signInText}>{isLoading ? 'Signing Up...' : 'Sign Up'}</Text>
            </LinearGradient>
          </TouchableOpacity>

          {/* Social Sign In (from second code block) */}
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

          {/* Already have an account */}
          <View style={styles.signinRow}>
            <Text style={{ color: "#aaa" }}>Already have an account? </Text>
            {/* 🚨 Navigation fixed to use router.push and correct path */}
            <TouchableOpacity onPress={() => router.push("/(tabs)/SpotifyLogin")}>
              <Text style={styles.signin}>Sign In</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </LinearGradient>
    </KeyboardAvoidingView>
  );
}

// --- STATIC STYLES ---

const styles = StyleSheet.create({
  container: { flexGrow: 1, alignItems: "center", justifyContent: "center", padding: 20 },
  logoImage: { width: 250, height: 90, marginBottom: 20 },
  title: { color: "white", fontSize: 40, marginBottom: 40, textAlign: "center", fontFamily: "SpotifyCircular" }, // Using size 40/margin 40 for better spacing

  // ** Input/Glass Styles (Unified) **
  input: { 
    color: "white", 
    fontSize: 16, 
    fontFamily: "SpotifyCircular", 
    backgroundColor: "transparent", 
    height: "100%", 
    flex: 1, 
    paddingHorizontal: 15,
    borderWidth: 0, 
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
    paddingHorizontal: 0 
  },
  glassContainerFocused: { backgroundColor: "rgba(30, 215, 96, 0.3)", borderWidth: 2, borderColor: "#1DB954" },

  // ** Inline Field Styles (DOB/Gender) **
  inlineFieldWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '80%',
    marginBottom: 20,
  },
  inlineLabel: { 
    color: "white", 
    fontSize: 16, 
    fontFamily: "SpotifyCircular", 
    marginRight: 10,
    width: '20%', 
    textAlign: 'left',
  },
  dobSectionInline: { 
    flexDirection: "row", 
    flex: 1, 
    justifyContent: "space-between", 
  },
  // dobBoxInline is primarily used in component array.

  dobInput: {
    fontSize: 16,
    textAlign: "center",
    paddingHorizontal: 0,
    color: "white",
    flex: 1, 
    fontFamily: "SpotifyCircular",
    backgroundColor: 'transparent', 
    height: '100%', 
    borderWidth: 0, 
    paddingVertical: 0, 
  },
  
  // ** Gender Styles **
  genderContainerInline: { 
    flexDirection: "row", 
    flex: 1, 
    justifyContent: "space-between", 
  },
  genderButton: { flex: 1, paddingVertical: 12, marginHorizontal: 4, borderRadius: 20, alignItems: "center", backgroundColor: "rgba(255, 255, 255, 0.1)" },
  genderButtonSelected: { backgroundColor: "#1b9648ff" },
  genderText: { color: "#aaa", fontSize: 16, fontFamily: "SpotifyCircular" },
  genderTextSelected: { color: "white", fontWeight: "bold" },
  
  // ** Button/Footer Styles **
  errorText: {
    color: '#FF4D4D', 
    fontSize: 14,
    fontFamily: "SpotifyCircular",
    alignSelf: 'center',
    textAlign: 'center',
    width: '80%', 
    marginBottom: 5,
  },
  signUpButtonWrapper: { 
    width: "80%", 
    borderRadius: 30, 
    overflow: "hidden", 
    marginBottom: 20,
  },
  signInButton: { width: "100%", padding: 15, borderRadius: 30, alignItems: "center", justifyContent: "center", alignSelf: "center" },
  signInText: { color: "white", fontSize: 18, fontFamily: "SpotifyCircular" },
  
  orText: {
    color: "#1DB954",
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
  
  signinRow: { flexDirection: "row", alignItems: "center", marginBottom: 30 },
  signin: { color: "#1DB954", fontSize: 16, fontFamily: "SpotifyCircular" },

});