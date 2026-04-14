import { ThemedView } from '@/components/themed-view'
import BibleReader from '@/components/bible-reader'

export default function HomeScreen() {
  return (
    <ThemedView style={{ flex: 1 }}>
      <BibleReader dom={{ matchContents: true }} />
    </ThemedView>
  )
}
