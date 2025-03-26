import { KBPDataGrid } from '@/components';
import { browserRoutesCollection, getPath } from '@/configs';
import { TaskInstance } from '@/services';
import { dateToString } from '@/utils';
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';
import { IconButton } from '@mui/material';
import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import { useState } from 'react';
import { Link } from 'react-router';

export type TasksRowModel = TaskInstance;

interface TasksGridProps {
  data: TasksRowModel[];
  loading: boolean;
}

export const TasksGrid = ({ data, loading }: TasksGridProps) => {
  const [columns] = useState<GridColDef<TasksRowModel>[]>(() => {
    return [
      { field: 'id', headerName: 'ID', description: 'Unique identifier for the task', flex: 1, minWidth: 100 },
      { field: 'name', headerName: 'Name', description: 'Name of the workflow', flex: 1, minWidth: 150 },
      {
        field: 'createTime',
        headerName: 'Created Time',
        description: 'Creation date of the task',
        flex: 1,
        minWidth: 150,
        valueFormatter: dateToString,
      },
      {
        field: 'dueDate',
        headerName: 'Due Date',
        flex: 1,
        minWidth: 150,
        valueFormatter: dateToString,
      },
      {
        field: 'suspended',
        headerName: 'Suspended',
        flex: 1,
        minWidth: 150,
      },
      {
        field: 'action',
        headerName: '',
        description: 'Additional actions or information',
        flex: 0.2,
        minWidth: 60,
        align: 'right',
        renderCell: Action,
      },
    ];
  });

  return <KBPDataGrid rows={data} columns={columns} loading={loading} />;
};

const Action = (params: GridRenderCellParams<TasksRowModel>) => {
  const linkTo = `${getPath(browserRoutesCollection.WorkflowInstances.segment)}/${params.row.processDefinitionId}/${params.row.processInstanceId}`;
  return (
    <Link to={linkTo}>
      <IconButton aria-label="more" color="primary" size="small" tabIndex={params.hasFocus ? 0 : -1}>
        <ArrowOutwardIcon />
      </IconButton>
    </Link>
  );
};
