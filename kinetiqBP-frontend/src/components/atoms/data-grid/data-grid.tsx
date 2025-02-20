import { ContainerBox } from '@/components';
import { DataGrid, GridToolbar, type DataGridProps, type GridValidRowModel } from '@mui/x-data-grid';

export const KBPDataGrid = <R extends GridValidRowModel = any>(props: DataGridProps<R>) => {
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
