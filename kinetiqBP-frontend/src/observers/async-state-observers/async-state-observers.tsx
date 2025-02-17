'use client';

import {
  useAsyncMutationStatesObserver,
  useAsyncQueryStatesObserver,
  type AsyncMutationStatesObserverParams,
  type AsyncStateObserversCommonParams,
} from '@/observers';
import { useEffect } from 'react';

export type AsyncStateObserversProps = Omit<AsyncStateObserversCommonParams, 'cacheType' | 'channel' | 'setIsLoading'> &
  Omit<AsyncMutationStatesObserverParams, 'cacheType' | 'channel' | 'setIsLoading'>;

export const AsyncStateObservers = ({ ...rest }: AsyncStateObserversProps) => {
  const { unsubscribe: queryUnsub } = useAsyncQueryStatesObserver({
    setIsLoading: () => {},
  });
  const { unsubscribe: mutationUnsub } = useAsyncMutationStatesObserver({
    ...rest,
    setIsLoading: () => {},
  });

  useEffect(() => {
    return () => {
      queryUnsub();
      mutationUnsub();
    };
  }, [rest]);

  return <></>;
};
