import * as React from "react";
import { Button, View, StyleSheet } from "react-native";
import { TextInput } from "../components/Themed";
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
      />
      <Button onPress={() => addTodo()} title={"Add"} />
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
});
