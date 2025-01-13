import { KBPDataGrid, WorkflowMoreDialog, WorkflowStartDialog } from '@/components';
import { useState } from 'react';
import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import { Button, IconButton } from '@mui/material';
import OpenInFullIcon from '@mui/icons-material/OpenInFull';
import { useDialogs } from '@toolpad/core';

export interface TasksRowModel {
  id: string;
  name: string;
  description: string;
  version: string;
  created: string;
  modified: string;
}

const StartWorkflowInstance = (params: GridRenderCellParams<TasksRowModel>) => {
  const dialogs = useDialogs();
  return (
    <Button
      variant="contained"
      size="small"
      tabIndex={params.hasFocus ? 0 : -1}
      onClick={() => {
        void dialogs.open(WorkflowStartDialog, params);
      }}
    >
      Start
    </Button>
  );
};

const ShowMoreActions = (params: GridRenderCellParams<TasksRowModel>) => {
  const dialogs = useDialogs();
  return (
    <IconButton
      aria-label="more"
      color="primary"
      size="small"
      tabIndex={params.hasFocus ? 0 : -1}
      onClick={() => {
        void dialogs.open(WorkflowMoreDialog, params);
      }}
    >
      <OpenInFullIcon />
    </IconButton>
  );
};

interface TasksGridProps {
  data: TasksRowModel[];
}

export const TasksGrid = ({ data }: TasksGridProps) => {
  const [columns] = useState<GridColDef[]>(() => {
    return [
      { field: 'id', headerName: 'ID', description: 'Unique identifier for the workflow', flex: 1, minWidth: 100 },
      { field: 'name', headerName: 'Name', description: 'Name of the workflow', flex: 1, minWidth: 150 },
      {
        field: 'description',
        headerName: 'Description',
        description: 'Detailed description of the workflow',
        flex: 2,
        minWidth: 200,
      },
      {
        field: 'version',
        headerName: 'Version',
        description: 'Version number of the workflow',
        flex: 1,
        minWidth: 100,
      },
      {
        field: 'created',
        headerName: 'Created',
        description: 'Creation date of the workflow',
        flex: 1,
        minWidth: 150,
      },
      {
        field: 'modified',
        headerName: 'Modified',
        description: 'Last modification date of the workflow',
        flex: 1,
        minWidth: 150,
      },
      {
        field: 'start',
        headerName: '',
        description: 'Create an instance from this definition',
        flex: 0.3,
        minWidth: 100,
        align: 'center',
        renderCell: StartWorkflowInstance,
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

  return <KBPDataGrid rows={data} columns={columns} />;
};
