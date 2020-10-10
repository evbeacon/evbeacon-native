export interface AuthState {
  loggedIn: boolean;
  token: string | null;
}

export interface SetTokenAction {
  token: AuthState["token"];
}
