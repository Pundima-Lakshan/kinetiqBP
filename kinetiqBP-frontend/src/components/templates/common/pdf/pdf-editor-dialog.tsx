import { DialogConfirmationActions, LoaderLinear } from '@/components/atoms';
import { PdfDesigner, PdfDesignerRefObj } from '@/components/organisms';
import { defaultDialogContentProps, defaultDialogProps } from '@/components/utils';
import { Dialog, DialogContent, DialogTitle } from '@mui/material';
import { DialogProps } from '@toolpad/core';
import { useEffect, useRef, useState } from 'react';

interface PdfEditorDialogPayload {
  pdfFile: File;
}

interface PdfEditorDialogResult {
  newPdf: File;
}

export const PdfEditorDialog = ({ open, onClose, payload }: DialogProps<PdfEditorDialogPayload, PdfEditorDialogResult | void>) => {
  const [initialPdf, setInitialPdf] = useState<ArrayBuffer | undefined>();

  const pdfDesignerRef = useRef<PdfDesignerRefObj>(null);

  useEffect(() => {
    payload.pdfFile
      .arrayBuffer()
      .then((ab) => {
        setInitialPdf(ab);
      })
      .catch((error) => {
        console.error(`Error in getting the arraybuffer ${error}`);
      });
  }, [payload.pdfFile]);

  const handleConfirm = async () => {
    const result = await pdfDesignerRef.current?.generatePdf();
    if (result) {
      void onClose({
        newPdf: result,
      });
    }
  };

  return (
    <Dialog {...defaultDialogProps} fullWidth open={open} onClose={() => onClose()} closeAfterTransition={false}>
      <DialogTitle>Edit Pdf</DialogTitle>
      <DialogContent {...defaultDialogContentProps}>
        {initialPdf && <PdfDesigner initialPdf={initialPdf} ref={pdfDesignerRef} />}
        {!initialPdf && <LoaderLinear />}
      </DialogContent>
      <DialogConfirmationActions onConfirm={handleConfirm} confirmLabel="Update Pdf" onCancel={() => onClose()} isLoading={false} />
    </Dialog>
  );
};
