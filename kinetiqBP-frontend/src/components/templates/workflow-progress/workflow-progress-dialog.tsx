import { DialogConfirmationActions } from '@/components/atoms';
import { KBPBpmnViewer } from '@/components/organisms';
import { defaultDialogContentProps, defaultDialogProps } from '@/components/utils';
import { useGetWorkflowDefinitionXml } from '@/services';
import { Dialog, DialogContent, DialogTitle } from '@mui/material';
import type { DialogProps } from '@toolpad/core';

interface WorkflowProgressDialogPayload {
  workflowInstanceId: string;
  workflowDefinitionId: string;
}

export const WorkflowProgressDialog = ({ open, onClose, payload }: DialogProps<WorkflowProgressDialogPayload>) => {
  const { data: workflowDefinitionXml, isLoading: isLoadingWorkflowDefinitionXml } = useGetWorkflowDefinitionXml(payload.workflowDefinitionId);

  const handleConfirm = () => {
    onClose();
  };

  const isLoading = isLoadingWorkflowDefinitionXml;

  return (
    <Dialog {...defaultDialogProps} onClose={() => onClose()} open={open}>
      <DialogTitle>Process instance {payload.workflowInstanceId}</DialogTitle>
      <DialogContent {...defaultDialogContentProps}>
        <KBPBpmnViewer diagramXml={workflowDefinitionXml} />
      </DialogContent>
      <DialogConfirmationActions isLoading={isLoading} onConfirm={handleConfirm} confirmLabel="Okay" />
    </Dialog>
  );
};
