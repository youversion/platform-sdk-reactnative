import { Module } from "../native";
import {
  SignInWithYouVersionPermission,
  YouVersionLoginResult,
  YouVersionUserInfo,
} from "../types";

type SignInOptions = {
  /** Array of permissions that are required for a successful login */
  requiredPermissions?: SignInWithYouVersionPermission[];

  /** Array of permissions that are optional for the user to select */
  optionalPermissions?: SignInWithYouVersionPermission[];
};

export const UsersAPI = {
  /**
   * Presents the YouVersion login flow to the user and returns the login result upon completion.
   *
   * @param params - An object ({@link SignInOptions}) containing an array of permissions that are optional for your app and an array of permissions that are required for a successful login.
   * @returns A promise that resolves to the login result as a {@link YouVersionLoginResult} object.
   */
  signIn: ({
    requiredPermissions: providedRequired,
    optionalPermissions: providedOptional,
  }: SignInOptions = {}): Promise<YouVersionLoginResult> => {
    const requiredPermissions = providedRequired || [];
    const optionalPermissions = providedOptional || [];

    return Module.signIn(requiredPermissions, optionalPermissions);
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
