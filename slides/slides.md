---
theme: slidev-theme-nearform
layout: default
highlighter: shiki
lineNumbers: false
---

<img class=logo src="/images/nearform.svg">

# React Native Workshop

<img src="/images/react-native.svg" style="width: 15%;">

<div class="copyright">

© Copyright 2023 NearForm Ltd. All Rights Reserved.

</div>

---
class: dense
---

# Why React Native?

- Single code base for:
  - native iOS
  - native Android
  - web
- _Learn once, write anywhere_ - [reactnative.dev](https://reactnative.dev)
- _Write once, deploy anywhere_
- Leverage common (and possibly existing) team skills (JS + React)
- App and Play store discoverability
- Access to native APIs
- Greenfield

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

---

# Expo vs vanilla React Native

- Expo
  - 1-liner setup
  - Expo Go: great for POCs 🚀
  - Limited access to native code and APIs **TODO: this is only for GO right?**
  - Can be hard to update 🤯
- Vanilla React Native
  - Full control 💪
  - Easier updates
  - Native code & APIs

---

# Expo Go

- "Shell" React Native app
- Already published to App & Play stores
- Includes "common" native modules (can't add others)
- Easy to debug application
- Great for POCs
- Need to publish final app for distribution

---

# Start here

https://reactnative.dev/docs/environment-setup