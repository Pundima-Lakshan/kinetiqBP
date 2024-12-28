import React, { useEffect, useRef } from 'react';
import { Form } from '@bpmn-io/form-js';

const schema = {
  "components": [
    {
      "label": "Dynamic list",
      "components": [
        {
          "label": "Number",
          "type": "number",
          "layout": {
            "row": "Row_0a4ab04",
            "columns": null
          },
          "id": "Field_13ceo4b",
          "key": "number_p2emv"
        },
        {
          "label": "Text field",
          "type": "textfield",
          "layout": {
            "row": "Row_0a4ab04",
            "columns": null
          },
          "id": "Field_0k3rk0v",
          "key": "textfield_xj5gts"
        },
        {
          "label": "Text area",
          "type": "textarea",
          "layout": {
            "row": "Row_1pyqpd7",
            "columns": null
          },
          "id": "Field_0abdn5l",
          "key": "textarea_74bnlb"
        }
      ],
      "showOutline": true,
      "isRepeating": true,
      "allowAddRemove": true,
      "defaultRepetitions": 1,
      "type": "dynamiclist",
      "layout": {
        "row": "Row_0ubp981",
        "columns": null
      },
      "id": "Field_1aeittv",
      "path": "dynamiclist_nrr1pa"
    }
  ],
  "type": "default",
  "id": "Form_1xmojmr",
  "exporter": {
    "name": "form-js (https://demo.bpmn.io)",
    "version": "1.12.0"
  },
  "schemaVersion": 17
}

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
