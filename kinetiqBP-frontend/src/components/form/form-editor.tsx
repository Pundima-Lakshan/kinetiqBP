import React, { useEffect, useRef } from 'react';
import { FormEditor } from '@bpmn-io/form-js';

const schema = {
  type: 'default',
  components: [
    {
      key: 'creditor',
      label: 'Creditor',
      type: 'textfield',
      validate: {
        required: true,
      },
    },
  ],
};

export const FormEditorComponent: React.FC = () => {
  const editorContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const formEditor = new FormEditor({
      container: editorContainerRef.current as HTMLElement,
    });

    const initializeEditor = async () => {
      await formEditor.importSchema(schema);
    };

    initializeEditor();

    // Clean up form editor on unmount
    return () => {
      formEditor.destroy();
    };
  }, []);

  return <div id="form-editor" ref={editorContainerRef} style={{ width: '100%', height: '100%' }} />;
};
