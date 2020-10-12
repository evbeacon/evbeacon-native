import {
  apiGetRequest,
  apiPatchRequest,
  apiPostRequest,
} from "../utils/requests";
import {
  CreateReportParams,
  CreateReportResponse,
  GetReportParams,
  GetReportResponse,
  UpdateReportParams,
  UpdateReportResponse,
} from "../types/actions/report";

export const getReport = async (
  token: string,
  params: GetReportParams
): Promise<GetReportResponse> =>
  apiGetRequest<GetReportParams, GetReportResponse>("/report", params, token);

export const createReport = async (
  token: string,
  params: CreateReportParams
): Promise<CreateReportResponse> =>
  apiPostRequest<CreateReportParams, CreateReportResponse>(
    "/report",
    params,
    token
  );

export const updateReport = async (
  token: string,
  params: UpdateReportParams
): Promise<UpdateReportResponse> =>
  apiPatchRequest<UpdateReportParams, UpdateReportResponse>(
    "/report",
    params,
    token
  );
