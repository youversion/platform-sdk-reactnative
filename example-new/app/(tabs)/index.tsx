import { StyleSheet } from 'react-native'

// import { HelloWave } from '@/components/hello-wave'
// import { ThemedText } from '@/components/themed-text'
import { ThemedView } from '@/components/themed-view'
// import { Link } from 'expo-router'
import BibleReader from '@/components/bible-reader'

export default function HomeScreen() {
  return (
    <ThemedView style={styles.stepContainer}>
      <BibleReader dom={{ matchContents: true }} />
    </ThemedView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  stepContainer: {
    flex: 1,
    // gap: 8,
    // marginBottom: 8,
  },
})
