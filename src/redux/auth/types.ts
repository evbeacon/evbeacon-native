import { SafeUserType } from "../../types/user";

export interface AuthState {
  loggedIn: boolean;
  token: string | null;
  user: SafeUserType | null;
}

export interface SetUserAction {
  user: AuthState["user"];
}

export interface SetTokenAction {
  token: AuthState["token"];
}
