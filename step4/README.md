# Step 4: Detect target collisions

Objectives:
 - Detect collisions between the ball and the target
 - Trigger haptic feedback

> [!NOTE]
> You can [view a diff](https://github.com/nearform/react-native-workshop/pull/18/files) of all the changes for this step.

## Steps to get to this point

### 1: Detect collisions between the ball and the target

We can implement some basic collision detection within the DeviceMotion listener. We need to compare the position of the ball and the position of the current target, taking into account the ball and target size, as well as the width of the targets border.

We'll use the pre-made `getIsBallInTarget` function from our custom hook to handle this for us, but feel free to adjust the logic if you desire. 

```js
if (
  getIsBallInTarget({
    ballX: ballAnimation.value.x,
    ballY: ballAnimation.value.y,
    targetX: targetAnimation.value.x,
    targetY: targetAnimation.value.y,
  })
) { ... }
```

When the ball is in the target, we want to move the target to a new random position. For that we can use the `getRandomTargetPosition` helper again to update the position of the target. 

```js
targetAnimation.value = getRandomTargetPosition();
```

We can make this into a nice smooth animation by using `withTiming` again. The default animation easing is quite suitable for this, sliding in a natural-looking way:

```js
  const targetPosition = useAnimatedStyle(() => ({
    transform: [
      { translateX: withTiming(targetAnimation.value.x, { duration: 350 }) },
      { translateY: withTiming(targetAnimation.value.y, { duration: 350 }) },
    ],
  }));
```

### 2: Trigger haptic feedback

A great benefit of React Native is that it makes access access to device functionality, such as audio, haptic feedback and the camera, very easy.

To improve the user experience of our game, we can trigger haptic feedback when the ball collides with the target.

We will trigger a simple haptic notification using Expo's [Haptics](https://docs.expo.dev/versions/latest/sdk/haptics/) library.

```js
Haptics.notificationAsync();
```
