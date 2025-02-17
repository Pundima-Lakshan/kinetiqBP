import { queryKeys, useQueryBuilder } from './common';
import { fetchFlowableUsers } from './http';

export const useFetchFlowableUsers = () => {
  return useQueryBuilder({
    queryKey: [queryKeys.users],
    queryFn: fetchFlowableUsers,
  });
};
