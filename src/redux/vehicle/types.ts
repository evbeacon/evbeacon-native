import type { VehicleType } from "../../types/vehicle";

export interface VehicleState {
  loaded: boolean;
  error: string | null;
  vehicles: VehicleType[] | null;
}

export interface SetVehiclesAction {
  vehicles: VehicleState["vehicles"];
}
