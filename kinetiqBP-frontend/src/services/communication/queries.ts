import { queryKeys, useQueryBuilder } from './common';
import {
  getFlowableUsers,
  getFormDefinition,
  getFormDefinitions,
  getWorkFlowDefinitionModel,
  getWorkflowDefinitionResourceData,
  getWorkflowDefinitions,
} from './http';

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
    queryKey: [queryKeys.formDefinition, id],
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

export const useGetWorkflowDefinitionResourceData = (workflowDefinitionId: string) => {
  return useQueryBuilder({
    queryKey: [queryKeys.workflowDefinitionResourceData, workflowDefinitionId],
    queryFn: async () => {
      return await getWorkflowDefinitionResourceData(workflowDefinitionId);
    },
  });
};

export const useGetWorkFlowDefinitionModel = (workflowDefinitionId: string) => {
  return useQueryBuilder({
    queryKey: [queryKeys.workflowDefinitionModel, workflowDefinitionId],
    queryFn: async () => {
      return await getWorkFlowDefinitionModel(workflowDefinitionId);
    },
  });
};
