import { API_URL } from "../constants/api";

export async function apiGetRequest<ParamsType, ResponseType>(
  apiRoute: string,
  params?: ParamsType,
  token?: string
): Promise<ResponseType> {
  let fullUrl = apiRoute;

  if (params != null) {
    fullUrl += "?";

    Object.entries(params).forEach(([key, value], index) => {
      fullUrl += `${index === 0 ? "" : "&"}${key}=${encodeURIComponent(value)}`;
    });
  }

  const withToken =
    token == null ? "" : `${apiRoute === fullUrl ? "?" : "&"}token=${token}`;

  const response = await fetch(`${API_URL}${fullUrl}${withToken}`, {
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
  body: BodyType,
  token?: string
): Promise<ResponseType> {
  const response = await fetch(
    `${API_URL}${apiRoute}${token != null && `?token=${token}`}`,
    {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    }
  );

  const json = await response.json();

  if (json == null) {
    throw new Error("Could not connect to API!");
  } else if (!json.success) {
    throw new Error(json.message);
  }

  return json.payload;
}

export async function apiPatchRequest<BodyType, ResponseType>(
  apiRoute: string,
  body: BodyType,
  token?: string
): Promise<ResponseType> {
  const response = await fetch(
    `${API_URL}${apiRoute}${token != null && `?token=${token}`}`,
    {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    }
  );

  const json = await response.json();

  if (json == null) {
    throw new Error("Could not connect to API!");
  } else if (!json.success) {
    throw new Error(json.message);
  }

  return json.payload;
}

export async function apiPutRequest<BodyType>(
  apiRoute: string,
  body: BodyType,
  token?: string
): Promise<void> {
  const response = await fetch(
    `${API_URL}${apiRoute}${token != null && `?token=${token}`}`,
    {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    }
  );

  if (!response.ok) {
    throw new Error(response.statusText);
  }
}

export async function apiDeleteRequest<BodyType, ResponseType>(
  apiRoute: string,
  body: BodyType,
  token?: string
): Promise<ResponseType> {
  const response = await fetch(
    `${API_URL}${apiRoute}${token != null && `?token=${token}`}`,
    {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    }
  );

  const json = await response.json();

  if (json == null) {
    throw new Error("Could not connect to API!");
  } else if (!json.success) {
    throw new Error(json.message);
  }

  return json.payload;
}
