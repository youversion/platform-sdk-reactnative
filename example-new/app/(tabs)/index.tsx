import { useCallback, useState } from "react";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

import BibleReader from "@/components/bible-reader";
import { BibleReaderSettingsSheet } from "@/components/bible-reader-settings-sheet";
import { FontSelectorSheet } from "@/components/font-selector-sheet";
import { ThemedView } from "@/components/themed-view";
import {
  DEFAULT_FONT_DEFINITION,
  DEFAULT_FONT_SIZE,
  nextLargerFontSize,
  nextSmallerFontSize,
} from "@/constants/reader-fonts";
import type { FontDefinition } from "@/constants/reader-fonts";
import type { ReaderTheme } from "@/constants/reader-themes";
import { readerThemes } from "@/constants/reader-themes";

export default function HomeScreen() {
  const [settingsVisible, setSettingsVisible] = useState(false);
  const [fontSelectorVisible, setFontSelectorVisible] = useState(false);
  const [fontSize, setFontSize] = useState(DEFAULT_FONT_SIZE);
  const [fontDefinition, setFontDefinition] = useState(DEFAULT_FONT_DEFINITION);
  const [selectedThemeId, setSelectedThemeId] = useState(1);

  const handleSmallerFont = useCallback(() => {
    setFontSize((prev) => nextSmallerFontSize(prev));
  }, []);

  const handleBiggerFont = useCallback(() => {
    setFontSize((prev) => nextLargerFontSize(prev));
  }, []);

  const handleFontPress = useCallback(() => {
    // Close settings drawer and open font selector
    setSettingsVisible(false);
    setFontSelectorVisible(true);
  }, []);

  const handleFontSelect = useCallback((font: FontDefinition) => {
    setFontDefinition(font);
  }, []);

  const handleThemeSelect = useCallback((theme: ReaderTheme) => {
    setSelectedThemeId(theme.id);
  }, []);

  // Derive theme colors for the BibleReader DOM component
  const selectedTheme =
    readerThemes.find((t) => t.id === selectedThemeId) ?? readerThemes[0];
  const scheme = selectedTheme.colorScheme;

  return (
    <SafeAreaProvider>
      <ThemedView style={{ flex: 1 }}>
        <SafeAreaView
          edges={{ top: "maximum", bottom: "off" }}
          style={{ flex: 1 }}
        >
          <BibleReader
            onSettingsPress={() => setSettingsVisible((prev) => !prev)}
            fontSize={fontSize}
            fontFamily={fontDefinition.cssFontFamily}
            themeBackground={scheme.isDark ? "dark" : "light"}
            backgroundColor={scheme.background}
            foregroundColor={scheme.foreground}
            dom={{ matchContents: true }}
          />

          <BibleReaderSettingsSheet
            visible={settingsVisible}
            onDismiss={() => setSettingsVisible(false)}
            onSmallerFont={handleSmallerFont}
            onBiggerFont={handleBiggerFont}
            onFontPress={handleFontPress}
            onThemeSelect={handleThemeSelect}
            fontDefinition={fontDefinition}
            selectedThemeId={selectedThemeId}
          />

          <FontSelectorSheet
            visible={fontSelectorVisible}
            onDismiss={() => setFontSelectorVisible(false)}
            onFontSelect={handleFontSelect}
            selectedFont={fontDefinition}
            colorScheme={scheme}
          />
        </SafeAreaView>
      </ThemedView>
    </SafeAreaProvider>
  );
}
