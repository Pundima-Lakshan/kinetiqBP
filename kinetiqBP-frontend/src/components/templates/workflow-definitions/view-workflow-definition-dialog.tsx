import { defaultDialogContentProps, defaultDialogProps, DialogConfirmationActions, KBPBpmnEditor } from '@/components';
import { useGetWorkflowDefinitionResourceData } from '@/services/index.ts';
import { Dialog, DialogContent, DialogTitle } from '@mui/material';
import { DialogProps } from '@toolpad/core';
import BpmnModeler from 'bpmn-js/lib/Modeler';
import { useRef } from 'react';
import { useDownloadActions } from './download-actions.tsx';

export const ViewWorkflowDefinitionDialog = ({ open, onClose, payload: workflowDefinitionId }: DialogProps<string>) => {
  const bpmnModelerRef = useRef<BpmnModeler | null>(null);
  const { getDownloadActions } = useDownloadActions({ bpmnModelerRef });

  const { data: workFlowDefinitionResourceData, isLoading: isLoadingWorkFlowDefinitionResourceData } =
    useGetWorkflowDefinitionResourceData(workflowDefinitionId);

  const handleConfirm = () => {
    void onClose();
  };

  return (
    <Dialog {...defaultDialogProps} onClose={() => onClose()} open={open}>
      <DialogTitle>Set backup account</DialogTitle>
      <DialogContent {...defaultDialogContentProps}>
        <KBPBpmnEditor diagramXml={workFlowDefinitionResourceData} />
      </DialogContent>
      <DialogConfirmationActions
        onConfirm={handleConfirm}
        confirmLabel="Okay"
        otherActions={getDownloadActions()}
        isLoading={isLoadingWorkFlowDefinitionResourceData}
      />
    </Dialog>
  );
};
