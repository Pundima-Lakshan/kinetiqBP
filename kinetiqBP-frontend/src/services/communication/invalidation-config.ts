import { mutationKeys, type queryKeys } from '@/services';

export type InvalidationConfig = Record<keyof typeof mutationKeys, Array<Array<keyof typeof queryKeys>>>;

export const invalidationConfig: InvalidationConfig = {
  dummy: [],
  formDefinition: [['formDefinitions']],
  workflowDefinition: [['workflowDefinitions']],
  workflowInstance: [['workflowInstances']],
};
