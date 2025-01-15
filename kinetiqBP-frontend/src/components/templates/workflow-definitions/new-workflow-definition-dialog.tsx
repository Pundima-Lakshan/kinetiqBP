import { DialogProps } from '@toolpad/core';
import { Dialog, DialogContent, DialogTitle } from '@mui/material';
import { defaultDialogContentProps, defaultDialogProps, DialogConfirmationActions, KBPBpmnEditor } from '@/components';
import { useRef } from 'react';
import BpmnModeler from 'bpmn-js/lib/Modeler';
import { useDownloadActions } from './download-actions.tsx';

export const NewWorkflowDefinitionDialog = ({ open, onClose }: DialogProps) => {
  const bpmnModelerRef = useRef<BpmnModeler | null>(null);
  const { getDownloadActions } = useDownloadActions({ bpmnModelerRef });

  const handleClose = () => {
    console.log('close');
    void onClose();
  };

  const handleConfirm = () => {
    if (!bpmnModelerRef.current) {
      return;
    }
    bpmnModelerRef.current
      .saveXML({ format: true })
      .then(({ xml }) => {
        console.log(xml);
      })
      .catch((error) => {
        console.error('Error exporting XML:', error);
      });
  };

  return (
    <Dialog {...defaultDialogProps} onClose={() => onClose()} open={open}>
      <DialogTitle>Set backup account</DialogTitle>
      <DialogContent {...defaultDialogContentProps}>
        <KBPBpmnEditor bpmnModelerRef={bpmnModelerRef} />
      </DialogContent>
      <DialogConfirmationActions onConfirm={handleConfirm} onCancel={handleClose} otherActions={getDownloadActions()} isLoading={false} />
    </Dialog>
  );
};
