import { useState } from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Link, Tabs } from "expo-router";
import { Pressable, useColorScheme, StyleSheet } from "react-native";
import { Popover } from "react-native-popper";
import { Text, View } from "../../components/Themed";
import { Colors, TextContent } from "../../constants";
import { useTodoContext } from "../../store";

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>["name"];
  color: string;
}) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const { locked } = useTodoContext();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
      }}
      sceneContainerStyle={{
        backgroundColor: Colors[colorScheme ?? "light"].background,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Todo Items",
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="list-ul" color={color} />
          ),
          headerRight: () => (
            <View style={styles.iconContainer}>
              {locked ? (
                <Popover
                  isOpen={isOpen}
                  onOpenChange={setIsOpen}
                  trigger={
                    <Pressable>
                      <FontAwesome
                        name="plus-square-o"
                        size={25}
                        color={Colors[colorScheme ?? "light"].text}
                        style={{ marginRight: 16 }}
                      />
                    </Pressable>
                  }
                >
                  <Popover.Backdrop />
                  <Popover.Content>
                    <View
                      style={[
                        styles.msgContainer,
                        {
                          backgroundColor: Colors[colorScheme ?? "light"].lock,
                        },
                      ]}
                    >
                      <Text
                        style={{
                          textAlign: "center",
                          color: Colors[colorScheme ?? "light"].text,
                          fontWeight: "600",
                        }}
                      >
                        {TextContent.unlockMsg}
                      </Text>
                    </View>
                  </Popover.Content>
                </Popover>
              ) : (
                <Link href="/modal" asChild>
                  <Pressable pointerEvents={locked ? "none" : "auto"}>
                    {({ pressed }) => (
                      <FontAwesome
                        name="plus-square-o"
                        size={25}
                        color={Colors[colorScheme ?? "light"].text}
                        style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                      />
                    )}
                  </Pressable>
                </Link>
              )}
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: "Settings",
          tabBarIcon: ({ color }) => <TabBarIcon name="gears" color={color} />,
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  iconContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end",
    justifyContent: "center",
  },
  msgContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    width: 96,
    padding: 8,
    marginRight: 16,
    borderRadius: 8,
  },
});
