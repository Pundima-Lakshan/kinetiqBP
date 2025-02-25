import { DialogConfirmationActions } from '@/components/atoms';
import { BpmnToXml, KBPFormViewer } from '@/components/organisms';
import { defaultDialogContentProps } from '@/components/utils';
import {
  useGetFormDefinition,
  useGetWorkflowDefinitionModel,
  useGetWorkflowDefinitionXml,
  useMutationSuccessErrorCallback,
  usePostStartWorkflowInstance,
  type FormDefinition,
} from '@/services';
import { Dialog, DialogContent, DialogTitle } from '@mui/material';
import { DialogProps, useDialogs } from '@toolpad/core';
import { useEffect, useState } from 'react';

interface WorkflowStartDialogPayload {
  workflowDefinitionId: string;
  workflowName: string;
}

export const WorkflowStartDialog = ({ open, onClose, payload: workflowStartDialogPayload }: DialogProps<WorkflowStartDialogPayload>) => {
  const dialogs = useDialogs();

  const [startFormId, setStartFormId] = useState<null | number>(null);
  const [noStartForm, setNoStartForm] = useState(false);

  const {
    mutate: postStartWorkflowInstance,
    status: statusPostStartWorkflowInstance,
    isPending: isPendingPostStartWorkflowInstance,
    error: errorPostStartWorkflowInstance,
  } = usePostStartWorkflowInstance();

  const { data: workflowDefinitionModel, isLoading: isLoadingWorkflowDefinitionModel } = useGetWorkflowDefinitionModel(
    workflowStartDialogPayload.workflowDefinitionId,
  );

  const { data: workflowDefinitionXml, isLoading: isLoadingWorkflowDefinitionXml } = useGetWorkflowDefinitionXml(
    workflowStartDialogPayload.workflowDefinitionId,
  );

  const { data: formDefinition, isLoading: isLoadingFormDefinition } = useGetFormDefinition(startFormId ?? -1, {
    enabled: startFormId != null,
    select: removeButtonsFromFormDefinition,
  });

  useEffect(() => {
    if (!workflowDefinitionModel || !workflowDefinitionXml) return;
    const bpmnToXml = new BpmnToXml();
    bpmnToXml.getBpmnElementId(workflowDefinitionXml, 'bpmn:StartEvent').then((id) => {
      if (!id) {
        dialogs.alert('No start event found for the process');
        return;
      }
      const startForms = workflowDefinitionModel.mainProcess.flowElementMap[id].attributes.form;
      if (startForms.length > 1) {
        dialogs.alert('There are multiple start forms (currently not supported)');
        return;
      }
      if (startForms.length === 0) {
        setNoStartForm(true);
        return;
      }
      setStartFormId(Number(startForms[0].value));
    });
  }, [workflowDefinitionModel, workflowDefinitionXml]);

  useEffect(() => {
    if (!noStartForm) return;
    postStartWorkflowInstance({
      processDefinitionId: workflowStartDialogPayload.workflowDefinitionId,
      variables: [],
    });
  }, [noStartForm]);

  useMutationSuccessErrorCallback({
    mutationStatus: statusPostStartWorkflowInstance,
    successMessage: 'Workflow instance started successfully',
    error: errorPostStartWorkflowInstance,
  });

  const handleConfirm = () => {
    postStartWorkflowInstance({ processDefinitionId: workflowStartDialogPayload.workflowDefinitionId, variables: [] });
  };

  const handleFormSubmit = () => {};

  const isLoading =
    isLoadingWorkflowDefinitionXml || isLoadingWorkflowDefinitionModel || isPendingPostStartWorkflowInstance || isLoadingFormDefinition;

  return (
    <Dialog fullWidth open={open} onClose={() => onClose()} closeAfterTransition={false}>
      <DialogTitle>Start workflow instance {workflowStartDialogPayload.workflowName}</DialogTitle>
      <DialogContent {...defaultDialogContentProps}>
        {formDefinition && <KBPFormViewer schema={formDefinition.formSchema} submitHandler={handleFormSubmit} />}
      </DialogContent>
      <DialogConfirmationActions onConfirm={handleConfirm} confirmLabel="Start" isLoading={isLoading} />
    </Dialog>
  );
};

const removeButtonsFromFormDefinition = (formDefinition: FormDefinition) => {
  formDefinition.formSchema.components = formDefinition.formSchema.components.filter((component) => component.type !== 'button');
  return formDefinition;
};
