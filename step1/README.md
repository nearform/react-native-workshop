# Step 1: Drop the Ball

Objectives:
 - Add all dependencies
 - Add the game math using a pre-build hook
 - Setup the game area and a static ball

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

> [!INFO]
> `react-native-reanimated` is a widely-used package that enables slicker animations by using the device's own animation-related APIs on separate threads. Without it, most animations merely imitate native animations in JavaScript and can lag.

### 3. Add the `useGameMath` hook

Add the `useGameMath` hook to the project in `/useGameMath.js`. This contains the basic mathematics and positioning logic for our game. Since this is a React Native workshop and not a game dev workshop, we've kept this very simple, and provided it pre-written in a form that is easy to tinker with later.

> [!INFO]
> React "Hooks" are important to understand if you are new to modern React. Any function starting with `use` is a "hook" that can hook into the React lifecycle and state, but [must follow certain rules](https://react.dev/warnings/invalid-hook-call-warning): in particular, they must be called every time a component is rendered (so, never put inside an `if` block or after a conditional `return`). 

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

**Additional steps and explanation are needed here to explain using `SafeAreaProvider` and setting up the hook and ball styles**
