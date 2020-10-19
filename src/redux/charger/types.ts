import type { ChargerType } from "../../types/charger";

export type ChargerState = {
  loaded: boolean;
  error: string | null;
  chargers: ChargerType[];
};

export type SetChargersAction = ChargerState["chargers"];
