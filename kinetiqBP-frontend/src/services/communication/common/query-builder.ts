import { type BaseRestResponse, type BaseRestResponseDefaultError, defaultSelect } from '@/services';
import { useQuery, type UseQueryOptions } from '@tanstack/react-query';

export type ModifiedUseQueryOptions<T> = UseQueryOptions<BaseRestResponse<T>, BaseRestResponseDefaultError<T>, T>;

interface QueryBuilderProps<T = unknown> {
  queryKey: ModifiedUseQueryOptions<T>['queryKey'];
  queryFn: ModifiedUseQueryOptions<T>['queryFn'];
  select?: ModifiedUseQueryOptions<T>['select'];
  enabled?: ModifiedUseQueryOptions<T>['enabled'];
  staleTime?: ModifiedUseQueryOptions<T>['staleTime'];
}

export const useQueryBuilder = <T = unknown>({ queryKey, queryFn, select = defaultSelect, enabled = true, staleTime }: QueryBuilderProps<T>) => {
  return useQuery<BaseRestResponse<T>, BaseRestResponseDefaultError<T>, T>({
    queryKey,
    queryFn,
    select,
    enabled,
    staleTime,
  });
};
