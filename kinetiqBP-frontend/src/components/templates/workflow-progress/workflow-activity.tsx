import { ContainerBox } from '@/components/atoms';
import { KBPFormViewer } from '@/components/organisms';
import { getDataFromRestVariables } from '@/logic';
import {
  useGetFormDefinition,
  useGetHistoricProcessInstanceVariables,
  useGetHistoricTaskInstance,
  useGetUiServiceUsers,
  type ActivityInstance,
} from '@/services';
import { dateToString, getUiUserFullName } from '@/utils';
import { FormControl, TextField } from '@mui/material';
import { useEffect, useState } from 'react';

interface WorkflowActivityProps {
  activityInstance: ActivityInstance;
  formDefinitionId?: number;
}

export const WorkflowActivity = ({ activityInstance, formDefinitionId }: WorkflowActivityProps) => {
  const { data: uiUsers = [] } = useGetUiServiceUsers();
  const { data: formDefinition } = useGetFormDefinition(formDefinitionId ?? -1, {
    enabled: formDefinitionId != null,
  });
  const { data: historicTaskInstance } = useGetHistoricTaskInstance(activityInstance.taskId, !!activityInstance.taskId);
  const { data: processInstanceVariables } = useGetHistoricProcessInstanceVariables(activityInstance.processInstanceId, !activityInstance.taskId);

  const [formData, setFormData] = useState<Record<string, unknown> | undefined>(undefined);

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
        {formDefinition?.formSchema && <KBPFormViewer schema={formDefinition.formSchema} data={formData} />}
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
