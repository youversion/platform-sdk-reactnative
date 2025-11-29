import { NativeModule, requireNativeModule } from "expo";

import {
  BibleReferenceBase,
  BibleVersion,
  HighlightResponse,
  LanguageOverview,
  SignInWithYouVersionResult,
  YouVersionUserInfo,
  YouVersionVerseOfTheDay,
} from "./types";

declare class RNYouVersionPlatformModule extends NativeModule {
  configure(appKey: string): void;

  setApiHost(apiHost: string): void;

  signIn(permissions: string[]): Promise<SignInWithYouVersionResult>;

  signOut(): Promise<void>;

  userInfo(accessToken?: string): Promise<YouVersionUserInfo>;

  verseOfTheDay(dayOfYear: number): Promise<YouVersionVerseOfTheDay>;

  createHighlight(
    versionId: number,
    passageId: string,
    color: string,
  ): Promise<boolean>;

  getHighlights(
    versionId: number,
    passageId: string,
  ): Promise<HighlightResponse[]>;

  updateHighlight(
    versionId: number,
    passageId: string,
    color: string,
  ): Promise<boolean>;

  deleteHighlight(versionId: number, passageId: string): Promise<boolean>;

  languages(country?: string): Promise<LanguageOverview[]>;

  versions(languageTag?: string): Promise<BibleVersion[]>;

  version(versionId: number): Promise<BibleVersion>;

  chapter(bibleReference: BibleReferenceBase): Promise<string>;

  getAccessToken(): string | null;
}

export const Module = requireNativeModule<RNYouVersionPlatformModule>(
  "RNYouVersionPlatform",
);
