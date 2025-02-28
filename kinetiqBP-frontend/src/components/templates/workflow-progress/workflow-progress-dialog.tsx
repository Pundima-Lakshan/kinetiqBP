import { DialogConfirmationActions } from '@/components/atoms';
import { KBPBpmnViewer, type ElementsCollection } from '@/components/organisms';
import { defaultDialogContentProps, defaultDialogProps } from '@/components/utils';
import { useGetWorkflowDefinitionXml, type ActivityInstance } from '@/services';
import { Dialog, DialogContent, DialogTitle } from '@mui/material';
import type { DialogProps } from '@toolpad/core';
import { useEffect, useState } from 'react';

interface WorkflowProgressDialogPayload {
  workflowInstanceId: string;
  workflowDefinitionId: string;
  activityInstances: Array<ActivityInstance>;
}

export const WorkflowProgressDialog = ({ open, onClose, payload }: DialogProps<WorkflowProgressDialogPayload>) => {
  const { data: workflowDefinitionXml, isLoading: isLoadingWorkflowDefinitionXml } = useGetWorkflowDefinitionXml(payload.workflowDefinitionId);

  const [elementsToColor, setElementsToColor] = useState<Array<ElementsCollection>>([]);

  const handleConfirm = () => {
    onClose();
  };

  useEffect(() => {
    if (payload.activityInstances.length === 0) return;
    let _elementsToColor: Record<'completed' | 'ongoing', ElementsCollection> = {
      completed: {
        elementIds: [],
        color: 'bpmn-state-success',
      },
      ongoing: {
        elementIds: [],
        color: 'bpmn-state-info',
      },
    };
    payload.activityInstances.forEach((instance) => {
      if (instance.endTime) {
        _elementsToColor.completed.elementIds.push(instance.activityId);
      } else {
        _elementsToColor.ongoing.elementIds.push(instance.activityId);
      }
    });
    setElementsToColor(Object.keys(_elementsToColor).map((key) => _elementsToColor[key as 'completed' | 'ongoing']));
  }, [payload.activityInstances]);

  const isLoading = isLoadingWorkflowDefinitionXml;

  return (
    <Dialog {...defaultDialogProps} onClose={() => onClose()} open={open}>
      <DialogTitle>Process instance {payload.workflowInstanceId}</DialogTitle>
      <DialogContent {...defaultDialogContentProps}>
        <KBPBpmnViewer diagramXml={workflowDefinitionXml} elementsToColor={elementsToColor} />
      </DialogContent>
      <DialogConfirmationActions isLoading={isLoading} onConfirm={handleConfirm} confirmLabel="Okay" />
    </Dialog>
  );
};
