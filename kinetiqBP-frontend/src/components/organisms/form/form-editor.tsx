import React, { useEffect, useRef } from 'react';
import { FormEditor, Schema } from '@bpmn-io/form-js';

export interface KBPFormEditorProps {
  initialSchema?: Schema;
  formEditorRef: React.MutableRefObject<FormEditor | null>;
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
    });
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
