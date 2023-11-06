# Bonus round 1 - Navigation

> [!WARNING]
> This is optional additional content to consider if you have completed steps 0-5 and want to keep going.

Objectives:
 - Add a home screen with navigation
 - Move the game to its own screen
 - Add an "About" screen with web links
 - Add a re-usable component with stylistic variants
 - Explore some ideas for further enhancements

## Steps to get to this point

### 1. Install dependencies

React Native doesn't include its own out-of-the-box navigation between screens, so we'll need to install a library. There are two main choices:

- [React Navigation](https://reactnavigation.org/) is the most popular choice, the most customisable, and the simplest to set up
- [React Native Navigation](https://wix.github.io/react-native-navigation/docs/before-you-start/) by Wix is more tightly interwoven with the underlying native Android and iOS navigation systems

This workshop uses React Navigation. It is split up into multiple modules for different navigation UI patterns (for example, if your app uses a slide-out side drawer, you'd install `@react-navigation/drawer`). For this example, we want the simplest available navigation patterns: a "stack" of screens that are reached by our own defined buttons and which stack on top of each other like a deck of cards, where a back button press or back swipe gesture swipes the top screen off the stack.

React Navigation's documentation tells us that for this, we need four libraries. Let's install them at once (remember to use `expo install` to get the expo-compatible version), then look at what they are:

```sh
npx expo install @react-navigation/native @react-navigation/native-stack react-native-screens react-native-safe-area-context
```

- [`@react-navigation/native`](https://www.npmjs.com/package/@react-navigation/native) contains the core React Navigation library features other modules depend on.
- [`@react-navigation/native-stack`](https://www.npmjs.com/package/@react-navigation/native-stack) is React Navigation's implementation of stack-style navigation that is mostly closely integrated with the underlying native system navigation (there's also `@react-navigation/stack` which is a bit more customisable, at the cost of faking more things using JavaScript that could be done natively).
- [`react-native-screens`](https://www.npmjs.com/package/react-native-screens) is a dependency of native-stack that enables it to use native navigation elements. In React Native, dependencies of dependencies that contain native code need to be installed explicitly.
- [`react-native-safe-area-context`](https://www.npmjs.com/package/react-native-safe-area-context) is another dependency of react navigation. We already installed and discussed it in step1, so we could skip it here, but this makes for a more re-usable copy-paste snippet.

### 2. Wrap app in NavigationContainer

We previously discussed React context providers and how apps and libraries use them to make functionality and data available anywhere in an app. [React Navigation's documentation explains](https://reactnavigation.org/docs/getting-started#wrapping-your-app-in-navigationcontainer) that `@react-navigation/native` relies on being able to grab and send data to a `NavigationContainer` wrapper, so we'll add it to our App:

```js
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from '@react-navigation/native';
// ...more imports...

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Game />
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
```

### 3. Make Game into a stack screen

So far, for simplicity we've had our Game and outer App wrappers in the same file. From here on, Game will be one screen among many, so it's a good practice to move it to its own file in a folder of screens, like `./screens/game.js`, leaving `App.js` as the context provider wrappers and nothing else. Don't forget to export `Game` from the new file, and adjust the relative `./useGameMath.js` path to `../useGameMath.js`.

Then, we'll create a `Stack.Navigator` by calling native stack's `createNativeStackNavigator` and make Game into the first (and for now, only) stack screen inside it. `Stack.Navigator`'s children are all the screens that can be stacked up here, and by default, the first in the list is rendered right away.

```js
import React from "react";
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Game } from "./screens/game";

import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Game" component={Game} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
```

Run the app now and we should see the same app as before but with a default-styled header titled "Game" telling us which screen we're on.

[Eagle-eyed users may notice](https://github.com/nearform/react-native-workshop/issues/32) that the ball and target can now exceed the bottom of the screen. We've added a header, but we haven't adjusted `playableHeight`. React Navigation ships a hook `useHeaderHeight` that can give us the current height of the header (it's in `@react-navigation/elements` which contains the header and other components and is an implicit dependency of native-stack: it's a non-essential good practice to explicitly install it with `npx expo install @react-navigation/elements`). Let's use it to adjust the game area:

```js
// ...lots of imports...
import { useHeaderHeight } from '@react-navigation/elements'

// ...lots of constants...

export const Game = () => {
  const { width, height } = useSafeAreaFrame();
  const headerHeight = useHeaderHeight()

  const {
    // ...lots of destructured variables...
  } = useGameMath({
    playableHeight: height - headerHeight,
    // ...lots of argument properties...
  })
```

### 4. Add welcome screen

Having only one screen isn't much use, so let's create a basic welcome screen, from which we can launch the game or other UI screens.

We'll create a new file in `screens`. React Native screens are just components that are passed a few special props to do with the current navigation state, including `navigation`, which has a bunch of methods for manipulating the stack. We'll create a simple function component that renders a `View` with a `Text` title in it, and a button that `navigate`s to our game screen. This isn't a design workshop so we'll keep the visuals very simple:

```js
// Create ./screens/welcome.js
import { View, Text, StyleSheet, Button } from 'react-native'

export const Welcome = ({ navigation }) => (
  <View style={styles.container}>
    <Text style={styles.title}>NodeConfGame</Text>
    <Button
      title="Play"
      color="#000000"
      // Tell the navigator to `navigate` to the screen where `name` prop is "Game"
      onPress={() => navigation.navigate('Game')}
    />
  </View>
)

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'space-around',
    flex: 1
  },
  title: {
    fontWeight: 'bold',
    fontSize: 32,
    letterSpacing: -3
  }
})
```

If we add this as the first screen in the stack navigator and fully reload the app (hit 'r' in the Expo Start terminal), we'll see it is now the default screen, and pushing the button slides in the game screen:

```js
// In App.js

// ...lots of imports...
import { Game } from "./screens/game";
import { Welcome } from "./screens/welcome";

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Welcome" component={Welcome} />
          <Stack.Screen name="Game" component={Game} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
```

### 5. Add our own Button component

[React Native's own `Button` component](https://reactnative.dev/docs/button) uses the Android and iOS built-in buttons. This is good for a native look and feel, but customisation options are extremely limited, and it looks totally different between Android and iOS (for example the `color` prop sets the text colour on iOS, and the background colour on Android). It's good for bare-bones apps, but is rarely used in apps that follow a brand design or aim for cross-platform consistency.

More often, apps define their own styled buttons, or pull them from an in-house design system or component library. Let's create a folder of re-usable `components` and a simple `Button` we can use everywhere. We'll use `Pressable`, and use the `accessibilityRole` prop to tell the system that this pressable element should be treated like a button: 

```js
// Create ./components/button.js
import { Pressable, StyleSheet } from 'react-native'

export const Button = ({ children, onPress }) => (
  <Pressable
    style={({ pressed }) => [styles.button, pressed && styles.pressed]}
    accessibilityRole="button"
    onPress={onPress}
  >
    <Text style={styles.text}>{children}</Text>
  </Pressable>
)

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#ffffff',
    borderColor: '#000000',
    padding: 16,
    borderRadius: 16,
    borderWidth: 2,
    alignSelf: 'stretch'
  },
  pressed: {
    backgroundColor: '#dddddd'
  },
  text: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000000'
  },
})
```

Then let's use it on the welcome screen (in a container to give it some padding and group any additional buttons we add later):

```js
// In ./screens/welcome.js
import { View, Text, Pressable, StyleSheet } from 'react-native'
import { Button } from '../components/button'

export const Welcome = ({ navigation }) => (
  <View style={styles.container}>
    <Text style={styles.title}>NodeConfGame</Text>
    <View style={styles.buttons}>
      <Button onPress={() => navigation.navigate('Game')}>Play</Button>
    </View>
  </View>
)

const styles = StyleSheet.create({
  // ...more styles...
  buttons: {
    padding: 16,
    gap: 8,
    alignSelf: 'stretch'
  }
})
```

### 6. Add an "About" screen

Now we have a welcome screen we can add additional screens. Let's add a simple information screen about the game. We don't need any navigation in this screen because the stack screen header will have a back button (as well as supporting system back actions). Mostly, we just need simple text, using the `gap` style property to space the text blocks vertically. 

We'll also use a [React Native `ScrollView`](https://reactnative.dev/docs/scrollview) instead of a `View`. A major difference between React Native and web development is that by default, nothing is scrollable in React Native unless explicitly told to be. It's a good accessibility practice to make any screen with more than a couple of lines of text scrollable, because users can increase their device text size extremely high, and a user with a small device and extremely enlarged text would be completely unable to reach text that overflows the screen otherwise. Try experimenting with your own device's accessibility system settings and put text enlargement up to full to understand this better.

A `ScrollView` is the simplest way to make content scrollable. It renders two Views: an unmoving outer scroll container, and a movable inner content container. Its `style` property targets the fixed outer View (`flex: 1` here ensures it stretches to the bottom of the available screen and no further). To style the inner container that surrounds our actual content, we use the `contentContainerStyle` prop which is forwarded to the scrollable inner View.

```js
// Create ./screens/about.js

import { ScrollView, Text, StyleSheet } from 'react-native'

export const About = () => (
  <ScrollView contentContainerStyle={styles.container} style={styles.outer}>
    <Text style={styles.text}>This game was created in the NodeConf EU React Native workshop.</Text>
    <Text style={styles.text}>Tilt your device to roll the ball into the randomly-placed goals.</Text>
  </ScrollView>
)

const styles = StyleSheet.create({
  container: {
    gap: 16,
    padding: 16
  },
  outer: {
    flex: 1
  },
  text: {
    fontSize: 16
  }
})
```

Then add it to the stack navigator (any position other than first): 

```js
// In ./App

// ...lots of imports ...
import { Welcome } from "./screens/welcome";
import { Game } from "./screens/game";
import { About } from "./screens/about";

import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Welcome" component={Welcome} />
          <Stack.Screen name="Game" component={Game} />
          <Stack.Screen name="About" component={About} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
```

...and add a button to it in our welcome screen:

```js
// In ./screens/welcome.js

export const Welcome = ({ navigation }) => (
  <View style={styles.container}>
    <Text style={styles.title}>NodeConfGame</Text>
    <View style={styles.buttons}>
      <Button onPress={() => navigation.navigate('Game')}>Play</Button>
      <Button onPress={() => navigation.navigate('About')}>About</Button>
    </View>
  </View>
)
```

### 7. Add some web links

We talk about NodeConf and this workshop in the "About" screen, so why not link to the appropriate websites? 

In a React Native app the simplest way to open a web page is using React Native's `Linking.openURL` which opens the page in a system webview or the user's chosen browser, depending on how the user has set their device settings.

We can use our existing button component for this (it's less common for apps to use fiddly in-paragraph text links than it is on the web - web links are uncommon and a more "call to action"-like button is usually a better UX pattern), but for accessibility we should declare that this button is acting like a link not a button. Let's make our component's props overridable using `...` spread syntax, so we can set `accessibilityRole="link"` (and [any other Pressable prop](https://reactnative.dev/docs/pressable#props)) where appropriate (we can drop `onPress` too because we're just passing it through):

```js
export const Button = ({ children, ...pressableProps }) => (
  <Pressable
    style={({ pressed }) => [styles.button, pressed && styles.pressed]}
    accessibilityRole="button"
    {...pressableProps}
  >
    <Text style={styles.text}>{children}</Text>
  </Pressable>
)
```

Now, in `about.js`, we can add buttons and give them link roles:

```js
// In ./screens/about.js
import { View, Text, StyleSheet, Linking } from 'react-native'
import { Button } from '../components/button'

export const About = () => (
  <View style={styles.container}>
    <Text style={styles.text}>This game was created in the NodeConf EU React Native workshop.</Text>
    <Text style={styles.text}>Tilt your device to roll the ball into the randomly-placed goals.</Text>
    <Text style={styles.text}>Find out more:</Text>
    <Button accessibilityRole="link" onPress={() => Linking.openURL('https://github.com/nearform/react-native-workshop')}>
      Workshop on GitHub
    </Button>
    <Button accessibilityRole="link" onPress={() => Linking.openURL('https://www.nodeconf.eu/')}>
      nodeconf.eu
    </Button>
  </View>
)

```

### 8: Make the "Play" button primary

Our "About" screen isn't as interesting as the "Play" screen - most users will just want to play the game.

A good common design practice is to have a hierarchy of buttons with attention-grabbing "primary" buttons for the expected go-to most important actions. Let's add a solid primary variant to our button, and make "Play" the more eye-catching "primary" button on the welcome screen:

```js
// In ./components/button.js

export const Button = ({ children, primary = false, ...pressableProps }) => (
  <Pressable
    style={[styles.button, primary && styles.primary, ({ pressed }) => pressed && styles.pressed]}
    accessibilityRole="button"
    {...pressableProps}
  >
    <Text style={[styles.text, primary && styles.textPrimary]}>{children}</Text>
  </Pressable>
)

StyleSheet.create({
  // ...lots of styles...
  primary: {
    backgroundColor: '#000000'
  },
  textPrimary: {
    color: '#ffffff'
  },
})
```

...then in Welcome we can add `primary` prop to the "Play" button:

```js
// In screens/welcome.js

export const Welcome = ({ navigation }) => (
  <View style={styles.container}>
    <Text style={styles.title}>NodeConfGame</Text>
    <Button primary onPress={() => navigation.navigate('Game')}>Play</Button>
    <Button onPress={() => navigation.navigate('About')}>About</Button>
  </View>
)
```

## Want more?

This is the end of the workshop content for now.

Want to continue? Here's some ideas for additional challenges you can try:

### 1. Add settings and device storage

Explore React Native data management and storage by adding user-controlled settings.

For example, you could **make the sensitivity and speed of the ball configurable by the user**. Instead of using a hardcoded `12` as the multiplier for ball movement in `game.js`, make it just the default, pull the current value from a context provider using React's context system, and make that value editable in a settings screen:  

  1. Create a new "settings" screen.
  2. Create a `SettingsProvider` component used in `App` like the other providers, which uses [React's `createContext` function](https://react.dev/reference/react/createContext) to share a settings variable everywhere, and exports the context so it can be accessed using [React's `useContext` hook](https://react.dev/reference/react/useContext).
  3. Add `useState` to the SettingsProvider and share the state setter so you can adjust the value in your settings screen and read the value in the game screen.
  4. **Add a UI widget to the settings screen** to adjust the value. For example, a slider. There isn't a built-in slider component in React Native [any more](https://reactnative.dev/docs/slider) so you could make your own, research existing libraries (for example [@react-native-community/slider](https://github.com/callstack/react-native-slider)), or pull in a React Native component library like Native Base or React Native Paper.
  5. **Store the settings so they are remembered when the app is re-opened**. [React Native Async Storage](https://docs.expo.dev/versions/latest/sdk/async-storage/) is popular and supported in Expo Go, but you'll need to do some juggling with `useEffect` and your context setter to asynchronously load the settings during startup and re-render after it has loaded. Fast, synchronous storage libraries like [react-native-mmkv](https://github.com/mrousavy/react-native-mmkv) are increasingly popular to avoid this, but their native libraries aren't supported in Expo Go yet, so you'd also need to [create an Expo Development build](https://docs.expo.dev/develop/development-builds/create-a-build/) that includes these extra native libraries.

### 2. Play with the gameplay

If you're more interested in the game aspect, you can tinker with the game mechanics to enhance the gameplay. For example, here are some ideas:

  - **(easy) Add more elements.** For example, you could add an extra dimension to gameplay by having the user juggle two different-speed balls at once. Make the target circle red to match the ball, add a second blue ball and blue target, give the other ball a different speed, and make it so only collisions between same-colour balls score points, while balls colliding with wrong-colour targets reduce the score by one.
  - **(medium) Add obstacles and touch interaction.** You could add randomly-moving obstacles that penalise the player on collisions, and make them respond to fling gestures, so the user can tilt the devise with one hand and fling obstacles out the way with the other. [`react-native-gesture-handler`](https://docs.swmansion.com/react-native-gesture-handler/docs/) is a popular library to enhance working with touch gestures, supported by Expo Go.
  - **(hard) Add a proper physics engine.** This would allow you to introduction concepts like acceleration, friction and bounces for natural-feeling interactions. There are many JavaScript physics libraries, but many are hard-coded to work with a browser and HTML/DOM elements like `<canvas>` that don't exist in React Native. Two you could try are [P2](https://github.com/schteppe/p2.js/), which handles the mathematics and logic alone and leaves it to you to handle the rendering and animation. [React Native Game Engine](https://github.com/bberak/react-native-game-engine) also exists, which is specific to React Native and more opinionated about rendering and animation, but at time of writing it [appears to be unmaintained](https://github.com/bberak/react-native-game-engine/issues/78).

### 3. Enhance the graphics

If you're more interested in graphics, you could try enhancing the visuals. For example:

 - **(easy) Add simple gradients.** You could create a simple simulation of lighting by giving the ball and background a gradient using [React Native Linear Gradient](https://github.com/react-native-linear-gradient/react-native-linear-gradient) and tweak the gradient angle and properties as the user tilts the device.
 - **(medium) Use a 2D graphics library.** You could bring in a 2D graphics engine like Skia, via [React Native Skia](https://github.com/Shopify/react-native-skia).
 - **(hard) Use a 3D graphics library.** You could bring in a 3D graphics engine like OpenGL, via [Expo-GL](https://www.npmjs.com/package/expo-gl).
