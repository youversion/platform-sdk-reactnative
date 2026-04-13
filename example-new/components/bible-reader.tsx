'use dom'

import { YouVersionProvider, BibleReader } from '@youversion/platform-react-ui'
import * as Crypto from 'expo-crypto'

type UUID = `${string}-${string}-${string}-${string}-${string}`

// We need to monkey patch this since the window object doesn't exist, but the YouVersionProvider relies on it.
window.crypto.randomUUID = () => Crypto.randomUUID() as UUID

export default function App() {
  return (
    <YouVersionProvider appKey="E3hCj5PiDJfMZN6pCBoN2MGRnBQYXWjD2SMDbZA9XjFCCnLg">
      <BibleReader.Root defaultVersionId={3034}>
        <BibleReader.Content />
        {/*<BibleReader.Toolbar />*/}
      </BibleReader.Root>
    </YouVersionProvider>
  )
}
