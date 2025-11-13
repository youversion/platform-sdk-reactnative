import { VotdView } from "@youversion/react-native-sdk";
import { StyleSheet, View } from "react-native";

export function VotdScreen() {
  return (
    <View style={styles.screen}>
      <VotdView />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
  },
});
