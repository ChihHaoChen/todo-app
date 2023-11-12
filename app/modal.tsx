import { StatusBar } from "expo-status-bar";
import { Platform, StyleSheet } from "react-native";
import { Text, View } from "../components/Themed";
import AddItem from "../view/AddItem";

export default function ModalScreen() {
  return (
    <View style={styles.container}>
      <AddItem />
      {/* Use a light status bar on iOS to account for the black space above the modal */}
      <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
    padding: 16,
    paddingTop: 32,
  },
  title: {
    padding: 16,
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
  },
});
