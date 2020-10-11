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
  params: GetChargerParams
): Promise<GetChargerResponse> =>
  apiGetRequest<GetChargerParams, GetChargerResponse>("/charger", params);

export const createCharger = async (
  params: CreateChargerParams
): Promise<CreateChargerResponse> =>
  apiPostRequest<CreateChargerParams, CreateChargerResponse>(
    "/charger",
    params
  );

export const updateCharger = async (
  params: UpdateChargerParams
): Promise<UpdateChargerResponse> =>
  apiPatchRequest<UpdateChargerParams, UpdateChargerResponse>(
    "/charger",
    params
  );

export const deleteCharger = async (
  params: DeleteChargerParams
): Promise<DeleteChargerResponse> =>
  apiDeleteRequest<DeleteChargerParams, DeleteChargerResponse>(
    "/charger",
    params
  );

export const banCharger = async (params: BanChargerParams): Promise<void> =>
  apiPutRequest<BanChargerParams>("/charger", params);
