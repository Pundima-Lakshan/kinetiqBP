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
  stringifiedTemplate: string | void;
}

export const PdfEditorDialog = ({ open, onClose, payload }: DialogProps<PdfEditorDialogPayload, PdfEditorDialogResult | void>) => {
  const [initialPdf] = useState<ArrayBuffer | string | undefined>(payload.pdfFile);
  const [initialTemplate] = useState<Template | undefined>(() => {
    if (!payload.templateFile) return;
    return JSON.parse(payload.templateFile);
  });

  const pdfDesignerRef = useRef<PdfDesignerRefObj>(null);

  const handleConfirm = () => {
    const result = pdfDesignerRef.current?.generateStringifiedTemplate();
    if (result) {
      void onClose({
        stringifiedTemplate: result,
      });
    }
  };

  return (
    <Dialog {...defaultDialogProps} fullWidth open={open} onClose={() => onClose()} closeAfterTransition={false}>
      <DialogTitle>Edit Pdf</DialogTitle>
      <DialogContent {...defaultDialogContentProps}>
        {initialPdf && <PdfDesigner initialPdf={initialPdf} ref={pdfDesignerRef} />}
        {initialTemplate && <PdfDesigner initialTemplate={initialTemplate} ref={pdfDesignerRef} />}
      </DialogContent>
      <DialogConfirmationActions onConfirm={handleConfirm} confirmLabel="Update Pdf" onCancel={() => onClose()} isLoading={false} />
    </Dialog>
  );
};
