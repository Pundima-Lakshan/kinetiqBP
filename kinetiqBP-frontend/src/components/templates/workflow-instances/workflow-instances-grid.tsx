import { KBPDataGrid, StatusIcon } from '@/components';
import { browserRoutesCollection, getPath } from '@/configs';
import type { UiServiceUser, WorkFlowInstance } from '@/services';
import { dateToString, getUiServiceUserFullName } from '@/utils';
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';
import DeleteIcon from '@mui/icons-material/Delete';
import { Button, IconButton } from '@mui/material';
import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import { useDialogs } from '@toolpad/core';
import { useState } from 'react';
import { Link } from 'react-router';
import { RemoveProcessInstanceDialog } from './remove-process-instance-dialog';

export type WorkflowInstancesRowModel = WorkFlowInstance & {
  startedUser?: UiServiceUser;
};

const ShowMoreActions = (params: GridRenderCellParams<WorkflowInstancesRowModel>) => {
  const linkTo = `${getPath(browserRoutesCollection.WorkflowInstances.segment)}/${params.row.processDefinitionId}/${params.row.id}`;
  return (
    <Link to={linkTo}>
      <IconButton aria-label="more" color="primary" size="small" tabIndex={params.hasFocus ? 0 : -1}>
        <ArrowOutwardIcon />
      </IconButton>
    </Link>
  );
};

const RemoveFormDefinition = (params: GridRenderCellParams<WorkflowInstancesRowModel>) => {
  const dialogs = useDialogs();
  return (
    <Button
      variant="text"
      color="error"
      size="small"
      tabIndex={params.hasFocus ? 0 : -1}
      onClick={() => {
        void dialogs.open(RemoveProcessInstanceDialog, { processInstanceId: params.row.id });
      }}
    >
      <DeleteIcon color="error" />
    </Button>
  );
};

interface WorkflowInstancesGridProps {
  data: WorkflowInstancesRowModel[];
  isLoading: boolean;
}

export const WorkflowInstancesGrid = ({ data, isLoading }: WorkflowInstancesGridProps) => {
  const [columns] = useState<GridColDef<WorkflowInstancesRowModel>[]>(() => {
    return [
      {
        field: 'processDefinitionName',
        headerName: 'Workflow definition name',
        description: 'Name of the the process definition of the process instance',
        flex: 2,
        minWidth: 200,
      },
      {
        field: 'startTime',
        headerName: 'Started time',
        description: 'Creation date of the process',
        flex: 2.5,
        minWidth: 150,
        valueFormatter: dateToString,
      },
      {
        field: 'startedUser',
        headerName: 'Started User',
        description: 'Workflow instance initiated user',
        flex: 1,
        minWidth: 100,
        valueFormatter: getUiServiceUserFullName,
      },
      {
        field: 'suspended',
        headerName: 'Is suspended',
        flex: 1,
        minWidth: 150,
        align: 'center',
        headerAlign: 'center',
        renderCell: (params: GridRenderCellParams<WorkflowInstancesRowModel>) => <StatusIcon status={params.row.suspended ? 'done' : 'not'} />,
      },
      {
        field: 'ended',
        headerName: 'Is ended',
        flex: 1,
        minWidth: 150,
        align: 'center',
        headerAlign: 'center',
        renderCell: (params: GridRenderCellParams<WorkflowInstancesRowModel>) => <StatusIcon status={params.row.ended ? 'done' : 'not'} />,
      },
      {
        field: 'remove',
        headerName: '',
        description: 'Remove process instance',
        flex: 0.3,
        minWidth: 100,
        align: 'center',
        renderCell: RemoveFormDefinition,
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

  return <KBPDataGrid rows={data} columns={columns} loading={isLoading} />;
};
