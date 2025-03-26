import { mutationKeys, mutationType, useMutationBuilder } from './common';
import {
  postAnalysisConfig,
  postFormDefinition,
  postPdfTemplate,
  postStartWorkflowInstance,
  postTaskAction,
  postWorkflowDefinition,
  putFormDefinition,
  putProcessInstanceVariables,
  removeAnalysisConfig,
  removeFormDefinition,
  removeHistoricProcessInstance,
  removeProcessInstance,
  removeWorkflowDefinition,
} from './http';

export const usePostFormDefinitions = () => {
  return useMutationBuilder({
    mutationKey: [mutationKeys.formDefinition, mutationType.post],
    mutationFn: postFormDefinition,
  });
};

export const usePutFormDefinitions = () => {
  return useMutationBuilder({
    mutationKey: [mutationKeys.formDefinition, mutationType.put],
    mutationFn: putFormDefinition,
  });
};

export const useRemoveFormDefinition = () => {
  return useMutationBuilder({
    mutationKey: [mutationKeys.formDefinition, mutationType.remove],
    mutationFn: removeFormDefinition,
  });
};

export const usePostWorkflowDefinitions = () => {
  return useMutationBuilder({
    mutationKey: [mutationKeys.workflowDefinition, mutationType.post],
    mutationFn: postWorkflowDefinition,
  });
};

export const usePostStartWorkflowInstance = () => {
  return useMutationBuilder({
    mutationKey: [mutationKeys.workflowInstance, mutationType.post],
    mutationFn: postStartWorkflowInstance,
  });
};

export const useRemoveWorkflowDefinition = () => {
  return useMutationBuilder({
    mutationKey: [mutationKeys.workflowDefinition, mutationType.remove],
    mutationFn: removeWorkflowDefinition,
  });
};

export const usePutProcessInstanceVariables = () => {
  return useMutationBuilder({
    mutationKey: [mutationKeys.processInstanceVariables, mutationType.put],
    mutationFn: putProcessInstanceVariables,
  });
};

export const useRemoveProcessInstance = () => {
  return useMutationBuilder({
    mutationKey: [mutationKeys.workflowInstance, mutationType.remove],
    mutationFn: removeProcessInstance,
  });
};

export const useRemoveHistoricProcessInstance = () => {
  return useMutationBuilder({
    mutationKey: [mutationKeys.workflowInstance, mutationType.remove],
    mutationFn: removeHistoricProcessInstance,
  });
};

export const usePostTaskAction = () => {
  return useMutationBuilder({
    mutationKey: [mutationKeys.task, mutationType.post],
    mutationFn: postTaskAction,
  });
};

export const usePostPdfTemplates = () => {
  return useMutationBuilder({
    mutationKey: [mutationKeys.pdfTemplate, mutationType.post],
    mutationFn: postPdfTemplate,
  });
};

export const usePostAnalysisChartConfig = () => {
  return useMutationBuilder({
    mutationKey: [mutationKeys.analysisChartConfig, mutationType.post],
    mutationFn: postAnalysisConfig,
  });
};

export const useRemovenalysisChartConfig = () => {
  return useMutationBuilder({
    mutationKey: [mutationKeys.analysisChartConfig, mutationType.remove],
    mutationFn: removeAnalysisConfig,
  });
};
