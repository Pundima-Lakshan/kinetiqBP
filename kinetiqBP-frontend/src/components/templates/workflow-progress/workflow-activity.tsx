import { ContainerBox } from '@/components/atoms';
import { createDynamicForm, FormViewerCustomEventNames, KBPFormViewer, KBPFormViewerRefObj } from '@/components/organisms';
import { getDataFromRestVariables, getFormData } from '@/logic';
import {
  FormComponent,
  useGetFormDefinition,
  useGetHistoricProcessInstanceVariables,
  useGetHistoricTaskInstance,
  useGetUiServiceUsers,
  type ActivityInstance,
  type ExtensionAttribute,
  type FormSchema,
} from '@/services';
import { dateToString, getUiUserFullName } from '@/utils';
import { FormControl, TextField } from '@mui/material';
import { useDialogs, useSession } from '@toolpad/core';
import { MutableRefObject, useEffect, useState } from 'react';
import { PdfEditorDialog } from '../common';

interface WorkflowActivityProps {
  activityInstance: ActivityInstance;
  formDefinitionId?: number;
  dynamicVariables?: ExtensionAttribute[];
  kbpFormViewerRef: MutableRefObject<KBPFormViewerRefObj | null>;
}

export const WorkflowActivity = ({ activityInstance, formDefinitionId, dynamicVariables, kbpFormViewerRef }: WorkflowActivityProps) => {
  const dialogs = useDialogs();

  const { data: uiUsers = [] } = useGetUiServiceUsers();
  const { data: formDefinition } = useGetFormDefinition(formDefinitionId ?? -1, {
    enabled: formDefinitionId != null,
  });
  const { data: historicTaskInstance } = useGetHistoricTaskInstance(activityInstance.taskId, !!activityInstance.taskId);
  const { data: processInstanceVariables } = useGetHistoricProcessInstanceVariables(activityInstance.processInstanceId, !activityInstance.taskId);

  const [dynamicFormDefinition, setDynamicFormDefinition] = useState<FormSchema | null>(null);

  const [formData, setFormData] = useState<Record<string, unknown> | undefined>(undefined);

  const customEventHandler = async ({ event, name }: { event: unknown; name: FormViewerCustomEventNames }) => {
    switch (name) {
      case 'pdfTemplate.new': {
        const typedEvent = event as { files: File[]; index: number; field: FormComponent };
        const result = await dialogs.open(PdfEditorDialog, { pdfFile: typedEvent.files[0] });
        if (result) {
          const data = kbpFormViewerRef.current?.getSubmitResponse()?.data;
          setFormData((prev) => ({
            ...prev,
            ...data,
            [typedEvent.field.key]: result.stringifiedTemplateData,
          }));
        }
        break;
      }
      case 'pdfTemplate.edit': {
        // Here possibly both only file name and sometimes the TemplateData string may be returned
        const typedEvent = event as { files: string[]; field: FormComponent; index: number };
        const result = await dialogs.open(PdfEditorDialog, { templateFile: typedEvent.files[0], type: 'viewer' });
        if (result) {
          const data = kbpFormViewerRef.current?.getSubmitResponse()?.data;
          setFormData((prev) => ({
            ...prev,
            ...data,
            [typedEvent.field.key]: result.stringifiedTemplateData,
          }));
        }
      }
    }
  };

  const session = useSession();
  const isLoggedInUserAssignee = session?.user?.id === activityInstance.assignee;

  useEffect(() => {
    if (!!activityInstance.taskId) {
      setFormData(getDataFromRestVariables(historicTaskInstance?.data[0]?.variables ?? []));
    } else {
      const variables =
        processInstanceVariables?.data.map((d) => ({
          ...d.variable,
        })) ?? [];
      setFormData(getDataFromRestVariables(variables));
    }
  }, [activityInstance.taskId, processInstanceVariables, historicTaskInstance]);

  useEffect(() => {
    if (formDefinitionId != null || dynamicVariables == null) {
      setDynamicFormDefinition(null);
      return;
    }
    const schema = createDynamicForm(dynamicVariables);
    setDynamicFormDefinition(schema);
  }, [dynamicVariables, formDefinitionId]);

  const assignee = uiUsers.find((u) => u.id === activityInstance.assignee);

  return (
    <ContainerBox>
      <FormControl
        variant="outlined"
        size="small"
        style={{ display: 'flex', flexDirection: 'row', gap: '0 16px', padding: '8px 0px', overflowX: 'auto' }}
      >
        <ActivityStatus label="Activity Name" defaultValue={activityInstance.activityName} minWidth="200px" />
        <ActivityStatus label="Start Time" defaultValue={dateToString(activityInstance.startTime)} minWidth="400px" />
        <ActivityStatus label="End Time" defaultValue={dateToString(activityInstance.endTime)} minWidth="400px" />
        <ActivityStatus label="Assignee" defaultValue={assignee ? getUiUserFullName(assignee) : null} />
      </FormControl>
      <ContainerBox style={{ height: 'calc(100% - 82px)', padding: '8px 0 0 0' }}>
        {formDefinition?.formSchema && (
          <KBPFormViewer
            schema={formDefinition.formSchema}
            data={formData}
            ref={kbpFormViewerRef}
            isReadOnly={!isLoggedInUserAssignee}
            customEventHandler={customEventHandler}
          />
        )}
        {dynamicFormDefinition && (
          <KBPFormViewer schema={dynamicFormDefinition} data={formData} ref={kbpFormViewerRef} isReadOnly={!isLoggedInUserAssignee} />
        )}
      </ContainerBox>
    </ContainerBox>
  );
};

interface ActivityInstanceProps {
  label: string;
  defaultValue: string | number | null;
  minWidth?: string;
}

const ActivityStatus = ({ defaultValue, label, minWidth }: ActivityInstanceProps) => {
  return (
    <TextField
      key={`${label}-${defaultValue}`}
      label={label}
      defaultValue={defaultValue}
      sx={{ minWidth: defaultValue ? (minWidth ?? '300px') : '150px' }}
      fullWidth
      slotProps={{
        input: {
          readOnly: true,
        },
      }}
    />
  );
};
