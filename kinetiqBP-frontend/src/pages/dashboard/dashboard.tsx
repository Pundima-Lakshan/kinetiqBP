// const steps = [
//   {
//     index: 0,
//     label: 'Select campaign settings',
//     component: (
//       <div>
//         {Array.from({ length: 200 }).map((_, i) => {
//           return <p key={i}> i</p>;
//         })}
//       </div>
//     ),
//     onComplete: () => {},
//     completed: true,
//   },
//   { index: 1, label: 'Create an ad group', completed: false, component: <div className="h-full">Step 2</div>, onComplete: () => {} },
//   { index: 2, label: 'Create an ad', completed: false, component: <div>Step 3</div>, onComplete: () => {} },
//   { index: 3, label: 'Review', completed: false, component: <div>Step 4</div>, onComplete: () => {} },
// ];

import { KBPFormViewer, PdfDesigner, TabSheet, type CustomKBPFormEventName } from '@/components';
import { useState } from 'react';

// export const Dashboard = () => {
//   return <KBPStepper steps={steps} />;
// };

export const DashboardForm = () => {
  const [schema] = useState({
    components: [
      {
        label: 'File picker',
        type: 'filepicker',
        layout: {
          row: 'Row_1f1k210',
          columns: null,
        },
        id: 'Field_156xwaf',
        key: 'filepicker_6lnfqh',
      },
      {
        label: 'File editor',
        type: 'file-editor',
        id: 'EditorField_156xwaddf',
        key: 'fileeditor_6lnfddqh',
        multiple: true,
      },
      {
        type: 'range',
        label: 'Range',
        min: 0,
        max: 100,
        step: 1,
      },
      {
        label: 'Button',
        action: 'submit',
        type: 'button',
        layout: {
          row: 'Row_0erbalz',
          columns: null,
        },
        id: 'Field_0679s0w',
      },
    ],
    type: 'default',
    id: 'Form_07wfzfc',
    exporter: {
      name: 'form-js (https://demo.bpmn.io)',
      version: '1.12.0',
    },
    schemaVersion: 17,
  });

  const data = {};

  const submitHandler = (event: unknown) => {
    console.log('submitHandler', event);
  };

  const changedHandler = (event: unknown) => {
    console.log('changedHandler', event);
  };

  const customEventHandler = (event: { event: unknown; name: CustomKBPFormEventName }) => {
    console.log('customEventHandler', event);
  };

  return (
    <KBPFormViewer
      data={data}
      schema={schema}
      submitHandler={submitHandler}
      changedHandler={changedHandler}
      customEventHandler={customEventHandler}
    />
  );
};

const DashboardPdfEditor = () => {
  return <PdfDesigner />;
};

export const Dashboard = () => {
  const [tabItems, setTabItems] = useState([
    {
      label: 'Form',
      component: <DashboardForm />,
    },
    {
      label: 'Tab 2',
      component: <DashboardPdfEditor />,
      closeHandler: () => closeHandler(0),
    },
    {
      label: 'Tab 3',
      component: <div>Tab 3</div>,
      disabled: true,
    },
  ]);

  const closeHandler = (index: number) => {
    setTabItems((prev) => prev.filter((_, i) => i !== index));
  };

  return <TabSheet tabItems={tabItems} />;
};
