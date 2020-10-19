import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import * as SecureStore from "expo-secure-store";
import type { AuthState, SetTokenAction, SetUserAction } from "./types";

const initialState: AuthState = {
  token: null,
  loggedIn: false,
  user: null,
};

const setToken = createAsyncThunk<SetTokenAction, string>(
  "auth/setToken",
  async (token: SetTokenAction) => {
    if (token != null) {
      await SecureStore.setItemAsync("token", token);
    }

    return token;
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
      state.user = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(setToken.fulfilled, (state, action) => {
      const token = action.payload;

      if (token != null && token.length > 0) {
        state.token = token;
        state.loggedIn = true;
      } else {
        state.token = null;
        state.loggedIn = false;
      }
    });
    builder.addCase(removeToken.fulfilled, (state) => {
      state.token = null;
      state.user = null;
      state.loggedIn = false;
    });
  },
});

export default authSlice.reducer;
export const { setUser } = authSlice.actions;
export { setToken, removeToken };
