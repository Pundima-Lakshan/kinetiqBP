import { mutationKeys, mutationType, useMutationBuilder } from './common';
import {
  postFormDefinition,
  postStartWorkflowInstance,
  postWorkflowDefinition,
  putFormDefinition,
  removeFormDefinition,
  removeWorkFlowDefinition,
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

export const usePostWorkFlowDefinitions = () => {
  return useMutationBuilder({
    mutationKey: [mutationKeys.workflowDefinition, mutationType.post],
    mutationFn: postWorkflowDefinition,
  });
};

export const usePostStartWorkFlowInstance = () => {
  return useMutationBuilder({
    mutationKey: [mutationKeys.workflowInstance, mutationType.post],
    mutationFn: postStartWorkflowInstance,
  });
};

export const useRemoveWorkFlowDefinition = () => {
  return useMutationBuilder({
    mutationKey: [mutationKeys.workflowDefinition, mutationType.remove],
    mutationFn: removeWorkFlowDefinition,
  });
};
