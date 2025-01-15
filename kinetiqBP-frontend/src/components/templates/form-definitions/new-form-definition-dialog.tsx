import { DialogProps } from '@toolpad/core';
import { Dialog, DialogContent, DialogTitle } from '@mui/material';
import { defaultDialogContentProps, defaultDialogProps, DialogConfirmationActions, KBPFormEditor } from '@/components';
import { FormEditor } from '@bpmn-io/form-js';
import { useRef } from 'react';

export const NewFormDefinitionDialog = ({ open, onClose }: DialogProps) => {
  const formEditorRef = useRef<FormEditor | null>(null);

  const handleClose = () => {
    console.log('close');
    void onClose();
  };

  const handleConfirm = () => {
    console.log(formEditorRef.current?.getSchema());
    // void onClose();
  };

  return (
    <Dialog {...defaultDialogProps} onClose={() => onClose()} open={open}>
      <DialogTitle>Set backup account</DialogTitle>
      <DialogContent {...defaultDialogContentProps}>
        <KBPFormEditor formEditorRef={formEditorRef} />
      </DialogContent>
      <DialogConfirmationActions onConfirm={handleConfirm} onCancel={handleClose} isLoading={false} />
    </Dialog>
  );
};
