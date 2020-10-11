import {
  LoginActionParams,
  LoginActionResponse,
  SignUpActionParams,
  SignUpActionResponse,
} from "../types/actions/auth";
import { apiPostRequest } from "../utils/requests";

export const login = async (
  body: LoginActionParams
): Promise<LoginActionResponse> =>
  apiPostRequest<LoginActionParams, LoginActionResponse>("/login", body);

export const signUp = (
  body: SignUpActionParams
): Promise<SignUpActionResponse> =>
  apiPostRequest<SignUpActionParams, SignUpActionResponse>("/signup", body);
