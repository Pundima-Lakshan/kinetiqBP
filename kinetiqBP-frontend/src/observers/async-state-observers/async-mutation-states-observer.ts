import { asyncStateObserversCommon, type AsyncStateObserversCommonParams, publishRTUpdate } from '@/observers';
import { queryClient } from '@/providers';
import { type InvalidationConfig } from '@/services';
import { type MutationCacheNotifyEvent } from '@tanstack/react-query';

export interface AsyncMutationStatesObserverParams extends AsyncStateObserversCommonParams {
  invalidationConfig: InvalidationConfig;
  channel: RealtimeChannel;
}

export const asyncMutationStatesObserver = (params: AsyncMutationStatesObserverParams) => {
  const { handleEventAction, handleQueryInvalidation } = asyncStateObserversCommon({
    ...params,
    cacheType: 'mutation',
  });

  const mutationObserverCallback = (event: MutationCacheNotifyEvent) => {
    if (event.type !== 'updated') {
      return;
    }
    handleEventAction(event);
    handleQueryInvalidation(event, queryClient, params.invalidationConfig);
    publishRTUpdate({
      channel: params.channel,
      event,
    });
  };

  const unsubscribe = queryClient.getMutationCache().subscribe(mutationObserverCallback);

  return {
    unsubscribe,
  };
};
