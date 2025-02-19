import { FormEditor, Schema } from '@bpmn-io/form-js';
import React, { useEffect, useRef } from 'react';
import { RangeFieldPropertiesProvider } from './extension/properties-panel';
import { FileEditorField, RangeField } from './extension/render';

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
      additionalModules: [RangeField, FileEditorField],
      properties: [RangeFieldPropertiesProvider],
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
