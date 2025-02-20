import { WorkflowDefinitionsRowModel } from '@/components';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { GridRenderCellParams } from '@mui/x-data-grid';
import { DialogProps } from '@toolpad/core';

export const WorkflowStartDialog = ({ open, onClose }: DialogProps<GridRenderCellParams<WorkflowDefinitionsRowModel>>) => {
  return (
    <Dialog fullWidth open={open} onClose={() => onClose()} closeAfterTransition={false}>
      <DialogTitle>Custom dialog</DialogTitle>
      <DialogContent>Somethings</DialogContent>
      <DialogActions>
        <Button onClick={() => onClose()}>Close</Button>
      </DialogActions>
    </Dialog>
  );
};
