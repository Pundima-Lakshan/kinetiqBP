import { defaultDialogContentProps, defaultDialogProps, DialogConfirmationActions, KBPFormEditor } from '@/components';
import { useGetFormDefinition } from '@/services';
import { FormEditor } from '@bpmn-io/form-js';
import { Dialog, DialogContent, DialogTitle } from '@mui/material';
import { DialogProps } from '@toolpad/core';
import { useRef } from 'react';

export const ViewFormDefinitionDialog = ({ open, onClose, payload: id }: DialogProps<number>) => {
  const formEditorRef = useRef<FormEditor | null>(null);

  const { data: formDefinition, isLoading: isFormDefinitionLoading } = useGetFormDefinition(id);

  const handleCancel = () => {
    onClose();
  };

  const isLoading = isFormDefinitionLoading;

  return (
    <Dialog {...defaultDialogProps} onClose={() => onClose()} open={open}>
      <DialogTitle>View form definition</DialogTitle>
      <DialogContent {...defaultDialogContentProps}>
        <KBPFormEditor formEditorRef={formEditorRef} initialSchema={formDefinition?.formSchema} />
      </DialogContent>
      <DialogConfirmationActions onCancel={handleCancel} isLoading={isLoading} cancelLabel="Okay" />
    </Dialog>
  );
};
