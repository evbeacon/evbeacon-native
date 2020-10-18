import type { ChargerType } from "../../types/charger";

export interface ChargerState {
  loaded: boolean;
  error: string | null;
  chargers: ChargerType[];
}

export interface SetChargersAction {
  chargers: ChargerState["chargers"];
}
