import { PdfTemplatesGrid } from '@/components';
import { useGetPdfTemplates } from '@/services';

export const PdfTemplates = () => {
  const { data: pdfTemplates = [], isLoading: isLoadngPdfTemplates } = useGetPdfTemplates();

  return <PdfTemplatesGrid data={pdfTemplates} loading={isLoadngPdfTemplates} />;
};
