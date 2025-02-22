import { DialogConfirmationActions } from '@/components/atoms';
import { defaultDialogContentProps } from '@/components/utils';
import { useGetWorkFlowDefinitionModel, useMutationSuccessErrorCallback, usePostStartWorkFlowInstance } from '@/services';
import { Dialog, DialogContent, DialogTitle } from '@mui/material';
import { DialogProps } from '@toolpad/core';

interface WorkflowStartDialogPayload {
  workflowDefinitionId: string;
  workflowName: string;
}

export const WorkflowStartDialog = ({ open, onClose, payload: WorkflowStartDialogPayload }: DialogProps<WorkflowStartDialogPayload>) => {
  const {
    mutate: postStartWorkFlowInstance,
    status: statusPostStartWorkFlowInstance,
    isPending: isPendingPostStartWorkFlowInstance,
    error: errorPostStartWorkFlowInstance,
  } = usePostStartWorkFlowInstance();

  const { data: workFlowDefiniionModel, isLoading: isLoadingWorkFlowDefinitionModel } = useGetWorkFlowDefinitionModel(
    WorkflowStartDialogPayload.workflowDefinitionId,
  );

  useMutationSuccessErrorCallback({
    mutationStatus: statusPostStartWorkFlowInstance,
    successMessage: 'Workflow instance started successfully',
    error: errorPostStartWorkFlowInstance,
  });

  const handleConfirm = () => {
    postStartWorkFlowInstance({ processDefinitionId: WorkflowStartDialogPayload.workflowDefinitionId, variables: [] });
  };

  return (
    <Dialog fullWidth open={open} onClose={() => onClose()} closeAfterTransition={false}>
      <DialogTitle>Start workflow instance</DialogTitle>
      <DialogContent {...defaultDialogContentProps}>{/* <KBPBpmnEditor diagramXml={workFlowDefinitionResourceData} /> */}</DialogContent>
      <DialogConfirmationActions onConfirm={handleConfirm} confirmLabel="Start" isLoading={isPendingPostStartWorkFlowInstance} />
    </Dialog>
  );
};
