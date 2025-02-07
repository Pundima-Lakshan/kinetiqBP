import { asyncStateObserversCommon, type AsyncStateObserversCommonParams } from '@/observers';
import { queryClient } from '@/providers';
import { type QueryCacheNotifyEvent } from '@tanstack/react-query';

export const asyncQueryStatesObserver = (params: AsyncStateObserversCommonParams) => {
  const { handleEventAction } = asyncStateObserversCommon(params);

  const queryObserverCallback = (event: QueryCacheNotifyEvent) => {
    handleEventAction(event);
  };

  const unsubscribe = queryClient.getQueryCache().subscribe(queryObserverCallback);

  return {
    unsubscribe,
  };
};
