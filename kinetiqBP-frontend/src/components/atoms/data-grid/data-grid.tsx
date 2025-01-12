import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { ComponentProps } from 'react';
import { ContainerBox } from '@/components';

export type KBPDataGridProps = ComponentProps<typeof DataGrid>;

export const KBPDataGrid = (props: KBPDataGridProps) => {
  return (
    <ContainerBox>
      <DataGrid
        slots={{ toolbar: GridToolbar }}
        slotProps={{
          toolbar: {
            showQuickFilter: true,
          },
        }}
        {...props}
      />
    </ContainerBox>
  );
};
