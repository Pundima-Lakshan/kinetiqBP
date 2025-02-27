import { WorkFlowProgress } from '@/components';
import { Button } from '@mui/material';
import { useDialogs } from '@toolpad/core';

const steps = [
  {
    index: 0,
    label: 'Select campaign settings',
    component: (
      <div>
        {Array.from({ length: 200 }).map((_, i) => {
          return <p key={i}> i</p>;
        })}
      </div>
    ),
    onComplete: () => {},
    completed: true,
  },
  { index: 1, label: 'Create an ad group', completed: false, component: <div className="h-full">Step 2</div>, onComplete: () => {} },
  { index: 2, label: 'Create an ad', completed: false, component: <div>Step 3</div>, onComplete: () => {} },
  {
    index: 3,
    label: 'Create an ad create an ad an ad create an ad an ad create an ad',
    completed: false,
    component: <div>Step 4</div>,
    onComplete: () => {},
  },
  { index: 4, label: 'Finish', completed: false, component: <div>Step 5</div>, onComplete: () => {} },
  { index: 5, label: 'Finish', completed: false, component: <div>Step 6</div>, onComplete: () => {} },
  { index: 6, label: 'Finish', completed: false, component: <div>Step 7</div>, onComplete: () => {} },
  { index: 7, label: 'Finish', completed: false, component: <div>Step 8</div>, onComplete: () => {} },
  { index: 8, label: 'Finish', completed: false, component: <div>Step 9</div>, onComplete: () => {} },
  { index: 9, label: 'Finish', completed: false, component: <div>Step 10</div>, onComplete: () => {} },
  { index: 10, label: 'Finish', completed: false, component: <div>Step 11</div>, onComplete: () => {} },
  { index: 11, label: 'Finish', completed: false, component: <div>Step 12</div>, onComplete: () => {} },
  { index: 12, label: 'Finish', completed: false, component: <div>Step 13</div>, onComplete: () => {} },
  { index: 13, label: 'Finish', completed: false, component: <div>Step 14</div>, onComplete: () => {} },
  { index: 14, label: 'Finish', completed: false, component: <div>Step 15</div>, onComplete: () => {} },
  { index: 15, label: 'Finish', completed: false, component: <div>Step 16</div>, onComplete: () => {} },
  { index: 16, label: 'Finish', completed: false, component: <div>Step 17</div>, onComplete: () => {} },
  { index: 17, label: 'Finish', completed: false, component: <div>Step 18</div>, onComplete: () => {} },
  { index: 18, label: 'Finish', completed: false, component: <div>Step 19</div>, onComplete: () => {} },
  { index: 19, label: 'Finish', completed: false, component: <div>Step 20</div>, onComplete: () => {} },
  { index: 20, label: 'Finish', completed: false, component: <div>Step 21</div>, onComplete: () => {} },
  { index: 21, label: 'Finish', completed: false, component: <div>Step 22</div>, onComplete: () => {} },
  { index: 22, label: 'Finish', completed: false, component: <div>Step 23</div>, onComplete: () => {} },
];

const BpmnProgressButton = () => {
  const dialogs = useDialogs();
  const handleViewProgress = () => {
    dialogs.alert('This is progress');
  };
  return (
    <Button color="inherit" onClick={handleViewProgress}>
      View Progress
    </Button>
  );
};

export const Dashboard = () => {
  return <WorkFlowProgress />;
};

// export const DashboardForm = () => {
//   const [schema] = useState({
//     components: [
//       {
//         label: 'File picker',
//         type: 'filepicker',
//         layout: {
//           row: 'Row_1f1k210',
//           columns: null,
//         },
//         id: 'Field_156xwaf',
//         key: 'filepicker_6lnfqh',
//       },
//       {
//         label: 'File editor',
//         type: 'file-editor',
//         id: 'EditorField_156xwaddf',
//         key: 'fileeditor_6lnfddqh',
//         multiple: true,
//       },
//       {
//         type: 'range',
//         label: 'Range',
//         min: 0,
//         max: 100,
//         step: 1,
//       },
//       {
//         label: 'Button',
//         action: 'submit',
//         type: 'button',
//         layout: {
//           row: 'Row_0erbalz',
//           columns: null,
//         },
//         id: 'Field_0679s0w',
//       },
//     ],
//     type: 'default',
//     id: 'Form_07wfzfc',
//     exporter: {
//       name: 'form-js (https://demo.bpmn.io)',
//       version: '1.12.0',
//     },
//     schemaVersion: 17,
//   });

//   const data = {};

//   const submitHandler = (event: unknown) => {
//     console.log('submitHandler', event);
//   };

//   const changedHandler = (event: unknown) => {
//     console.log('changedHandler', event);
//   };

//   const customEventHandler = (event: { event: unknown; name: CustomKBPFormEventName }) => {
//     console.log('customEventHandler', event);
//   };

//   return (
//     <KBPFormViewer
//       data={data}
//       schema={schema}
//       submitHandler={submitHandler}
//       changedHandler={changedHandler}
//       customEventHandler={customEventHandler}
//     />
//   );
// };

// const DashboardPdfEditor = () => {
//   return <PdfDesigner />;
// };

// export const Dashboard = () => {
//   const notification = useNotifications();
//   const [tabItems, setTabItems] = useState([
//     {
//       label: 'Form',
//       component: <DashboardForm />,
//     },
//     {
//       label: 'Tab 2',
//       component: <DashboardPdfEditor />,
//       closeHandler: () => closeHandler(0),
//     },
//     {
//       label: 'Tab 3',
//       component: <div>Tab 3</div>,
//       disabled: true,
//     },
//   ]);

//   const closeHandler = (index: number) => {
//     setTabItems((prev) => prev.filter((_, i) => i !== index));
//   };

//   return <TabSheet tabItems={tabItems} />;
// };
