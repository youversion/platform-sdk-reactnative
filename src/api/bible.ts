import { Module } from "../native";
import { BibleReference, BibleVersion } from "../types";

export const BibleAPI = {
  /**
   * Retrieves a list of Bible versions available for a specified language code (like "eng").
   *
   * @param languageTag - An optional language code per BCP 47 for filtering available Bible versions. If `nil`
   *     the function returns versions for all languages.
   * @returns An array of {@link BibleVersion} objects.
   */
  getVersions(languageTag?: string): Promise<Omit<BibleVersion, "books">[]> {
    return Module.versions(languageTag);
  },

  /**
   * Retrieves a single Bible version by its unique identifier.
   *
   * @param versionId -  The id of the Bible version
   * @returns A {@link BibleVersion} object
   */
  getVersion(versionId: number): Promise<BibleVersion> {
    return Module.version(versionId);
  },

  /**
   * Retrieves the content of a single Bible chapter from the server as an HTML string.
   *
   * @param bibleReference - A {@link BibleReference} object specifying the reference to retrieve.
   * @returns The chapter content as an HTML string.
   */
  getChapter(bibleReference: BibleReference): Promise<string> {
    return Module.chapter(bibleReference);
  },
};
