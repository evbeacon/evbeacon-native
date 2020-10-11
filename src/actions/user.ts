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
  params: GetUserParams
): Promise<GetUserResponse> =>
  apiGetRequest<GetUserParams, GetUserResponse>("/user", params);

export const updateUser = async (
  params: UpdateUserParams
): Promise<UpdateUserResponse> =>
  apiPatchRequest<UpdateUserParams, UpdateUserResponse>("/user", params);

export const banUser = async (params: BanUserParams): Promise<void> =>
  apiPutRequest<BanUserParams>("/user", params);
