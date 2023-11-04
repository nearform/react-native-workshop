# Step 3: Add a target

Objectives:
 - Add a target circle
 - Place it at a random position
 - (No collision detection yet)

> [!NOTE]
> You can [view a diff](https://github.com/nearform/react-native-workshop/pull/17/files) of all the changes for this step.

## Steps to get to this point

### 1: Add a View for the target

Like the ball, we'll use a simple `View` for the target but make it capable of animation by using the View from the `Reanimated` library.

Let's create it first, adding this inside our container view above our ball reanimated view:

```js
<Reanimated.View style={styles.target} />
```

...and let's add a new entry for it to the stylesheet, using width, height and border styles to draw a circle:

```js
  target: {
    position: "absolute",
    width: TARGET_WIDTH,
    height: TARGET_WIDTH,
    borderRadius: TARGET_WIDTH,
    borderWidth: TARGET_BORDER_WIDTH,
    borderColor: "blue",
  },
```

This uses some constants which we should define above the component:

```js
const BALL_WIDTH = 20;
const TARGET_WIDTH = BALL_WIDTH * 2;
const TARGET_BORDER_WIDTH = 2;
```

### 2: Give it a random position

Like with the ball, we can use `useSharedValue` and `useAnimatedStyle` to make the value capable of animation. We'll use the pre-made `getRandomTargetPosition` function from our custom hook to ensure the random position is within the game area:

```js
  // Start with the target in a random position
  const targetAnimation = useSharedValue(getRandomTargetPosition());

  // Create the target styles based on the current ballAnimation value
  const targetPosition = useAnimatedStyle(() => ({
    transform: [
      { translateX: targetAnimation.value.x },
      { translateY: targetAnimation.value.y },
    ],
  }));
```

React Native components can take an array of styles, so we'll add this new style alongside the static circle styles:

```js
<Reanimated.View style={[styles.target, targetPosition]} />
```

Now each time we restart the app, the target circle will appear in a new random position. Next we'll make it part of the game.
