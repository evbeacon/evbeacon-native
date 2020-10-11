import { UserType } from "./user";
import { LocationType } from "./location";
import { AddressType } from "./address";

export type ChargerType = {
  _id: string;
  owner: UserType["_id"];
  location: LocationType;
  address: AddressType;
  plugType: string;
  description?: string;
  offHoursStartUTC?: number;
  offHoursEndUTC?: number;
  disabledUntil?: Date;
  banned: boolean;
};
