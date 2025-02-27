import { KBPStepper } from '@/components/atoms';
import { Button } from '@mui/material';
import { useDialogs } from '@toolpad/core';
import { WorkflowProgressDialog } from './workflow-progress-dialog';

interface BpmnProgressButtonProps {
  workflowInstanceId: string;
  workflowDefinitionId: string;
}

const BpmnProgressButton = ({ workflowInstanceId, workflowDefinitionId }: BpmnProgressButtonProps) => {
  const dialogs = useDialogs();

  const handleViewProgress = () => {
    void dialogs.open(WorkflowProgressDialog, { workflowInstanceId, workflowDefinitionId });
  };

  return (
    <Button color="inherit" onClick={handleViewProgress}>
      View Detailed Progress
    </Button>
  );
};

type WorkflowProgressProps = BpmnProgressButtonProps;

export const WorkFlowProgress = ({ workflowDefinitionId, workflowInstanceId }: WorkflowProgressProps) => {
  return (
    <KBPStepper
      steps={steps}
      stepperHeader="Completed steps"
      additionalActions={[<BpmnProgressButton workflowDefinitionId={workflowDefinitionId} workflowInstanceId={workflowInstanceId} />]}
    />
  );
};

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
