import { defaultDialogContentProps, defaultDialogProps, DialogConfirmationActions, KBPFormEditor } from '@/components';
import { useGetFormDefinition, useMutationSuccessErrorCallback, useRemoveFormDefinition } from '@/services';
import { FormEditor } from '@bpmn-io/form-js';
import { Dialog, DialogContent, DialogTitle } from '@mui/material';
import { DialogProps, useDialogs } from '@toolpad/core';
import { useRef } from 'react';

export const RemoveFormDefinitionDialog = ({ open, onClose, payload: id }: DialogProps<number>) => {
  const formEditorRef = useRef<FormEditor | null>(null);

  const dialogs = useDialogs();

  const {
    mutate: removeFormDefinition,
    isPending: isPendingRemoveFormDefinition,
    status: statusRemoveFormDefinition,
    error: errorRemoveFormDefinition,
  } = useRemoveFormDefinition();

  const { data: formDefinition, isLoading: isFormDefinitionLoading } = useGetFormDefinition(id);

  const handleClose = () => {
    void onClose();
  };

  const handleRemove = () => {
    dialogs
      .confirm('Are you sure you want to remove this form definition?', {
        okText: 'Remove',
        cancelText: 'Cancel',
        severity: 'error',
      })
      .then((confirmed) => {
        if (!confirmed) {
          return;
        }
        removeFormDefinition(id);
      });
  };

  useMutationSuccessErrorCallback({
    error: errorRemoveFormDefinition,
    mutationStatus: statusRemoveFormDefinition,
    successMessage: 'Form definition removed successfully',
    onSuccess: () => {
      void onClose();
    },
  });

  const isLoading = isPendingRemoveFormDefinition || isFormDefinitionLoading;

  return (
    <Dialog {...defaultDialogProps} onClose={() => onClose()} open={open}>
      <DialogTitle>Remove form definition</DialogTitle>
      <DialogContent {...defaultDialogContentProps}>
        <KBPFormEditor formEditorRef={formEditorRef} initialSchema={formDefinition?.formSchema} />
      </DialogContent>
      <DialogConfirmationActions onCancel={handleClose} isLoading={isLoading} onRemove={handleRemove} />
    </Dialog>
  );
};
