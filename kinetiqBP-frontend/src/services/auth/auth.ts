import { getEnvs } from '@/env';
import { User } from 'oidc-client-ts';
import { ComponentProps } from 'react';
import { AuthProvider } from 'react-oidc-context';

export const oidcConfig: ComponentProps<typeof AuthProvider> = {
  authority: getEnvs().VITE_KEYCLOAK_URL,
  client_id: getEnvs().VITE_KEYCLOAK_CLIENT_ID,
  redirect_uri: window.location.toString(),
  loadUserInfo: true,
  revokeTokensOnSignout: true,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  onSigninCallback: (_user: User | void): void => {
    window.history.replaceState({}, document.title, window.location.pathname);
  },
};
