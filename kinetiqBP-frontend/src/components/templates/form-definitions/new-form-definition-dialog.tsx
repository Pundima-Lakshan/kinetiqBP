import { defaultDialogContentProps, defaultDialogProps, DialogConfirmationActions, KBPFormEditor } from '@/components';
import { useMutationSuccessErrorCallback, usePostFormDefinitions } from '@/services';
import { FormEditor } from '@bpmn-io/form-js';
import { Dialog, DialogContent, DialogTitle } from '@mui/material';
import { DialogProps, useSession } from '@toolpad/core';
import { useRef } from 'react';

export const NewFormDefinitionDialog = ({ open, onClose }: DialogProps) => {
  const formEditorRef = useRef<FormEditor | null>(null);

  const session = useSession();
  const userId = session?.user?.id;

  const {
    mutate: postFormDefinition,
    isPending: isPendingPostFormDefinition,
    status: statusPostFormDefinition,
    error: errorPostFormDefinition,
  } = usePostFormDefinitions();

  const handleClose = () => {
    void onClose();
  };

  const handleConfirm = () => {
    const formSchema: {
      id: string;
      versionTag?: string;
    } = formEditorRef.current?.getSchema();
    if (!formSchema || !userId) {
      return;
    }
    postFormDefinition({
      createdDate: new Date(),
      createdBy: userId,
      modifiedDate: new Date(),
      formId: formSchema.id,
      formSchema,
      description: `This is the form for ${formSchema.id}`,
      version: formSchema.versionTag ?? '1',
    });
  };

  useMutationSuccessErrorCallback({
    mutationStatus: statusPostFormDefinition,
    successMessage: 'Form submitted successfully',
    error: errorPostFormDefinition,
  });

  return (
    <Dialog {...defaultDialogProps} onClose={() => onClose()} open={open}>
      <DialogTitle>Set backup account</DialogTitle>
      <DialogContent {...defaultDialogContentProps}>
        <KBPFormEditor formEditorRef={formEditorRef} />
      </DialogContent>
      <DialogConfirmationActions onConfirm={handleConfirm} onCancel={handleClose} isLoading={isPendingPostFormDefinition} />
    </Dialog>
  );
};
