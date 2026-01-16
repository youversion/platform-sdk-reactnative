import { ColorValue } from "react-native";

export type SignInWithYouVersionResult = {
  accessToken?: string;
  permissions: SignInWithYouVersionPermission[];
  yvpUserId?: string;
  expiryDate?: string;
  refreshToken?: string;
  name?: string;
  profilePicture?: string;
  email?: string;
  idToken?: string;
};

export type SignInWithYouVersionPermission = "openid" | "email" | "profile";

export interface YouVersionUserInfo {
  name?: string;
  email?: string;
  id?: string;
  profilePicture?: string;
}

export interface YouVersionVerseOfTheDay {
  passageId: string;
  day: number;
}

export interface BibleTextOptions {
  /**
   * Controls the font family of the Bible text
   *
   * @defaultValue "Times New Roman"
   */
  fontFamily?: string | null | undefined;

  /**
   * Controls the font size of the Bible text
   *
   * @defaultValue 16
   */
  fontSize?: number | null | undefined;

  /**
   * Controls the line spacing of the Bible text
   *
   * @defaultValue `fontSize` / 2
   */
  lineSpacing?: number | null | undefined;

  /**
   * Controls the spacing between paragraphs in the Bible text
   *
   * @defaultValue `fontSize` / 2
   */
  paragraphSpacing?: number | null | undefined;

  /**
   * Controls the text color of the Bible text
   *
   * @defaultValue Theme dependent text color
   */
  textColor?: ColorValue | null | undefined;

  /**
   * Controls the color of the words of Christ (WOC) in the Bible text
   *
   * @defaultValue "#FF3D4D" in light mode, "#F04C59" in dark mode
   */
  wocColor?: ColorValue | null | undefined;

  /**
   * Controls how footnotes are displayed in the Bible text
   *
   * @defaultValue "none"
   */
  footnoteMode?: BibleTextFootnoteMode | null | undefined;

  /**
   * Controls whether verse numbers are rendered in the Bible text
   *
   * @defaultValue true
   */
  renderVerseNumbers?: boolean | null | undefined;
}

export type BibleTextFootnoteMode =
  | "none"
  | "inline"
  | "marker"
  | "letters"
  | "image";

export interface BibleReferenceBase {
  /** The ID of the Bible version */
  versionId: number;

  /** The book identifier */
  bookUSFM: string;

  /** The chapter number */
  chapter: number;
}

/**
 * A reference to a range of verses
 */
export interface BibleReferenceVerseRange extends BibleReferenceBase {
  type: "range";
  verseStart: number;
  verseEnd: number;
  verse?: never;
}

/**
 * A reference to an entire chapter in the Bible
 */
export interface BibleReferenceChapter extends BibleReferenceBase {
  type: "chapter";
  verse?: never;
  verseStart?: never;
  verseEnd?: never;
}

/**
 * A reference to a single verse in the Bible
 */
export interface BibleReferenceVerse extends BibleReferenceBase {
  type: "verse";
  verse: number;
  verseStart?: never;
  verseEnd?: never;
}

export type BibleReference =
  | BibleReferenceVerseRange
  | BibleReferenceChapter
  | BibleReferenceVerse;

export interface OnBibleTextPressEvent {
  /** A reference to the Bible verse that was pressed */
  bibleReference: BibleReferenceVerse;
  urlScheme: string;
  /** Not implemented yet */
  footnotes: unknown[];
}

export interface LanguageOverview {
  /**
   * Canonical BCP 47 id limited to language or language+script. Region, variants, and extensions are not allowed.
   *
   * @example "en"
   */
  id: string;

  /**
   * ISO 639 canonical language subtag
   *
   * @example "sr"
   */
  language: string;

  /**
   * ISO 15924 script code if present in id
   *
   * @example "Latn"
   */
  script?: string;

  /**
   * The English name for the script
   *
   * @example "Latin"
   */
  scriptName?: string;

  /**
   * Deprecated or legacy subtags mapped during canonicalization for this language.
   *
   * @example []
   */
  aliases: string[];

  /**
   * Localized display names for the language/script combination
   * @example { "en": "Chechen" }
   */
  displayNames: Record<string, string>;

  /**
   * All scripts known for this language (CLDR/ISO-15924)
   *
   * @example ["Cyrl", "Latn"]
   */
  scripts: string[];

