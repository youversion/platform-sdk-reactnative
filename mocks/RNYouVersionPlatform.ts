import {
  BibleReference,
  BibleVersion,
  HighlightResponse,
  LanguageOverview,
  SignInWithYouVersionPermission,
  SignInWithYouVersionResult,
  YouVersionUserInfo,
  YouVersionVerseOfTheDay,
} from "../src";

export function configure(_appKey: string) {}
export function setApiHost(_apiHost: string) {}
export function getAccessToken(): string | null {
  return "existing-access-token";
}

export function signIn(
  requiredPermissions: SignInWithYouVersionPermission[] = [],
  optionalPermissions: SignInWithYouVersionPermission[] = [],
): Promise<SignInWithYouVersionResult> {
  return Promise.resolve({
    accessToken: "mock-access-token",
    permissions: [...requiredPermissions, ...optionalPermissions],
    yvpUserId: "mock-yvp-user-id",
  });
}

export function signOut(): Promise<void> {
  return Promise.resolve();
}

export function userInfo(): Promise<YouVersionUserInfo> {
  return Promise.resolve({
    profilePicture: "https://example.com/avatar.png",
    name: "Mock User",
    email: "mockuser@example.com",
    id: "mock-yvp-user-id",
  });
}

export function verseOfTheDay(
  dayOfYear: number,
): Promise<YouVersionVerseOfTheDay> {
  return Promise.resolve({
    day: dayOfYear,
    passageId: "GEN.1.1",
  });
}

export function versions(_languageTag?: string): Promise<BibleVersion[]> {
  const versions: BibleVersion[] = [
    {
      id: 1,
      abbreviation: "KJV",
      languageTag: "en",
      bookCodes: ["GEN", "EXO", "LEV"],
      copyright: "King James Version Copyright",
      promotionalContent: "<div>promotional content</div>",
      localizedAbbreviation: "KJV",
      localizedTitle: "King James Version",
      textDirection: "ltr",
      title: "King James Version",
    },
  ];

  return Promise.resolve(versions);
}

export function version(versionId: number): Promise<BibleVersion> {
  return Promise.resolve({
    id: versionId,
    abbreviation: "KJV",
    languageTag: "en",
    bookCodes: ["GEN", "EXO", "LEV"],
    copyrightLong: "King James Version Copyright",
    copyrightShort: "KJV Copyright",
    localizedAbbreviation: "KJV",
    localizedTitle: "King James Version",
    textDirection: "ltr",
    title: "King James Version",
  });
}

export function chapter(bibleReference: BibleReference): Promise<string> {
  return Promise.resolve(
    "In the beginning God created the heaven and the earth.",
  );
}

export function languages(_country?: string): Promise<LanguageOverview[]> {
  const languages: LanguageOverview[] = [
    {
      id: "EN",
      aliases: ["en"],
      language: "English",
      displayNames: {
        en: "English",
      },
      scripts: ["Latn"],
      variants: [],
      countries: ["US", "GB"],
      textDirection: "ltr",
    },
  ];

  return Promise.resolve(languages);
}

export function createHighlight(
  _versionId: number,
  _passageId: string,
  _color: string,
): Promise<boolean> {
  return Promise.resolve(true);
}

export function getHighlights(
  versionId: number,
  passageId: string,
): Promise<HighlightResponse[]> {
  const highlights: HighlightResponse[] = [
    {
      passageId,
      color: "#FFFF00",
      bibleId: versionId,
    },
  ];

  return Promise.resolve(highlights);
}

export function updateHighlight(
  _versionId: number,
  _passageId: string,
  _color: string,
): Promise<boolean> {
  return Promise.resolve(true);
}

export function deleteHighlight(
  _versionId: number,
  _passageId: string,
): Promise<boolean> {
  return Promise.resolve(true);
}
