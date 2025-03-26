import { FormSchema } from '@/services';

export const getQueryActivityFormSchema = () =>
  ({
    components: [
      {
        text: '### Activity Instances Query Options',
        type: 'text',
        id: 'field_intro_activity',
      },
      {
        label: 'Start',
        key: 'start',
        type: 'textfield',
        id: 'Field_start',
      },
      {
        label: 'Size',
        key: 'size',
        type: 'textfield',
        id: 'Field_size',
      },
      {
        label: 'Sort',
        key: 'sort',
        type: 'textfield',
        id: 'Field_sort',
      },
      {
        label: 'Order',
        key: 'order',
        type: 'textfield',
        id: 'Field_order',
      },
      {
        label: 'Activity ID',
        key: 'activityId',
        type: 'textfield',
        id: 'Field_activityId',
      },
      {
        label: 'Activity Instance ID',
        key: 'activityInstanceId',
        type: 'textfield',
        id: 'Field_activityInstanceId',
      },
      {
        label: 'Activity Name',
        key: 'activityName',
        type: 'textfield',
        id: 'Field_activityName',
      },
      {
        label: 'Activity Type',
        key: 'activityType',
        type: 'textfield',
        id: 'Field_activityType',
      },
      {
        label: 'Execution ID',
        key: 'executionId',
        type: 'textfield',
        id: 'Field_executionId',
      },
      {
        label: 'Finished',
        key: 'finished',
        type: 'checkbox',
        id: 'Field_finished',
      },
      {
        label: 'Task Assignee',
        key: 'taskAssignee',
        type: 'textfield',
        id: 'Field_taskAssignee',
      },
      {
        label: 'Process Instance ID',
        key: 'processInstanceId',
        type: 'textfield',
        id: 'Field_processInstanceId',
      },
      {
        label: 'Process Definition ID',
        key: 'processDefinitionId',
        type: 'textfield',
        id: 'Field_processDefinitionId',
      },
      {
        label: 'Tenant ID',
        key: 'tenantId',
        type: 'textfield',
        id: 'Field_tenantId',
      },
      {
        label: 'Tenant ID Like',
        key: 'tenantIdLike',
        type: 'textfield',
        id: 'Field_tenantIdLike',
      },
      {
        label: 'Without Tenant ID',
        key: 'withoutTenantId',
        type: 'checkbox',
        id: 'Field_withoutTenantId',
      },
    ],
    schemaVersion: 18,
    type: 'default',
    id: 'Form_activityQuery',
    versionTag: 'v1',
  }) as FormSchema;
