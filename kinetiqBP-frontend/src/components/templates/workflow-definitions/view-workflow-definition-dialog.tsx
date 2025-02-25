import { defaultDialogContentProps, defaultDialogProps, DialogConfirmationActions, KBPBpmnEditor } from '@/components';
import { useGetWorkflowDefinitionXml } from '@/services/index.ts';
import { Dialog, DialogContent, DialogTitle } from '@mui/material';
import { DialogProps } from '@toolpad/core';
import BpmnModeler from 'bpmn-js/lib/Modeler';
import { useRef } from 'react';
import { useDownloadActions } from './dialog-actions.tsx';

export const ViewWorkflowDefinitionDialog = ({ open, onClose, payload: workflowDefinitionId }: DialogProps<string>) => {
  const bpmnModelerRef = useRef<BpmnModeler | null>(null);
  const { getDownloadActions } = useDownloadActions({ bpmnModelerRef });

  const { data: workflowDefinitionResourceData, isLoading: isLoadingWorkflowDefinitionResourceData } =
    useGetWorkflowDefinitionXml(workflowDefinitionId);

  const handleConfirm = () => {
    void onClose();
  };

  return (
    <Dialog {...defaultDialogProps} onClose={() => onClose()} open={open}>
      <DialogTitle>View workflow definition</DialogTitle>
      <DialogContent {...defaultDialogContentProps}>
        <KBPBpmnEditor diagramXml={workflowDefinitionResourceData} bpmnModelerRef={bpmnModelerRef} />
      </DialogContent>
      <DialogConfirmationActions
        onConfirm={handleConfirm}
        confirmLabel="Okay"
        otherActions={getDownloadActions()}
        isLoading={isLoadingWorkflowDefinitionResourceData}
      />
    </Dialog>
  );
};
