/**
 * Native settings drawer that mirrors the Kotlin SDK's BibleReaderFontSettingsSheet.
 *
 * Rendered inline (no Modal) as an animated bottom drawer with pan-to-dismiss.
 *
 * Sections (top → bottom):
 *  1. Font size  – two side-by-side buttons ("A" small / "A" large)
 *  2. Font name  – outlined button showing the active font, with a right arrow
 *  3. Theme row  – horizontally scrollable theme thumbnails with selection indicator
 */

import { useEffect } from "react";
import {
  Modal,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from "react-native";
import { Gesture, GestureDetector, GestureHandlerRootView } from "react-native-gesture-handler";
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

import type { FontDefinition } from "@/constants/reader-fonts";
import type { ReaderTheme } from "@/constants/reader-themes";
import { readerThemes } from "@/constants/reader-themes";

// ── Constants ──────────────────────────────────────────────────────

const DRAWER_HEIGHT = 380;
const DISMISS_THRESHOLD = 80;
const TIMING_CONFIG = { duration: 250 };

// ── Props ───────────────────────────────────────────────────────────

interface BibleReaderSettingsSheetProps {
  visible: boolean;
  onDismiss: () => void;
  onSmallerFont: () => void;
  onBiggerFont: () => void;
  onFontPress: () => void;
  onThemeSelect: (theme: ReaderTheme) => void;
  fontDefinition: FontDefinition;
  selectedThemeId: number;
}

// ── Component ───────────────────────────────────────────────────────

export function BibleReaderSettingsSheet({
  visible,
  onDismiss,
  onSmallerFont,
  onBiggerFont,
  onFontPress,
  onThemeSelect,
  fontDefinition,
  selectedThemeId,
}: BibleReaderSettingsSheetProps) {
  const translateY = useSharedValue(0);

  const selectedTheme = readerThemes.find((t) => t.id === selectedThemeId);
  const scheme = selectedTheme?.colorScheme ?? readerThemes[0].colorScheme;

  const surface = scheme.drawerSurface;
  const onSurface = scheme.foreground;
  const buttonBg = scheme.buttonSecondaryColor;
  const borderColor = scheme.borderPrimaryColor;
  const textMuted = scheme.borderSecondaryColor;
  const handleColor = scheme.borderSecondaryColor;

  // Reset position when modal opens
  useEffect(() => {
    if (visible) translateY.value = 0;
  }, [visible]);

  // Pan gesture to drag the drawer down to dismiss
  const panGesture = Gesture.Pan()
    .onUpdate((e) => {
      translateY.value = Math.max(0, e.translationY);
    })
    .onEnd((e) => {
      if (e.translationY > DISMISS_THRESHOLD) {
        translateY.value = withTiming(DRAWER_HEIGHT, TIMING_CONFIG, () => {
          runOnJS(onDismiss)();
        });
      } else {
        translateY.value = withTiming(0, TIMING_CONFIG);
      }
    });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));

  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onDismiss}>
      <GestureHandlerRootView style={styles.modalContainer}>
        {/* Tap scrim to dismiss */}
        <Pressable style={styles.scrim} onPress={onDismiss} />

        <GestureDetector gesture={panGesture}>
          <Animated.View
            style={[styles.drawerInModal, { backgroundColor: surface }, animatedStyle]}
          >
            {/* ── Drag handle ─────────────────────────────────────── */}
            <View style={[styles.handle, { backgroundColor: handleColor }]} />

            <ScrollView bounces={false} showsVerticalScrollIndicator={false}>
              <View style={styles.content}>
                {/* ── Font size buttons ──────────────────────────────── */}
                <FontSizeButtons
                  buttonBg={buttonBg}
                  onSurface={onSurface}
                  onSmallerFont={onSmallerFont}
                  onBiggerFont={onBiggerFont}
                />

                {/* ── Font display button ───────────────────────────── */}
                <FontDisplayButton
                  fontDefinition={fontDefinition}
                  onPress={onFontPress}
                  borderColor={borderColor}
                  onSurface={onSurface}
                  textMuted={textMuted}
                />
              </View>

              {/* ── Theme picker (full-bleed horizontal scroll) ───── */}
              <ThemePicker
                selectedThemeId={selectedThemeId}
                onThemeSelect={onThemeSelect}
              />
            </ScrollView>
          </Animated.View>
        </GestureDetector>
      </GestureHandlerRootView>
    </Modal>
  );
}

// ── Font Size Buttons ───────────────────────────────────────────────

function FontSizeButtons({
  buttonBg,
  onSurface,
  onSmallerFont,
  onBiggerFont,
}: {
  buttonBg: string;
  onSurface: string;
  onSmallerFont: () => void;
  onBiggerFont: () => void;
}) {
  return (
    <View style={styles.fontSizeRow}>
      <Pressable
        onPress={onSmallerFont}
        style={[
          styles.fontSizeButton,
          styles.fontSizeButtonLeft,
          { backgroundColor: buttonBg },
        ]}
      >
        <Text style={[styles.fontSizeSmall, { color: onSurface }]}>A</Text>
      </Pressable>

      <Pressable
        onPress={onBiggerFont}
        style={[
          styles.fontSizeButton,
          styles.fontSizeButtonRight,
          { backgroundColor: buttonBg },
        ]}
      >
        <Text style={[styles.fontSizeLarge, { color: onSurface }]}>A</Text>
      </Pressable>
    </View>
  );
}

