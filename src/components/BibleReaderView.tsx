import { requireNativeView } from "expo";
import { StyleProp, StyleSheet, ViewStyle } from "react-native";

import { BibleReference } from "../types";

const NativeView: React.ComponentType<NativeProps> =
  requireNativeView("BibleReaderView");

/**
 * A full-featured Bible reader component.
 * It allows the user to control font customizations, switch Bible versions and access their verse highlights.
 * It is designed after the YouVersion Bible reader experience found in the YouVersion app.
 * @param props - {@link BibleReaderViewProps}
 */
export function BibleReaderView({ reference, ...props }: BibleReaderViewProps) {
  return (
    <NativeView
      style={styles.view}
      hasReference={!!reference}
      {...(reference || {})}
      {...props}
    />
  );
}

const styles = StyleSheet.create({
  view: {
    flex: 1,
  },
});

export interface BibleReaderViewProps {
  /** A reference to a passage in the Bible the reader should open to. This could be a single verse, a range of verses or the entire chapter */
  reference?: BibleReference | null | undefined;

  /**
   * Name of your app.
   * The SDK will use this in various places when prompting the user to sign in to their YouVersion account. This will let the user know which app is requesting their information.
   */
  appName: string;

  /**
   * A custom message to display to the user from the sign-in sheet, letting them know why they should sign in.
   */
  signInMessage: string;
}

type NativeProps = Omit<BibleReaderViewProps, "reference"> &
  Partial<BibleReference> & {
    style: StyleProp<ViewStyle>;
    hasReference: boolean;
  };
