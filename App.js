import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { DeviceMotion } from "expo-sensors";
import * as Haptics from "expo-haptics";
import * as Speech from "expo-speech";
import Reanimated, {
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";
import {
  SafeAreaProvider,
  useSafeAreaFrame,
} from "react-native-safe-area-context";
import { useGameMath } from "./useGameMath";

export default function App() {
  return (
    <SafeAreaProvider>
      <Game />
    </SafeAreaProvider>
  );
}

const BALL_WIDTH = 20;
const TARGET_WIDTH = BALL_WIDTH * 2;
const TARGET_BORDER_WIDTH = 2;

const Game = () => {
  const { width, height } = useSafeAreaFrame();

  const {
    getCenterPosition,
    getRandomTargetPosition,
    getIsBallInTarget,
    getConstrainedBallX,
    getConstrainedBallY,
  } = useGameMath({
    playableHeight: height,
    playableWidth: width,
    ballWidth: BALL_WIDTH,
    targetWidth: TARGET_WIDTH,
    targetBorderWidth: TARGET_BORDER_WIDTH,
  });

  // Start with the ball in the center of the playable screen area
  const ballAnimation = useSharedValue(getCenterPosition());

  // Create the ball styles based on the current ballAnimation value
  const ballPosition = useAnimatedStyle(() => ({
    transform: [
      { translateX: ballAnimation.value.x },
      { translateY: ballAnimation.value.y },
    ],
  }));

  return (
    <View style={styles.container}>
      <Reanimated.View style={[styles.ball, ballPosition]} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  ball: {
    position: "absolute",
    width: BALL_WIDTH,
    height: BALL_WIDTH,
    borderRadius: BALL_WIDTH,
    backgroundColor: "red",
  },
});