// ── Font Display Button ─────────────────────────────────────────────

function FontDisplayButton({
  fontDefinition,
  onPress,
  borderColor,
  onSurface,
  textMuted,
}: {
  fontDefinition: FontDefinition;
  onPress: () => void;
  borderColor: string;
  onSurface: string;
  textMuted: string;
}) {
  return (
    <Pressable
      onPress={onPress}
      style={[styles.fontDisplayButton, { borderColor }]}
    >
      <View>
        <Text style={[styles.fontLabel, { color: textMuted }]}>Font</Text>
        <Text
          style={[
            styles.fontName,
            { color: onSurface, fontFamily: fontDefinition.fontFamily },
          ]}
        >
          {fontDefinition.fontName}
        </Text>
      </View>
      <Text style={[styles.arrowIcon, { color: onSurface }]}>›</Text>
    </Pressable>
  );
}

// ── Theme Picker ────────────────────────────────────────────────────

function ThemePicker({
  selectedThemeId,
  onThemeSelect,
}: {
  selectedThemeId: number;
  onThemeSelect: (theme: ReaderTheme) => void;
}) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.themeRow}
    >
      {readerThemes.map((theme) => (
        <ThemePickerItem
          key={theme.id}
          theme={theme}
          selected={theme.id === selectedThemeId}
          onPress={() => onThemeSelect(theme)}
        />
      ))}
    </ScrollView>
  );
}

// ── Theme Picker Item ───────────────────────────────────────────────

function ThemePickerItem({
  theme,
  selected,
  onPress,
}: {
  theme: ReaderTheme;
  selected: boolean;
  onPress: () => void;
}) {
  const { colorScheme } = theme;

  return (
    <Pressable
      onPress={onPress}
      style={[
        styles.themeItem,
        {
          backgroundColor: colorScheme.background,
          borderColor: colorScheme.borderSecondaryColor,
        },
      ]}
    >
      {/* Text-line placeholders */}
      <View style={styles.themeLinesContainer}>
        <TextLinePlaceholder
          widthPercent="100%"
          color={colorScheme.foreground}
        />
        <TextLinePlaceholder
          widthPercent="80%"
          color={colorScheme.foreground}
        />
        <TextLinePlaceholder
          widthPercent="100%"
          color={colorScheme.foreground}
        />
        <TextLinePlaceholder
          widthPercent="50%"
          color={colorScheme.foreground}
        />
      </View>

      {/* Selection indicator */}
      <View style={styles.themeIndicatorContainer}>
        {selected ? (
          <View
            style={[
              styles.themeIndicator,
              styles.themeIndicatorSelected,
              { backgroundColor: colorScheme.foreground },
            ]}
          >
            <Text style={[styles.checkmark, { color: colorScheme.background }]}>
              ✓
            </Text>
          </View>
        ) : (
          <View
            style={[
              styles.themeIndicator,
              {
                borderColor: colorScheme.foreground,
                borderWidth: 1.5,
              },
            ]}
          />
        )}
      </View>
    </Pressable>
  );
}

function TextLinePlaceholder({
  widthPercent,
  color,
}: {
  widthPercent: string;
  color: string;
}) {
  return (
    <View
      style={{
        width: widthPercent as any,
        height: 2,
        backgroundColor: color,
        borderRadius: 1,
      }}
    />
  );
}

// ── Styles ──────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "flex-end",
  },
  scrim: {
    flex: 1,
    backgroundColor: "transparent",
  },
  drawerInModal: {
    height: DRAWER_HEIGHT,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    paddingTop: 8,
    paddingBottom: 16,
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: -4 },
        shadowOpacity: 0.3,
        shadowRadius: 12,
      },
      default: {},
    }),
  },
  handle: {
    alignSelf: "center",
    width: 36,
    height: 4,
    borderRadius: 2,
    marginBottom: 16,
  },
  content: {
    paddingHorizontal: 24,
    gap: 24,
  },

  // ── Font size buttons ──
  fontSizeRow: {
    flexDirection: "row",
    gap: 2,
  },
  fontSizeButton: {
    flex: 1,
    minHeight: 48,
    alignItems: "center",
    justifyContent: "center",
  },
  fontSizeButtonLeft: {
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
  },
  fontSizeButtonRight: {
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
  },
  fontSizeSmall: {
    fontSize: 14,
    fontWeight: "500",
  },
  fontSizeLarge: {
    fontSize: 28,
    fontWeight: "500",
  },

  // ── Font display button ──
  fontDisplayButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  fontLabel: {
    fontSize: 12,
  },
  fontName: {
    fontSize: 20,
  },
  arrowIcon: {
    fontSize: 28,
    fontWeight: "300",
  },

  // ── Theme picker ──
  themeRow: {
    paddingHorizontal: 24,
    gap: 8,
    paddingTop: 24,
  },
  themeItem: {
    width: 64,
    height: 94,
    borderRadius: 8,
    borderWidth: 1,
    paddingHorizontal: 12,
    paddingTop: 20,
    paddingBottom: 10,
    justifyContent: "space-between",
  },
  themeLinesContainer: {
    gap: 6,
  },
  themeIndicatorContainer: {
    alignItems: "center",
  },
  themeIndicator: {
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  themeIndicatorSelected: {
    borderWidth: 0,
  },
  checkmark: {
    fontSize: 14,
    fontWeight: "700",
  },
});
