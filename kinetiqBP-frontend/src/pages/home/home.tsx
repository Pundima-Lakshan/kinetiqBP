import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import { ReactRouterAppProvider } from '@toolpad/core/react-router';
import { SidebarFooterAccount, ToolbarAccount } from '@/components';
import { muiTheme } from '@/styles';
import { useAuthInitialization } from './auth-initialization.ts';
import { Outlet } from 'react-router';
import { brandiung, navigation } from '@/configs';
import { DialogsProvider, PageContainer } from '@toolpad/core';
import { CustomPageHeader } from '@/pages/home/page-header.tsx';
import { useAuth } from 'react-oidc-context';
import LinearProgress from '@mui/material/LinearProgress';
import { Button, Container } from '@mui/material';

export const Home = () => {
  const { authentication, session } = useAuthInitialization();
  const { user, isLoading, signinRedirect } = useAuth();

  if (isLoading) {
    return (
      <div style={{ width: '100%' }}>
        <LinearProgress />
      </div>
    );
  }

  if (!user) {
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
      <DashboardLayout defaultSidebarCollapsed slots={{ toolbarAccount: ToolbarAccount, sidebarFooter: SidebarFooterAccount }}>
        <PageContainer
          style={{ flex: 1, border: 0, maxWidth: '100%' }}
          slots={{
            header: CustomPageHeader,
          }}
        >
          <DialogsProvider>
            <Outlet />
          </DialogsProvider>
        </PageContainer>
      </DashboardLayout>
    </ReactRouterAppProvider>
  );
};
