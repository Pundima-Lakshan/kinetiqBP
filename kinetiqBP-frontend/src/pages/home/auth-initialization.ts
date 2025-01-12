import { useMemo, useState } from 'react';
import { Session } from '@toolpad/core/AppProvider';
import { useAuth } from 'react-oidc-context';
import { useNonInitialEffect } from '@/utils';

export const useAuthInitialization = () => {
  const { user, signinRedirect, removeUser } = useAuth();

  const getSession = () => {
    if (!user) {
      return null;
    }
    return {
      user: {
        name: user.profile.name,
        email: user.profile.email,
        image: user.profile.picture,
      },
    };
  };

  const [session, setSession] = useState<Session | null>(() => getSession());
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
  };
};
