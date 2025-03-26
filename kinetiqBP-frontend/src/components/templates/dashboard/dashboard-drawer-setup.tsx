import { ContainerBox } from '@/components';
import { useDrawerStore, useDrawerStoreActions } from '@/store';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { Box, Drawer, IconButton, styled } from '@mui/material';
import { ReactNode } from 'react';

const DRAWER_WIDTH = 400;

interface DashboardDrawerSetupProps {
  main: ReactNode;
  drawerContent: ReactNode;
}

export const DashboardDrawerSetup = ({ main, drawerContent }: DashboardDrawerSetupProps) => {
  const open = useDrawerStore((state) => state.open);
  const { handleDrawerClose } = useDrawerStoreActions();

  return (
    <>
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
    </>
  );
};

const Main = styled('div', {
  shouldForwardProp: (prop) => {
    return prop !== 'open';
  },
})<{
  open?: boolean;
}>(({ theme }) => ({
  flexGrow: 1,
  height: '100%',
  width: '100%',
  padding: '10px',
  backgroundColor: '#eceff1',
  transition: theme.transitions.create('padding', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
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
        transition: theme.transitions.create('padding', {
          easing: theme.transitions.easing.easeOut,
          duration: theme.transitions.duration.enteringScreen,
        }),
        paddingRight: DRAWER_WIDTH,
      },
    },
  ],
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-start',
}));
