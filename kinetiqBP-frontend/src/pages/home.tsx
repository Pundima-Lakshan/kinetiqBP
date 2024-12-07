import Box from '@mui/material/Box';
import { createTheme } from '@mui/material/styles';
import DashboardIcon from '@mui/icons-material/Dashboard';
import BarChartIcon from '@mui/icons-material/BarChart';
import AssignmentIcon from '@mui/icons-material/Assignment';
import TaskIcon from '@mui/icons-material/Task';
import DescriptionIcon from '@mui/icons-material/Description';
import LayersIcon from '@mui/icons-material/Layers';
import PendingActionsIcon from '@mui/icons-material/PendingActions';
import { AppProvider, type Navigation, Session } from '@toolpad/core/AppProvider';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import { useDemoRouter } from '@toolpad/core/internal';
import { Forms } from './forms.tsx';
import { SidebarFooterAccount } from '../components/sidebar-footer-account.tsx';
import { useMemo, useState } from 'react';

const NAVIGATION: Navigation = [
  {
    kind: 'header',
    title: 'Main items',
  },
  {
    segment: 'dashboard',
    title: 'Dashboard',
    icon: <DashboardIcon />,
  },
  {
    segment: 'tasks',
    title: 'Tasks',
    icon: <AssignmentIcon />,
    children: [
      {
        segment: 'pending',
        title: 'Pending',
        icon: <PendingActionsIcon />,
      },
      {
        segment: 'completed',
        title: 'Completed',
        icon: <TaskIcon />,
      },
    ],
  },
  {
    kind: 'divider',
  },
  {
    kind: 'header',
    title: 'Analytics',
  },
  {
    segment: 'reports',
    title: 'Reports',
    icon: <BarChartIcon />,
    children: [
      {
        segment: 'completions',
        title: 'Completions',
        icon: <DescriptionIcon />,
      },
      {
        segment: 'heatmap',
        title: 'Heatmap',
        icon: <DescriptionIcon />,
      },
    ],
  },
  {
    segment: 'integrations',
    title: 'Integrations',
    icon: <LayersIcon />,
  },
];

const demoTheme = createTheme({
  cssVariables: {
    colorSchemeSelector: 'data-toolpad-color-scheme',
  },
  colorSchemes: { light: true, dark: false },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 600,
      lg: 1200,
      xl: 1536,
    },
  },
});

const demoSession = {
  user: {
    name: 'Pundima Lakshan',
    email: 'pundimal@gmail.com',
    image: 'https://avatars.githubusercontent.com/u/111065950',
  },
};

function DemoPageContent({ pathname }: { pathname: string }) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        height: '100%',
      }}
      className={'demo-page-content'}
    >
      <Forms />
    </Box>
  );
}

interface DemoProps {
  /**
   * Injected by the documentation to work in an iframe.
   * Remove this when copying and pasting into your project.
   */
  window?: () => Window;
}

export const Home = (props: DemoProps) => {
  const { window } = props;

  const router = useDemoRouter('/dashboard');

  // Remove this const when copying and pasting into your project.
  const demoWindow = window !== undefined ? window() : undefined;

  const [session, setSession] = useState<Session | null>(demoSession);
  const authentication = useMemo(() => {
    return {
      signIn: () => {
        setSession(demoSession);
      },
      signOut: () => {
        setSession(null);
      },
    };
  }, []);

  return (
    <AppProvider
      navigation={NAVIGATION}
      branding={{
        logo: <></>,
        title: 'kinetiqBP',
      }}
      router={router}
      theme={demoTheme}
      window={demoWindow}
      authentication={authentication}
      session={session}
    >
      <DashboardLayout defaultSidebarCollapsed slots={{ toolbarAccount: () => null, sidebarFooter: SidebarFooterAccount }}>
        <DemoPageContent pathname={router.pathname} />
      </DashboardLayout>
    </AppProvider>
  );
};
