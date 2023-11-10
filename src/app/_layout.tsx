/* eslint-disable import/first */
/**
 * Welcome to the main entry point of the app. In this file, we'll
 * be kicking off our app.
 *
 * Most of this file is boilerplate and you shouldn't need to modify
 * it very often. But take some time to look through and understand
 * what is going on here.
 *
 * The app navigation resides in ./app/navigators, so head over there
 * if you're interested in adding screens and navigators.
 */
import { useInitialRootStore } from "@/models"

if (__DEV__) {
  // Load Reactotron configuration in development. We don't want to
  // include this in our production bundle, so we are using `if (__DEV__)`
  // to only execute this in development.
  require("@/devtools/ReactotronConfig.ts")
}
import { SplashScreen, Stack } from "expo-router"
import { useFonts } from "expo-font"
import { customFontsToLoad } from "@/theme"
import { AuthProvider } from "@/context/AuthProvider"
import * as storage from "@/utils/storage"
import { useNavigationPersistence } from "@/navigators/navigationUtilitiesExpoRouter"

SplashScreen.preventAutoHideAsync()

export const NAVIGATION_PERSISTENCE_KEY = "NAVIGATION_STATE"

export default function Layout() {
  const [areFontsLoaded] = useFonts(customFontsToLoad)

  useNavigationPersistence(storage, NAVIGATION_PERSISTENCE_KEY)

  // This runs after the root store has been initialized and rehydrated.
  // If your initialization scripts run very fast, it's good to show the splash screen for just a bit longer to prevent flicker.
  // Slightly delaying splash screen hiding for better UX; can be customized or removed as needed,
  // Note: (vanilla Android) The splash-screen will not appear if you launch your app via the terminal or Android Studio. Kill the app and launch it normally by tapping on the launcher icon. https://stackoverflow.com/a/69831106
  // Note: (vanilla iOS) You might notice the splash-screen logo change size. This happens in debug/development mode. Try building the app for release.
  const { rehydrated } = useInitialRootStore(async () => {
    if (areFontsLoaded) {
      await SplashScreen.hideAsync()
    }
  })

  // Before we show the app, we have to wait for our state to be ready.
  // In the meantime, don't render anything. This will be the background
  // color set in native by rootView's background color.
  // In iOS: application:didFinishLaunchingWithOptions:
  // In Android: https://stackoverflow.com/a/45838109/204044
  // You can replace with your own loading component if you wish.
  if (!rehydrated || !areFontsLoaded) {
    return null
  }

  // Render the children routes now that all the assets are loaded.
  return (
    <AuthProvider>
      <Stack>
        <Stack.Screen
          name="(demo)"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="welcome"
          options={{
            title: "Welcome",
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="(auth)/login"
          options={{
            title: "Login",
            headerShown: false,
          }}
        />
      </Stack>
    </AuthProvider>
  )
}
