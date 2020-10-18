import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { VehicleState, SetVehiclesAction } from "./types";

const initialState: VehicleState = {
  loaded: false,
  error: null,
  vehicles: [],
};

const vehicleSlice = createSlice({
  name: "vehicle",
  initialState,
  reducers: {
    setVehicles(state, action: PayloadAction<SetVehiclesAction>) {
      const { vehicles } = action.payload;

      state.vehicles = vehicles;
    },
    clearVehicles() {
      return initialState;
    },
  },
});

export default vehicleSlice.reducer;
export const { setVehicles, clearVehicles } = vehicleSlice.actions;
