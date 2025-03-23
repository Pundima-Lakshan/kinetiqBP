import { KBPDataGrid } from '@/components/atoms';
import type { PdfTemplateEntry } from '@/services';
import { dateToString, getUiUserFullName } from '@/utils';
import DeleteIcon from '@mui/icons-material/Delete';
import OpenInFullIcon from '@mui/icons-material/OpenInFull';
import { Button, IconButton } from '@mui/material';
import type { GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import { useDialogs } from '@toolpad/core';
import { useState } from 'react';

type PdfTemplateRowModel = PdfTemplateEntry;

interface PdfTemplatesGridProps {
  data: PdfTemplateRowModel[];
  loading: boolean;
}

export const PdfTemplatesGrid = ({ data, loading }: PdfTemplatesGridProps) => {
  const [columns] = useState<GridColDef<PdfTemplateRowModel>[]>(() => {
    return [
      { field: 'id', headerName: 'Template Id', description: 'Usually the file name', flex: 1, minWidth: 150 },
      { field: 'modifiedDate', headerName: 'Last Modified Data', flex: 1.5, minWidth: 150, valueFormatter: dateToString },
      { field: 'lastModifiedBy', headerName: 'Last Modifed By', flex: 1, minWidth: 150, valueFormatter: getUiUserFullName },
      { field: 'createdDate', headerName: 'Created Date', flex: 1.5, minWidth: 150, valueFormatter: dateToString },
      { field: 'createdBy', headerName: 'Created By', flex: 1, minWidth: 150, valueFormatter: getUiUserFullName },
      {
        field: 'delete',
        headerName: '',
        description: 'Delete this workflow definition',
        flex: 0.3,
        minWidth: 100,
        align: 'center',
        renderCell: RemovePdfTemplate,
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

const ShowMoreActions = (params: GridRenderCellParams<PdfTemplateRowModel>) => {
  const dialogs = useDialogs();
  return (
    <IconButton
      aria-label="more"
      color="primary"
      size="small"
      tabIndex={params.hasFocus ? 0 : -1}
      onClick={() => {
        // dialogs.open(ViewUserDialog, { userId: params.row.id });
      }}
    >
      <OpenInFullIcon />
    </IconButton>
  );
};

const RemovePdfTemplate = (params: GridRenderCellParams<PdfTemplateRowModel>) => {
  return (
    <Button variant="text" color="error" size="small" tabIndex={params.hasFocus ? 0 : -1} disabled>
      <DeleteIcon color="disabled" />
    </Button>
  );
};
