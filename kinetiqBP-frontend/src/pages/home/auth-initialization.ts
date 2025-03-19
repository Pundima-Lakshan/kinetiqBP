import { getEnvs } from '@/env';
import { useNonInitialEffect } from '@/utils';
import { Session } from '@toolpad/core/AppProvider';
import { useMemo, useState } from 'react';
import { useAuth } from 'react-oidc-context';

export interface KbpSession extends Session {
  permissions: {
    roles: string[];
    groups: string[];
  };
}

export const useAuthInitialization = () => {
  const { user, signinRedirect, removeUser, isLoading } = useAuth();

  const getSession = () => {
    if (getEnvs().VITE_NO_AUTH) {
      return {
        user: {
          id: 'dummyId',
          name: 'dummy',
          email: 'dummy@gmail.com',
        },
        permissions: {
          roles: [],
          groups: [],
        },
      };
    }
    if (!user) {
      return null;
    }
    return {
      user: {
        id: user.profile.sub,
        name: user.profile.name,
        email: user.profile.email,
        image: user.profile.picture,
      },
      permissions: {
        roles: user.scopes,
        groups: user.scopes,
      },
    };
  };

  const [session, setSession] = useState<KbpSession | null>(() => getSession());
  useNonInitialEffect(() => {
    setSession(getSession());
  }, [user]);

  const authentication = useMemo(() => {
    return {
      signIn: () => {
        void signinRedirect();
      },
      signOut: () => {
        void removeUser();
      },
    };
  }, []);

  return {
    session,
    authentication,
    user,
    isLoading,
    signinRedirect,
  };
};
