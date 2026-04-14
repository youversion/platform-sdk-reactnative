/**
 * Font selector matching the Kotlin SDK's FontsScreen.
 *
 * - iOS: bottom drawer with drag handle and pan-to-dismiss
 * - Android: full-height sheet with a back-button header
 *
 * Both show a list of available fonts, each rendered in its own typeface,
 * with a checkmark on the selected row.
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
} from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import type { FontDefinition } from "@/constants/reader-fonts";
import { fontDefinitions } from "@/constants/reader-fonts";
import type { ReaderColorScheme } from "@/constants/reader-themes";

// ── Constants ──────────────────────────────────────────────────────

const IOS_SHEET_HEIGHT = 340;
const DISMISS_THRESHOLD = 80;
const TIMING_CONFIG = { duration: 250 };

// ── Props ───────────────────────────────────────────────────────────

interface FontSelectorSheetProps {
  visible: boolean;
  onDismiss: () => void;
  onFontSelect: (font: FontDefinition) => void;
  selectedFont: FontDefinition;
  colorScheme: ReaderColorScheme;
}

// ── Main export – delegates per platform ────────────────────────────

export function FontSelectorSheet(props: FontSelectorSheetProps) {
  if (Platform.OS === "android") {
    return <AndroidFontSelector {...props} />;
  }
  return <IOSFontDrawer {...props} />;
}

// ── Android: full-screen Modal with back button ─────────────────────

function AndroidFontSelector({
  visible,
  onDismiss,
  onFontSelect,
  selectedFont,
  colorScheme,
}: FontSelectorSheetProps) {
  const insets = useSafeAreaInsets();

  const surface = colorScheme.drawerSurface;
  const onSurface = colorScheme.foreground;
  const selectedBg = colorScheme.buttonSecondaryColor;

  return (
    <Modal
      visible={visible}
      animationType="slide"
      onRequestClose={onDismiss}
    >
      <View style={[styles.androidContainer, { backgroundColor: surface, paddingTop: insets.top }]}>
        {/* ── Header with back button ── */}
        <View style={styles.androidHeader}>
          <Pressable onPress={onDismiss} style={styles.backButton}>
            <Text style={[styles.backArrow, { color: onSurface }]}>‹</Text>
          </Pressable>
          <Text style={[styles.androidTitle, { color: onSurface }]}>Font</Text>
          <View style={styles.backButton} />
        </View>

        {/* ── Font list ── */}
        <FontList
          selectedFont={selectedFont}
          onFontSelect={onFontSelect}
          onDismiss={onDismiss}
          onSurface={onSurface}
          selectedBg={selectedBg}
        />
      </View>
    </Modal>
  );
}

// ── iOS: bottom drawer with pan-to-dismiss ──────────────────────────

function IOSFontDrawer({
  visible,
  onDismiss,
  onFontSelect,
  selectedFont,
  colorScheme,
}: FontSelectorSheetProps) {
  const translateY = useSharedValue(IOS_SHEET_HEIGHT);

  const surface = colorScheme.drawerSurface;
  const onSurface = colorScheme.foreground;
  const selectedBg = colorScheme.buttonSecondaryColor;
  const handleColor = colorScheme.borderSecondaryColor;

  useEffect(() => {
    translateY.value = withTiming(
      visible ? 0 : IOS_SHEET_HEIGHT,
      TIMING_CONFIG
    );
  }, [visible]);

  const panGesture = Gesture.Pan()
    .onUpdate((e) => {
      translateY.value = Math.max(0, e.translationY);
    })
    .onEnd((e) => {
      if (e.translationY > DISMISS_THRESHOLD) {
        translateY.value = withTiming(IOS_SHEET_HEIGHT, TIMING_CONFIG);
        runOnJS(onDismiss)();
      } else {
        translateY.value = withTiming(0, TIMING_CONFIG);
      }
    });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));

  if (!visible && translateY.value === IOS_SHEET_HEIGHT) return null;

  return (
    <GestureDetector gesture={panGesture}>
      <Animated.View
        style={[styles.iosSheet, { backgroundColor: surface }, animatedStyle]}
      >
        {/* ── Drag handle ── */}
        <View style={[styles.handle, { backgroundColor: handleColor }]} />

        {/* ── Title ── */}
        <Text style={[styles.iosTitle, { color: onSurface }]}>Font</Text>

        {/* ── Font list ── */}
        <FontList
          selectedFont={selectedFont}
          onFontSelect={onFontSelect}
          onDismiss={onDismiss}
          onSurface={onSurface}
          selectedBg={selectedBg}
        />
      </Animated.View>
    </GestureDetector>
  );
}

// ── Shared font list ────────────────────────────────────────────────

function FontList({
  selectedFont,
  onFontSelect,
  onDismiss,
  onSurface,
  selectedBg,
}: {
  selectedFont: FontDefinition;
  onFontSelect: (font: FontDefinition) => void;
  onDismiss: () => void;
  onSurface: string;
  selectedBg: string;
}) {
  return (
    <ScrollView style={styles.list}>
      {fontDefinitions.map((font) => {
        const isSelected = font.fontName === selectedFont.fontName;
        return (
          <Pressable
            key={font.fontName}
            onPress={() => {
              onFontSelect(font);
              onDismiss();
            }}
            style={[
              styles.row,
              isSelected && { backgroundColor: selectedBg },
            ]}
          >
            {/* Checkmark or spacer */}
            {isSelected ? (
              <Text style={[styles.checkmark, { color: onSurface }]}>✓</Text>
            ) : (
              <View style={styles.checkmarkSpacer} />
            )}

            {/* Font name rendered in its own typeface */}
            <Text
              style={[
                styles.fontName,
                {
                  color: onSurface,
                  fontFamily: font.fontFamily,
                  fontWeight: isSelected ? "700" : "400",
                },
              ]}
            >
              {font.fontName}
            </Text>
          </Pressable>
        );
      })}
    </ScrollView>
  );
}

// ── Styles ──────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  // ── Android full-screen ──
  androidContainer: {
    flex: 1,
  },
  androidHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 8,
    height: 56,
  },
  backButton: {
    width: 48,
    height: 48,
    alignItems: "center",
    justifyContent: "center",
  },
  backArrow: {
    fontSize: 32,
    fontWeight: "300",
    marginTop: -2,
  },
  androidTitle: {
    fontSize: 18,
    fontWeight: "600",
  },

  // ── iOS drawer ──
  iosSheet: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: IOS_SHEET_HEIGHT,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    paddingTop: 8,
    paddingBottom: 16,
    overflow: "visible",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
  },
  handle: {
    alignSelf: "center",
    width: 36,
    height: 4,
    borderRadius: 2,
    marginBottom: 16,
  },
  iosTitle: {
    fontSize: 16,
    fontWeight: "600",
    paddingHorizontal: 24,
    marginBottom: 8,
  },

  // ── Shared ──
  list: {
    flex: 1,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 24,
    paddingVertical: 16,
  },
  checkmark: {
    fontSize: 18,
    width: 36,
  },
  checkmarkSpacer: {
    width: 36,
  },
  fontName: {
    fontSize: 20,
    flex: 1,
  },
});
