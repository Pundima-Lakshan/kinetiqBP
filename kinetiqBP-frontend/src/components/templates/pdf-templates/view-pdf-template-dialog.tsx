import { ContainerBox, defaultDialogContentProps, defaultDialogProps, DialogConfirmationActions } from '@/components';
import { useGetPdfTemplateVersions } from '@/services/index.ts';
import { Dialog, DialogContent, DialogTitle } from '@mui/material';
import { DialogProps } from '@toolpad/core';

export const ViewPdfTemplateDialog = ({ open, onClose, payload: pdfTemplateId }: DialogProps<string>) => {
  const { data: pdfTemplateResponse, isLoading: isLoadingPdfTemplateResponse } = useGetPdfTemplateVersions(pdfTemplateId);
  const { data: pdfTemplateVersions, isLoading: isLoadingPdfTemplateVersions } = useGetPdfTemplateVersions(pdfTemplateId);

  const handleConfirm = () => {
    void onClose();
  };

  const isLoading = isLoadingPdfTemplateResponse || isLoadingPdfTemplateVersions;

  return (
    <Dialog {...defaultDialogProps} onClose={() => onClose()} open={open}>
      <DialogTitle>View workflow definition</DialogTitle>
      <DialogContent {...defaultDialogContentProps}>
        {pdfTemplateResponse && (
          <ContainerBox>
            <p>{JSON.stringify(pdfTemplateResponse, null, 2)}</p>
            <p>{JSON.stringify(pdfTemplateVersions, null, 2)}</p>
          </ContainerBox>
        )}
      </DialogContent>
      <DialogConfirmationActions onConfirm={handleConfirm} confirmLabel="Okay" isLoading={isLoading} />
    </Dialog>
  );
};
