import { queryKeys, useQueryBuilder } from './common';
import { getFlowableUsers, getFormDefinition, getFormDefinitions } from './http';

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
