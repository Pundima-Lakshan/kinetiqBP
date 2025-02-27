import { DialogConfirmationActions } from '@/components/atoms';
import { defaultDialogContentProps, defaultDialogProps } from '@/components/utils';
import { useMutationSuccessErrorCallback, useRemoveProcessInstance } from '@/services';
import { Dialog, DialogContent, DialogTitle } from '@mui/material';
import { useDialogs, type DialogProps } from '@toolpad/core';

interface RemoveProcessInstanceDialogPayload {
  processInstanceId: string;
}

export const RemoveProcessInstanceDialog = ({ open, onClose, payload }: DialogProps<RemoveProcessInstanceDialogPayload>) => {
  const dialogs = useDialogs();

  const {
    mutate: removeProcessInstance,
    status: statusRemoveProcessInstance,
    isPending: isPendingRemoveProcessInstance,
    error: errorRemoveProcessInstance,
  } = useRemoveProcessInstance();

  const handleRemove = async () => {
    const confirmed = await dialogs.confirm('Are you sure you want to remove this workflow instance', {
      severity: 'error',
    });
    if (confirmed) {
      removeProcessInstance(payload.processInstanceId);
    }
  };

  const isLoading = isPendingRemoveProcessInstance;

  useMutationSuccessErrorCallback({
    error: errorRemoveProcessInstance,
    mutationStatus: statusRemoveProcessInstance,
    onSuccess: onClose,
  });

  return (
    <Dialog {...defaultDialogProps} onClose={() => onClose()} open={open}>
      <DialogTitle>Remove process instance</DialogTitle>
      <DialogContent {...defaultDialogContentProps}></DialogContent>
      <DialogConfirmationActions onRemove={handleRemove} isLoading={isLoading} />
    </Dialog>
  );
};
