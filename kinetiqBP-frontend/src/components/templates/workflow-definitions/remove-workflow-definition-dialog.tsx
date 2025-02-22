import { defaultDialogContentProps, defaultDialogProps, DialogConfirmationActions, KBPBpmnEditor } from '@/components';
import { useGetWorkflowDefinitionResourceData, useMutationSuccessErrorCallback, useRemoveWorkFlowDefinition } from '@/services/index.ts';
import { Dialog, DialogContent, DialogTitle } from '@mui/material';
import { DialogProps, useDialogs } from '@toolpad/core';
import BpmnModeler from 'bpmn-js/lib/Modeler';
import { useRef } from 'react';
import { useDownloadActions } from './download-actions.tsx';

interface RemoveWorkflowDefinitionDialogPayload {
  workflowDefinitionId: string;
  deploymentId: string;
}

export const RemoveWorkflowDefinitionDialog = ({ open, onClose, payload }: DialogProps<RemoveWorkflowDefinitionDialogPayload>) => {
  const bpmnModelerRef = useRef<BpmnModeler | null>(null);
  const { getDownloadActions } = useDownloadActions({ bpmnModelerRef });

  const dialogs = useDialogs();

  const { data: workFlowDefinitionResourceData, isLoading: isLoadingWorkFlowDefinitionResourceData } = useGetWorkflowDefinitionResourceData(
    payload.workflowDefinitionId,
  );

  const {
    mutate: removeWorkFlowDefinition,
    isPending: isPendingRemoveWorkFlowDefinition,
    status: statusRemoveWorkFlowDefinition,
    error: errorRemoveWorkFlowDefinition,
  } = useRemoveWorkFlowDefinition();

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
        removeWorkFlowDefinition(payload.deploymentId);
      });
  };

  useMutationSuccessErrorCallback({
    error: errorRemoveWorkFlowDefinition,
    mutationStatus: statusRemoveWorkFlowDefinition,
    successMessage: 'Workflow definition removed successfully',
    onSuccess: () => {
      void onClose();
    },
  });

  const isLoading = isPendingRemoveWorkFlowDefinition || isLoadingWorkFlowDefinitionResourceData;

  return (
    <Dialog {...defaultDialogProps} onClose={() => onClose()} open={open}>
      <DialogTitle>Set backup account</DialogTitle>
      <DialogContent {...defaultDialogContentProps}>
        <KBPBpmnEditor diagramXml={workFlowDefinitionResourceData} />
      </DialogContent>
      <DialogConfirmationActions onRemove={handleRemove} otherActions={getDownloadActions()} isLoading={isLoading} />
    </Dialog>
  );
};
