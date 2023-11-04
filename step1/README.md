# Step 1: Drop the Ball

Objectives:
 - Add all dependencies
 - Add the game math using a pre-build hook
 - Setup the game area and a static ball

> [!NOTE]
> You can [view a diff](https://github.com/nearform/react-native-workshop/pull/7/files) of all the changes for this step.

## Steps to get to this point

### 1. Install dependencies
We install everything now to save time doing it later

> [!IMPORTANT]
> In an Expo app, we must use `npx expo install` instead of `npm install` to install the dependencies. Expo is not compatible will all npm package versions. Using Expo's own `npx expo install` ensures only compatible versions are chosen.

```sh
npx expo install expo-haptics expo-sensors expo-speech react-native-reanimated react-native-safe-area-context`
```

### 2. Update babel config

Edit `babel.config.js` to include the following plugin

```js
  plugins: ["react-native-reanimated/plugin"],
```

> [!NOTE]
> `react-native-reanimated` is a widely-used package that enables slicker animations by using the device's own animation-related APIs on separate threads. Without it, most animations merely imitate native animations in JavaScript and can lag.

### 3. Add the `useGameMath` hook

Add the `useGameMath` hook to the project in `/useGameMath.js`. This contains the basic mathematics and positioning logic for our game. Since this is a React Native workshop and not a game dev workshop, we've kept this very simple, and provided it pre-written in a form that is easy to tinker with later.

> [!NOTE]
> React "Hooks" are important to understand if you are new to modern React. Any function starting with `use` is a "hook" that can hook into the React lifecycle and state, but [must follow certain rules](https://react.dev/warnings/invalid-hook-call-warning): in particular, they can only be called by components or other hooks, and must be called every time a component is rendered (so, never put inside an `if` block or after a conditional `return`). 

```js
export const useGameMath = ({
  playableWidth,
  playableHeight,
  ballWidth,
  targetWidth,
  targetBorderWidth,
}) => {
  const getCenterPosition = () => ({
    x: (playableWidth - ballWidth) / 2,
    y: (playableHeight - ballWidth) / 2,
  });

  const getRandomTargetPosition = () => ({
    x: Math.random() * (playableWidth - targetWidth),
    y: Math.random() * (playableHeight - targetWidth),
  });

  const getIsBallInTarget = ({ ballX, ballY, targetX, targetY }) =>
    ballX > targetX + targetBorderWidth &&
    ballX + ballWidth < targetX + targetWidth - targetBorderWidth &&
    ballY > targetY + targetBorderWidth &&
    ballY + ballWidth < targetY + targetWidth - targetBorderWidth;

  const getConstrainedBallX = (ballX) =>
    Math.max(0, Math.min(ballX, playableWidth - ballWidth));

  const getConstrainedBallY = (ballY) =>
    Math.max(0, Math.min(ballY, playableHeight - ballWidth));

  return {
    getCenterPosition,
    getRandomTargetPosition,
    getIsBallInTarget,
    getConstrainedBallX,
    getConstrainedBallY,
  };
};
```

### 4. Add all the necessary imports

Doing this all at once will save time later

```js
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
```

### 5. Create the `Game` component

Our `useGameMath` hook needs the width and height of the playable game area - not the whole white background, just the parts we want the ball to reach. We can get this from `react-native-safe-area-context`'s `useSafeAreaFrame` hook. To work, that library requires us to wrap our app in its `SafeAreaProvider`, a [React Context](https://react.dev/learn/passing-data-deeply-with-context) provider that fetches data and makes that data accessible to any component anywhere inside it.

In a typical React Native app, the `App` part will mostly consist of context providers. It's a good practice to break down a complex app into components responsible for one thing. Let's isolate the game logic in one `Game` component separate to the outer app wrappers:

```js
export default function App() {
  return (
    <SafeAreaProvider>
      <Game />
    </SafeAreaProvider>
  );
}

const Game = () => {
  const { width, height } = useSafeAreaFrame();

  return (
    <View style={styles.container}>
      {/* We'll add the ball and use width and height next */}
    </View>
  );
};
```

> [!NOTE]
> We can't just take the size of the "container", because it spreads its background colour into "safe areas" like the status bar (showing time, battery etc) and around any notches for cameras, microphone, speaker etc. The library `react-native-safe-area-context` gets data from the device about where these safe areas are and helps us take them into account.

### 6. Add the ball

Now we've got the width and height data, we can call our `useGameMath` hook and get some helper functions for positioning, including `getCenterPosition` which we can use to position our ball in the center. We'll move and animate the ball, so we'll make it a `Reanimated.View`, a special View that can tap into the Reanimated library's native animation integration.

We'll also set its position using `useSharedValue`, a hook from Reanimated that shared values with native animation threads. Other values can be set as constants as they won't change.

```js
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
```
