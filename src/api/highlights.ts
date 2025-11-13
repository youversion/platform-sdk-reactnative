import { Module } from "../native";
import { HighlightResponse } from "../types";

export const HighlightsAPI = {
  /**
   * Creates a new Bible highlight for the user in YouVersion.
   *
   * @param params - An object ({@link CreateHighlightParams}) containing the parameters for creating the highlight.
   * @param params.bibleId - The Bible version identifier.
   * @param params.passageId - The passage identifier (e.g., "JHN.5.1").
   * @param params.color - The highlight color in hex format (e.g., "#eeeeff").
   * @returns A boolean indicating success or failure.
   */
  createHighlight({
    bibleId,
    passageId,
    color,
  }: CreateHighlightParams): Promise<boolean> {
    return Module.createHighlight(bibleId, passageId, color);
  },

  /**
   * Retrieves the user's highlights for a specific Bible chapter from YouVersion.
   * @param params - An object ({@link GetHighlightsParams}) containing the parameters for retrieving highlights.
   * @param params.bibleId - The Bible version identifier.
   * @param params.passageId - The passage identifier (e.g., "JHN.5.1").
   * @returns `HighlightResponse[]` - An array of {@link HighlightResponse} objects
   */
  getHighlights({
    bibleId,
    passageId,
  }: GetHighlightsParams): Promise<HighlightResponse[]> {
    return Module.getHighlights(bibleId, passageId);
  },

  /**
   * Updates an existing Bible highlight for the user in YouVersion.
   *
   * @param params - An object ({@link UpdateHighlightParams}) containing the parameters for updating the highlight.
   * @param params.bibleId - The Bible version identifier.
   * @param params.passageId - The passage identifier (e.g., "JHN.5.1").
   * @param params.color - The new highlight color in hex format (e.g., "#eeeeff").
   * @returns A boolean indicating success or failure.
   */
  updateHighlight({
    bibleId,
    passageId,
    color,
  }: UpdateHighlightParams): Promise<boolean> {
    return Module.updateHighlight(bibleId, passageId, color);
  },

  /**
   * Deletes a Bible highlight for the user in YouVersion.
   *
   * @param params - An object ({@link DeleteHighlightParams}) containing the parameters for deleting the highlight.
   * @param params.bibleId - The Bible version identifier.
   * @param params.passageId - The passage identifier (e.g., "JHN.5.1").
   * @returns A boolean indicating success or failure.
   */
  deleteHighlight({
    bibleId,
    passageId,
  }: DeleteHighlightParams): Promise<boolean> {
    return Module.deleteHighlight(bibleId, passageId);
  },
};

export interface CreateHighlightParams {
  /**
   * The Bible version identifier
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
}

export interface GetHighlightsParams {
  /**
   * The Bible version identifier
   *
   * @example 111
   */
  bibleId: number;

  /**
   * The passage identifier (e.g., "JHN.5.1")
   *
   * @example "JHN.5.1"
   */
  passageId: string;
}

export interface UpdateHighlightParams {
  /**
   * The Bible version identifier
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
}

export interface DeleteHighlightParams {
  /**
   * The Bible version identifier
   *
   * @example 111
   */
  bibleId: number;

  /**
   * The passage identifier (e.g., "JHN.5.1")
   *
   * @example "JHN.5.1"
   */
  passageId: string;
}
