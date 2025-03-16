import { ContainerBox, DialogConfirmationActions, LoaderLinear, RadioGroupDialog } from '@/components/atoms';
import { BpmnToXml, FormViewerCustomEventNames, INITIATOR, KBPFormViewer, type KBPFormViewerRefObj } from '@/components/organisms';
import { defaultDialogContentProps, defaultDialogProps } from '@/components/utils';
import { getFormData } from '@/logic';
import {
  FormComponent,
  FormSchemaType,
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
import { PdfEditorDialog } from '../common';

interface WorkflowStartDialogPayload {
  workflowDefinitionId: string;
  workflowName: string;
}

export const WorkflowStartDialog = ({ open, onClose, payload: workflowStartDialogPayload }: DialogProps<WorkflowStartDialogPayload>) => {
  const dialogs = useDialogs();

  const [startFormId, setStartFormId] = useState<null | number>(null);
  const [noStartForm, setNoStartForm] = useState({ form: false, start: false });

  const kbpFormViewerRef = useRef<KBPFormViewerRefObj | null>(null);
  const [formData, setFormData] = useState<Record<string, unknown>>({});

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
      const startForms = workflowDefinitionModel.mainProcess.flowElementMap[id].attributes.form ?? [];
      if (startForms.length > 1) {
        dialogs.alert('There are multiple start forms (currently not supported)');
        return;
      }
      if (startForms.length === 0) {
        setNoStartForm((prev) => ({ ...prev, form: true }));

        return;
      }
      setStartFormId(Number(startForms[0].value));
    });
  }, [workflowDefinitionModel, workflowDefinitionXml]);

  useEffect(() => {
    if (!workflowDefinitionModel || !workflowDefinitionXml || !formDefinition) return;

    const getValue = ({ type, keyValueGetter }: { type: FormSchemaType; keyValueGetter: () => { label: string; value: string | number } }) => {
      switch (type) {
        case 'textarea':
        case 'textfield': {
          return keyValueGetter().label;
        }
        case 'select': {
          return keyValueGetter();
        }
      }
    };

    const autoInitializedData: Record<string, unknown> = {};

    formDefinition.formSchema.components.forEach((field) => {
      if (field.type !== 'textfield' && field.type !== 'select' && field.type !== 'textarea') return;
      let value = undefined;
      switch (field.autoInitialize?.predef) {
        case 'initiator-fullname': {
          value = getValue({
            type: field.type,
            keyValueGetter: () => ({
              label: session?.user?.name ?? '',
              value: session?.user?.id ?? '',
            }),
          });
        }
      }
      autoInitializedData[field.key] = value;
    });

    setFormData((prev) => ({
      ...prev,
      ...autoInitializedData,
    }));
  }, [workflowDefinitionXml, workflowDefinitionModel, formDefinition]);

  const handleSubmitProcessVariables = (processInstanceResponse?: ProcessInstanceResponse) => {
    if (noStartForm.form || !processInstanceResponse || !loggedInUserId) return;

    const data = getFormData({
      dialogs,
      kbpFormViewerRef,
    });
    if (!data) return;

    data.push({
      name: INITIATOR,
      type: 'string',
      value: loggedInUserId,
    });

    putProcessInstanceVariables({
      processInstanceId: processInstanceResponse.id,
      variables: data,
    });
  };

  useEffect(() => {
    if (!noStartForm.form || !noStartForm.start || !loggedInUserId) return;
    postStartWorkflowInstance({
      processDefinitionId: workflowStartDialogPayload.workflowDefinitionId,
      startUserId: loggedInUserId,
    });
  }, [noStartForm]);

  const handleConfirm = () => {
    if (!loggedInUserId) return;
    const data = getFormData({
      dialogs,
      kbpFormViewerRef,
    });
    if (formDefinition && !data) {
      setNoStartForm((prev) => ({ ...prev, start: true }));
      return;
    }
    postStartWorkflowInstance({ processDefinitionId: workflowStartDialogPayload.workflowDefinitionId, startUserId: loggedInUserId });
  };

  const customEventHandler = async ({ event, name }: { event: unknown; name: FormViewerCustomEventNames }) => {
    switch (name) {
      case 'fileEditor.open': {
        const typedEvent = event as { files: File[]; index: number; field: FormComponent };
        const files = typedEvent.files;
        let filesSelectIndex = 0;
        if (files.length > 1) {
          const result = await dialogs.open(RadioGroupDialog, { label: 'File to edit', options: files.map((f, i) => ({ label: f.name, value: i })) });
          if (result != null) {
            filesSelectIndex = Number(result.value);
          }
        }
        const result = await dialogs.open(PdfEditorDialog, { pdfFile: files[filesSelectIndex] });
        if (result) {
          files[filesSelectIndex] = result.newPdf;
          setFormData((prev) => ({
            ...prev,
            [typedEvent.field.key]: files,
          }));
        }
      }
    }
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
    <Dialog {...defaultDialogProps} fullWidth open={open} onClose={() => onClose()} closeAfterTransition={false}>
      <DialogTitle>Start workflow instance: {workflowStartDialogPayload.workflowName}</DialogTitle>
      <DialogContent {...defaultDialogContentProps}>
        {formDefinition && (
          <KBPFormViewer schema={formDefinition.formSchema} ref={kbpFormViewerRef} data={formData} customEventHandler={customEventHandler} />
        )}
        {!isLoading && !formDefinition && (
          <ContainerBox centerItems typography>
            No form to fill, You can start right away
          </ContainerBox>
        )}
        {isLoading && <LoaderLinear />}
      </DialogContent>
      <DialogConfirmationActions onConfirm={handleConfirm} confirmLabel="Start" onCancel={() => onClose()} isLoading={isLoading} />
    </Dialog>
  );
};

const removeButtonsFromFormDefinition = (formDefinition: FormDefinition) => {
  formDefinition.formSchema.components = formDefinition.formSchema.components.filter((component) => component.type !== 'button');
  return formDefinition;
};
