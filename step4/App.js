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

  // Start with the target in a random position
  const targetAnimation = useSharedValue(getRandomTargetPosition());

  // Create the target styles based on the current ballAnimation value
  const targetPosition = useAnimatedStyle(() => ({
    transform: [
      { translateX: targetAnimation.value.x },
      { translateY: targetAnimation.value.y },
    ],
  }));

  // Setup the device motion sensor listner
  React.useEffect(() => {
    // Set the update interval to 16ms (60fps)
    DeviceMotion.setUpdateInterval(16);

    const subscription = DeviceMotion.addListener((deviceMotionMeasurment) => {
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

      // START: STEP 4 ADDITION
      // Check if the ball is in the target
      if (
        getIsBallInTarget({
          ballX: ballAnimation.value.x,
          ballY: ballAnimation.value.y,
          targetX: targetAnimation.value.x,
          targetY: targetAnimation.value.y,
        })
      ) {
        // If it is, move the target to a new random position
        targetAnimation.value = getRandomTargetPosition();

        // And vibrate
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
      }
      // END: STEP 4 ADDITION
    });

    return subscription.remove;
  }, []);

  return (
    <View style={styles.container}>
      <Reanimated.View style={[styles.target, targetPosition]} />
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
  target: {
    position: "absolute",
    width: TARGET_WIDTH,
    height: TARGET_WIDTH,
    borderRadius: TARGET_WIDTH,
    borderWidth: TARGET_BORDER_WIDTH,
    borderColor: "blue",
  },
});
