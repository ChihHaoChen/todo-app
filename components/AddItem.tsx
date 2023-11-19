import { View, StyleSheet, TouchableOpacity } from "react-native";
import { TextInput, Text } from "./Themed";
import { useTodoContext } from "../store";

export default function AddItem() {
  const { newTodo, setNewTodo, addTodo } = useTodoContext();

  return (
    <View style={styles.addItemContainer}>
      <TextInput
        value={newTodo}
        onChangeText={(text) => setNewTodo(text)}
        style={styles.input}
        placeholder="Add a new todo item"
        aria-disabled={false}
      />
      <TouchableOpacity onPress={() => addTodo()} style={styles.button}>
        <Text>{"Add"}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  addItemContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "100%",
  },
  input: {
    borderColor: "gray",
    width: "100%",
    borderWidth: 1,
    borderRadius: 8,
    padding: 8,
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 32,
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    borderWidth: 1,
  },
});
