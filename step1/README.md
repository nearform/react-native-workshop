# Step 1

Objectives:
 - Setup an Expo app
 - Add all dependencies
 - Add the game math using a pre-build hook
 - Setup the game area and a static ball

## Steps to get to this point

### Create Expo project

`$ npx create-expo-app NodeConfGame`

### Install dependencies
We install evenything now to save time doing it later

`$ cd NodeConfGame`

(**Important**: we must use `npx expo install` instead of `npm install` to install the dependencies, as Expo is not compatible will all npm package versions)
`$ npx expo install expo-haptics expo-sensors expo-speech react-native-reanimated react-native-safe-area-context`

### Update babel config

Edit `babel.config.js` to include the following plugin

```js
  plugins: ["react-native-reanimated/plugin"],
```

### Start Expo

`$ npm run start`

### View the app in Expo Go

#### iOS
Scan the QR code in the teminal from the iOS camera app and open the link in Expo Go

#### Android
Open Expo Go and use the `Scan QR code` button to scan the QR code in the terminal

### Add the `useGameMath` hook
Add the `useGameMath` hook to the project in `/useGameMath.js`

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

### Add all the necessary imports

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

**Additional steps and explination are needed her to explain using `SafeAreaProvider` and setting up the hook and ball styles**
