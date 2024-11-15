import React, { useEffect, useRef } from 'react';
import { Form } from '@bpmn-io/form-js';

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
