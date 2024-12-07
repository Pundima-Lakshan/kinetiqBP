import { Avatar, Divider, ListItemIcon, ListItemText, MenuItem, MenuList, Stack, Typography } from '@mui/material';
import { AccountPopoverFooter, SignOutButton } from '@toolpad/core';

const accounts = [
  {
    id: 1,
    name: 'Pundima Lakshan',
    email: 'pundimal@gmail.com',
    image: 'https://avatars.githubusercontent.com/u/111065950',
    projects: [
      {
        id: 3,
        title: 'Project X',
      },
    ],
  },
  {
    id: 2,
    name: 'Enko TT',
    email: 'enkott@mui.com',
    color: '#8B4513',
    projects: [{ id: 4, title: 'Project A' }],
  },
];

export const SidebarFooterAccountPopover = () => {
  return (
    <Stack direction="column">
      <Typography variant="body2" mx={2} mt={1}>
        Accounts
      </Typography>
      <MenuList>
        {accounts.map((account) => (
          <MenuItem
            key={account.id}
            component="button"
            sx={{
              justifyContent: 'flex-start',
              width: '100%',
              columnGap: 2,
            }}
          >
            <ListItemIcon>
              <Avatar
                sx={{
                  width: 32,
                  height: 32,
                  fontSize: '0.95rem',
                  bgcolor: account.color,
                }}
                src={account.image ?? ''}
                alt={account.name ?? ''}
              >
                {account.name[0]}
              </Avatar>
            </ListItemIcon>
            <ListItemText
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                width: '100%',
              }}
              primary={account.name}
              secondary={account.email}
              primaryTypographyProps={{ variant: 'body2' }}
              secondaryTypographyProps={{ variant: 'caption' }}
            />
          </MenuItem>
        ))}
      </MenuList>
      <Divider />
      <AccountPopoverFooter>
        <SignOutButton />
      </AccountPopoverFooter>
    </Stack>
  );
};
