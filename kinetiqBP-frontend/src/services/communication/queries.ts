import { queryKeys, useQueryBuilder, type ModifiedUseQueryOptions } from './common';
import {
  getFlowableUsers,
  getFormDefinition,
  getFormDefinitions,
  getWorkflowDefinitionModel,
  getWorkflowDefinitions,
  getWorkflowDefinitionXml,
  type FormDefinition,
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

interface GetFormDefinitionsOptions {
  enabled?: boolean;
  select?: ModifiedUseQueryOptions<FormDefinition>['select'];
}

export const useGetFormDefinition = (id: number, options?: GetFormDefinitionsOptions) => {
  const { enabled = true, select } = options ?? {};
  return useQueryBuilder({
    queryKey: [queryKeys.formDefinition, id],
    queryFn: async () => {
      return await getFormDefinition(id);
    },
    enabled,
    select,
  });
};

export const useGetWorkflowDefinitions = () => {
  return useQueryBuilder({
    queryKey: [queryKeys.workflowDefinitions],
    queryFn: getWorkflowDefinitions,
  });
};

export const useGetWorkflowDefinitionXml = (workflowDefinitionId: string) => {
  return useQueryBuilder({
    queryKey: [queryKeys.workflowDefinitionXml, workflowDefinitionId],
    queryFn: async () => {
      return await getWorkflowDefinitionXml(workflowDefinitionId);
    },
  });
};

export const useGetWorkflowDefinitionModel = (workflowDefinitionId: string) => {
  return useQueryBuilder({
    queryKey: [queryKeys.workflowDefinitionModel, workflowDefinitionId],
    queryFn: async () => {
      return await getWorkflowDefinitionModel(workflowDefinitionId);
    },
  });
};
