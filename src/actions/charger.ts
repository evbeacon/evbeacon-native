import {
  apiDeleteRequest,
  apiGetRequest,
  apiPatchRequest,
  apiPostRequest,
  apiPutRequest,
} from "../utils/requests";
import {
  BanChargerParams,
  CreateChargerParams,
  CreateChargerResponse,
  DeleteChargerParams,
  DeleteChargerResponse,
  GetChargerParams,
  GetChargerResponse,
  UpdateChargerParams,
  UpdateChargerResponse,
} from "../types/actions/charger";

export const getCharger = async (
  token: string,
  params: GetChargerParams
): Promise<GetChargerResponse> =>
  apiGetRequest<GetChargerParams, GetChargerResponse>(
    "/charger",
    params,
    token
  );

export const createCharger = async (
  token: string,
  params: CreateChargerParams
): Promise<CreateChargerResponse> =>
  apiPostRequest<CreateChargerParams, CreateChargerResponse>(
    "/charger",
    params,
    token
  );

export const updateCharger = async (
  token: string,
  params: UpdateChargerParams
): Promise<UpdateChargerResponse> =>
  apiPatchRequest<UpdateChargerParams, UpdateChargerResponse>(
    "/charger",
    params,
    token
  );

export const deleteCharger = async (
  token: string,
  params: DeleteChargerParams
): Promise<DeleteChargerResponse> =>
  apiDeleteRequest<DeleteChargerParams, DeleteChargerResponse>(
    "/charger",
    params,
    token
  );

export const banCharger = async (
  token: string,
  params: BanChargerParams
): Promise<void> => apiPutRequest<BanChargerParams>("/charger", params, token);
