import { DialogConfirmationActions } from '@/components/atoms';
import { isJsonString, PdfDesigner, PdfDesignerRefObj, PdfForm, readFile } from '@/components/organisms';
import { defaultDialogContentProps, defaultDialogProps } from '@/components/utils';
import { TemplateData, useGetPdfTemplateData } from '@/services';
import { Dialog, DialogContent, DialogTitle } from '@mui/material';
import { DialogProps } from '@toolpad/core';
import { useEffect, useRef, useState } from 'react';

interface PdfEditorDialogPayload {
  pdfFile?: File;
  templateFile?: string; // This can be only the file name or TemplateData string
  type?: 'viewer' | 'editor' | 'form';
}

interface PdfEditorDialogResult {
  stringifiedTemplateData: string | void;
}

export const PdfEditorDialog = ({ open, onClose, payload }: DialogProps<PdfEditorDialogPayload, PdfEditorDialogResult | void>) => {
  const [initialPdf, setInitialPdf] = useState<ArrayBuffer | string | undefined>();
  const [initialTemplateData, setInitialTemplate] = useState<TemplateData | undefined>();

  const [templateNameToFetch, setTemplateNameToFetch] = useState<string>('');

  const pdfDesignerRef = useRef<PdfDesignerRefObj>(null);

  const { data: pdfTemplateData, isLoading: isLoadingPdfTemplateData } = useGetPdfTemplateData(templateNameToFetch);

  const handleConfirm = () => {
    const result = pdfDesignerRef.current?.generateTemplate();
    if (result) {
      void onClose({
        stringifiedTemplateData: JSON.stringify({
          template: result,
          fileName: payload.pdfFile?.name ?? initialTemplateData?.fileName ?? 'file',
        } satisfies TemplateData),
      });
    }
  };

  useEffect(() => {
    if (!payload.pdfFile) return;
    readFile(payload.pdfFile, 'dataURL').then((result) => {
      setInitialPdf(result);
    });
    return () => {
      setInitialPdf(undefined);
    };
  }, [payload.pdfFile]);

  useEffect(() => {
    if (!payload.templateFile) return;
    const json = isJsonString(payload.templateFile);
    if (!!json) {
      setInitialTemplate(json);
    } else {
      setTemplateNameToFetch(payload.templateFile);
    }
  }, [payload.templateFile]);

  const isLoading = isLoadingPdfTemplateData;
  const isPdfEditing = payload.type ? payload.type === 'editor' : true;

  return (
    <Dialog {...defaultDialogProps} fullWidth open={open} onClose={() => onClose()} closeAfterTransition={false}>
      <DialogTitle>Edit Pdf</DialogTitle>
      <DialogContent {...defaultDialogContentProps}>
        {initialPdf && <PdfDesigner initialPdf={initialPdf} ref={pdfDesignerRef} />}
        {initialTemplateData && isPdfEditing && <PdfDesigner initialTemplate={initialTemplateData.template} ref={pdfDesignerRef} />}
        {pdfTemplateData && isPdfEditing && <PdfDesigner initialTemplate={pdfTemplateData.template} ref={pdfDesignerRef} />}
        {pdfTemplateData && !isPdfEditing && <PdfForm initialTemplate={pdfTemplateData.template} initialMode={payload.type} />}
      </DialogContent>
      {isPdfEditing && (
        <DialogConfirmationActions onConfirm={handleConfirm} confirmLabel="Update Pdf" onCancel={() => onClose()} isLoading={isLoading} />
      )}
      {!isPdfEditing && <DialogConfirmationActions onConfirm={() => onClose()} confirmLabel="Okay" isLoading={isLoading} />}
    </Dialog>
  );
};
