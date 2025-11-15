import { Module } from "../native";
import {
  SignInWithYouVersionPermission,
  SignInWithYouVersionResult,
  YouVersionUserInfo,
} from "../types";

export const UsersAPI = {
  /**
   * Presents the YouVersion login flow to the user and returns the login result upon completion.
   *
   * @param permissions - An array of permissions to request during sign-in.
   * @returns A promise that resolves to the login result as a {@link SignInWithYouVersionResult} object.
   */
  signIn: (
    permissions: SignInWithYouVersionPermission[] = [],
  ): Promise<SignInWithYouVersionResult> => {
    return Module.signIn(permissions);
  },

  /** Signs out the current user by clearing the access token from local storage */
  signOut(): Promise<void> {
    return Module.signOut();
  },

  /**
   * Retrieves user information for the authenticated user using the provided access token.
   *
   * @param accessToken - Optionally provide an accessToken, or use the one stored in the SDK after the user signs in
   * @returns A promise that resolves to the user information as a {@link YouVersionUserInfo} object.
   */
  userInfo(accessToken?: string): Promise<YouVersionUserInfo> {
    return Module.userInfo(accessToken);
  },
};
