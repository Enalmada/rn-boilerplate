import { BottomTabBar } from "@react-navigation/bottom-tabs"
import { BlurView } from "expo-blur"
import { Tabs } from "expo-router"
import { Platform, StyleSheet } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { Icon } from "@/components"
import { translate } from "@/i18n"
import { colors, spacing, typography } from "@/theme"

export default function DemoLayout() {
  const { bottom } = useSafeAreaInsets()

  return (
    <Tabs
      initialRouteName="demoShowroom"
      screenOptions={{
        headerShown: false,
        tabBarHideOnKeyboard: true,
        tabBarStyle: [{ ...styles.tabBar, height: bottom + 70 }],
        tabBarActiveTintColor: colors.text,
        tabBarInactiveTintColor: colors.text,
        tabBarLabelStyle: styles.tabBarLabel,
        tabBarItemStyle: styles.tabBarItem,
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
        name="demoCommunity"
        options={{
          href: "/demoCommunity",
          title: "",
          tabBarLabel: translate("demoNavigator.communityTab"),
          tabBarIcon: ({ focused }) => (
            <Icon icon="community" color={focused ? colors.tint : undefined} size={30} />
          ),
        }}
      />
      <Tabs.Screen
        name="demoPodcastList"
        options={{
          title: "",
          headerShown: true,
          href: {
            pathname: "/demoPodcastList",
          },
          tabBarAccessibilityLabel: translate("demoNavigator.podcastListTab"),
          tabBarLabel: translate("demoNavigator.podcastListTab"),
          tabBarIcon: ({ focused }) => (
            <Icon icon="podcast" color={focused ? colors.tint : undefined} size={30} />
          ),
        }}
      />
      <Tabs.Screen
        name="demoDebug"
        options={{
          title: "",
          headerShown: true,
          href: {
            pathname: "/demoDebug",
          },
          tabBarLabel: translate("demoNavigator.debugTab"),
          tabBarIcon: ({ focused }) => (
            <Icon icon="debug" color={focused ? colors.tint : undefined} size={30} />
          ),
        }}
      />
    </Tabs>
  )
}

const styles = StyleSheet.create({
  blurView: {
    bottom: 0,
    left: 0,
    position: "absolute",
    right: 0,
  },
  tabBar: {
    backgroundColor: colors.background,
    borderTopColor: colors.transparent,
  },
  tabBarItem: {
    paddingTop: spacing.md,
  },
  tabBarLabel: {
    flex: 1,
    fontFamily: typography.primary.medium,
    fontSize: 12,
    lineHeight: 16,
  },
})
