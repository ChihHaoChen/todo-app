import { useMemo } from "react";
import {
  View,
  StyleSheet,
  useColorScheme,
  Pressable,
  TouchableWithoutFeedback,
} from "react-native";
import Checkbox from "expo-checkbox";
import { FontAwesome } from "@expo/vector-icons";
import { TextInput } from "./Themed";
import { Todo, useTodoContext } from "../store";
import Colors from "../constants/Colors";

export default function TodoList() {
  const { locked, todos, toggleTodo, updateTodo, deleteTodo } =
    useTodoContext();
  const colorScheme = useColorScheme();
  const enableOperations = useMemo(() => (locked ? "none" : "auto"), [locked]);

  return (
    <View style={styles.listContainer}>
      {todos.map((todo: Todo) => (
        <View
          key={todo.id}
          style={styles.listRow}
          pointerEvents={enableOperations}
        >
          <TouchableWithoutFeedback>
            <TextInput
              value={todo.text}
              onChangeText={(text) => updateTodo(todo.id, text)}
              style={styles.input}
              pointerEvents={enableOperations}
              editable={!locked}
              testID="list-input"
            />
          </TouchableWithoutFeedback>
          <Checkbox
            onValueChange={() => toggleTodo(todo.id)}
            value={todo.done}
            style={styles.listCheckbox}
            testID={`list-checkbox-${todo.id}`}
          />
          <Pressable
            onPress={() => deleteTodo(todo.id)}
            testID={`list-delete-button-${todo.id}`}
          >
            <FontAwesome
              name="trash"
              size={24}
              color={Colors[colorScheme ?? "light"].text}
            />
          </Pressable>
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
    justifyContent: "space-around",
    width: "100%",
    height: 40,
    margin: 4,
    paddingHorizontal: 8,
  },
  input: {
    borderColor: "gray",
    width: "80%",
    borderWidth: 1,
    borderRadius: 8,
    padding: 8,
  },
  listCheckbox: {
    backgroundColor: "transparent",
  },
});