  /**
   * Variants associated with this language (not part of the id)
   *
   * @example ["1996","fonipa"]
   */
  variants: string[];

  /**
   * Ids of countries where this language is used or supported. Extended details can be retrieved from the countries API with the provided id.
   *
   * @example ["RS","BA","ME"]
   */
  countries: string[];

  /**
   * Default text direction for this language. ltr is left to right and rtl is right to left.
   *
   * @example "ltr"
   */
  textDirection: string;

  /**
   * The chosen default Bible version for this language.
   *
   * @example 111
   */
  defaultBibleId?: number;
}

export interface HighlightResponse {
  id?: string;

  /**
   * Bible version identifier
   *
   * @example 111
   */
  bibleId: number;

  /**
   * The passage identifier (verse USFM format)
   *
   * @example "MAT.1.1"
   */
  passageId: string;

  /**
   * The highlight color in hex format
   *
   * @example "#44aa44"
   */
  color: string;
  userId?: string;
  createTime?: string;
  updateTime?: string;
}

export interface BibleVersion {
  /**
   * Bible version identifier
   *
   * @example 111
   */
  id: number;

  /**
   * Bible version abbreviation
   *
   * @example "NIV"
   */
  abbreviation?: string;

  /**
   * Longer form of copyright text provided by the publisher for the given Bible version.
   *
   * @example "<p>Biblica is the worldwide publisher and translation sponsor of the New International Version—one of the most widely read contemporary English versions of the Bible. </p> <p>At Biblica, we believe that with God, all things are possible. Partnering with other ministries and people like you, we are reaching the world with God’s Word, providing Bibles that are easier to understand and faster to receive. When God’s Word is put into someone’s hands, it has the power to change everything. </p> <p>To learn more, visit <a href="https://www.biblica.com/privacy-policy/">biblica.com</a> and <a href="http://facebook.com/Biblica">facebook.com/Biblica</a>.</p> <p> </p>"
   */
  promotionalContent?: string;

  /**
   * Short version of the copyright text provided by the publisher for the given Bible version.
   *
   * @example "The Holy Bible, New International Version® NIV® Copyright © 1973, 1978, 1984, 2011 by Biblica, Inc.® Used by Permission of Biblica, Inc.® All rights reserved worldwide."
   */
  copyright?: string;

  /**
   * BCP47 canonical language tag for this Bible version
   *
   * @example "en"
   */
  languageTag?: string;

  /**
   * Localized Bible version abbreviation
   *
   * @example "NIV"
   */
  localizedAbbreviation?: string;

  /**
   * Localized title of Bible version
   *
   * @example "New International Version"
   */
  localizedTitle?: string;

  readerFooter?: string;
  readerFooterUrl?: string;

  /**
   * English title of Bible version
   *
   * @example "New International Version 2011"
   */
  title?: string;

  /**
   * Array of book codes for this Bible version
   *
   * @example ["GEN","EXO","LEV"]
   */
  bookCodes?: string[];

  /** Array of Bible books for this Bible version */
  books?: BibleBook[];

  /**
   * Default text direction for this language. ltr is left to right and rtl is right to left.
   *
   * @example "ltr"
   */
  textDirection?: string;

  /** uuid */
  organizationId?: string;
}

export interface BibleBook {
  /**
   * Book identifier
   *
   * @example "GEN"
   */
  id?: string;

  /**
   * Book name abbreviation if provided by the publisher
   *
   * @example "Gen"
   */
  abbreviation?: string;

  /**
   * Book title
   *
   * @example "Genesis"
   */
  title?: string;

  /**
   * Full book title if available
   *
   * @example "The Book of Genesis"
   */
  fullTitle?: string;

  /**
   * Indicates if this is Old Testament, New Testament, or Deuterocanonical
   *
   * @example "new_testament"
   */
  canon?: "new_testament" | "old_testament" | "deuterocanon";

  chapters?: BibleChapter[];
}

export interface BibleChapter {
  /**
   * Chapter identifier based off the USFM reference
   *
   * @example 1
   */
  id?: string;

  /**
   * Canonical representation of the passage
   *
   * @example "GEN.1"
   */
  passageId?: string;

  /**
   * Human readable chapter title
   *
   * @example "1"
   */
  title?: string;
}
