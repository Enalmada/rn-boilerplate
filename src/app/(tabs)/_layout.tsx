import { FontAwesome } from "@expo/vector-icons"
import { BottomTabBar } from "@react-navigation/bottom-tabs"
import { BlurView } from "expo-blur"
import { Tabs } from "expo-router"
import { Platform, View, Text, StyleSheet } from "react-native"

// Define your colors as constants
const TRANSPARENT = "transparent"
const BACKGROUND_COLOR_IOS = TRANSPARENT
const BACKGROUND_COLOR_DEFAULT = undefined

export default function TabsLayout() {
  return (
    <Tabs
      initialRouteName="home"
      screenOptions={{
        tabBarStyle: styles.tabBar,
        headerShown: false,
      }}
      tabBar={(props) =>
        Platform.OS === "ios" ? (
          <BlurView style={styles.blurView} intensity={95}>
            <BottomTabBar {...props} />
          </BlurView>
        ) : (
          <BottomTabBar {...props} />
        )
      }
    >
      <Tabs.Screen
        name="home"
        options={{
          href: "/home",
          title: "",
          tabBarIcon: ({ color }) => (
            <View style={styles.tabBarIconContainer}>
              <TabBarIcon name="home" color={color} size={24} />
              <Text style={styles.tabBarIconText}>Home</Text>
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="account"
        options={{
          title: "",
          headerShown: true,
          href: { pathname: "/account" },
          tabBarIcon: ({ color }) => (
            <View style={styles.tabBarIconContainer}>
              <TabBarIcon name="user" color={color} size={24} />
              <Text style={styles.tabBarIconText}>Account</Text>
            </View>
          ),
        }}
      />
    </Tabs>
  )
}

interface TabBarIconProps {
  name: React.ComponentProps<typeof FontAwesome>["name"]
  color: string
  size?: number
}

function TabBarIcon({ name, color, size = 26 }: TabBarIconProps) {
  return <FontAwesome name={name} color={color} size={size} style={styles.icon} />
}

const styles = StyleSheet.create({
  blurView: {
    bottom: 0,
    left: 0,
    position: "absolute",
    right: 0,
  },
  icon: {
    marginBottom: -3,
  },
  tabBar: {
    backgroundColor: Platform.OS === "ios" ? BACKGROUND_COLOR_IOS : BACKGROUND_COLOR_DEFAULT,
  },
  tabBarIconContainer: {
    alignItems: "center",
    backgroundColor: TRANSPARENT,
    flexDirection: "column",
    marginTop: 17,
  },
  tabBarIconText: {
    fontSize: 10,
    marginTop: 5,
    opacity: 0.5,
  },
})
