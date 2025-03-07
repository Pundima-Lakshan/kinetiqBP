import { DialogConfirmationActions } from '@/components/atoms';
import { defaultDialogContentProps, defaultDialogProps } from '@/components/utils';
import { useMutationSuccessErrorCallback, useRemoveHistoricProcessInstance } from '@/services';
import { Dialog, DialogContent, DialogTitle } from '@mui/material';
import { useDialogs, type DialogProps } from '@toolpad/core';

interface RemoveHistoricProcessInstanceDialogPayload {
  processInstanceId: string;
}

export const RemoveHistoricProcessInstanceDialog = ({ open, onClose, payload }: DialogProps<RemoveHistoricProcessInstanceDialogPayload>) => {
  const dialogs = useDialogs();

  const {
    mutate: removeHistoricProcessInstance,
    status: statusRemoveHistoricProcessInstance,
    isPending: isPendingRemoveHistoricProcessInstance,
    error: errorRemoveHistoricProcessInstance,
  } = useRemoveHistoricProcessInstance();

  const handleRemove = async () => {
    const confirmed = await dialogs.confirm('Are you sure you want to remove this historic workflow instance', {
      severity: 'error',
    });
    if (confirmed) {
      removeHistoricProcessInstance(payload.processInstanceId);
    }
  };

  const isLoading = isPendingRemoveHistoricProcessInstance;

  useMutationSuccessErrorCallback({
    error: errorRemoveHistoricProcessInstance,
    mutationStatus: statusRemoveHistoricProcessInstance,
    onSuccess: onClose,
  });

  return (
    <Dialog {...defaultDialogProps} onClose={() => onClose()} open={open}>
      <DialogTitle>Remove historic workflow instance</DialogTitle>
      <DialogContent {...defaultDialogContentProps}></DialogContent>
      <DialogConfirmationActions onRemove={handleRemove} isLoading={isLoading} />
    </Dialog>
  );
};
