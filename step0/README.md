# Step 0: Hello World

Objectives:
 - Set up an Expo app
 - Make it run

## Steps to get to this point

### 1. Create Expo project

```sh
npx create-expo-app NodeConfGame --template
```

This creates an Expo app, and lets you choose which of Expo's built-in app templates to use:

- For this workshop, we recommend the default, **"Blank"**, which is a minimal working app in JavaScript
- If you're comfortable with TypeScript, feel free to use **"Blank (TypeScript)"** 

If you want to continue exploring React Native after this workshop, consider creating another app with their "Navigation" template. It's a good starting point for playing with a simple information-heavy app.

> [!NOTE]
> #### JavaScript or TypeScript?
> 
> This workshop content focuses on JavaScript, to be accessible to more people.
>
> For real React Native apps going into production, however, we recommend using TypeScript. Bugs in production are harder to fix in mobile apps than on web or a server as the app store release process is much slower. Also, a lot of next-generation advanced React Native features are increasingly using strict TypeScript for better integrations with strongly-typed native code.
> 
> If you decide to invest serious time in React Native, consider also investing time in TypeScript.

### 2. Install dependencies

```sh
cd NodeConfGame
```

```sh
npm install
```

### 3. Start Expo

```sh
npm start -- --tunnel
```

This may prompt you to install `ngrok`, a service which helps serve your local app code to Expo's services.

> [!NOTE]
> The default way to start an Expo app is `npm run start`, which runs `expo start` starting the Expo "Metro" server on a 192.168... network address. This works great on private WiFi, but does not work on public WiFi like this hotel's. Using the `--tunnel` flag starts a web server that sends the data over public internet. This relies on [ngrok](https://ngrok.com/) and can be a little slower to run.
> 
> Tunnel connections are usually robust, but can snarl up: if this happens, try restarting the service and clearing the cache by adding `-c` - like `npm start -- --tunnel -c`.

> [!IMPORTANT]
> **If you can't get this to work**, try to create a WLAN connection via a hotspot, instead of a tunnel via the public internet:
> - We've got a Raspberry Pi hotspot running in this room! Network name `nodepi` password `kilkenny`. Connect to that on **both** laptop and android/ios device and run `npm start`.
> - If that doesn't work but you have a good data connection on your phone (and low/no data roaming fees!), try setting up a WiFi hotspot on your device, connect your laptop to that, then run `npm start`. 

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

 - If something doesn't look right, first try pressing `r` in the Expo Metro server terminal to reload the app. A lot of problems disappear with a reload
 - If you already had Expo Go installed before this workshop and you encounter problems, check it is up to date
 - If the app gets stuck on a loading screen, try restarting Expo app, or restarting the Expo terminal with or without the `--tunnel` flag
 - If the Expo app fails with "Something went wrong", check the terminal is still running (and try restarting it), and check the devices are on the same network
 
 If you have persistent network trouble:
 
  - Check you don't have a firewall or similar blocking your laptop from running a local network server or your device from connecting to it.
  - Create a (free) Expo account and log in on both devices. This should enable Expo Go to get your app data from Expo's servers via normal `https`.
  - Try using a USB cable. For Android, you may also need to install `adb` and enable USB Debugging on the Android device.
