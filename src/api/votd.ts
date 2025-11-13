import { Module } from "../native";
import { YouVersionVerseOfTheDay } from "../types";

type VerseOfTheDayOptions = {
  dayOfYear: number;
};

export const VotdAPI = {
  /**
   *  Retrieves the Verse of the Day from YouVersion for a specified day of the year.
   *  A valid `YouVersionPlatformConfiguration.appKey` must be set before calling this function.
   * @param dayOfYear  - The day of the year (1-366) to retrieve the verse for
   * @returns A promise that resolves to a {@link YouVersionVerseOfTheDay} object.
   */
  verseOfTheDay(
    { dayOfYear = 1 }: VerseOfTheDayOptions = { dayOfYear: 1 },
  ): Promise<YouVersionVerseOfTheDay> {
    return Module.verseOfTheDay(dayOfYear);
  },
};
