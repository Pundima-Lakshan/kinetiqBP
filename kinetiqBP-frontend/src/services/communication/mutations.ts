import { mutationKeys, useMutationBuilder } from './common';
import { postFormDefinition, postWorkflowDefinition, putFormDefinition } from './http';

export const usePostFormDefinitions = () => {
  return useMutationBuilder({
    mutationKey: [mutationKeys.formDefinition],
    mutationFn: postFormDefinition,
  });
};

export const usePutFormDefinitions = () => {
  return useMutationBuilder({
    mutationKey: [mutationKeys.formDefinition],
    mutationFn: putFormDefinition,
  });
};

export const usePostWorkFlowDefinitions = () => {
  return useMutationBuilder({
    mutationKey: [mutationKeys.workflowDefinition],
    mutationFn: postWorkflowDefinition,
  });
};
