import { useAsyncStateObserversCommon, type AsyncStateObserversCommonParams } from '@/observers';
import { queryClient } from '@/providers';
import { type InvalidationConfig } from '@/services';
import { type MutationCacheNotifyEvent } from '@tanstack/react-query';

export interface AsyncMutationStatesObserverParams extends AsyncStateObserversCommonParams {
  invalidationConfig: InvalidationConfig;
}

export const useAsyncMutationStatesObserver = (params: AsyncMutationStatesObserverParams) => {
  const { handleEventAction, handleQueryInvalidation } = useAsyncStateObserversCommon({
    ...params,
    cacheType: 'mutation',
  });

  const mutationObserverCallback = (event: MutationCacheNotifyEvent) => {
    if (event.type !== 'updated') {
      return;
    }
    handleEventAction(event);
    handleQueryInvalidation(event, queryClient, params.invalidationConfig);
  };

  const unsubscribe = queryClient.getMutationCache().subscribe(mutationObserverCallback);

  return {
    unsubscribe,
  };
};
