import { mutationKeys, mutationType, useMutationBuilder } from './common';
import {
  postFormDefinition,
  postStartWorkflowInstance,
  postWorkflowDefinition,
  putFormDefinition,
  putProcessInstanceVariables,
  removeFormDefinition,
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
    mutationKey: [mutationKeys.processInstanceVariables],
    mutationFn: putProcessInstanceVariables,
  });
};

export const useRemoveProcessInstance = () => {
  return useMutationBuilder({
    mutationKey: [mutationKeys.workflowInstance],
    mutationFn: removeProcessInstance,
  });
};
