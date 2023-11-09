import { SplashScreen, Stack } from "expo-router"
import { useFonts } from "expo-font"
import { customFontsToLoad } from "@/theme"
import { AuthProvider } from "@/context/AuthProvider"
import { useEffect } from "react"

SplashScreen.preventAutoHideAsync()

export default function Layout() {
  const [fontsLoaded, fontError] = useFonts(customFontsToLoad)

  useEffect(() => {
    if (fontsLoaded || fontError) {
      // Hide the splash screen after the fonts have loaded (or an error was returned) and the UI is ready.
      SplashScreen.hideAsync()
    }
  }, [fontsLoaded, fontError])

  // Prevent rendering until the font has loaded or an error was returned
  if (!fontsLoaded && !fontError) {
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
          name="(auth)/demoLogin"
          options={{
            title: "Login",
            headerShown: false,
          }}
        />
      </Stack>
    </AuthProvider>
  )
}
