import { defaultDialogContentProps, defaultDialogProps, DialogConfirmationActions, KBPBpmnEditor } from '@/components';
import { useMutationSuccessErrorCallback, usePostWorkFlowDefinitions } from '@/services/index.ts';
import { Dialog, DialogContent, DialogTitle } from '@mui/material';
import { DialogProps } from '@toolpad/core';
import BpmnModeler from 'bpmn-js/lib/Modeler';
import { useRef } from 'react';
import { useDownloadActions } from './download-actions.tsx';

export const NewWorkflowDefinitionDialog = ({ open, onClose }: DialogProps) => {
  const bpmnModelerRef = useRef<BpmnModeler | null>(null);
  const { getDownloadActions } = useDownloadActions({ bpmnModelerRef });

  const {
    mutate: postWorkFlowDefinitions,
    isPending: isPendingPostWorkFlowDefinitions,
    status: statusPostWorkFlowDefinitions,
    error: errorPostWorkFlowDefinitions,
  } = usePostWorkFlowDefinitions();

  const handleClose = () => {
    void onClose();
  };

  const handleConfirm = () => {
    if (!bpmnModelerRef.current) {
      return;
    }
    bpmnModelerRef.current
      .saveXML({ format: true })
      .then(({ xml }) => {
        if (!xml) {
          throw new Error('No XML found');
        }
        const bpmnXml = new File([xml], 'data.bpmn20.xml', { type: 'application/xml' });
        postWorkFlowDefinitions(bpmnXml);
      })
      .catch((error) => {
        console.error('Error exporting XML:', error);
      });
  };

  useMutationSuccessErrorCallback({
    mutationStatus: statusPostWorkFlowDefinitions,
    successMessage: 'Workflow submitted successfully',
    error: errorPostWorkFlowDefinitions,
  });

  return (
    <Dialog {...defaultDialogProps} onClose={() => onClose()} open={open}>
      <DialogTitle>Set backup account</DialogTitle>
      <DialogContent {...defaultDialogContentProps}>
        <KBPBpmnEditor bpmnModelerRef={bpmnModelerRef} />
      </DialogContent>
      <DialogConfirmationActions
        onConfirm={handleConfirm}
        onCancel={handleClose}
        otherActions={getDownloadActions()}
        isLoading={isPendingPostWorkFlowDefinitions}
      />
    </Dialog>
  );
};
