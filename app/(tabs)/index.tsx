import { StyleSheet, View } from "react-native";
import { TodoList } from "../../components";
import { Text } from "../../components/Themed";
import { useTodoContext } from "../../store";

export default function TabOneScreen() {
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
          <Text style={styles.emptyMsgDescription}>
            {`Please add a new todo item by pressing + icon.`}
          </Text>
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
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 16,
  },
  emptyMsgDescription: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
});
