import { API_URL } from "../constants/api";

const isEmpty = (str?: string): boolean => str == null || str.length === 0;

const generateUrl = ({
  apiRoute,
  params,
  token,
}: {
  apiRoute: string;
  params?: Record<string, any>;
  token?: string;
}): string => {
  let fullUrl = `${API_URL}${apiRoute}`;

  if (params != null && Object.keys(params).length > 0 && !isEmpty(token)) {
    Object.entries(params).forEach(([key, value], index) => {
      fullUrl += `${index === 0 ? "" : "&"}${key}=${encodeURIComponent(value)}`;
    });

    fullUrl += `&token=${token}`;
  } else if (!isEmpty(token)) {
    fullUrl += `?token=${token}`;
  }

  return fullUrl;
};

export async function apiGetRequest<ParamsType, ResponseType>(
  apiRoute: string,
  params?: ParamsType,
  token?: string
): Promise<ResponseType> {
  const response = await fetch(generateUrl({ apiRoute, params, token }), {
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
  const response = await fetch(generateUrl({ apiRoute, token }), {
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

export async function apiPatchRequest<BodyType, ResponseType>(
  apiRoute: string,
  body: BodyType,
  token?: string
): Promise<ResponseType> {
  const response = await fetch(generateUrl({ apiRoute, token }), {
    method: "PATCH",
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

export async function apiPutRequest<BodyType>(
  apiRoute: string,
  body: BodyType,
  token?: string
): Promise<void> {
  const response = await fetch(generateUrl({ apiRoute, token }), {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    throw new Error(response.statusText);
  }
}

export async function apiDeleteRequest<BodyType, ResponseType>(
  apiRoute: string,
  body: BodyType,
  token?: string
): Promise<ResponseType> {
  const response = await fetch(generateUrl({ apiRoute, token }), {
    method: "DELETE",
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
