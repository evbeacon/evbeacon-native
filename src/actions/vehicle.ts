import {
  apiDeleteRequest,
  apiGetRequest,
  apiPatchRequest,
  apiPostRequest,
  apiPutRequest,
} from "../utils/requests";
import {
  BanVehicleParams,
  CreateVehicleParams,
  CreateVehicleResponse,
  DeleteVehicleParams,
  DeleteVehicleResponse,
  GetVehicleParams,
  GetVehicleResponse,
  UpdateVehicleParams,
  UpdateVehicleResponse,
} from "../types/actions/vehicle";

export const getVehicle = async (
  token: string,
  params: GetVehicleParams
): Promise<GetVehicleResponse> =>
  apiGetRequest<GetVehicleParams, GetVehicleResponse>(
    "/vehicle",
    params,
    token
  );

export const createVehicle = async (
  token: string,
  params: CreateVehicleParams
): Promise<CreateVehicleResponse> =>
  apiPostRequest<CreateVehicleParams, CreateVehicleResponse>(
    "/vehicle",
    params,
    token
  );

export const updateVehicle = async (
  token: string,
  params: UpdateVehicleParams
): Promise<UpdateVehicleResponse> =>
  apiPatchRequest<UpdateVehicleParams, UpdateVehicleResponse>(
    "/vehicle",
    params,
    token
  );

export const deleteVehicle = async (
  token: string,
  params: DeleteVehicleParams
): Promise<DeleteVehicleResponse> =>
  apiDeleteRequest<DeleteVehicleParams, DeleteVehicleResponse>(
    "/vehicle",
    params,
    token
  );

export const banVehicle = async (
  token: string,
  params: BanVehicleParams
): Promise<void> => apiPutRequest<BanVehicleParams>("/vehicle", params, token);
