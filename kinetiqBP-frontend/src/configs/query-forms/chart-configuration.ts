import { FormSchema } from '@/services';

export const ChartConfigChartTypeKey = 'chartType';
export const ChartConfigQueryTypeKey = 'queryType';

export const getChartConfigurationFormSchema = () =>
  ({
    components: [
      {
        text: '### Chart Configuration',
        type: 'text',
        id: 'field_intro_chart_config',
      },
      {
        label: 'Chart Title',
        key: 'chartTitle',
        type: 'textfield',
        id: 'Field_chartTitle',
        validate: {
          required: true,
        },
      },
      {
        label: 'Group',
        key: 'group',
        type: 'textfield',
        id: 'Field_group',
        validate: {
          required: true,
        },
      },
      {
        label: 'Chart Type',
        key: 'chartType',
        type: 'select',
        id: 'Field_chartType',
        values: [
          { label: 'Bar', value: 'bar' },
          { label: 'Line', value: 'line' },
          { label: 'Card', value: 'card' },
          { label: 'Gauge', value: 'gauge' },
        ],
        validate: {
          required: true,
        },
      },
      {
        label: 'Query Type',
        key: 'queryType',
        type: 'select',
        id: 'Field_queryType',
        values: [
          { label: 'Activity', value: 'activity' },
          { label: 'Process', value: 'process' },
          { label: 'Task', value: 'task' },
        ],
        validate: {
          required: true,
        },
      },
    ],
    schemaVersion: 1,
    type: 'default',
    id: 'Form_chartConfig',
    versionTag: 'v1',
  }) as FormSchema;
