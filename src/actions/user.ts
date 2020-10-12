import {
  apiGetRequest,
  apiPatchRequest,
  apiPutRequest,
} from "../utils/requests";
import {
  BanUserParams,
  GetUserParams,
  GetUserResponse,
  UpdateUserParams,
  UpdateUserResponse,
} from "../types/actions/user";

export const getUser = async (
  token: string,
  params: GetUserParams
): Promise<GetUserResponse> =>
  apiGetRequest<GetUserParams, GetUserResponse>("/user", params, token);

export const updateUser = async (
  token: string,
  params: UpdateUserParams
): Promise<UpdateUserResponse> =>
  apiPatchRequest<UpdateUserParams, UpdateUserResponse>("/user", params, token);

export const banUser = async (
  token: string,
  params: BanUserParams
): Promise<void> => apiPutRequest<BanUserParams>("/user", params, token);
