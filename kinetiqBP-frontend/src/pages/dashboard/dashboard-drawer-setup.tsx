import { ContainerBox } from '@/components';
import { useDrawerStore, useDrawerStoreActions } from '@/store';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { Box, Drawer, IconButton, styled } from '@mui/material';
import { ReactNode } from 'react';

const DRAWER_WIDTH = 300;

interface DashboardDrawerSetupProps {
  main: ReactNode;
  drawerContent: ReactNode;
}

export const DashboardDrawerSetup = ({ main, drawerContent }: DashboardDrawerSetupProps) => {
  const { open } = useDrawerStore();
  const { handleDrawerClose } = useDrawerStoreActions();

  return (
    <ContainerBox>
      <Main open={open}>{main}</Main>
      <Drawer
        sx={{
          width: DRAWER_WIDTH,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: DRAWER_WIDTH,
          },
        }}
        variant="persistent"
        anchor="right"
        open={open}
      >
        <DrawerHeader />
        <Box>
          <IconButton onClick={handleDrawerClose}>
            <ChevronRightIcon />
          </IconButton>
        </Box>
        <ContainerBox>{drawerContent}</ContainerBox>
      </Drawer>
    </ContainerBox>
  );
};

const Main = styled('div', { shouldForwardProp: (prop) => prop !== 'open' })<{
  open?: boolean;
}>(({ theme }) => ({
  flexGrow: 1,
  height: '100%',
  width: '100%',
  backgroundColor: '#eceff1',
  padding: '10px',
  transition: theme.transitions.create('margin', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginRight: -DRAWER_WIDTH,
  /**
   * This is necessary to enable the selection of content. In the DOM, the stacking order is determined
   * by the order of appearance. Following this rule, elements appearing later in the markup will overlay
   * those that appear earlier. Since the Drawer comes after the Main content, this adjustment ensures
   * proper interaction with the underlying content.
   */
  position: 'relative',
  variants: [
    {
      props: ({ open }) => open,
      style: {
        transition: theme.transitions.create('margin', {
          easing: theme.transitions.easing.easeOut,
          duration: theme.transitions.duration.enteringScreen,
        }),
        marginRight: 0,
      },
    },
  ],
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-start',
}));
