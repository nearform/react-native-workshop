# Step 2: Get rolling

Objectives:
 - Detect device tilts by the user
 - Control the ball by tilting the device

## Steps to get to this point

### 1: Add a DeviceMotion listener

We need to signal to the device's native API that we want to subscribe to tilt events. The `expo-sensors` module handles all of this: its export `DeviceMotion` has a method `addListener` that bridges to the appropriate Android or iOS system API and starts listening to device tilts and movements.

We want to add this listener when the screen is mounted and rendered - a "side effect" of rendering the screen. The typical way to handle side effects of a render like this in React is with the built-in `useEffect` hook. It takes a function and an array, and calls the function once when the component is rendered, and again if the contents of the array change (but we don't want to call it again here, so we pass an empty array here). If the function returns another function, it calls the returned function when the component is unmounted or removed.

Initially, to see how `DeviceMotion` works, let's add a listener that just logs the details of the device tilt to the console:

```js
React.useEffect(() => {
  const subscription = DeviceMotion.addListener((deviceMotionMeasurment) => {
    // These logs will show in the terminal where we ran `expo start`
    console.log('deviceMotionMeasurment', deviceMotionMeasurment);
  });

  // Returning the `remove` function tells the system it can stop listening if this is removed
  return subscription.remove;
}, []); // <-- the empty array here means the function is only called once, after the first render
```

### 2: Control the update interval

Depending on your device, you might see an unreasonably high or low number of logs. Just how often should the device tell us about each tiny movement of the device? 

Instead of letting the system guess, let's explicitly tell it. We can see in the Expo Sensors documentation that `DeviceMotion` has a `setUpdateInterval` method: let's use it, before we start the listener. 16ms is equivalent to 60 frames per second:

```js
React.useEffect(() => {
  // Set the update interval to 16ms (60fps)
  DeviceMotion.setUpdateInterval(16);

  const subscription = DeviceMotion.addListener((deviceMotionMeasurment) => {
```

This sets the update interval to every 16 milliseconds - fast, but not wildly unreasonable.

### 3: Roll the ball

We've already created a "ball" with a position controlled by an animatable transform "shared value". Now it's time to use that and make the ball move. Many games have a "game loop" running every few milliseconds updating the whole scene - ours is simpler, our only animatable element is the ball and our only control is the tilt set to every 16ms, so for this exercise we can respond to each device motion event and treat that like a game loop, updating the ball's position each time a new tilt event is received.

From experimenting with the device and looking at the logs, we have probably noticed that left-right tilts impact the `rotation.gamma` property and up-down tilts impact the `rotation.beta` property, so let's use those to update the x and y transform: multiplied by a constant (feel free to experiment: we found `12` to be good) and inside our maths hook's `getConstrainedBallX` and `Y` functions to keep the ball in the pre-set playing area: 

```js
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
    });

    return subscription.remove;
  }, []);
```

