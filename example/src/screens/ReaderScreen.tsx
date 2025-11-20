import { BibleReaderView } from "@youversion/platform-sdk-reactnative";

export function ReaderScreen() {
  return (
    <BibleReaderView
      appName="Example App"
      signInMessage="Explore the example app!"
    />
  );
}
