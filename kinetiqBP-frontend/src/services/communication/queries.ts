import { queryKeys, useQueryBuilder, type ModifiedUseQueryOptions } from './common';
import {
  getAnalysisConfigs,
  getFlowableUser,
  getFlowableUserInfo,
  getFlowableUserInfoList,
  getFlowableUsers,
  getFormDefinition,
  getFormDefinitions,
  getHistoricActivityInstance,
  getHistoricProcessInstanceVariables,
  getHistoricTaskInstance,
  getPdfTemplate,
  getPdfTemplateData,
  getPdfTemplates,
  getPdfTemplateVersions,
  getProcessInstanceVariables,
  getTaskInstances,
  getUiServiceUsers,
  getWorkflowDefinitionModel,
  getWorkflowDefinitions,
  getWorkflowDefinitionXml,
  getWorkflowHistoricInstances,
  getWorkflowInstances,
  queryTasks,
  QueryTasksArgs,
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
    queryFn: async () => await getFormDefinition(id),
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

export const useGetWorkflowInstances = (involvedUserId?: string | undefined) => {
  return useQueryBuilder({
    queryKey: [queryKeys.workflowInstances, involvedUserId],
    queryFn: async () => getWorkflowInstances({ involvedUser: involvedUserId }),
  });
};

export const useGetTaskInstances = (userId?: string | undefined) => {
  return useQueryBuilder({
    queryKey: [queryKeys.taskInstances, userId],
    queryFn: async () => getTaskInstances({ assigneeLike: userId }),
    enabled: userId != null,
  });
};

export const useGetWorkflowHistoricInstances = (involvedUser?: string) => {
  return useQueryBuilder({
    queryKey: [queryKeys.historicWorkflowInstance, involvedUser],
    queryFn: async () => getWorkflowHistoricInstances({ involvedUser }),
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

export const useGetPdfTemplates = () => {
  return useQueryBuilder({
    queryKey: [queryKeys.pdfTemplates],
    queryFn: getPdfTemplates,
  });
};

export const useGetPdfTemplate = (pdfTemplateId: string) => {
  return useQueryBuilder({
    queryKey: [queryKeys.pdfTemplate, pdfTemplateId],
    queryFn: async () => getPdfTemplate(pdfTemplateId),
  });
};

export const useGetPdfTemplateVersions = (pdfTemplateId: string) => {
  return useQueryBuilder({
    queryKey: [queryKeys.pdfTemplateVersions, pdfTemplateId],
    queryFn: async () => getPdfTemplateVersions(pdfTemplateId),
  });
};

export const useGetPdfTemplateData = (pdfTemplateId: string, versionId?: string) => {
  return useQueryBuilder({
    queryKey: [queryKeys.pdfTemplate, pdfTemplateId, versionId],
    queryFn: async () => getPdfTemplateData(pdfTemplateId, versionId),
    enabled: pdfTemplateId.length > 0,
  });
};

export const useGetAnalysisChartConfigs = (userId: string) => {
  return useQueryBuilder({
    queryKey: [queryKeys.analysisChartConfigs, userId],
    queryFn: async () => getAnalysisConfigs(userId),
    enabled: userId.length > 0,
  });
};

export const useQueryTasks = (args: Partial<QueryTasksArgs>, enabled: boolean) => {
  return useQueryBuilder({
    queryKey: [queryKeys.queryTasks, args],
    queryFn: async () => queryTasks(args),
    enabled,
  });
};
