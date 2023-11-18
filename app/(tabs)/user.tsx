import { Button, StyleSheet } from "react-native";
import { Text, View } from "../../components/Themed";
import * as LocalAuthentication from "expo-local-authentication";
import { useCallback, useEffect, useState } from "react";

export default function TabTwoScreen() {
  const [isBiometricAvailable, setIsBiometricAvailable] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    compatibleCheck();
  }, []);

  const compatibleCheck = useCallback(async () => {
    const isCompatible = await LocalAuthentication.hasHardwareAsync();
    setIsBiometricAvailable(isCompatible);
  }, []);

  const onAuthenticate = useCallback(async () => {
    try {
      const result = await LocalAuthentication.authenticateAsync();
      if (result.success) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
    } catch (e) {
      console.log(e);
    }
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>User Profile</Text>
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
      <Button onPress={onAuthenticate} title={"Login"} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
