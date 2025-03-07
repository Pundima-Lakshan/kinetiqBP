import { KBPDataGrid, StatusIcon } from '@/components';
import { browserRoutesCollection, getPath } from '@/configs';
import type { HistoricWorkflowInstance, UiServiceUser } from '@/services';
import { dateToString, getUiUserFullName } from '@/utils';
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';
import DeleteIcon from '@mui/icons-material/Delete';
import { Button, IconButton } from '@mui/material';
import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import { useDialogs } from '@toolpad/core';
import { useState } from 'react';
import { Link } from 'react-router';
import { RemoveHistoricProcessInstanceDialog } from './remove-historic-process-instance-dialog';

export type WorkflowHistoricInstancesRowModel = HistoricWorkflowInstance & {
  startedUser?: UiServiceUser;
};

const ShowMoreActions = (params: GridRenderCellParams<WorkflowHistoricInstancesRowModel>) => {
  const linkTo = `${getPath(browserRoutesCollection.WorkflowInstances.segment)}/${params.row.processDefinitionId}/${params.row.id}`;
  return (
    <Link to={linkTo}>
      <IconButton aria-label="more" color="primary" size="small" tabIndex={params.hasFocus ? 0 : -1}>
        <ArrowOutwardIcon />
      </IconButton>
    </Link>
  );
};

const RemoveFormDefinition = (params: GridRenderCellParams<WorkflowHistoricInstancesRowModel>) => {
  const dialogs = useDialogs();
  return (
    <Button
      variant="text"
      color="error"
      size="small"
      tabIndex={params.hasFocus ? 0 : -1}
      onClick={() => {
        void dialogs.open(RemoveHistoricProcessInstanceDialog, { processInstanceId: params.row.id });
      }}
    >
      <DeleteIcon color="error" />
    </Button>
  );
};

interface WorkflowHistoricInstancesGridProps {
  data: WorkflowHistoricInstancesRowModel[];
  isLoading: boolean;
}

export const WorkflowHistoricInstancesGrid = ({ data, isLoading }: WorkflowHistoricInstancesGridProps) => {
  const [columns] = useState<GridColDef<WorkflowHistoricInstancesRowModel>[]>(() => {
    return [
      { field: 'id', headerName: 'Workflow Instance Id', description: 'Workflow Instance Id', flex: 2, minWidth: 200 },
      {
        field: 'processDefinitionName',
        headerName: 'Workflow definition name',
        description: 'Name of the the process definition of the process instance',
        flex: 1.5,
        minWidth: 200,
      },
      {
        field: 'startTime',
        headerName: 'Started time',
        description: 'Creation date of the process',
        flex: 2.2,
        minWidth: 150,
        valueFormatter: dateToString,
      },
      {
        field: 'endTime',
        headerName: 'End time',
        description: 'End date of the process',
        flex: 2.2,
        minWidth: 150,
        valueFormatter: dateToString,
      },
      {
        field: 'startedUser',
        headerName: 'Started User',
        description: 'Workflow instance initiated user',
        flex: 1,
        minWidth: 100,
        valueFormatter: getUiUserFullName,
      },
      {
        field: 'ended',
        headerName: 'Fully ended',
        description: 'Whether the workflow instance reached a an end or stopped abruptly',
        flex: 0.8,
        minWidth: 60,
        align: 'center',
        headerAlign: 'center',
        valueFormatter: (_, row) => `${row.deleteReason == null ? `ended ${row.endTime}` : ''}`,
        renderCell: (params: GridRenderCellParams<WorkflowHistoricInstancesRowModel>) => (
          <StatusIcon status={!params.row.deleteReason ? 'done' : 'not'} />
        ),
      },
      {
        field: 'remove',
        headerName: '',
        description: 'Remove process instance',
        flex: 0.2,
        minWidth: 60,
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
