import React, { useEffect, useRef } from 'react';
import { Form } from '@bpmn-io/form-js';

const schema = {
  components: [
    {
      text: '# Add New Resource Type\n\nYou can add a new resource type with a description here.',
      type: 'text',
      id: 'Field_0ojczbx',
      layout: {
        row: 'Row_1z1063i',
        columns: 16,
      },
    },
    {
      label: 'Resource Type',
      key: 'creditor1',
      type: 'textfield',
      validate: {
        required: true,
      },
      id: 'Field_15waoxdd',
      defaultValue: 'Meeting Room',
      description: 'This is the name of the resource type.',
      layout: {
        row: 'Row_0f4ml9m',
      },
    },
    {
      text: '# Add New Resource Type\n\nYou can add a new resource type with a description here.',
      type: 'text',
      id: 'Field_0ojczbd',
      layout: {
        row: 'Row_1z1063i',
        columns: 16,
      },
    },
    {
      label: 'Resource Type',
      key: 'creditor',
      type: 'textfield',
      validate: {
        required: true,
      },
      id: 'Field_15waoxd',
      defaultValue: 'Meeting Room',
      description: 'This is the name of the resource type.',
      layout: {
        row: 'Row_0f4ml9m',
      },
    },
    {
      label: 'Description',
      description: 'You can describe the resource type here.',
      key: 'invoiceNumber',
      type: 'textfield',
      validate: {
        pattern: '^C-[0-9]+$',
      },
      id: 'Field_04jf8k1',
      layout: {
        row: 'Row_1dz946c',
      },
    },
    {
      text: '## Category Properties',
      type: 'text',
      layout: {
        row: 'Row_1bcj2c0',
        columns: 16,
      },
      id: 'Field_0o0n86l',
    },
    {
      label: 'Properties list',
      components: [
        {
          label: '',
          components: [
            {
              label: 'Property name',
              type: 'textfield',
              layout: {
                row: 'Row_10i4enp',
                columns: 8,
              },
              id: 'Field_12aqay6',
              key: 'textfield_s2hk4e',
            },
            {
              label: 'Property data type',
              values: [
                {
                  label: 'Value',
                  value: 'value',
                },
              ],
              type: 'select',
              layout: {
                row: 'Row_10i4enp',
                columns: 6,
              },
              id: 'Field_0ienn02',
              key: 'select_mdueh6',
            },
            {
              label: 'Add Property',
              action: 'submit',
              type: 'button',
              layout: {
                row: 'Row_10i4enp',
                columns: 2,
              },
              id: 'Field_0h9k2vz',
            },
          ],
          showOutline: true,
          type: 'group',
          layout: {
            row: 'Row_14i4dsg',
            columns: null,
          },
          id: 'Field_0tb1p7i',
        },
      ],
      showOutline: true,
      isRepeating: true,
      allowAddRemove: true,
      defaultRepetitions: null,
      type: 'dynamiclist',
      layout: {
        row: 'Row_1pdchsl',
        columns: null,
      },
      id: 'Field_1digayq',
      path: 'dynamiclist_q7e5gk',
    },
    {
      label: 'Submit',
      action: 'submit',
      key: 'submit',
      type: 'button',
      id: 'Field_10hbzel',
      layout: {
        row: 'Row_08sopcl',
        columns: null,
      },
      properties: {},
    },
  ],
  schemaVersion: 17,
  exporter: {
    name: 'form-js (https://demo.bpmn.io)',
    version: '1.12.0',
  },
  type: 'default',
  id: 'Form_1x28d2o',
};

const data = {
  creditor: 'John Doe Company',
};

export const FormViewer: React.FC = () => {
  const formContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const form = new Form({
      container: formContainerRef.current as HTMLElement,
    });

    // Import schema and data when the component mounts
    const initializeForm = async () => {
      await form.importSchema(schema, data);

      // Event listener for form submission
      form.on('submit', (event: any) => {
        console.log('Form <submit>', event);
      });

      // Event listener for form changes with a priority
      form.on('changed', 500, (event: any) => {
        console.log('Form <changed>', event);
      });
    };

    initializeForm();

    // Clean up the form instance on unmount
    return () => {
      form.destroy();
    };
  }, []);

  return <div id="form" ref={formContainerRef} style={{ width: '100%', height: '100%' }} />;
};
