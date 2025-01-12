import { envs } from '@/configs';
import { ComponentProps } from 'react';
import { AuthProvider } from 'react-oidc-context';
import { User } from 'oidc-client-ts';

export const oidcConfig: ComponentProps<typeof AuthProvider> = {
  authority: envs.VITE_KEYCLOAK_URL,
  client_id: envs.VITE_KEYCLOAK_CLIENT_ID,
  redirect_uri: window.location.origin,
  loadUserInfo: true,
  revokeTokensOnSignout: true,
  onSigninCallback: (_user: User | void): void => {
    window.history.replaceState({}, document.title, window.location.pathname);
  },
};
