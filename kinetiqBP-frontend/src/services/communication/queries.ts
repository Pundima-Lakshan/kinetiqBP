import { queryKeys, useQueryBuilder, type ModifiedUseQueryOptions } from './common';
import {
  getFlowableUser,
  getFlowableUserInfo,
  getFlowableUserInfoList,
  getFlowableUsers,
  getFormDefinition,
  getFormDefinitions,
  getHistoricActivityInstance,
  getHistoricProcessInstanceVariables,
  getHistoricTaskInstance,
  getProcessInstanceVariables,
  getUiServiceUsers,
  getWorkflowDefinitionModel,
  getWorkflowDefinitions,
  getWorkflowDefinitionXml,
  getWorkflowHistoricInstances,
  getWorkflowInstances,
  type FlowableUserInfoKey,
  type FormDefinition,
} from './http';

export const useGetFlowableUsers = () => {
  return useQueryBuilder({
    queryKey: [queryKeys.flowableUsers],
    queryFn: getFlowableUsers,
  });
};

export const useGetFlowableUser = (userId: string) => {
  return useQueryBuilder({
    queryKey: [queryKeys.flowableUser, userId],
    queryFn: async () => getFlowableUser(userId),
  });
};

export const useGetFlowableUserInfoList = (userId: string) => {
  return useQueryBuilder({
    queryKey: [queryKeys.flowableUserInfoList, userId],
    queryFn: async () => getFlowableUserInfoList(userId),
  });
};

export const useGetFlowableUserInfo = (userId: string, userInfoKey: FlowableUserInfoKey, enabled: boolean) => {
  return useQueryBuilder({
    queryKey: [queryKeys.flowableUserInfo, userId, userInfoKey],
    queryFn: async () => getFlowableUserInfo(userId, userInfoKey),
    enabled,
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

export const useGetWorkflowInstances = () => {
  return useQueryBuilder({
    queryKey: [queryKeys.workflowInstances],
    queryFn: getWorkflowInstances,
  });
};

export const useGetWorkflowHistoricInstances = () => {
  return useQueryBuilder({
    queryKey: [queryKeys.historicWorkflowInstance],
    queryFn: getWorkflowHistoricInstances,
  });
};

export const useGetUiServiceUsers = () => {
  return useQueryBuilder({
    queryKey: [queryKeys.uiServiceUsers],
    queryFn: getUiServiceUsers,
  });
};

export const useGetHistoricActivity = (workflowInstanceId: string) => {
  return useQueryBuilder({
    queryKey: [queryKeys.historicActivityInstances, workflowInstanceId],
    queryFn: async () => {
      return getHistoricActivityInstance({ processInstanceId: workflowInstanceId });
    },
  });
};

export const useGetHistoricTaskInstance = (taskId: string, enabled: boolean) => {
  return useQueryBuilder({
    queryKey: [queryKeys.historicTaskInstance, taskId],
    queryFn: async () => getHistoricTaskInstance(taskId),
    enabled,
  });
};

export const useGetProcessInstanceVariables = (processInstanceId: string, enabled: boolean) => {
  return useQueryBuilder({
    queryKey: [queryKeys.processInstanceVariables, processInstanceId],
    queryFn: async () => getProcessInstanceVariables(processInstanceId),
    enabled,
  });
};

export const useGetHistoricProcessInstanceVariables = (processInstanceId: string, enabled: boolean) => {
  return useQueryBuilder({
    queryKey: [queryKeys.historicProcessInstanceVariables, processInstanceId],
    queryFn: async () => getHistoricProcessInstanceVariables(processInstanceId),
    enabled,
  });
};
