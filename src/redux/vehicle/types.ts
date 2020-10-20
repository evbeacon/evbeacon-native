import type { VehicleType } from "../../types/vehicle";

export type VehicleState = {
  loaded: boolean;
  error: string | null;
  vehicles: VehicleType[];
};

export type SetVehiclesAction = VehicleState["vehicles"];
export type UpdateVehicleAction = VehicleType;
export type DeleteVehicleAction = VehicleType;
