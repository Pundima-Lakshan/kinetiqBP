import { DialogConfirmationActions } from '@/components/atoms';
import { BpmnToXml, KBPFormViewer, type KBPFormViewerRefObj } from '@/components/organisms';
import { defaultDialogContentProps } from '@/components/utils';
import { getRestVariables } from '@/logic';
import {
  useGetFormDefinition,
  useGetWorkflowDefinitionModel,
  useGetWorkflowDefinitionXml,
  useMutationSuccessErrorCallback,
  usePostStartWorkflowInstance,
  usePutProcessInstanceVariables,
  type FormDefinition,
  type ProcessInstanceResponse,
} from '@/services';
import { Dialog, DialogContent, DialogTitle } from '@mui/material';
import { DialogProps, useDialogs, useSession } from '@toolpad/core';
import { useEffect, useRef, useState } from 'react';

interface WorkflowStartDialogPayload {
  workflowDefinitionId: string;
  workflowName: string;
}

export const WorkflowStartDialog = ({ open, onClose, payload: workflowStartDialogPayload }: DialogProps<WorkflowStartDialogPayload>) => {
  const dialogs = useDialogs();

  const [startFormId, setStartFormId] = useState<null | number>(null);
  const [noStartForm, setNoStartForm] = useState(false);

  const kbpFormViewerRef = useRef<KBPFormViewerRefObj | null>(null);

  const session = useSession();
  const loggedInUserId = session?.user?.id;

  const {
    mutate: postStartWorkflowInstance,
    status: statusPostStartWorkflowInstance,
    isPending: isPendingPostStartWorkflowInstance,
    error: errorPostStartWorkflowInstance,
    data: dataPostStartWorkflowInstance,
  } = usePostStartWorkflowInstance();

  const {
    mutate: putProcessInstanceVariables,
    status: statusPutProcessInstanceVariables,
    isPending: isPendingPutProcessInstanceVariables,
    error: errorPutProcessInstanceVariables,
  } = usePutProcessInstanceVariables();

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
        dialogs.alert('No start event found for the workflow');
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

  const getFormData = () => {
    if (!formDefinition) return;

    const submitResponse = kbpFormViewerRef.current?.getSubmitResponse();
    if (!submitResponse) return;

    if (Object.keys(submitResponse.errors).length > 0) {
      dialogs.alert('Fill the form correctly');
      return;
    }

    return getRestVariables(formDefinition.formSchema, submitResponse.data);
  };

  const handleSubmitProcessVariables = (processInstanceResponse?: ProcessInstanceResponse) => {
    if (noStartForm || !processInstanceResponse) return;

    const data = getFormData();
    if (!data) return;

    putProcessInstanceVariables({
      processInstanceId: processInstanceResponse.id,
      variables: data,
    });
  };

  useEffect(() => {
    if (!noStartForm || !loggedInUserId) return;
    postStartWorkflowInstance({
      processDefinitionId: workflowStartDialogPayload.workflowDefinitionId,
      startUserId: loggedInUserId,
    });
  }, [noStartForm]);

  const handleConfirm = () => {
    if (!loggedInUserId) return;

    const data = getFormData();
    if (!data) return;

    postStartWorkflowInstance({ processDefinitionId: workflowStartDialogPayload.workflowDefinitionId, startUserId: loggedInUserId });
  };

  useMutationSuccessErrorCallback({
    mutationStatus: statusPostStartWorkflowInstance,
    error: errorPostStartWorkflowInstance,
    explicit: true,
    data: dataPostStartWorkflowInstance,
    onSuccess: handleSubmitProcessVariables,
  });

  useMutationSuccessErrorCallback({
    mutationStatus: statusPutProcessInstanceVariables,
    successMessage: 'Workflow instance started successfully',
    error: errorPutProcessInstanceVariables,
  });

  const isLoading =
    isLoadingWorkflowDefinitionXml ||
    isLoadingWorkflowDefinitionModel ||
    isPendingPostStartWorkflowInstance ||
    isLoadingFormDefinition ||
    isPendingPutProcessInstanceVariables;

  return (
    <Dialog fullWidth open={open} onClose={() => onClose()} closeAfterTransition={false}>
      <DialogTitle>Start workflow instance {workflowStartDialogPayload.workflowName}</DialogTitle>
      <DialogContent {...defaultDialogContentProps}>
        {formDefinition && <KBPFormViewer schema={formDefinition.formSchema} submitHandler={() => {}} ref={kbpFormViewerRef} />}
      </DialogContent>
      <DialogConfirmationActions onConfirm={handleConfirm} confirmLabel="Start" isLoading={isLoading} />
    </Dialog>
  );
};

const removeButtonsFromFormDefinition = (formDefinition: FormDefinition) => {
  formDefinition.formSchema.components = formDefinition.formSchema.components.filter((component) => component.type !== 'button');
  return formDefinition;
};
