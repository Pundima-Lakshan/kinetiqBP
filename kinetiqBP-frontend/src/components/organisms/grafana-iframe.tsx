import { getEnvs } from '@/env';

export const GrafanaIframe = () => {
  return <iframe src={getEnvs().VITE_GRAFANA_SRC} width="100%" height="100%" style={{ margin: 0, padding: 0, border: 'none' }} />;
};
