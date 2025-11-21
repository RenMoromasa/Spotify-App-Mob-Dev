import React, { useEffect } from "react";
import { Dimensions, StyleSheet, View, TouchableOpacity } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  runOnJS,
} from "react-native-reanimated";
import SignUpScreen from "../app/(tabs)/SpotifySignup";

const { height } = Dimensions.get("window");

export default function SignUpOverlay({ onClose }: { onClose: () => void }) {
  const opacity = useSharedValue(0);

  useEffect(() => {
    opacity.value = withTiming(1, { duration: 200 });
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  const closeOverlay = () => {
    opacity.value = withTiming(0, { duration: 200 }, () => {
      runOnJS(onClose)();
    });
  };

  return (
    <Animated.View style={[styles.overlay, animatedStyle]}>
      <TouchableOpacity style={styles.background} activeOpacity={1} onPress={closeOverlay} />
      <View style={styles.content}>
        <SignUpScreen />
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 999,
  },
  background: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  content: {
    position: "absolute",
    top: height * 0.1,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "#121212",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
  },
});
