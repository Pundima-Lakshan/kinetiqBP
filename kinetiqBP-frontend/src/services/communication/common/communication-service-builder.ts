type ResponseType = 'json' | 'blob' | 'text' | 'none';

const handleResponse = async <T>(url: string, requestOption: RequestInit, responseType: ResponseType = 'json') => {
  const response = await fetch(url, requestOption);
  if (!response.ok) {
    throw {
      status: response.status,
      statusText: response.statusText,
      content: await response.json(),
    };
  }
  if (responseType === 'none') {
    return null as T;
  }
  if (responseType === 'text') {
    return (await response.text()) as T;
  }
  return (await response.json()) as T;
};

const getAccessToken = () => {
  const session_item = window.sessionStorage.getItem('oidc.user:http://localhost:14403/realms/kinetiqBP:kinetiqBP-App');
  if (!session_item) {
    throw new Error('No session item found');
  }
  const access_token_string = JSON.parse(session_item).access_token;
  if (!access_token_string) {
    throw new Error('No access token found');
  }
  return access_token_string;
};

const makeRequest = async <T>(url: string, requestOption: RequestInit, responseType: ResponseType = 'json') => {
  const options: RequestInit = {
    ...requestOption,
    headers: {
      Authorization: `Bearer ${getAccessToken()}`,
      'Content-Type': 'application/json',
    },
  };
  return await handleResponse<T>(url, options, responseType);
};

const makeFormRequest = async <T>(url: string, requestOption: RequestInit) => {
  const options: RequestInit = {
    ...requestOption,
    headers: {
      Authorization: `Bearer ${getAccessToken()}`,
    },
  };
  return await handleResponse<T>(url, options);
};

interface CommonOptions {
  queries?: Array<Record<string, string>>;
  responseType?: ResponseType;
}

export const get = async <T>(url: string, options?: CommonOptions) => {
  const { queries, responseType } = options ?? {};
  const urlQuery = queries?.map((query) => `${Object.keys(query)[0]}=${Object.values(query)[0]}`).join('&');
  const urlWithQuery = urlQuery ? `${url}?${urlQuery}` : url;
  return await makeRequest<T>(urlWithQuery, { method: 'GET' }, responseType);
};

export const post = async <T, R = unknown>(url: string, data: R, options?: CommonOptions) => {
  const { responseType } = options ?? {};
  return await makeRequest<T>(
    url,
    {
      method: 'POST',
      body: JSON.stringify(data),
    },
    responseType,
  );
};

export const postFormData = async <T>(url: string, data: FormData) =>
  await makeFormRequest<T>(url, {
    method: 'POST',
    body: data,
  });

export const put = async <T, R = unknown>(url: string, data: R) => {
  return await makeRequest<T>(url, {
    method: 'PUT',
    body: JSON.stringify(data),
  });
};

export const remove = async <T>(url: string, options?: CommonOptions) => {
  const { queries, responseType } = options ?? {};
  const urlQuery = queries?.map((query) => `${Object.keys(query)[0]}=${Object.values(query)[0]}`).join('&');
  const urlWithQuery = urlQuery ? `${url}?${urlQuery}` : url;
  return await makeRequest<T>(urlWithQuery, { method: 'DELETE' }, responseType);
};

export const getBlob = async <T>(url: string, options: RequestInit = {}) => {
  const response = await fetch(url, {
    method: 'GET',
    credentials: 'include',
    ...options,
  });

  if (!response.ok) {
    throw new Error('Network response was not ok');
  }

  return (await response.blob()) as T;
};
