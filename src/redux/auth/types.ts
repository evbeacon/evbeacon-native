import type { SafeUserType } from "../../types/user";

export type AuthState = {
  loggedIn: boolean;
  token: string | null;
  user: SafeUserType | null;
};

export type SetUserAction = AuthState["user"];

export type SetTokenAction = AuthState["token"];
