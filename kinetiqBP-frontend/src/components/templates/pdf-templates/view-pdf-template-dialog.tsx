import { ContainerBox, defaultDialogContentProps, defaultDialogProps, DialogConfirmationActions } from '@/components';
import { useGetPdfTemplate } from '@/services/index.ts';
import { Dialog, DialogContent, DialogTitle } from '@mui/material';
import { DialogProps } from '@toolpad/core';

export const ViewPdfTemplateDialog = ({ open, onClose, payload: pdfTemplateId }: DialogProps<string>) => {
  const { data: getPdfTemplateResponse, isLoading: isLoadingGetPdfTemplateResponse } = useGetPdfTemplate(pdfTemplateId);

  const handleConfirm = () => {
    void onClose();
  };

  const isLoading = isLoadingGetPdfTemplateResponse;

  return (
    <Dialog {...defaultDialogProps} onClose={() => onClose()} open={open}>
      <DialogTitle>View workflow definition</DialogTitle>
      <DialogContent {...defaultDialogContentProps}>
        {getPdfTemplateResponse && <ContainerBox>{JSON.stringify(getPdfTemplateResponse, null, 2)}</ContainerBox>}
      </DialogContent>
      <DialogConfirmationActions onConfirm={handleConfirm} confirmLabel="Okay" isLoading={isLoading} />
    </Dialog>
  );
};
