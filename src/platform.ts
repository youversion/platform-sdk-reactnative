import { Module } from "./native";

export const YouVersionPlatform = {
  /**
   * Function to configure YouVersionPlatform.
   * Run this once during your app's initialization.
   *
   * @param appKey - The application key provided for your app.
   *
   * @example
   * // During app initialization:
   * YouVersionPlatform.configure('YOUR_APP_KEY');
   */
  configure(appKey: string) {
    return Module.configure(appKey);
  },

  setApiHost(apiHost: string) {
    return Module.setApiHost(apiHost);
  },

  /**
   * Retrieves the currently cached access token for the authenticated user.
   *
   * @returns The access token as a string, or null if not available.
   */
  getAccessToken(): string | null {
    return Module.getAccessToken();
  },
};
