import { DialogConfirmationActions } from '@/components/atoms';
import { PdfDesigner, PdfDesignerRefObj } from '@/components/organisms';
import { defaultDialogContentProps, defaultDialogProps } from '@/components/utils';
import { Dialog, DialogContent, DialogTitle } from '@mui/material';
import { Template } from '@pdfme/common';
import { DialogProps } from '@toolpad/core';
import { useRef, useState } from 'react';

interface PdfEditorDialogPayload {
  pdfFile?: string | ArrayBuffer;
  templateFile?: string;
}

interface PdfEditorDialogResult {
  stringifiedTemplateData: string | void;
}

export interface TemplateData {
  template: Template;
  fileName: string;
}

export const PdfEditorDialog = ({ open, onClose, payload }: DialogProps<PdfEditorDialogPayload, PdfEditorDialogResult | void>) => {
  const [initialPdf] = useState<ArrayBuffer | string | undefined>(payload.pdfFile);
  const [initialTemplateData] = useState<TemplateData | undefined>(() => {
    if (!payload.templateFile) return;
    return JSON.parse(payload.templateFile);
  });

  const pdfDesignerRef = useRef<PdfDesignerRefObj>(null);

  const handleConfirm = () => {
    const result = pdfDesignerRef.current?.generateTemplate();
    if (result) {
      void onClose({
        stringifiedTemplateData: JSON.stringify({
          template: result,
          fileName: initialTemplateData?.fileName ?? 'file',
        } satisfies TemplateData),
      });
    }
  };

  return (
    <Dialog {...defaultDialogProps} fullWidth open={open} onClose={() => onClose()} closeAfterTransition={false}>
      <DialogTitle>Edit Pdf</DialogTitle>
      <DialogContent {...defaultDialogContentProps}>
        {initialPdf && <PdfDesigner initialPdf={initialPdf} ref={pdfDesignerRef} />}
        {initialTemplateData && <PdfDesigner initialTemplate={initialTemplateData.template} ref={pdfDesignerRef} />}
      </DialogContent>
      <DialogConfirmationActions onConfirm={handleConfirm} confirmLabel="Update Pdf" onCancel={() => onClose()} isLoading={false} />
    </Dialog>
  );
};
