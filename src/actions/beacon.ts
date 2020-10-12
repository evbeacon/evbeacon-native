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
  token: string,
  params: GetBeaconParams
): Promise<GetBeaconResponse> =>
  apiGetRequest<GetBeaconParams, GetBeaconResponse>("/beacon", params, token);

export const createBeacon = async (
  token: string,
  params: CreateBeaconParams
): Promise<CreateBeaconResponse> =>
  apiPostRequest<CreateBeaconParams, CreateBeaconResponse>(
    "/beacon",
    params,
    token
  );

export const updateBeaconCharger = async (
  token: string,
  params: UpdateBeaconParams
): Promise<UpdateBeaconResponse> =>
  apiPatchRequest<UpdateBeaconParams, UpdateBeaconResponse>(
    "/beacon",
    params,
    token
  );

export const cancelBeacon = async (
  token: string,
  params: CancelBeaconParams
): Promise<void> => apiPutRequest<CancelBeaconParams>("/beacon", params, token);
