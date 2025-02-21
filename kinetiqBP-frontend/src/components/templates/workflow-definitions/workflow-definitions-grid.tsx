import { KBPDataGrid, ViewWorkflowDefinitionDialog, WorkflowStartDialog } from '@/components';
import type { WorkFlowDefinition } from '@/services';
import OpenInFullIcon from '@mui/icons-material/OpenInFull';
import { Button, IconButton } from '@mui/material';
import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import { useDialogs } from '@toolpad/core';
import { useState } from 'react';

export type WorkflowDefinitionsRowModel = WorkFlowDefinition;

const StartWorkflowInstance = (params: GridRenderCellParams<WorkflowDefinitionsRowModel>) => {
  const dialogs = useDialogs();
  return (
    <Button
      variant="text"
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

const ShowMoreActions = (params: GridRenderCellParams<WorkflowDefinitionsRowModel>) => {
  const dialogs = useDialogs();
  return (
    <IconButton
      aria-label="more"
      color="primary"
      size="small"
      tabIndex={params.hasFocus ? 0 : -1}
      onClick={() => {
        void dialogs.open(ViewWorkflowDefinitionDialog, params.row.id);
      }}
    >
      <OpenInFullIcon />
    </IconButton>
  );
};

interface WorkflowDefinitionsGridProps {
  data: WorkflowDefinitionsRowModel[];
  loading: boolean;
}

export const WorkflowDefinitionsGrid = ({ data, loading }: WorkflowDefinitionsGridProps) => {
  const [columns] = useState<GridColDef[]>(() => {
    return [
      { field: 'name', headerName: 'Name', description: 'Name of the workflow', flex: 1, minWidth: 150 },
      {
        field: 'description',
        headerName: 'Description',
        description: 'Detailed description of the workflow',
        flex: 1,
        minWidth: 200,
      },
      {
        field: 'category',
        headerName: 'Category',
        description: 'Cateogry of the workflow',
        flex: 1.5,
        minWidth: 150,
      },
      {
        field: 'suspended',
        headerName: 'Suspended',
        description: 'Whether the workflow is suspended',
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

  return <KBPDataGrid rows={data} columns={columns} loading={loading} />;
};
