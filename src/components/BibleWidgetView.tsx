import { requireNativeView } from "expo";
import { StyleProp, StyleSheet, ViewStyle } from "react-native";

import { BibleReference } from "../types";

const NativeView: React.ComponentType<NativeProps> =
  requireNativeView("BibleWidgetView");

/**
 * An opinionated Bible passage display.
 * It displays the book, chapter and version name above the passage. Below the passage text, it displays copyright information and the YouVersion logo.
 * @param props - {@link BibleWidgetViewProps}
 */
export function BibleWidgetView({ reference, ...props }: BibleWidgetViewProps) {
  return <NativeView {...(reference || {})} style={styles.view} {...props} />;
}

const styles = StyleSheet.create({
  view: {
    alignSelf: "stretch",
  },
});

export interface BibleWidgetViewProps {
  /** A reference to a passage in the Bible. This could be a single verse, a range of verses or the entire chapter */
  reference: BibleReference;

  /** The font size to use for the Bible text
   *
   * @defaultValue 23
   */
  fontSize?: number | null | undefined;

  /**
   * Controls the color scheme of the button
   *
   * * @defaultValue Uses the system color scheme
   */
  colorScheme?: "light" | "dark" | null | undefined;
}

type NativeProps = Omit<BibleWidgetViewProps, "reference"> &
  BibleReference & {
    style?: StyleProp<ViewStyle>;
  };
