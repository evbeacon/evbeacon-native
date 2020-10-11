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
  params: GetReportParams
): Promise<GetReportResponse> =>
  apiGetRequest<GetReportParams, GetReportResponse>("/report", params);

export const createReport = async (
  params: CreateReportParams
): Promise<CreateReportResponse> =>
  apiPostRequest<CreateReportParams, CreateReportResponse>("/report", params);

export const updateReport = async (
  params: UpdateReportParams
): Promise<UpdateReportResponse> =>
  apiPatchRequest<UpdateReportParams, UpdateReportResponse>("/report", params);
