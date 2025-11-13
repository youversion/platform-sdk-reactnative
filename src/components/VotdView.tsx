import { requireNativeView } from "expo";
import { StyleProp, StyleSheet, ViewStyle } from "react-native";

const NativeView: React.ComponentType<NativeProps> =
  requireNativeView("VotdView");

export function VotdView({ bibleVersionId = 111, ...props }: VotdViewProps) {
  return (
    <NativeView
      style={styles.view}
      bibleVersionId={bibleVersionId}
      {...props}
    />
  );
}

const styles = StyleSheet.create({
  view: {
    alignSelf: "stretch",
  },
});

export interface VotdViewProps {
  bibleVersionId?: number | null | undefined;

  /**
   * Controls the color scheme of the text. "dark" would mean to use light text on a dark background, and "light" would mean to use dark text on a light background.
   *
   * * @defaultValue Uses the system color scheme
   */
  colorScheme?: "light" | "dark" | null | undefined;
}

interface NativeProps extends VotdViewProps {
  style: StyleProp<ViewStyle>;
}
