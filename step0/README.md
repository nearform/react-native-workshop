# Step 0: Hello World

Objectives:
 - Set up an Expo app
 - Make it run

## Steps to get to this point

### 1. Create Expo project

```sh
npx create-expo-app NodeConfGame
```

This creates a template Expo app in JavaScript

#### Want TypeScript?

If you prefer to use TypeScript, add the `-t` flag to the above command.

We usually advise using TypeScript for real React Native apps going into production, but the examples in this workshop use JavaScript to lower the bar for entry.

### 2. Install dependencies

```sh
cd NodeConfGame
```

```sh
npm install
```

### 3. Start Expo

```sh
npx expo start --tunnel
```

> [!INFO]
> The default way to start an Expo app is `npm run start`, which runs `expo start` without the `--tunnel` flag, starting the Expo "Metro" server on a 192.168... network address instead of using a direct WiFi tunnel. That way is usually a little faster, but the tunnel option is a little less prone to errors (especially on a busy network at a workshop!).
> 
> Both usually work fine. If one doesn't work for you, try the other. If you need to clear the cache for any reason, add `-c`.

### 4. View the app in Expo Go

#### iOS
Scan the QR code in the terminal from the iOS camera app and open the link in Expo Go

#### Android
Open Expo Go and use the `Scan QR code` button to scan the QR code in the terminal

#### Emulator
This workshop is best followed using a real Android or iOS device, but you may have a reason to prefer to use an emulator. Choose android or ios from the in-terminal options, and Expo should offer install Expo Go inside the emulator.

### 5. Did it work?

If everything worked, you should see a notice about building JavaScript, then a short loading splash screen, then a white screen with text like this:

> Open up App.js to start working on your app!

Open `App.js`, make some small change like editing this text, save, and it should automatically update the app.

#### Troubleshooting

 - If you already had Expo Go installed, check it is up to date
 - If the app gets stuck on a loading screen, try restarting Expo app, or restarting the Expo terminal with or without the `--tunnel` flag
 - If the Expo app fails with "Something went wrong", check the terminal is still running (and try restarting it), and check the devices are on the same network
 - If you have persistent network trouble, try using a USB cable, or create a (free) Expo account and log in on both devices
