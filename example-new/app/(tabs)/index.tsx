import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context'
import { ThemedView } from '@/components/themed-view'
import BibleReader from '@/components/bible-reader'

export default function HomeScreen() {
  return (
    <SafeAreaProvider>
      <ThemedView style={{ flex: 1 }}>
        <SafeAreaView edges={{ top: 'maximum', bottom: 'off' }} style={{ flex: 1 }}>
          <BibleReader dom={{ matchContents: true }} />
        </SafeAreaView>
      </ThemedView>
    </SafeAreaProvider>
  )
}
