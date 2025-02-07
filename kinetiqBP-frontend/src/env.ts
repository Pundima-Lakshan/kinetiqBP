const PlaceholderEnvs = {
  VITE_GRAFANA_SRC: '',
  VITE_KEYCLOAK_URL: '',
  VITE_KEYCLOAK_REALM: '',
  VITE_KEYCLOAK_CLIENT_ID: '',
  DEV: false,
  VITE_NO_AUTH: false,
  VITE_BASE_BE_URL: '',
  VITE_UI_SERVICE_NAME: '',
  VITE_FLOWABLE_REST_NAME: '',
  VITE_UI_SERVICE_URL: '',
  VITE_FLOWABLE_REST_URL: '',
};

export const getEnvs = () => {
  const envs = {
    VITE_GRAFANA_SRC: import.meta.env.VITE_GRAFANA_SRC,
    VITE_KEYCLOAK_URL: import.meta.env.VITE_KEYCLOAK_URL,
    VITE_KEYCLOAK_REALM: import.meta.env.VITE_KEYCLOAK_REALM,
    VITE_KEYCLOAK_CLIENT_ID: import.meta.env.VITE_KEYCLOAK_CLIENT_ID,
    DEV: Boolean(import.meta.env.DEV),
    VITE_NO_AUTH: import.meta.env.VITE_NO_AUTH === 'true',
    VITE_BASE_BE_URL: import.meta.env.VITE_BASE_BE_URL,
    VITE_UI_SERVICE_NAME: import.meta.env.VITE_UI_SERVICE_NAME,
    VITE_FLOWABLE_REST_NAME: import.meta.env.VITE_FLOWABLE_REST_NAME,
    VITE_UI_SERVICE_URL: import.meta.env.VITE_BASE_BE_URL + import.meta.env.VITE_UI_SERVICE_NAME,
    VITE_FLOWABLE_REST_URL: import.meta.env.VITE_BASE_BE_URL + import.meta.env.VITE_FLOWABLE_REST_NAME,
  } as typeof PlaceholderEnvs;

  return envs;
};

export const validateEnvs = () => {
  const placeholderEnvKeys = Object.keys(PlaceholderEnvs) as Array<keyof typeof PlaceholderEnvs>;

  let errors = '';
  placeholderEnvKeys.forEach((key) => {
    if (getEnvs()[key] == null) {
      errors += `${key} is missing from environment variables \n`;
    }
  });

  if (errors.length > 0) {
    throw Error(errors);
  }
};
