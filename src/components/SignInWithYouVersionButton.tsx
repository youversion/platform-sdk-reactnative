import { requireNativeView } from "expo";
import { StyleProp, ViewStyle } from "react-native";

const NativeView: React.ComponentType<NativeProps> = requireNativeView(
  "SignInWithYouVersionButton",
);

type NativeProps = Omit<SignInWithYouVersionButtonProps, "onPress"> & {
  onTap?: () => void;
};

export interface SignInWithYouVersionButtonProps {
  /** Controls the width and text of the button
   *
   * @defaultValue "full"
   */
  mode?: SignInWithYouVersionButtonMode;

  /** Controls the border radius of the button
   *
   * @defaultValue "capsule"
   */
  shape?: SignInWithYouVersionButtonShape;

  /** Controls if the button is outlined
   *
   * @defaultValue true
   */
  isStroked?: boolean;

  /**
   * Controls the color scheme of the button
   *
   * @defaultValue Uses the system color scheme
   */
  colorScheme?: "light" | "dark";

  /** Called when the user taps the button. You should call the signIn function in response */
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
}

export type SignInWithYouVersionButtonMode = "full" | "compact" | "iconOnly";
export type SignInWithYouVersionButtonShape = "capsule" | "rectangle";

/**
 * A branded button for signing in with YouVersion.
 * This button is a lightweight wrapper around the native YouVersion sign-in button. It contains
 * localized sign-in text and the YouVersion logo.
 * @param props - {@link SignInWithYouVersionButtonProps}
 */
export function SignInWithYouVersionButton({
  onPress,
  mode = "full",
  shape = "capsule",
  isStroked = true,
  colorScheme,
  ...props
}: SignInWithYouVersionButtonProps) {
  return (
    <NativeView
      {...props}
      mode={mode}
      shape={shape}
      isStroked={isStroked}
      colorScheme={colorScheme}
      onTap={onPress}
    />
  );
}
