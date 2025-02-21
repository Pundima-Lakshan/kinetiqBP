import { queryKeys, useQueryBuilder } from './common';
import { getFlowableUsers, getFormDefinition, getFormDefinitions, getWorkflowDefinitionResourceData, getWorkflowDefinitions } from './http';

export const useGetFlowableUsers = () => {
  return useQueryBuilder({
    queryKey: [queryKeys.users],
    queryFn: getFlowableUsers,
  });
};

export const useGetFormDefinitions = () => {
  return useQueryBuilder({
    queryKey: [queryKeys.formDefinitions],
    queryFn: getFormDefinitions,
  });
};

export const useGetFormDefinition = (id: number) => {
  return useQueryBuilder({
    queryKey: [queryKeys.formDefinitions, id],
    queryFn: async () => {
      return await getFormDefinition(id);
    },
  });
};

export const useGetWorkflowDefinitions = () => {
  return useQueryBuilder({
    queryKey: [queryKeys.workflowDefinitions],
    queryFn: getWorkflowDefinitions,
  });
};

export const useGetWorkflowDefinitionResourceData = (processDefinitionId: string) => {
  return useQueryBuilder({
    queryKey: [queryKeys.workflowDefinitionResourceData, processDefinitionId],
    queryFn: async () => {
      return await getWorkflowDefinitionResourceData(processDefinitionId);
    },
  });
};
