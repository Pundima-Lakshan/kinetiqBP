import { type ActivityInstance } from '@/services';
import { Button } from '@mui/material';
import { useDialogs } from '@toolpad/core';
import { WorkflowProgressDialog } from './workflow-progress-dialog';

export interface BpmnProgressButtonProps {
  workflowInstanceId: string;
  workflowDefinitionId: string;
  activityInstances: Array<ActivityInstance>;
}

export const BpmnProgressButton = ({ workflowInstanceId, workflowDefinitionId, activityInstances }: BpmnProgressButtonProps) => {
  const dialogs = useDialogs();

  const handleViewProgress = () => {
    void dialogs.open(WorkflowProgressDialog, { workflowInstanceId, workflowDefinitionId, activityInstances });
  };

  return (
    <Button color="secondary" onClick={handleViewProgress}>
      View Detailed Progress
    </Button>
  );
};
