import { KBPDataGrid } from '@/components/atoms';
import type { FlowableUser } from '@/services';
import DeleteIcon from '@mui/icons-material/Delete';
import OpenInFullIcon from '@mui/icons-material/OpenInFull';
import { Button, IconButton } from '@mui/material';
import type { GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import { useDialogs } from '@toolpad/core';
import { useState } from 'react';
import { ViewUserDialog } from './view-user-dialog';

type UsersRowModel = FlowableUser;

interface UsersGridProps {
  data: UsersRowModel[];
  loading: boolean;
}

export const UsersGrid = ({ data, loading }: UsersGridProps) => {
  const [columns] = useState<GridColDef<UsersRowModel>[]>(() => {
    return [
      { field: 'firstName', headerName: 'First Name', description: 'First name of the user', flex: 1, minWidth: 150 },
      { field: 'lastName', headerName: 'Last Name', description: 'Last name of the user', flex: 1, minWidth: 150 },
      { field: 'email', headerName: 'Email', description: 'Email of the user', flex: 1.5, minWidth: 150 },
      {
        field: 'delete',
        headerName: '',
        description: 'Delete this workflow definition',
        flex: 0.3,
        minWidth: 100,
        align: 'center',
        renderCell: RemoveUser,
      },
      {
        field: 'more',
        headerName: '',
        description: 'Additional actions or information',
        flex: 0.2,
        minWidth: 60,
        align: 'right',
        renderCell: ShowMoreActions,
      },
    ];
  });

  return <KBPDataGrid rows={data} columns={columns} loading={loading} />;
};

const ShowMoreActions = (params: GridRenderCellParams<UsersRowModel>) => {
  const dialogs = useDialogs();
  return (
    <IconButton
      aria-label="more"
      color="primary"
      size="small"
      tabIndex={params.hasFocus ? 0 : -1}
      onClick={() => {
        dialogs.open(ViewUserDialog, { userId: params.row.id });
      }}
    >
      <OpenInFullIcon />
    </IconButton>
  );
};

const RemoveUser = (params: GridRenderCellParams<UsersRowModel>) => {
  return (
    <Button variant="text" color="error" size="small" tabIndex={params.hasFocus ? 0 : -1} disabled>
      <DeleteIcon color="disabled" />
    </Button>
  );
};
