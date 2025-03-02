import { CommonAction } from '@/components/atoms';
import type { FormEditor } from '@bpmn-io/form-js';
import type { MutableRefObject } from 'react';

interface DownloadActionsArg {
  formEditorRef: MutableRefObject<FormEditor | null>;
}

export const useDownloadActions = ({ formEditorRef }: DownloadActionsArg) => {
  const handleSchemaDownload = () => {
    const schema = formEditorRef.current?.saveSchema();
    if (!schema) return;

    const blob = new Blob([JSON.stringify(schema, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'schema.json';
    document.body.appendChild(link);
    link.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(link);
  };

  const getDownloadActions = () => [<CommonAction handleAction={handleSchemaDownload} label="Download Schema" />];

  return { getDownloadActions };
};
