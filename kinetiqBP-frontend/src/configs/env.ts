const PlaceholderEnvs = {
  VITE_GRAFANA_SRC: '',
  VITE_KEYCLOAK_URL: '',
  VITE_KEYCLOAK_REALM: '',
  VITE_KEYCLOAK_CLIENT_ID: '',
  DEV: false,
};

const envs = {
  VITE_GRAFANA_SRC: import.meta.env.VITE_GRAFANA_SRC,
  VITE_KEYCLOAK_URL: import.meta.env.VITE_KEYCLOAK_URL,
  VITE_KEYCLOAK_REALM: import.meta.env.VITE_KEYCLOAK_REALM,
  VITE_KEYCLOAK_CLIENT_ID: import.meta.env.VITE_KEYCLOAK_CLIENT_ID,
  DEV: import.meta.env.DEV,
};

const validateEnvs = () => {
  const placeholderEnvKeys = Object.keys(PlaceholderEnvs) as Array<keyof typeof PlaceholderEnvs>;

  let errors = '';
  placeholderEnvKeys.forEach((key) => {
    if (envs[key] == null) {
      errors += `${key} is missing from environment variables \n`;
    }
  });

  if (errors.length > 0) {
    throw Error(errors);
  }
};

validateEnvs();

export { envs };
