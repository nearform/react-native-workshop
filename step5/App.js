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

  // Start with a score of 0
  const [score, setScore] = React.useState(0);

  // START: STEP 5 ADDITION
  // Start with the ball in the center of the playable screen area
  const ballAnimation = useSharedValue(getCenterPosition());
  // END: STEP 5 ADDITION

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

        // START: STEP 5 ADDITION
        // And update the scrore by 1
        setScore((score) => {
          const newScore = score + 1;

          // Announce the updated score
          Speech.speak(newScore.toString());

          return newScore;
        });
        // END: STEP 5 ADDITION
      }
    });

    return subscription.remove;
  }, []);

  return (
    <View style={styles.container}>
      <Reanimated.View style={[styles.target, targetPosition]} />
      <Reanimated.View style={[styles.ball, ballPosition]} />

      {/* START: STEP 5 ADDITION */}
      <View style={styles.scoreContainer}>
        <Text style={styles.scoreText}>Score: {score}</Text>

        <Pressable
          onPress={() => setScore(0)}
          style={({ pressed }) => ({
            opacity: pressed ? 0.5 : 1,
          })}
        >
          <Text style={styles.resetText}>Reset</Text>
        </Pressable>
      </View>
      {/* END: STEP 5 ADDITION */}
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
  // START: STEP 5 ADDITION
  scoreContainer: { position: "absolute", bottom: 20, left: 20 },
  scoreText: {
    fontSize: 40,
    fontWeight: "bold",
  },
  resetText: {
    fontSize: 20,
  },
  // END: STEP 5 ADDITION
});
