import { SidebarFooterAccount, ToolbarAccount } from '@/components';
import { brandiung, navigation } from '@/configs';
import { getEnvs } from '@/env.ts';
import { AsyncStateObservers } from '@/observers/index.ts';
import { KBPPageHeader } from '@/pages/home/page-header.tsx';
import { muiTheme } from '@/styles';
import { Button, Container } from '@mui/material';
import LinearProgress from '@mui/material/LinearProgress';
import { DialogsProvider, PageContainer } from '@toolpad/core';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import { ReactRouterAppProvider } from '@toolpad/core/react-router';
import { Outlet } from 'react-router';
import { useAuthInitialization } from './auth-initialization.ts';

export const Home = () => {
  const { authentication, session, user, isLoading, signinRedirect } = useAuthInitialization();

  if (isLoading) {
    return (
      <div style={{ width: '100%' }}>
        <LinearProgress />
      </div>
    );
  }

  if (!user && !getEnvs().VITE_NO_AUTH) {
    return (
      <Container
        style={{
          display: 'flex',
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
          height: '100%',
        }}
      >
        <Button onClick={() => void signinRedirect()} variant="contained">
          Log in
        </Button>
      </Container>
    );
  }

  return (
    <ReactRouterAppProvider navigation={navigation} branding={brandiung} theme={muiTheme} authentication={authentication} session={session}>
      <DashboardLayout defaultSidebarCollapsed sx={{ height: '100%', width: '100%' }}>
        <PageContainer
          style={{ display: 'flex', flex: 1, border: 0, maxWidth: '100%', width: '100%', maxHeight: '100%', height: '100%', overflow: 'hidden' }}
          id="page-container"
          slots={{
            header: KBPPageHeader,
          }}
        >
          <DialogsProvider>
            <AsyncStateObservers />
            <Outlet />
          </DialogsProvider>
        </PageContainer>
      </DashboardLayout>
    </ReactRouterAppProvider>
  );
};
