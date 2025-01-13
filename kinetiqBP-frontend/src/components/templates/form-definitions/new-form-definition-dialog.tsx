import { DialogProps } from '@toolpad/core';
import { Dialog, DialogContent, DialogTitle } from '@mui/material';
import { defaultDialogContentProps, defaultDialogProps, DialogConfirmationActions, KBPFormEditor } from '@/components';

export const NewFormDefinitionDialog = ({ open, onClose }: DialogProps) => {
  const handleClose = () => {
    console.log('close');
    void onClose();
  };

  const handleConfirm = () => {
    console.log('confirm');
    void onClose();
  };

  return (
    <Dialog {...defaultDialogProps} onClose={() => onClose()} open={open}>
      <DialogTitle>Set backup account</DialogTitle>
      <DialogContent {...defaultDialogContentProps}>
        <KBPFormEditor />
      </DialogContent>
      <DialogConfirmationActions onConfirm={handleConfirm} onCancel={handleClose} />
    </Dialog>
  );
};
