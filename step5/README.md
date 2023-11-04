# Step 5

Objectives:
 - Keep track of the score
 - Speak the score out loud
 - Allow the score to be reset

## Steps to get to this point

### 1: Store the score in state

[React's `useState` hook](https://react.dev/reference/react/useState) is the simplest way to persist and update a value in memory. Each call to this hook returns a two-length array where the first entry is the current value of this state, and the second is a function that updates it. Every time the updater function is called with a value that doesn't `===` the old value, the component re-renders and everything updates.

The argument passed to `useState` is the value on the very first render, which we want to be `0` (if you're using TypeScript, it'll figure out from this that _this_ particular state should therefore always be a number):

```js
const Game = () => {
  // ...other hook calls like `useSafeAreaFrame` etc... 
  // It's a good practice to keep all calls to hooks together at the start of a function component

  // Start with a score of 0
  const [score, setScore] = React.useState(0);
```

We'll call `setScore` when the player scores, right after the haptic feedback.

A neat feature of the setter functions from `useState` is, they can take either a simple value, or a function that will be called with the old value as the argument. Since we're calling `Haptics` inside an event handler inside a hook that we want to call only once, it won't see the new value of `score` that is loose in the main function component scope, so rather than having to do some hacky scope injection we can pass `setScore` a function which gets the previous `score` as an argument:

```js
// ...inside `subscription` inside `useEffect`...
        // And vibrate
        Haptics.notificationAsync();

        // START: STEP 5 ADDITION
        // And update the score by 1
        setScore((score) => {
          const newScore = score + 1;

          return newScore;
        });
        // END: STEP 5 ADDITION
```

For this step let's just add some simple logging to check it's working as expected. Put this loose in the main `Game` function. If everything is working, we expect to see a new number printed in the console terminal that called `expo start` each time the player scores (this should currently be the only thing that causes the game board to re-render):

```js
  console.log(score)
  return (
    <View style={styles.container}>      
```

> [!INFO]
> As the app gets more complex and we add more features, if we leave that log in, it's likely we'll see multiple entries showing the same score as additional features cause more re-renders for other reasons. It's a good practice in React and React Native to keep an eye on re-renders: while they're generally very fast as React only usually updates real UI elements that have genuinely changed, spotting unexpected re-renders can be a good way to catch sloppy or bug-prone code that can lead to hard-to-catch and hard-to-fix bugs further down the line.

### 2: Show the score as text

All text in React Native must be inside `Text` component. If you're already familiar with React on web, this is one of the major differences: in HTML, implicit text nodes are created for every string of text, but in React Native they must be explicit and any loose strings or numbers in a render will cause an error. Try this and see how React Native quickly rejects it:

```js
    <View style={styles.container}>
      {/* this will crash the app */}
      The score is {score}
      <Reanimated.View style={[styles.target, targetPosition]} />
```

We need to wrap the text in a `Text` component, which also houses text styling. This is another difference to web: in React Native, text styles on a container block don't cascade down to text further down the tree. [Text styles](https://reactnative.dev/docs/text-style-props) need to be applied to `Text`.

So let's wrap our text in a `View` to house the layout styles and `Text` to house the text:

```js
  return (
    <View style={styles.container}>
      <Reanimated.View style={[styles.target, targetPosition]} />
      <Reanimated.View style={[styles.ball, ballPosition]} />

      {/* START: STEP 5 ADDITION */}
      <View style={styles.scoreContainer}>
        <Text style={styles.scoreText}>Score: {score}</Text>
      </View>
      {/* END: STEP 5 ADDITION */}
```

...and define those styles:

```js
const styles = StyleSheet.create({
  // ...other styles like `container`...
  
  // START: STEP 5 ADDITION
  scoreContainer: { position: "absolute", bottom: 20, left: 20 },
  scoreText: { fontSize: 40, fontWeight: "bold" },
  // END: STEP 5 ADDITION
});
```

### 3: Speak the score out loud

Android and iOS have built-in text-to-speech APIs that allow any app to say text out loud using the system voice, picking up on any voice choices the user has made for features like navigation directions or accessibility screen-readers.

Expo's `expo-speech` library gives us a simple JavaScript API that calls the appropriate underlying system text-to-speech API with any arbitrary string. Let's call this inside our call to `setScore` so it accesses the latest score as it updates:

```js
        // START: STEP 5 ADDITION
        // And update the scrore by 1
        setScore((score) => {
          const newScore = score + 1;

          // Announce the updated score
          Speech.speak(newScore.toString());

          return newScore;
        });
        // END: STEP 5 ADDITION
```

Simple as one line - the "native module" part of `expo-speech` does all the hard stuff for us.

### 4: Add a reset button

We're not saving the score in device storage so it'll reset when we restart the app, but maybe the user wants to restart and hand over to another player without closing the app. Let's add a reset button that sets the score to `0`.

React Native's `Pressable` component is the most versatile way to make a interactive element that responds to touch. It's `style` prop and children can be a function that takes an object that includes the current pressed state, to easily visually respond instantly to touches.

```js
        <Pressable
          onPress={() => setScore(0)}
          style={({ pressed }) => ({
            opacity: pressed ? 0.5 : 1,
          })}
        >
          <Text style={styles.resetText}>Reset</Text>
        </Pressable>
```

> [!INFO]
> There are also a bunch of built-in `Touchable*` components but `Pressable` the newest, most versatile and recommended.
