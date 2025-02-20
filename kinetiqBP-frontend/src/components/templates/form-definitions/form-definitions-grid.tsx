import { KBPDataGrid, UpdateFormDefinitionDialog } from '@/components';
import type { FormDefinition, UiServiceUser } from '@/services';
import { dateToString } from '@/utils';
import OpenInFullIcon from '@mui/icons-material/OpenInFull';
import { IconButton } from '@mui/material';
import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import { useDialogs } from '@toolpad/core';
import { useState } from 'react';

export type FormDefinitionsRowModel = FormDefinition;

const ShowMoreActions = (params: GridRenderCellParams<FormDefinitionsRowModel>) => {
  const dialogs = useDialogs();
  return (
    <IconButton
      aria-label="more"
      color="primary"
      size="small"
      tabIndex={params.hasFocus ? 0 : -1}
      onClick={() => {
        void dialogs.open(UpdateFormDefinitionDialog, params.row.id);
      }}
    >
      <OpenInFullIcon />
    </IconButton>
  );
};

interface FormDefinitionsGridProps {
  data: FormDefinitionsRowModel[];
  loading: boolean;
}

export const FormDefinitionsGrid = ({ data, loading }: FormDefinitionsGridProps) => {
  const [columns] = useState<GridColDef<FormDefinitionsRowModel>[]>(() => {
    return [
      {
        field: 'formId',
        headerName: 'Form Id',
        description: 'Form Id given at the form creation',
        flex: 1,
        minWidth: 100,
      },
      {
        field: 'version',
        headerName: 'Form Version',
        description: 'Form version',
        flex: 0.5,
        minWidth: 100,
      },
      {
        field: 'createdBy',
        headerName: 'Created By',
        description: 'User who created the form',
        flex: 1,
        minWidth: 150,
        valueFormatter: (value: UiServiceUser) => `${value.firstname} ${value.lastname}`,
      },
      {
        field: 'createdDate',
        headerName: 'Created Date',
        description: 'Date when the form was created',
        flex: 1,
        minWidth: 150,
        valueFormatter: dateToString,
      },
      {
        field: 'modifiedDate',
        headerName: 'Modified Date',
        description: 'Date when the form was last modified',
        flex: 1,
        minWidth: 150,
        valueFormatter: dateToString,
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
