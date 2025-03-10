import { defaultDialogContentProps, defaultDialogProps, DialogConfirmationActions, KBPFormEditor } from '@/components';
import { useGetFormDefinition, useMutationSuccessErrorCallback, usePutFormDefinitions, type FormSchema } from '@/services';
import { FormEditor } from '@bpmn-io/form-js';
import { Dialog, DialogContent, DialogTitle } from '@mui/material';
import { DialogProps, useSession } from '@toolpad/core';
import { useRef } from 'react';
import { useDownloadActions } from './dialog-actions';

export const UpdateFormDefinitionDialog = ({ open, onClose, payload: id }: DialogProps<number>) => {
  const formEditorRef = useRef<FormEditor | null>(null);

  const session = useSession();
  const userId = session?.user?.id;

  const { getDownloadActions } = useDownloadActions({ formEditorRef });

  const {
    mutate: putFormDefinition,
    isPending: isPendingPutFormDefinition,
    status: statusPutFormDefinition,
    error: errorPutFormDefinition,
  } = usePutFormDefinitions();

  const { data: formDefinition, isLoading: isFormDefinitionLoading } = useGetFormDefinition(id);

  const handleClose = () => {
    void onClose();
  };

  const handleConfirm = () => {
    const formSchema: FormSchema = formEditorRef.current?.getSchema();
    if (!formSchema || !userId || !formDefinition) {
      return;
    }
    putFormDefinition({
      id: formDefinition.id,
      createdDate: formDefinition.createdDate,
      createdBy: formDefinition.createdBy,
      modifiedDate: new Date(),
      formId: formSchema.id,
      formSchema,
      description: `This is the form for ${formSchema.id}`,
      version: formSchema.versionTag ?? '1',
    });
  };

  useMutationSuccessErrorCallback({
    mutationStatus: statusPutFormDefinition,
    successMessage: 'Form updated successfully',
    error: errorPutFormDefinition,
  });

  const isLoading = isPendingPutFormDefinition || isFormDefinitionLoading;

  return (
    <Dialog {...defaultDialogProps} onClose={() => onClose()} open={open}>
      <DialogTitle>Update form definition</DialogTitle>
      <DialogContent {...defaultDialogContentProps}>
        <KBPFormEditor formEditorRef={formEditorRef} initialSchema={formDefinition?.formSchema} />
      </DialogContent>
      <DialogConfirmationActions
        onConfirm={handleConfirm}
        onCancel={handleClose}
        isLoading={isLoading}
        confirmLabel="Update"
        otherActions={getDownloadActions()}
      />
    </Dialog>
  );
};
