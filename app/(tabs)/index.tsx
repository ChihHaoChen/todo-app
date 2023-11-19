import { StyleSheet, View, useColorScheme } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { TodoList, Text } from "../../components";
import { useTodoContext } from "../../store";
import Colors from "../../constants/Colors";

export default function TabOneScreen() {
  const colorScheme = useColorScheme();
  const { todos } = useTodoContext();

  return (
    <View style={styles.container}>
      {todos.length ? (
        <TodoList />
      ) : (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyMsgTitle}>
            {`No available todo items now.\nPlease add a new todo item.`}
          </Text>
          <View style={styles.emptyMsgDescriptionContainer}>
            <Text style={styles.emptyMsgDescription}>
              {`Add a new todo item by pressing `}
            </Text>
            <View style={styles.iconContainer}>
              <FontAwesome
                name="plus-square-o"
                size={14}
                color={Colors[colorScheme ?? "light"].text}
                style={{ marginLeft: 8 }}
              />
            </View>
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-start",
    padding: 16,
  },
  emptyContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
  },
  emptyMsgTitle: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 16,
  },
  emptyMsgDescriptionContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignContent: "center",
    fontSize: 16,
    width: "100%",
  },
  iconContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignContent: "center",
  },
  emptyMsgDescription: {
    fontWeight: "bold",
    textAlign: "center",
  },
});
