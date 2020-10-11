import {
  LoginActionParams,
  LoginActionResponse,
  SignUpActionParams,
  SignUpActionResponse,
} from "../types/actions/auth";
import { apiPostRequest } from "../utils/requests";

export const login = async (
  params: LoginActionParams
): Promise<LoginActionResponse> =>
  apiPostRequest<LoginActionParams, LoginActionResponse>("/login", params);

export const signUp = (
  params: SignUpActionParams
): Promise<SignUpActionResponse> =>
  apiPostRequest<SignUpActionParams, SignUpActionResponse>("/signup", params);
