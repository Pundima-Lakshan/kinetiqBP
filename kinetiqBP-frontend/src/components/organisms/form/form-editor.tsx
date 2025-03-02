import '@pundima-lakshan/bpmn-form-extended/dist/assets/styles.css';

import type { FormSchema } from '@/services';
import { Schema } from '@bpmn-io/form-js';
import { FormEditor } from '@pundima-lakshan/bpmn-form-extended';
import { useEffect, useRef, type MutableRefObject } from 'react';

export interface KBPFormEditorProps {
  initialSchema?: FormSchema;
  formEditorRef: MutableRefObject<typeof FormEditor | null>;
}

const defaultSchema: Schema = {
  components: [],
  type: 'default',
};

export const KBPFormEditor = ({ initialSchema, formEditorRef }: KBPFormEditorProps) => {
  const editorContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const formEditor = new FormEditor({
      container: editorContainerRef.current,
    }).extendedForm;
    formEditorRef.current = formEditor;

    const initializeEditor = async () => {
      await formEditor.importSchema(initialSchema ?? defaultSchema);
    };

    void initializeEditor();

    return () => {
      formEditor.destroy();
      formEditorRef.current = null;
    };
  }, [formEditorRef, initialSchema]);

  return <div id="form-editor" ref={editorContainerRef} style={{ width: '100%', height: '100%' }} />;
};
