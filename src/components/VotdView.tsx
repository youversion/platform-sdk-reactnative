import { Host } from "@expo/ui/swift-ui";
import { requireNativeView } from "expo";
import { StyleProp, StyleSheet, ViewStyle } from "react-native";

const NativeView: React.ComponentType<NativeProps> =
  requireNativeView("VotdView");

const MATCH_CONTENTS = { vertical: true, horizontal: false };

export function VotdView({
  bibleVersionId = 3034,
  style,
  ...props
}: VotdViewProps) {
  return (
    <Host matchContents={MATCH_CONTENTS} style={[styles.wrapper, style]}>
      <NativeView bibleVersionId={bibleVersionId} {...props} />
    </Host>
  );
}

export interface VotdViewProps {
  /**
   * The ID of the Bible version to use.
   *
   * @defaultValue 3034 (Berean Standard Bible)
   */
  bibleVersionId?: number | null | undefined;
  style?: StyleProp<ViewStyle>;
  /**
   * Controls the color scheme of the text. "dark" would mean to use light text on a dark background, and "light" would mean to use dark text on a light background.
   *
   * @defaultValue Uses the system color scheme
   */
  colorScheme?: "light" | "dark" | null | undefined;
}

interface NativeProps extends VotdViewProps {}

const styles = StyleSheet.create({
  wrapper: {
    alignSelf: "stretch",
  },
});
