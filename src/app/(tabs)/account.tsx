import { View, Text, StyleSheet, TouchableOpacity } from "react-native"
import { useAuth } from "@/context/AuthProvider"

export default function Account() {
  const { setUser, user } = useAuth()

  return (
    <View style={styles.container}>
      <Text>Account</Text>
      <Text>{user && user.name}</Text>
      <TouchableOpacity onPress={() => setUser(null)} style={styles.button}>
        <Text>Log out</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  button: {
    marginTop: 20, // Example style for the button, you can adjust it as needed
  },
  container: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
  },
})
