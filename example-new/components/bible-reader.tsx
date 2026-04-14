"use dom";

import { BibleReader, YouVersionProvider } from "@youversion/platform-react-ui";

interface BibleReaderAppProps {
  onSettingsPress?: () => void;
  fontSize?: number;
  fontFamily?: string;
  themeBackground?: "light" | "dark";
  backgroundColor?: string;
  foregroundColor?: string;
}

type UUID = `${string}-${string}-${string}-${string}-${string}`;

// Monkey patch crypto.randomUUID sine it's not available in React Native.
if (!crypto?.randomUUID) {
  crypto.randomUUID = () => "8675309" as UUID;
}

export default function BibleReaderApp({
  onSettingsPress,
  fontSize,
  fontFamily,
  themeBackground,
  backgroundColor,
  foregroundColor,
}: BibleReaderAppProps) {
  // Override the BibleReader's internal font/theme state via CSS variables.
  // BibleReader.Root uses useState so it ignores prop updates after mount.
  const overrideCss = `
    [data-slot="yv-bible-renderer"] {
      ${fontSize ? `--yv-reader-font-size: ${fontSize}px !important;` : ""}
      ${fontFamily ? `--yv-reader-font-family: ${fontFamily} !important;` : ""}
    }
  `;

  return (
    <YouVersionProvider
      appKey="E3hCj5PiDJfMZN6pCBoN2MGRnBQYXWjD2SMDbZA9XjFCCnLg"
      theme={themeBackground}
    >
      <style dangerouslySetInnerHTML={{ __html: overrideCss }} />
      <BibleReader.Root
        defaultVersionId={3034}
        background={themeBackground}
      >
        <div
          style={{
            position: "relative",
            height: "100%",
            backgroundColor: backgroundColor,
            color: foregroundColor,
          }}
        >
          {onSettingsPress && (
            <button
              onClick={() => onSettingsPress?.()}
              style={{
                position: "absolute",
                top: 8,
                right: 12,
                zIndex: 10,
                width: 36,
                height: 36,
                borderRadius: 18,
                border: "none",
                backgroundColor: "rgba(128, 128, 128, 0.15)",
                backdropFilter: "blur(8px)",
                WebkitBackdropFilter: "blur(8px)",
                color: foregroundColor || "#121212",
                fontSize: 15,
                fontWeight: 600,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              Aa
            </button>
          )}
          <BibleReader.Content />
        </div>
      </BibleReader.Root>
    </YouVersionProvider>
  );
}
