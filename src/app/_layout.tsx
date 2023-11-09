import { Stack } from "expo-router"
import { AuthProvider } from "@/context/AuthProvider"

export default function RootLayout() {
  return (
    <AuthProvider>
      <Stack
        options={{
          headerShown: false,
        }}
      >
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
            headerShown: false
          }}
        />
        <Stack.Screen
          name="(auth)/demoLogin"
          options={{
            title: "Login",
            headerShown: false
          }}
        />
      </Stack>
    </AuthProvider>
  )
}
