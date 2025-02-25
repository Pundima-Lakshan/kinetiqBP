import { defaultDialogContentProps, defaultDialogProps, DialogConfirmationActions, KBPBpmnEditor, type KBPCustomEditorEvent } from '@/components';
import { useMutationSuccessErrorCallback, usePostWorkflowDefinitions } from '@/services/index.ts';
import { Dialog, DialogContent, DialogTitle } from '@mui/material';
import { DialogProps, useDialogs } from '@toolpad/core';
import BpmnModeler from 'bpmn-js/lib/Modeler';
import { useRef } from 'react';
import { ViewFormDefinitionDialog } from '../form-definitions/view-form-definition-dialog.tsx';
import { useDownloadActions, useUploadActions } from './dialog-actions.tsx';

export const NewWorkflowDefinitionDialog = ({ open, onClose }: DialogProps) => {
  const bpmnModelerRef = useRef<BpmnModeler | null>(null);
  const { getDownloadActions } = useDownloadActions({ bpmnModelerRef });
  const { getUploadActions } = useUploadActions({ bpmnModelerRef });

  const dialogs = useDialogs();

  const {
    mutate: postWorkflowDefinitions,
    isPending: isPendingPostWorkflowDefinitions,
    status: statusPostWorkflowDefinitions,
    error: errorPostWorkflowDefinitions,
  } = usePostWorkflowDefinitions();

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
        postWorkflowDefinitions(bpmnXml);
      })
      .catch((error) => {
        console.error('Error exporting XML:', error);
      });
  };

  useMutationSuccessErrorCallback({
    mutationStatus: statusPostWorkflowDefinitions,
    successMessage: 'Workflow submitted successfully',
    error: errorPostWorkflowDefinitions,
  });

  const onEventHandler = (name: KBPCustomEditorEvent, event: unknown) => {
    if (name === 'fileViewer.open' && event && typeof event === 'object' && 'formId' in event) {
      if (event.formId == '') {
        dialogs.alert('No form selected');
        return;
      }
      const formId = Number(event.formId);
      dialogs.open(ViewFormDefinitionDialog, formId);
    }
  };

  return (
    <Dialog {...defaultDialogProps} onClose={() => onClose()} open={open}>
      <DialogTitle>New workflow definition</DialogTitle>
      <DialogContent {...defaultDialogContentProps}>
        <KBPBpmnEditor bpmnModelerRef={bpmnModelerRef} onEventHandler={onEventHandler} />
      </DialogContent>
      <DialogConfirmationActions
        onConfirm={handleConfirm}
        onCancel={handleClose}
        otherActions={[...getUploadActions(), ...getDownloadActions()]}
        isLoading={isPendingPostWorkflowDefinitions}
      />
    </Dialog>
  );
};
