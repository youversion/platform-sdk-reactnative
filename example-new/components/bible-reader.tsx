'use dom'

import { YouVersionProvider, BibleReader } from '@youversion/platform-react-ui'

type UUID = `${string}-${string}-${string}-${string}-${string}`

// Monkey patch crypto.randomUUID sine it's not available in React Native.
if (!crypto?.randomUUID) {
  crypto.randomUUID = () => '8675309' as UUID
}

export default function App() {
  return (
    <YouVersionProvider appKey="E3hCj5PiDJfMZN6pCBoN2MGRnBQYXWjD2SMDbZA9XjFCCnLg">
      <BibleReader.Root defaultVersionId={3034}>
        <BibleReader.Content />
      </BibleReader.Root>
    </YouVersionProvider>
  )
}
