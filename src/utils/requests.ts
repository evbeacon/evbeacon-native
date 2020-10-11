import { API_URL } from "./constants";

export async function apiGetRequest<ParamsType, ResponseType>(
  apiRoute: string,
  params?: ParamsType
): Promise<ResponseType> {
  let fullUrl = apiRoute;

  if (params != null) {
    fullUrl += "?";

    Object.entries(params).forEach(([key, value], index) => {
      fullUrl += `${index === 0 ? "" : "&"}${key}=${encodeURIComponent(value)}`;
    });
  }

  const response = await fetch(`${API_URL}${fullUrl}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
    },
  });

  const json = await response.json();

  if (json == null) {
    throw new Error("Could not connect to API!");
  } else if (!json.success) {
    throw new Error(json.message);
  }

  return json.payload;
}

export async function apiPostRequest<BodyType, ResponseType>(
  apiRoute: string,
  body: BodyType
): Promise<ResponseType> {
  const response = await fetch(`${API_URL}${apiRoute}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  const json = await response.json();

  if (json == null) {
    throw new Error("Could not connect to API!");
  } else if (!json.success) {
    throw new Error(json.message);
  }

  return json.payload;
}
