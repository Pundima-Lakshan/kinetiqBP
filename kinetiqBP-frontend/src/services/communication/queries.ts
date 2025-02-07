import { queryKeys, useQueryBuilder } from './common';
import { fetchFlowableUsers } from './http';

export const usefetchFlowableUsers = () => {
  return useQueryBuilder({
    queryKey: [queryKeys.users],
    queryFn: fetchFlowableUsers,
  });
};
