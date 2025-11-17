![Platform React Native SDK](./assets/github-reactNative-sdk-banner.png)

# YouVersion React Native SDK
[![npm version](https://badge.fury.io/js/@youversion%2Freact-native-sdk.svg)](https://www.npmjs.com/package/@youversion/platform-sdk-reactnative)
[![CI Status](https://github.com/youversion/platform-sdk-reactnative/workflows/CI/badge.svg)](https://github.com/youversion/platform-sdk-reactnative/actions)
[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](LICENSE)

A lightweight React Native SDK for integrating YouVersion Platform features into React Native applications.

## Documentation

- [Installation & Usage](#installation)
- [API Reference](#api)
- [Contributing Guide](CONTRIBUTING.md)
- [Release Process](RELEASING.md)
- [Changelog](CHANGELOG.md)


> [!important]
> The React Native SDK is currently **iOS-only**. Android support is under active development and not yet available for use.

## Installation

**Prerequisites:**

This project uses the underlying YouVersion SDKs for [Swift](https://github.com/youversion/platform-sdk-swift) and [Kotlin](https://github.com/youversion/platform-sdk-kotlin), with UI components written in SwiftUI and Jetpack Compose, respectively.

Because support for Jetpack Compose and SwiftUI is a recent development in the React Native ecosystem, this SDK requires recent versions of iOS, Expo, and React Native to work.

> The minimum supported version of iOS is 17.
> The minimum supported version of Expo is SDK 54.

**Using bare React Native?**
Follow these instructions to [set up Expo modules in a bare React Native project](https://docs.expo.dev/bare/installing-expo-modules/) before installing this package.

**Install the package:**

Using npm:

```sh
npm install @youversion/platform-sdk-reactnative
```

Using Yarn:

```sh
yarn add @youversion/platform-sdk-reactnative
```

Using pnpm:

```sh
pnpm add @youversion/platform-sdk-reactnative
```

iOS (bare React Native):

```sh
npx pod-install
```

Expo managed workflow (requires a development build or prebuild):

```sh
npx expo install @youversion/platform-sdk-reactnative
npx expo prebuild
```

Rebuild your app after installing the package.

## Usage

### Configure the SDK

Configure the SDK with you app key once, typically in your app's entry point.

```typescript
// App.tsx
import React, { useEffect } from 'react';
import { YouVersionPlatform } from '@youversion/platform-sdk-reactnative';

export default function App() {
  useEffect(() => {
    // Replace with your app key from YouVersion Platform
    YouVersionPlatform.configure('YOUR_APP_KEY');
  }, []);

  return null; // ...your app UI...
}
```

## API Reference

### UI Components

### `<SignInWithYouVersionButton />`

A branded button view show the user to sign in with YouVersion. Provide an `onPress` handler to initiate the sign-in flow.

```tsx
import { SignInWithYouVersionButton } from '@youversion/platform-sdk-reactnative';

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
import { BibleTextView } from '@youversion/platform-sdk-reactnative';

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

| Property             | Type                                 | Description                                                                             |
| -------------------- | ------------------------------------ | --------------------------------------------------------------------------------------- |
| `bibleReference`     | `BibleReference`                     | The Bible reference to display                                                          |
| `onPress`            | `(e: BibleTextPressEvent) => void`   | Handler called when a verse is pressed                                                  |
| `fontFamily`         | `string?`                            | Controls the font family of the text. The font family must be available on the platform |
| `fontSize`           | `number?`                            | Controls the font size of the text                                                      |
| `lineSpacing`        | `number?`                            | Controls the line spacing of the text                                                   |
| `paragraphSpacing`   | `number?`                            | Controls the spacing between paragraphs in the text                                     |
| `textColor`          | `ColorValue?`                        | Controls the text color of the text                                                     |
| `wocColor`           | `ColorValue?`                        | Controls the color of the words of Christ (WOC) in the Bible text                       |
| `renderVerseNumbers` | `boolean?`                           | Controls whether verse numbers are shown                                                |
| `footnoteMode`       | `"none"` or `"inline"` or `"marker"` | Controls how footnotes are displayed in the Bible text                                  |

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
import { VotdView } from '@youversion/platform-sdk-reactnative';

<VotdView colorScheme="dark" bibleVersionId={111} />;
```

| Property         | Type                                 | Description                                                                     |
| ---------------- | ------------------------------------ | ------------------------------------------------------------------------------- |
| `colorScheme`    | `"light"` or `"dark"` or `undefined` | Controls the view's color scheme. Defaults to system color scheme if undefined. |
| `bibleVersionId` | `number`                             | The ID of the Bible version to use for the verse of the day.                    |

See `YouVersionVerseOfTheDay` properties under the `verseOfTheDay` API section above.

### `<BibleReaderView />`

A full-featured Bible reader component that supports font customizations, version switching, offline downloads, verse highlights and more. It is designed to provide a similar experience to the YouVersion Bible reader found in the YouVersion app. It accepts an optional initial Bible reference to display.

```tsx
import { BibleReaderView } from '@youversion/platform-sdk-reactnative';

<BibleReaderView
  appName="YouVersion RN SDK"
  signInMessage="Sign in to access your highlights"
/>;
```

| Property        | Type              | Description                                                                                                |
| --------------- | ----------------- | ---------------------------------------------------------------------------------------------------------- |
| `reference`     | `BibleReference?` | Initial Bible reference to display when the view loads. This can be a single verse, verse range or chapter |
| `appName`       | `string`          | Name of your app to display in the Bible reader UI when prompting the user to sign in                      |
| `signInMessage` | `string`          | Custom message to display to the user from the sign-in sheet, letting them know why they should sign in    |

See `BibleReference` properties under the `BibleTextView` component section above.

### `<BibleWidgetView />`

A more opinionated view for displaying a Bible passage. It also displays the book, chapter and version name above the passage. Below the passage text, it displays copyright information and the YouVersion logo.

```tsx
import { BibleWidgetView } from '@youversion/platform-sdk-reactnative';

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
| `fontSize`    | `number?`                            | Controls the font size of the passage text                                     |

See `BibleReference` properties under the `BibleTextView` component section above.

## SDK Methods

### Authentication

#### `signIn`

Presents the YouVersion login flow to the user and resolves with the login result on completion.

```tsx
import { YouVersionAPI } from '@youversion/platform-sdk-reactnative';

const result = await YouVersionAPI.Users.signIn(['bibles', 'highlights']);
```

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

```tsx
import { YouVersionAPI } from '@youversion/platform-sdk-reactnative';

YouVersionAPI.Users.signOut();
```

#### `userInfo`

Retrieves user information for the authenticated user

```tsx
import { YouVersionAPI } from '@youversion/platform-sdk-reactnative';

const userInfo = await YouVersionAPI.Users.userInfo();
```

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

The SDK also provides utility functions to call the API manually. The documentation is broken up by feature area.

### Verse of the Day

#### `verseOfTheDay`

Retrieves the verse of the day passage id for a specified day of the year

```tsx
import { YouVersionAPI } from '@youversion/platform-sdk-reactnative';

const votd = await YouVersionAPI.Verses.verseOfTheDay(150);
```

**Parameters:**

- `dayOfYear: number` - The day of the year for which to retrieve the verse of the day.

**Returns:**
`Promise<YouVersionVerseOfTheDay>` - A promise containing the verse of the day details. Use this with a `BibleTextView` to display the passage.

| Property    | Type     | Description                                    |
| ----------- | -------- | ---------------------------------------------- |
| `passageId` | `string` | The reference of the verse (e.g., "JHN.3.16"). |
| `day`       | `number` | The day of the year for the verse.             |

### Languages

#### `getLanguages`

Retrieves a list of available languages. It accepts an optional country code to filter the results.

```tsx
import { YouVersionAPI } from '@youversion/platform-sdk-reactnative';

const languages = await YouVersionAPI.Languages.getLanguages('US');
```

**Parameters:**

- `countryCode?: string` - An optional alpha-2 country code to filter languages by country.

**Returns:**
`Promise<LanguageOverview[]>` - An array of language objects.

| Property                | Type                     | Description                                                                            |
| ----------------------- | ------------------------ | -------------------------------------------------------------------------------------- |
| `id`                    | `string`                 | Unique ID of the language (e.g., "en")                                                 |
| `language`              | `string`                 | ISO 639 canonical language subtag (e.g., "sr")                                         |
| `script`                | `string?`                | ISO 15924 script subtag (e.g., "Latn")                                                 |
| `scriptName`            | `string?`                | Name of the script (e.g., "Latin")                                                     |
| `aliases`               | `string[]`               | Array of deprecated or legacy subtags mapped during canonicalization for this language |
| `displayName`           | `Record<string, string>` | Object whose keys are language ids and values are script names                         |
| `scripts`               | `string[]`               | Array of all known scripts for this language                                           |
| `variants`              | `string[]`               | Array of variants associated with this language                                        |
| `countries`             | `string[]`               | Array of alpha-2 country codes where this language is used                             |
| `textDirection`         | `string`                 | Text direction ("ltr" or "rtl") of the language                                        |
| `defaultBibleVersionId` | `number?`                | The default Bible version ID for this language                                         |

### Bible

#### `getVersions`

Retrieves a list of available Bible versions. It accepts an optional language tag to filter the results.

```tsx
import { YouVersionAPI } from '@youversion/platform-sdk-reactnative';

const versions = await YouVersionAPI.Bible.getVersions('en');
```

**Parameters:**

- `languageTag?: string` - An optional BCP 47 language tag to filter Bible versions by language.

**Returns:**
`Promise<BibleVersion[]>` - An array of Bible version objects.

| Property                | Type       | Description                                      |
| ----------------------- | ---------- | ------------------------------------------------ |
| `id`                    | `number`   | Unique ID of the Bible version                   |
| `abbreviation`          | `string`   | Abbreviation of the Bible version                |
| `copyrightLong`         | `string`   | HTML string containing the copyright information |
| `copyrightShort`        | `string`   | Short copyright string                           |
| `languageTag`           | `string`   | BCP 47 language tag of the Bible version         |
| `localizedAbbreviation` | `string`   | Localized abbreviation of the Bible version      |
| `localizedTitle`        | `string`   | Localized title of the Bible version             |
| `title`                 | `string`   | Title of the Bible version                       |
| `bookCodes`             | `string[]` | Array of USFM book codes included in the version |
| `textDirection`         | `string`   | Text direction ("ltr" or "rtl") of the version   |

#### `getVersion`

Retrieves details for a specific Bible version by its ID.

```tsx
import { YouVersionAPI } from '@youversion/platform-sdk-reactnative';

const version = await YouVersionAPI.Bible.getVersion(111);
```

**Parameters:**

- `versionId: number` - The unique ID of the Bible version to retrieve.

**Returns:**
`Promise<BibleVersion>` - A Bible version object. See `getVersions` for property details. This also includes an additional field called `books` containing an array of `BibleBook` objects.

`BibleBook` properties:

| Property       | Type             | Description                         |
| -------------- | ---------------- | ----------------------------------- |
| `usfm`         | `string`         | USFM book code (e.g., "GEN", "JHN") |
| `abbreviation` | `string`         | Abbreviation of the book            |
| `title`        | `string`         | Title of the book                   |
| `titleLong`    | `string`         | Full title of the book              |
| `chapters`     | `BibleChapter[]` | Array of chapters in the book       |

`BibleChapter` properties:

| Property      | Type      | Description                             |
| ------------- | --------- | --------------------------------------- |
| `bookUSFM`    | `string`  | USFM book code                          |
| `isCanonical` | `boolean` | Whether the chapter is canonical        |
| `passageId`   | `string`  | USFM passage identifier (e.g., "GEN.1") |
| `title`       | `string`  | Title of the chapter (e.g., "1")        |

### Highlights

#### `getHighlights`

Retrieves a list of highlights for the authenticated user.

```tsx
import { YouVersionAPI } from '@youversion/platform-sdk-reactnative';

const highlights = await YouVersionAPI.Highlights.getHighlights({
  bibleId: 111,
  passageId: 'JHN.3.16',
});
```

**Parameters:**

An object with the following optional properties:

- `bibleId?: number` - Bible version ID.
- `passageId?: string` - Passage identifier (e.g., "JHN.3.16").

**Returns:**

`Promise<HighlightResponse[]>` - An array of highlight objects.

| Property    | Type     | Description                                     |
| ----------- | -------- | ----------------------------------------------- |
| `id`        | `string` | Unique ID of the highlight                      |
| `bibleId`   | `number` | Bible version ID                                |
| `passageId` | `string` | Passage identifier (e.g., "JHN.3.16")           |
| `color`     | `string` | Highlight color in hex format (e.g., "#FFFF00") |
| `userId`    | `string` | User ID of the highlight owner                  |

#### `createHighlight`

Creates a new highlight for the authenticated user.

```tsx
import { YouVersionAPI } from '@youversion/platform-sdk-reactnative';

const wasSuccess = await YouVersionAPI.Highlights.createHighlight({
  bibleId: 111,
  passageId: 'JHN.3.16',
  color: '#FFFF00',
});
```

**Parameters:**
An object with the following properties:

- `bibleId: number` - Bible version ID.
- `passageId: string` - Passage identifier (e.g., "JHN.3.16").
- `color: string` - Highlight color in hex format (e.g., "#FFFF00").

**Returns:**
`Promise<boolean>` - Boolean representing if the creation was successful.

#### `deleteHighlight`

Deletes a highlight for the authenticated user.

```tsx
import { YouVersionAPI } from '@youversion/platform-sdk-reactnative';

const wasSuccess = await YouVersionAPI.Highlights.deleteHighlight({
  bibleId: 111,
  passageId: 'JHN.3.16',
});
```

**Parameters:**
An object with the following properties:

- `bibleId: number` - Bible version ID.
- `passageId: string` - Passage identifier (e.g., "JHN.3.16").

**Returns:**
`Promise<boolean>` - Boolean representing if the deletion was successful.

#### `updateHighlight`

Updates a highlight's color for the authenticated user.

```tsx
import { YouVersionAPI } from '@youversion/platform-sdk-reactnative';

const wasSuccess = await YouVersionAPI.Highlights.updateHighlight({
  bibleId: 111,
  passageId: 'JHN.3.16',
  color: '#FF0000',
});
```

**Parameters:**
An object with the following properties:

- `bibleId: number` - Bible version ID.
- `passageId: string` - Passage identifier (e.g., "JHN.3.16").
- `color: string` - New highlight color in hex format (e.g., "#FF0000").

**Returns:**
`Promise<boolean>` - Boolean representing if the update was successful.
