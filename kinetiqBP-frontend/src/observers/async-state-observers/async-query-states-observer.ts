import { useAsyncStateObserversCommon, type AsyncStateObserversCommonParams } from '@/observers';
import { queryClient } from '@/providers';
import { type QueryCacheNotifyEvent } from '@tanstack/react-query';

export const useAsyncQueryStatesObserver = (params: AsyncStateObserversCommonParams) => {
  const { handleEventAction } = useAsyncStateObserversCommon(params);

  const queryObserverCallback = (event: QueryCacheNotifyEvent) => {
    handleEventAction(event);
  };

  const unsubscribe = queryClient.getQueryCache().subscribe(queryObserverCallback);

  return {
    unsubscribe,
  };
};
