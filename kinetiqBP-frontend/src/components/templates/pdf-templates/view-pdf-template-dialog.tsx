import { ContainerBox, defaultDialogContentProps, defaultDialogProps, DialogConfirmationActions, PdfEditorDialog } from '@/components';
import { useGetPdfTemplate, useGetPdfTemplateVersions } from '@/services/index.ts';
import { Dialog, DialogContent, DialogTitle } from '@mui/material';
import { DialogProps, useDialogs } from '@toolpad/core';
import { PdfTemplateDataForm } from './pdf-template-data-form';

export const ViewPdfTemplateDialog = ({ open, onClose, payload: pdfTemplateId }: DialogProps<string>) => {
  const dialogs = useDialogs();

  const { data: pdfTemplateResponse, isLoading: isLoadingPdfTemplateResponse } = useGetPdfTemplate(pdfTemplateId);
  const { data: pdfTemplateVersions = [], isLoading: isLoadingPdfTemplateVersions } = useGetPdfTemplateVersions(pdfTemplateId);

  const handleConfirm = () => {
    void onClose();
  };

  const handlePdfVersionClick = async (versionId: string) => {
    await dialogs.open(PdfEditorDialog, { pdfVersion: versionId, templateFile: pdfTemplateId, type: 'viewer' });
  };

  const isLoading = isLoadingPdfTemplateResponse || isLoadingPdfTemplateVersions;

  return (
    <Dialog {...defaultDialogProps} onClose={() => onClose()} open={open}>
      <DialogTitle>View PDF Template: {pdfTemplateId} </DialogTitle>
      <DialogContent {...defaultDialogContentProps}>
        {pdfTemplateResponse && (
          <ContainerBox style={{ overflowY: 'auto', padding: '10px' }}>
            <PdfTemplateDataForm
              pdfTemplateResponse={pdfTemplateResponse}
              pdfVersionClickCallback={handlePdfVersionClick}
              pdfTemplateVersions={pdfTemplateVersions}
            />
          </ContainerBox>
        )}
      </DialogContent>
      <DialogConfirmationActions onConfirm={handleConfirm} confirmLabel="Okay" isLoading={isLoading} />
    </Dialog>
  );
};
