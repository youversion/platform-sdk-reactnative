![Platform React Native SDK](./assets/github-reactNative-sdk-banner.png)

# YouVersion React Native SDK

[![npm version](https://badge.fury.io/js/@youversion%2Freact-native-sdk.svg)](https://www.npmjs.com/package/@youversion/react-native-sdk)
[![CI Status](https://github.com/youversion/platform-sdk-reactnative/workflows/CI/badge.svg)](https://github.com/youversion/platform-sdk-reactnative/actions)
[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](LICENSE)

A lightweight React Native SDK for integrating YouVersion Platform features into React Native applications.

## Documentation

- [Installation & Usage](#installation)
- [API Reference](#api)
- [Contributing Guide](CONTRIBUTING.md)
- [Release Process](RELEASING.md)
- [Changelog](CHANGELOG.md)

## Installation

Using npm:

```sh
npm install @youversion/react-native-sdk
```

Using Yarn:

```sh
yarn add @youversion/react-native-sdk
```

Using pnpm:

```sh
pnpm add @youversion/react-native-sdk
```

iOS (bare/Expo prebuilt):

```sh
npx pod-install
```

Expo managed workflow (requires a development build or prebuild):

```sh
npx expo install @youversion/react-native-sdk
npx expo prebuild
```

Rebuild your app after installing the package.

## Usage

### Configure the SDK

Configure the SDK with you app key once, typically in your app's entry point.

```typescript
// App.tsx
import React, { useEffect } from 'react';
import { YouVersionPlatform } from '@youversion/react-native-sdk';

export default function App() {
  useEffect(() => {
    // Replace with your app key from YouVersion Platform
    YouVersionPlatform.configure('YOUR_APP_KEY');
  }, []);

  return null; // ...your app UI...
}
```

### Authentication

#### `signIn`

Presents the YouVersion login flow to the user and resolves with the login result on completion.

**Parameters:**
An object with the following optional properties:

- `requiredPermissions?: SignInWithYouVersionPermission[]` - Array of permissions that must be granted by the user for successful login.
- `optionalPermissions?: SignInWithYouVersionPermission[]` - Array of permissions that are requested but not required for login.

Enum values for `SignInWithYouVersionPermission`:

- `bibles`
- `highlights`
- `votd`
- `demographics`
- `bibleActivity`

**Returns:**
`Promise<YouVersionLoginResult>` - An object containing the following details:

| Property      | Type                               | Description                                  |
| ------------- | ---------------------------------- | -------------------------------------------- |
| `accessToken` | `string`                           | The access token for the authenticated user. |
| `permissions` | `SignInWithYouVersionPermission[]` | The permissions granted by the user.         |
| `yvpUserId`   | `string`                           | The YouVersion Platform user ID.             |

#### `signOut`

Deletes the user's access token from memory.

#### `userInfo`

Retrieves user information for the authenticated user

**Parameters:**

- `accessToken?: string` - The access token of the authenticated user. If not provided, the SDK will use the last authenticated user's token.

**Returns:**
`Promise<YouVersionUserInfo>` - An object containing the user's profile information:

| Property    | Type     | Description                     |
| ----------- | -------- | ------------------------------- |
| `userId`    | `string` | The user's account ID.          |
| `firstName` | `string` | The user's first name.          |
| `lastName`  | `string` | The user's last name.           |
| `avatarUrl` | `string` | URL to the user's avatar image. |

## API

The SDK also provides utility functions to call the API manually. The documentation is broken up by feature area.

### Verse of the Day

#### `verseOfTheDay`

Retrieves the verse of the day passage id for a specified day of the year

**Parameters:**

- `dayOfYear: number` - The day of the year for which to retrieve the verse of the day.

**Returns:**
`Promise<YouVersionVerseOfTheDay>` - A promise containing the verse of the day details. Use this with a `BibleTextView` to display the passage.

| Property    | Type     | Description                                     |
| ----------- | -------- | ----------------------------------------------- |
| `passageId` | `string` | The reference of the verse (e.g., "John 3:16"). |
| `day`       | `number` | The day of the year for the verse.              |

### `<SignInWithYouVersionButton />`

A branded button view show the user to sign in with YouVersion. Provide an `onPress` handler to initiate the sign-in flow.

```tsx
import { SignInWithYouVersionButton } from '@youversion/react-native-sdk';

<SignInWithYouVersionButton
  isStroked
  mode="full"
  shape="capsule"
  onPress={handleSignIn}
/>;
```

| Property      | Type                                    | Description                                                                      |
| ------------- | --------------------------------------- | -------------------------------------------------------------------------------- |
| `isStroked`   | `boolean`                               | If true, give the button an outline/border                                       |
| `mode`        | `"full"` or `"compact"` or `"iconOnly"` | Controls the length of the sign in text on the button                            |
| `shape`       | `"rectangle"` or `"capsule"`            | Controls the button's border radius                                              |
| `onPress`     | `() => void`                            | Handler called when the button is pressed                                        |
| `colorScheme` | `"light"` or `"dark"` or `undefined`    | Controls the button's color scheme. Defaults to system color scheme if undefined |

### `<BibleTextView />`

A text view for displaying a Bible passage with customizable font settings. This component
supports displaying an entire chapter, a specific verse or a range of verses. It also accepts
an `onPress` handler when the user taps a verse.

```tsx
import { BibleTextView } from '@youversion/react-native-sdk';

<BibleTextView
  bibleReference={{
    versionId: 1,
    bookUSFM: 'JHN',
    chapter: 3,
    verse: 16,
  }}
  onPress={e => {
    console.log('Verse pressed:', e.bibleReference);
  }}
/>;
```

| Property             | Type                                  | Description                                                                             |
| -------------------- | ------------------------------------- | --------------------------------------------------------------------------------------- |
| `bibleReference`     | `BibleReference`                      | The Bible reference to display                                                          |
| `onPress`            | `(e: BibleTextPressEvent) => void`    | Handler called when a verse is pressed                                                  |
| `fontFamily`         | `string` or `null` or `undefined`     | Controls the font family of the text. The font family must be available on the platform |
| `fontSize`           | `number` or `null` or `undefined`     | Controls the font size of the text                                                      |
| `lineSpacing`        | `number` or `null` or `undefined`     | Controls the line spacing of the text                                                   |
| `paragraphSpacing`   | `number` or `null` or `undefined`     | Controls the spacing between paragraphs in the text                                     |
| `textColor`          | `ColorValue` or `null` or `undefined` | Controls the text color of the text                                                     |
| `wocColor`           | `ColorValue` or `null` or `undefined` | Controls the color of the words of Christ (WOC) in the Bible text                       |
| `renderVerseNumbers` | `boolean` or `null` or `undefined`    | Controls whether verse numbers are shown                                                |
| `footnoteMode`       | `"none"` or `"inline"` or `"marker"`  | Controls how footnotes are displayed in the Bible text                                  |

A `BibleReference` can look 1 of 3 ways to represent a single verse, a range of verses, or an entire chapter:

```typescript
// Single verse
type BibleReferenceVerse = {
  versionId: number;
  bookUSFM: string;
  chapter: number;
  verse: number;
  type: 'verse';
};

// Range of verses
type BibleReferenceVerseRange = {
  versionId: number;
  bookUSFM: string;
  chapter: number;
  verseStart: number;
  verseEnd: number;
  type: 'range';
};

// Entire chapter
type BibleReferenceChapter = {
  versionId: number;
  bookUSFM: string;
  chapter: number;
  type: 'chapter';
};
```

`BibleReference` properties:

| Property     | Type                                  | Description                                     |
| ------------ | ------------------------------------- | ----------------------------------------------- |
| `versionId`  | `number`                              | The ID of the Bible version to use              |
| `bookUSFM`   | `string`                              | The book identifier (e.g., "GEN", "JHN")        |
| `chapter`    | `number`                              | The chapter number                              |
| `verse`      | `number?`                             | The verse number (for `type: "verse"`)          |
| `verseStart` | `number?`                             | The starting verse number (for `type: "range"`) |
| `verseEnd`   | `number?`                             | The ending verse number (for `type: "range"`)   |
| `type`       | `"verse"` or `"range"` or `"chapter"` | The type of reference being represented         |

`BibleTextPressEvent` properties:
| Property | Type | Description |
| --------------- | --------------- | -------------------------------------------- |
| `bibleReference` | `BibleReference` | The Bible reference that was pressed |
| `point` | `{ x: number; y: number }` | The screen coordinates of the press event |

### `<VotdView />`

A view for displaying the verse of the day (VOTD) with Bible reference and text. It can be configured to fetch the VOTD from YouVersion, or passed a custom verse of the day object.

```tsx
import { VotdView } from '@youversion/react-native-sdk';

<VotdView
  colorScheme="dark"
  backgroundUrl="https://someimage.url/background.jpg"
  votd={{
    reference: 'John 3:16',
    abbreviation: 'KJV',
    text: 'For God so loved the world, that he gave his only begotten Son, that whosoever believeth in him should not perish, but have everlasting life.',
    copyright: 'Copyright',
  }}
/>;
```

| Property        | Type                                               | Description                                                                                                        |
| --------------- | -------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------ |
| `votd`          | `YouVersionVerseOfTheDay` or `null` or `undefined` | The verse of the day to display. If `null` or `undefined` or omitted, the SDK will fetch the VOTD from YouVersion. |
| `colorScheme`   | `"light"` or `"dark"` or `undefined`               | Controls the view's color scheme. Defaults to system color scheme if undefined.                                    |
| `backgroundUrl` | `string` or `null` or `undefined`                  | URL of an image to use as the background of the VOTD view.                                                         |
| `minHeight`     | `number` or `null` or `undefined`                  | The minimum height of the view.                                                                                    |
| `maxHeight`     | `number` or `null` or `undefined`                  | The maximum height of the view.                                                                                    |

See `YouVersionVerseOfTheDay` properties under the `verseOfTheDay` API section above.

### `<BibleReaderView />`

A full-featured Bible reader component that supports font customizations, version switching, offline downloads, verse highlights and more. It is designed to provide a similar experience to the YouVersion Bible reader found in the YouVersion app. It accepts an optional initial Bible reference to display.

```tsx
import { BibleReaderView } from '@youversion/react-native-sdk';

<BibleReaderView
  appName="YouVersion RN SDK"
  signInMessage="Sign in to access your highlights"
/>;
```

| Property        | Type                            | Description                                                                                                |
| --------------- | ------------------------------- | ---------------------------------------------------------------------------------------------------------- |
| `reference`     | `BibleReference` or `undefined` | Initial Bible reference to display when the view loads. This can be a single verse, verse range or chapter |
| `appName`       | `string`                        | Name of your app to display in the Bible reader UI when prompting the user to sign in                      |
| `signInMessage` | `string`                        | Custom message to display to the user from the sign-in sheet, letting them know why they should sign in    |

See `BibleReference` properties under the `BibleTextView` component section above.

### `<BibleWidgetView />`

A more opinionated view for displaying a Bible passage. It also displays the book, chapter and version name above the passage. Below the passage text, it displays copyright information and the YouVersion logo.

```tsx
import { BibleWidgetView } from '@youversion/react-native-sdk';

<BibleWidgetView
  reference={{
    bookUSFM: 'JHN',
    chapter: 3,
    type: 'chapter',
    versionId: 206,
  }}
  colorScheme="light"
/>;
```

| Property      | Type                                 | Description                                                                    |
| ------------- | ------------------------------------ | ------------------------------------------------------------------------------ |
| `reference`   | `BibleReference`                     | The Bible reference to display                                                 |
| `colorScheme` | `"light"` or `"dark"` or `undefined` | Controls the view's color scheme. Defaults to system color scheme if undefined |
| `fontSize`    | `number` or `null` or `undefined`    | Controls the font size of the passage text                                     |

See `BibleReference` properties under the `BibleTextView` component section above.
