import { defaultDialogContentProps, defaultDialogProps, DialogConfirmationActions, KBPBpmnEditor } from '@/components';
import { useGetWorkflowDefinitionXml, useMutationSuccessErrorCallback, useRemoveWorkflowDefinition } from '@/services/index.ts';
import { Dialog, DialogContent, DialogTitle } from '@mui/material';
import { DialogProps, useDialogs } from '@toolpad/core';
import BpmnModeler from 'bpmn-js/lib/Modeler';
import { useRef } from 'react';
import { useDownloadActions, useEventHandlerActions } from './dialog-actions.tsx';

interface RemoveWorkflowDefinitionDialogPayload {
  workflowDefinitionId: string;
  deploymentId: string;
}

export const RemoveWorkflowDefinitionDialog = ({ open, onClose, payload }: DialogProps<RemoveWorkflowDefinitionDialogPayload>) => {
  const bpmnModelerRef = useRef<BpmnModeler | null>(null);

  const { getDownloadActions } = useDownloadActions({ bpmnModelerRef });
  const { onEventHandler } = useEventHandlerActions();

  const dialogs = useDialogs();

  const { data: workflowDefinitionResourceData, isLoading: isLoadingWorkflowDefinitionResourceData } = useGetWorkflowDefinitionXml(
    payload.workflowDefinitionId,
  );

  const {
    mutate: removeWorkflowDefinition,
    isPending: isPendingRemoveWorkflowDefinition,
    status: statusRemoveWorkflowDefinition,
    error: errorRemoveWorkflowDefinition,
  } = useRemoveWorkflowDefinition();

  const handleRemove = () => {
    dialogs
      .confirm('Are you sure you want to remove this workflow definition?', {
        okText: 'Remove',
        cancelText: 'Cancel',
        severity: 'error',
      })
      .then((confirmed) => {
        if (!confirmed) {
          return;
        }
        removeWorkflowDefinition(payload.deploymentId);
      });
  };

  useMutationSuccessErrorCallback({
    error: errorRemoveWorkflowDefinition,
    mutationStatus: statusRemoveWorkflowDefinition,
    successMessage: 'Workflow definition removed successfully',
    onSuccess: () => {
      void onClose();
    },
  });

  const isLoading = isPendingRemoveWorkflowDefinition || isLoadingWorkflowDefinitionResourceData;

  return (
    <Dialog {...defaultDialogProps} onClose={() => onClose()} open={open}>
      <DialogTitle>Remove workflow definition</DialogTitle>
      <DialogContent {...defaultDialogContentProps}>
        <KBPBpmnEditor diagramXml={workflowDefinitionResourceData} bpmnModelerRef={bpmnModelerRef} onEventHandler={onEventHandler} />
      </DialogContent>
      <DialogConfirmationActions onRemove={handleRemove} otherActions={getDownloadActions()} isLoading={isLoading} />
    </Dialog>
  );
};
