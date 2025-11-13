import { requireNativeView } from "expo";
import { StyleProp, StyleSheet, View, ViewStyle } from "react-native";

import {
  BibleReference,
  BibleTextOptions,
  OnBibleTextPressEvent,
} from "../types";

const NativeView: React.ComponentType<NativeProps> =
  requireNativeView("BibleTextView");

/**
 * A minimal text view for displaying a Bible passage.
 * The component supports font customizations and accepts an `onPress` handler
 * that provides information about which verse was pressed.
 *
 * @param props - {@link BibleTextViewProps}
 */
export function BibleTextView({
  bibleReference,
  style,
  onPress,
  ...props
}: BibleTextViewProps) {
  return (
    <View style={[styles.wrapper, style]}>
      <NativeView
        {...bibleReference}
        {...props}
        onTap={(e: NativeEvent) => onPress?.(e.nativeEvent)}
        style={styles.component}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: "row",
    alignItems: "stretch",
  },
  component: {
    flexGrow: 1,
  },
});

type NativeProps = Omit<BibleTextViewProps, "bibleReference"> &
  BibleReference & {
    onTap?: (e: NativeEvent) => any | null | undefined;
  };

type NativeEvent = { nativeEvent: OnBibleTextPressEvent };

export interface BibleTextViewProps extends BibleTextOptions {
  /** A reference to a passage in the Bible. This could be a single verse, a range of verses or the entire chapter */
  bibleReference: BibleReference;

  style?: StyleProp<ViewStyle>;

  /** Called when the user presses on the Bible text */
  onPress?: (e: OnBibleTextPressEvent) => void | null | undefined;
}
