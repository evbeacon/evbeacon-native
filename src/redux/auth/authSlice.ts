import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import * as SecureStore from "expo-secure-store";
import { AuthState, SetTokenAction, SetUserAction } from "./types";

const initialState: AuthState = {
  token: null,
  loggedIn: false,
  user: null,
};

const setToken = createAsyncThunk(
  "auth/setToken",
  async (payload: SetTokenAction) => {
    await SecureStore.setItemAsync("token", payload.token!);

    return payload as SetTokenAction;
  }
);

const removeToken = createAsyncThunk("auth/removeToken", async () => {
  await SecureStore.deleteItemAsync("token");
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<SetUserAction>) {
      const { user } = action.payload;

      state.user = user;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(setToken.pending, (state, action) => {
      const { token } = (action.payload as unknown) as SetTokenAction;

      if (token != null && token.length > 0) {
        state.token = token;
        state.loggedIn = true;
      } else {
        state.token = null;
        state.loggedIn = false;
      }
    });
    builder.addCase(removeToken.pending, (state) => {
      state.token = null;
      state.user = null;
      state.loggedIn = false;
    });
  },
});

export default authSlice.reducer;
export const { setUser } = authSlice.actions;
export { setToken, removeToken };
