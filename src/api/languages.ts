import { Module } from "../native";
import { LanguageOverview } from "../types";

export const LanguagesAPI = {
  /**
   * Retrieves a list of languages supported in the Platform.
   *
   * @param country  - An optional country code for filtering languages. If provided, only languages used in that country will be returned. For example, "US" for the United States.
   * @returns An array of {@link LanguageOverview} objects.
   */
  getLanguages(country?: string): Promise<LanguageOverview[]> {
    return Module.languages(country);
  },
};
