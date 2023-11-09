import { View, Text, TouchableOpacity, StyleSheet } from "react-native"
import { useAuth } from "@/context/AuthProvider"

export default function Login() {
  const { setUser } = useAuth()

  const login = () => {
    setUser({
      name: "John Doe",
    })
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={login}>
        <Text>Login</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
  },
})
