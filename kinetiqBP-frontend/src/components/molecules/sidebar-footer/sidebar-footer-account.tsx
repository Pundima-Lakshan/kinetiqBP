import { useMemo } from 'react';
import { Account, AccountPreview, AccountPreviewProps, SidebarFooterProps } from '@toolpad/core';
import { Divider, Stack } from '@mui/material';

export const SidebarFooterAccount = ({ mini }: SidebarFooterProps) => {
  const PreviewComponent = useMemo(() => createPreviewComponent(mini), [mini]);
  return (
    <Account
      slots={{
        preview: PreviewComponent,
      }}
      slotProps={{
        popover: {
          transformOrigin: { horizontal: 'left', vertical: 'bottom' },
          anchorOrigin: { horizontal: 'right', vertical: 'bottom' },
          disableAutoFocus: true,
          slotProps: {
            paper: {
              elevation: 0,
              sx: {
                overflow: 'visible',
                filter: (theme) => `drop-shadow(0px 2px 8px ${theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.10)' : 'rgba(0,0,0,0.32)'})`,
                mt: 1,
                '&::before': {
                  content: '""',
                  display: 'block',
                  position: 'absolute',
                  bottom: 10,
                  left: 0,
                  width: 10,
                  height: 10,
                  bgcolor: 'background.paper',
                  transform: 'translate(-50%, -50%) rotate(45deg)',
                  zIndex: 0,
                },
              },
            },
          },
        },
      }}
    />
  );
};

const AccountSidebarPreview = (props: AccountPreviewProps & { mini: boolean }) => {
  const { handleClick, open, mini } = props;
  return (
    <Stack direction="column" p={0} overflow="hidden">
      <Divider />
      <AccountPreview variant={mini ? 'condensed' : 'expanded'} handleClick={handleClick} open={open} />
    </Stack>
  );
};

const createPreviewComponent = (mini: boolean) => {
  const PreviewComponent = (props: AccountPreviewProps) => {
    return <AccountSidebarPreview {...props} mini={mini} />;
  };

  return PreviewComponent;
};
