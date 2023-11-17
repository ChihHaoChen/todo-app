import { useCallback } from "react";
import Checkbox from "expo-checkbox";
import { Button, View, StyleSheet } from "react-native";
import { TextInput } from "./Themed";
import { Todo, useTodoContext } from "../store";

export default function TodoList() {
  const { todos, toggleTodo, updateTodo, deleteTodo } = useTodoContext();

  return (
    <View style={styles.listContainer}>
      {todos.map((todo: Todo) => (
        <View key={todo.id} style={styles.listRow}>
          <TextInput
            value={todo.text}
            onChangeText={(text) => updateTodo(todo.id, text)}
            style={styles.input}
            testID="list-input"
          />
          <Checkbox
            onValueChange={() => toggleTodo(todo.id)}
            value={todo.done}
            testID={`list-checkbox-${todo.id}`}
          />
          <Button
            onPress={() => deleteTodo(todo.id)}
            title={"Delete"}
            testID={`list-delete-button-${todo.id}`}
          />
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  listContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    width: "100%",
    height: "100%",
  },
  listRow: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    height: 40,
    margin: 4,
  },
  input: {
    borderColor: "gray",
    width: "75%",
    borderWidth: 1,
    borderRadius: 8,
    padding: 8,
  },
});
