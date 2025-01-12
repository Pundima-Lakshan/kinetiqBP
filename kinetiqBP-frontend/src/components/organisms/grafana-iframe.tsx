import { envs } from '@/configs';

export const GrafanaIframe = () => {
  return <iframe src={envs.VITE_GRAFANA_SRC} width="100%" height="100%" style={{ margin: 0, padding: 0, border: 'none' }} />;
};
