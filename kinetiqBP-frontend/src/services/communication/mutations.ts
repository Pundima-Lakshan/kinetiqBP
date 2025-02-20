import { mutationKeys, useMutationBuilder } from './common';
import { postFormDefinition, putFormDefinition } from './http';

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
