import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { ChargerState, SetChargersAction } from "./types";

const initialState: ChargerState = {
  loaded: false,
  error: null,
  chargers: [],
};

const chargerSlice = createSlice({
  name: "charger",
  initialState,
  reducers: {
    setChargers(state, action: PayloadAction<SetChargersAction>) {
      const { chargers } = action.payload;

      state.chargers = chargers;
    },
    clearChargers() {
      return initialState;
    },
  },
});

export default chargerSlice.reducer;
export const { setChargers, clearChargers } = chargerSlice.actions;
