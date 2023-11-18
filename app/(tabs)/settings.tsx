import { Button, StyleSheet, Switch, useColorScheme } from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Text, View } from "../../components/Themed";
import * as LocalAuthentication from "expo-local-authentication";
import { useCallback, useEffect, useState } from "react";
import { useTodoContext } from "../../store";
import Colors from "../../constants/Colors";

export default function TabTwoScreen() {
  const colorScheme = useColorScheme();
  const [isBiometricAvailable, setIsBiometricAvailable] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [lockedState, setLockedState] = useState(true);
  const { setLocked } = useTodoContext();

  useEffect(() => {
    compatibleCheck();
  }, []);

  const compatibleCheck = useCallback(async () => {
    const isCompatible = await LocalAuthentication.hasHardwareAsync();
    setIsBiometricAvailable(isCompatible);
  }, []);

  const onAuthenticate = useCallback(async () => {
    if (!isAuthenticated) {
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
    } else {
      setIsAuthenticated(false);
    }
  }, [isAuthenticated]);

  const onToggleLock = async () => {
    if (!isAuthenticated) {
      await onAuthenticate();
    }

    setLockedState(!lockedState);
    setLocked(!lockedState);
  };

  const settingRows = [
    {
      field: "lock",
      renderCell: (
        <FontAwesome
          name="lock"
          size={24}
          color={Colors[colorScheme ?? "light"].text}
        />
      ),
      switchValue: lockedState,
      onChange: onToggleLock,
    },
    {
      field: "login",
      renderCell: (
        <FontAwesome
          name="user"
          size={24}
          color={Colors[colorScheme ?? "light"].text}
        />
      ),
      switchValue: isAuthenticated,
      onChange: onAuthenticate,
    },
  ];

  return (
    <View style={styles.container}>
      {settingRows.map(
        ({ field, renderCell, switchValue, onChange }, index) => (
          <View style={styles.settingRow} key={`${field}-${index}`}>
            <View style={styles.settingPrompts}>
              <Text style={styles.title}>{field}</Text>
              {renderCell}
            </View>
            <Switch
              ios_backgroundColor="#3e3e3e"
              onValueChange={onChange}
              value={switchValue}
            />
          </View>
        )
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-start",
    padding: 16,
  },
  settingRow: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    height: 40,
    margin: 4,
    paddingHorizontal: 8,
  },
  settingPrompts: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 16,
    width: 80,
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
