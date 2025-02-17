import { TabSheet } from '@/components';
import { useState } from 'react';

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

// export const Dashboard = () => {
//   return <KBPStepper steps={steps} />;
// };

// const schema = {
//   components: [
//     {
//       label: 'File picker',
//       type: 'filepicker',
//       layout: {
//         row: 'Row_1f1k210',
//         columns: null,
//       },
//       id: 'Field_156xwaf',
//       key: 'filepicker_6lnfqh',
//     },
//   ],
//   type: 'default',
//   id: 'Form_07wfzfc',
//   exporter: {
//     name: 'form-js (https://demo.bpmn.io)',
//     version: '1.12.0',
//   },
//   schemaVersion: 17,
// };

// const data = {};

// const submitHandler = (event: unknown) => {
//   console.log('submitHandler', event);
// };

// export const Dashboard = () => {
//   return <KBPFormViewer data={data} schema={schema} submitHandler={submitHandler} />;
// };

export const Dashboard = () => {
  const [tabItems, setTabItems] = useState([
    {
      label: 'Tab 1',
      component: <div>Tab 1</div>,
      closeHandler: () => closeHandler(0),
    },
    {
      label: 'Tab 2',
      component: <div>Tab 2</div>,
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
