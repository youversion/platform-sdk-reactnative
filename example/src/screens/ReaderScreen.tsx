import { BibleReaderView } from "@youversion/react-native-sdk";

export function ReaderScreen() {
  return (
    <BibleReaderView
      appName="Sample App"
      signInMessage="Explore the sample app!"
    />
  );
}
