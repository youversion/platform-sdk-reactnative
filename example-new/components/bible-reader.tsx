'use dom'

import { YouVersionProvider, BibleReader } from '@youversion/platform-react-ui'

export default function App() {
  return (
    <YouVersionProvider appKey="E3hCj5PiDJfMZN6pCBoN2MGRnBQYXWjD2SMDbZA9XjFCCnLg">
      <BibleReader.Root defaultVersionId={3034}>
        <BibleReader.Content />
      </BibleReader.Root>
    </YouVersionProvider>
  )
}
