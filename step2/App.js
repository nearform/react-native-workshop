import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { DeviceMotion } from "expo-sensors";
import * as Haptics from "expo-haptics";
import * as Speech from "expo-speech";
import Reanimated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  Easing,
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
const UPDATE_INTERVAL = 16 // 16ms is equivalent to 60fps

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
      { translateX: withTiming(ballAnimation.value.x, { duration: UPDATE_INTERVAL, easing: Easing.linear }) },
      { translateY: withTiming(ballAnimation.value.y, { duration: UPDATE_INTERVAL, easing: Easing.linear }) },
    ],
  }));

  // START: STEP 2 ADDITION
  // Setup the device motion sensor listener
  React.useEffect(() => {
    DeviceMotion.setUpdateInterval(UPDATE_INTERVAL);

    const subscription = DeviceMotion.addListener((deviceMotionMeasurment) => {
      // Don't do anything if the expected `rotation` data is missing
      if (!deviceMotionMeasurment.rotation) {
        return;
      }

      // Update the ball position based on the device motion sensor.
      ballAnimation.value = {
        // Change the value of the ball's x position by the device motion sensor's gamma value
        x: getConstrainedBallX(
          ballAnimation.value.x + deviceMotionMeasurment.rotation.gamma * 12
        ),
        // Change the value of the ball's y position by the device motion sensor's beta value
        y: getConstrainedBallY(
          ballAnimation.value.y + deviceMotionMeasurment.rotation.beta * 12
        ),
      };
    });

    return subscription.remove;
  }, []);
  // END: STEP 2 ADDITION

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
