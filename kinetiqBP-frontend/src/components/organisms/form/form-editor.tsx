import React, { useEffect, useRef } from 'react';
import { FormEditor } from '@bpmn-io/form-js';

const schema = {
  components: [
    {
      label: 'Dynamic list',
      components: [
        {
          label: 'Number',
          type: 'number',
          layout: {
            row: 'Row_0a4ab04',
            columns: null,
          },
          id: 'Field_13ceo4b',
          key: 'number_p2emv',
        },
        {
          label: 'Text field',
          type: 'textfield',
          layout: {
            row: 'Row_0a4ab04',
            columns: null,
          },
          id: 'Field_0k3rk0v',
          key: 'textfield_xj5gts',
        },
        {
          label: 'Text area',
          type: 'textarea',
          layout: {
            row: 'Row_1pyqpd7',
            columns: null,
          },
          id: 'Field_0abdn5l',
          key: 'textarea_74bnlb',
        },
      ],
      showOutline: true,
      isRepeating: true,
      allowAddRemove: true,
      defaultRepetitions: 1,
      type: 'dynamiclist',
      layout: {
        row: 'Row_0ubp981',
        columns: null,
      },
      id: 'Field_1aeittv',
      path: 'dynamiclist_nrr1pa',
    },
  ],
  type: 'default',
  id: 'Form_1xmojmr',
  exporter: {
    name: 'form-js (https://demo.bpmn.io)',
    version: '1.12.0',
  },
  schemaVersion: 17,
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
