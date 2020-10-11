import {
  apiGetRequest,
  apiPatchRequest,
  apiPostRequest,
  apiPutRequest,
} from "../utils/requests";
import {
  CancelBeaconParams,
  CreateBeaconParams,
  CreateBeaconResponse,
  GetBeaconParams,
  GetBeaconResponse,
  UpdateBeaconParams,
  UpdateBeaconResponse,
} from "../types/actions/beacon";

export const getBeacon = async (
  params: GetBeaconParams
): Promise<GetBeaconResponse> =>
  apiGetRequest<GetBeaconParams, GetBeaconResponse>("/beacon", params);

export const createBeacon = async (
  params: CreateBeaconParams
): Promise<CreateBeaconResponse> =>
  apiPostRequest<CreateBeaconParams, CreateBeaconResponse>("/beacon", params);

export const updateBeaconCharger = async (
  params: UpdateBeaconParams
): Promise<UpdateBeaconResponse> =>
  apiPatchRequest<UpdateBeaconParams, UpdateBeaconResponse>("/beacon", params);

export const cancelBeacon = async (params: CancelBeaconParams): Promise<void> =>
  apiPutRequest<CancelBeaconParams>("/beacon", params);
