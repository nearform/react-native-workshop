---
theme: slidev-theme-nearform
layout: default
highlighter: shiki
lineNumbers: false
---

<img class=logo src="/images/nearform.svg">

# React Native Workshop

<div class="flex gap-8">
<img src="/images/react-native.svg" style="width: 15%;">
<img src="/images/expo.png" style="width: 15%;">
</div>

<div class="copyright">
© Copyright 2023 NearForm Ltd. All Rights Reserved.
</div>

<div class="flex flex-col absolute bottom-8 right-6" style="width: 200px;">
Please install Expo app
👇 Android or iOS 👇
<img src="/images/qrcode_expo.dev.png" style="height: 200px; width: 200px; margin: 10px 0;">
https://expo.dev/client
</div>


---
class: dense
---

# Why React Native?

- Single code base for:
  - Native iOS
  - Native Android
  - Web
- _Learn once, write anywhere_ - [reactnative.dev](https://reactnative.dev)
- _Write once, deploy anywhere_
- Leverage common (and possibly existing) team skills (JS + React)
- App and Play Store discoverability
- Access to native APIs
- Greenfield or Brownfield

<div class="flex flex-col absolute bottom-8 right-6" style="width: 200px;">
Please install Expo app
👇 Android or iOS 👇
<img src="/images/qrcode_expo.dev.png" style="height: 200px; width: 200px; margin: 10px 0;">
https://expo.dev/client
</div>

---
class: dense
---

# Why not React Native?

- Small performance hit compared to native apps (swift, kotlin, etc)
- Native animations
- Requires entire team buy-in (designers, product owners, etc)
- Complex to get a "native feel" on all platforms
- Complex deployment pipelines (compared to PWAs)
- Migrating existing apps to RN can be complex (goal: 100% RN)

<div class="flex flex-col absolute bottom-8 right-6" style="width: 200px;">
Please install Expo app
👇 Android or iOS 👇
<img src="/images/qrcode_expo.dev.png" style="height: 200px; width: 200px; margin: 10px 0;">
https://expo.dev/client
</div>

---

# Expo vs vanilla React Native

- Expo
  - 1-liner setup
  - Expo Go: great for POCs 🚀
  - Limited access to native code and APIs
  - Easier updates
- Vanilla React Native
  - Full control 💪
  - Directly edit native app files
  - Can be hard to update 🤯

<div class="flex flex-col absolute bottom-8 right-6" style="width: 200px;">
Please install Expo app
👇 Android or iOS 👇
<img src="/images/qrcode_expo.dev.png" style="height: 200px; width: 200px; margin: 10px 0;">
https://expo.dev/client
</div>

---
class: dense
---

# Expo Go

- "Shell" React Native app
- Already published to App & Play stores
- Includes "common" native modules
- Fast and simple dev builds.
- Does not require a Mac for iOS apps
- Great for POCs
- Need to build full app for distribution

<div class="flex flex-col absolute bottom-8 right-6" style="width: 200px;">
Please install Expo app
👇 Android or iOS 👇
<img src="/images/qrcode_expo.dev.png" style="height: 200px; width: 200px; margin: 10px 0;">
https://expo.dev/client
</div>

---
class: dense
---

# Who's using it? - Community

|||
|-|-|
|<img src="/images/microsoft-logo.png" width=100>|Microsoft: Office, Outlook, Teams, Xbox Game Pass, Skype|
|<img src="/images/meta-logo.svg" width=150 style="margin-left:-24px;">|Meta: Facebook, Oculus, Messenger Desktop|
|<img src="/images/shopify-logo.svg" width=100>|Shopify| 
|<img src="/images/tesla-logo.png" width=40>|Tesla| 
|<img src="/images/discord-mark-white.svg" width=40>|Discord| 
| Many more... ||


<div class="flex flex-col absolute bottom-8 right-6" style="width: 200px;">
Please install Expo app
👇 Android or iOS 👇
<img src="/images/qrcode_expo.dev.png" style="height: 200px; width: 200px; margin: 10px 0;">
https://expo.dev/client
</div>

---
class: dense
---

# Who's using it? - NearForm Partners

* Virgin Media
* Telus
* Get Ireland Walking
* NOMO
* GHA Covid App


<div class="flex flex-col absolute bottom-8 right-6" style="width: 200px;">
Please install Expo app
👇 Android or iOS 👇
<img src="/images/qrcode_expo.dev.png" style="height: 200px; width: 200px; margin: 10px 0;">
https://expo.dev/client
</div>

---

# Start here

- Clone this workshop!
  1. https://github.com/nearform/react-native-workshop
  2. Open these slides from the readme
  3. Look in `./step0` etc for code and more info in `README`s

- React Native's quickstart guide:

https://reactnative.dev/docs/environment-setup?guide=quickstart

<div class="flex flex-col absolute bottom-8 right-6" style="width: 200px;">
Please install Expo app
👇 Android or iOS 👇
<img src="/images/qrcode_expo.dev.png" style="height: 200px; width: 200px; margin: 10px 0;">
https://expo.dev/client
</div>
  
---

# [Step 0: Hello world](https://github.com/nearform/react-native-workshop/tree/main/step0)

- Create and run starter Expo app:
  - `npx create-expo-app NodeConfGame --template`
  - Pick <b>"Blank"</b> for JavaScript, or "Blank (TypeScript)"
  - `cd NodeConfGame` then  `npm i`
  - `npm start -- --tunnel`
  - Follow the instructions in terminal

<div style="width: 70%">
ℹ️ You'll need the Expo Go app on an Android or iOS device, which must be online. See [./step0/README.md](https://github.com/nearform/react-native-workshop/tree/main/step0) for network trouble tips.

ℹ️ If you prefer to use an emulator, Expo will install Expo Go on it. <br />⚠️ This workshop is better on a real device than an emulator.
</div>

<div class="flex flex-col absolute bottom-8 right-6" style="width: 230px;">
<img src="/images/step0.jpg" style="width: 230px">
</div>

---

# [Step 1: Drop the ball](https://github.com/nearform/react-native-workshop/tree/main/step1)

- See detailed instructions in [🔗 ./step1/README.md](https://github.com/nearform/react-native-workshop/tree/main/step1):
  - Use `npx expo install` to add dependencies 
  - Add necessary Babel config for Reanimated
  - Copy in the provided `useGameMath` hook
  - Add imports to main app screen
  - Add game area `View` and ball

<div style="width: 70%">
ℹ️ Expo projects should add deps with `npx expo` install to always get the exact Expo-compatible version.

ℹ️ You can [🔗 view a diff](https://github.com/nearform/react-native-workshop/pull/7/files) of all the changes for this step.
</div>

<div class="flex flex-col absolute bottom-8 right-6" style="width: 230px;">
<img src="/images/step1.jpg" style="width: 230px">
</div>

--- 

# [Step 2: Get rolling](https://github.com/nearform/react-native-workshop/tree/main/step2)

- See detailed instructions in [🔗 ./step2/README.md](https://github.com/nearform/react-native-workshop/tree/main/step2):
  - Add a Expo Sensors `DeviceMotion` listener
  - Set a reasonable event frequency (e.g. 16ms / 60fps) 
  - Update the ball's x and y transform position on tilt

<div style="width: 70%">
ℹ️ Use `DeviceMotion.setUpdateInterval` to control how frequently motion events are received

ℹ️ You can add the listener using `useEffect` (give it an empty array as a second argument, and a cleanup return function)

ℹ️ You can [🔗 view a diff](https://github.com/nearform/react-native-workshop/pull/16/files) of all the changes for this step.
</div>

<div class="flex flex-col absolute bottom-8 right-6" style="width: 230px;">
<img src="/images/step2.gif" style="width: 230px">
</div>

--- 

# [Step 3: Add a target](https://github.com/nearform/react-native-workshop/tree/main/step3)

- See detailed instructions in [🔗 ./step3/README.md](https://github.com/nearform/react-native-workshop/tree/main/step3):
  - Create a new reanimated view
  - Give it styles to draw a hollow circle
  - Position it randomly within game bounds

<div style="width: 70%">
ℹ️ Our `useGameMath` hook provides a function `getRandomTargetPosition` that can keep the target in bounds

ℹ️ You can [🔗 view a diff](https://github.com/nearform/react-native-workshop/pull/17/files) of all the changes for this step.
</div>

<div class="flex flex-col absolute bottom-8 right-6" style="width: 230px;">
<img src="/images/step3.gif" style="width: 230px">
</div>

--- 

# [Step 4: Detect target collisions](https://github.com/nearform/react-native-workshop/tree/main/step4)

- See detailed instructions in [🔗 ./step4/README.md](https://github.com/nearform/react-native-workshop/tree/main/step4):
  - Detect collisions between the ball and the target
  - Trigger haptic feedback

<div style="width: 70%">
ℹ️ Our `useGameMath` hook provides a function `getIsBallInTarget` that can detect collisions between the target and the ball

ℹ️ You can [🔗 view a diff](https://github.com/nearform/react-native-workshop/pull/18/files) of all the changes for this step.
</div>

<div class="flex flex-col absolute bottom-8 right-6" style="width: 230px;">
<img src="/images/step4.gif" style="width: 230px">
</div>

--- 

# [Step 5: Keep score](https://github.com/nearform/react-native-workshop/tree/main/step5)

- See detailed instructions in [🔗 ./step5/README.md](https://github.com/nearform/react-native-workshop/tree/main/step5):
  - Store the score using `useState`
  - Show the score as `Text`
  - Add a "reset" `Pressable` button
  - Say the score using `expo-speech`

<div style="width: 70%">
ℹ️ All text must be inside a `Text` component, else React Native throws an error

ℹ️ You can [🔗 view a diff](https://github.com/nearform/react-native-workshop/pull/19/files) of all the changes for this step.
</div>

<div class="flex flex-col absolute bottom-8 right-6" style="width: 230px;">
<img src="/images/step5.gif" style="width: 230px">
</div>

