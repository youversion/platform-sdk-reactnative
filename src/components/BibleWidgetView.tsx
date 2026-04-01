import { Host as AndroidHost } from "@expo/ui/jetpack-compose";
import { Host as IosHost } from "@expo/ui/swift-ui";
import { requireNativeView } from "expo";
import { Platform, StyleProp, StyleSheet, ViewStyle } from "react-native";

import { BibleReference } from "../types";

const NativeView: React.ComponentType<NativeProps> =
  requireNativeView("BibleWidgetView");

const MATCH_CONTENTS = { vertical: true, horizontal: false };

const PlatformHost = Platform.OS === "ios" ? IosHost : AndroidHost;

/**
 * An opinionated Bible passage display.
 * It displays the book, chapter and version name above the passage. Below the passage text, it displays copyright information and the YouVersion logo.
 * @param props - {@link BibleWidgetViewProps}
 */
export function BibleWidgetView({
  reference,
  style,
  ...props
}: BibleWidgetViewProps) {
  return (
    <PlatformHost
      matchContents={MATCH_CONTENTS}
      style={[style, styles.wrapper]}
    >
      <NativeView {...(reference || {})} {...props} />
    </PlatformHost>
  );
}

const styles = StyleSheet.create({
  wrapper: {
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
  style?: StyleProp<ViewStyle>;
}

type NativeProps = Omit<BibleWidgetViewProps, "reference"> &
  BibleReference & {
    style?: StyleProp<ViewStyle>;
  };
