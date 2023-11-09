import { Stack } from "expo-router"
import { AuthProvider } from "@/context/AuthProvider"

export default function RootLayout() {
  return (
    <AuthProvider>
      <Stack>
        <Stack.Screen
          name="(tabs)"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="welcome"
          options={{
            title: "Welcome",
            headerShown: false
          }}
        />
      </Stack>
    </AuthProvider>
  )
}
