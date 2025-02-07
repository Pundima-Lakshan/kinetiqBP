const handleResponse = async <T>(url: string, requestOption: RequestInit) => {
  const response = await fetch(url, requestOption);
  if (!response.ok) {
    throw {
      status: response.status,
      statusText: response.statusText,
      content: await response.json(),
    };
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

const makeRequest = async <T>(url: string, requestOption: RequestInit) => {
  const options: RequestInit = {
    ...requestOption,
    headers: {
      Authorization: `Bearer ${getAccessToken()}`,
    },
  };
  return await handleResponse<T>(url, options);
};

export const get = async <T>(url: string, queries?: Array<Record<string, string>>) => {
  const urlQuery = queries?.map((query) => `${Object.keys(query)[0]}=${Object.values(query)[0]}`).join('&');
  const urlWithQuery = urlQuery ? `${url}?${urlQuery}` : url;
  return await makeRequest<T>(urlWithQuery, { method: 'GET' });
};

export const post = async <T, R = unknown>(url: string, data: R) =>
  await makeRequest<T>(url, {
    method: 'POST',
    body: JSON.stringify(data),
  });

export const postFormData = async <T>(url: string, data: FormData) =>
  await makeRequest<T>(url, {
    method: 'POST',
    body: data,
  });

export const put = async <T, R>(url: string, data: R) =>
  await makeRequest<T>(url, {
    method: 'PUT',
    body: JSON.stringify(data),
  });

export const remove = async <T>(url: string) => await makeRequest<T>(url, { method: 'DELETE' });

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
