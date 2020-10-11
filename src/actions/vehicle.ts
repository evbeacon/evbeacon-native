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
  params: GetVehicleParams
): Promise<GetVehicleResponse> =>
  apiGetRequest<GetVehicleParams, GetVehicleResponse>("/vehicle", params);

export const createVehicle = async (
  params: CreateVehicleParams
): Promise<CreateVehicleResponse> =>
  apiPostRequest<CreateVehicleParams, CreateVehicleResponse>(
    "/vehicle",
    params
  );

export const updateVehicle = async (
  params: UpdateVehicleParams
): Promise<UpdateVehicleResponse> =>
  apiPatchRequest<UpdateVehicleParams, UpdateVehicleResponse>(
    "/vehicle",
    params
  );

export const deleteVehicle = async (
  params: DeleteVehicleParams
): Promise<DeleteVehicleResponse> =>
  apiDeleteRequest<DeleteVehicleParams, DeleteVehicleResponse>(
    "/vehicle",
    params
  );

export const banVehicle = async (params: BanVehicleParams): Promise<void> =>
  apiPutRequest<BanVehicleParams>("/vehicle", params);
