import { useAsyncStateObserversCommon, type AsyncStateObserversCommonParams } from '@/observers';
import { queryClient } from '@/providers';
import { type QueryCacheNotifyEvent } from '@tanstack/react-query';
import { useEffect } from 'react';

export const useAsyncQueryStatesObserver = (params: AsyncStateObserversCommonParams) => {
  const { handleEventAction } = useAsyncStateObserversCommon(params);

  useEffect(() => {
    const queryObserverCallback = (event: QueryCacheNotifyEvent) => {
      handleEventAction(event);
    };

    const unsubscribe = queryClient.getQueryCache().subscribe(queryObserverCallback);

    return () => {
      unsubscribe();
    };
  }, []);
};
