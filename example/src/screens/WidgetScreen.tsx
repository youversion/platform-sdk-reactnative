import { BibleWidgetView } from "@youversion/platform-sdk-reactnative";
import { StyleSheet, View } from "react-native";

export function WidgetScreen() {
  return (
    <View style={styles.screen}>
      <BibleWidgetView
        reference={{
          versionId: 111,
          bookUSFM: "2CO",
          chapter: 1,
          verseStart: 3,
          verseEnd: 4,
          type: "range",
        }}
        fontSize={18}
      />
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
