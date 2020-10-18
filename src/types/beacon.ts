import type { UserType } from "./user";
import type { VehicleType } from "./vehicle";
import type { LocationType } from "./location";
import type { ChargerType } from "./charger";

export type BeaconType = {
  _id: string;
  owner: UserType["_id"];
  vehicle: VehicleType["_id"];
  vehicleRange: number;
  location: LocationType;
  allowedChargers: ChargerType["_id"][];
  cancelled: boolean;
};
