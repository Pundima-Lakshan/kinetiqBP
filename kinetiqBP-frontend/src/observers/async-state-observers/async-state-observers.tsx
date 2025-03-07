'use client';

import { LoaderLinear } from '@/components';
import {
  useAsyncMutationStatesObserver,
  useAsyncQueryStatesObserver,
  type AsyncMutationStatesObserverParams,
  type AsyncStateObserversCommonParams,
} from '@/observers';
import { invalidationConfig } from '@/services';
import { useLoaderActions } from './loader-actions';

export type AsyncStateObserversProps = Omit<AsyncStateObserversCommonParams, 'cacheType' | 'channel' | 'setIsLoading'> &
  Omit<AsyncMutationStatesObserverParams, 'cacheType' | 'channel' | 'setIsLoading' | 'invalidationConfig'>;

export const AsyncStateObservers = ({ ...rest }: AsyncStateObserversProps) => {
  const { isLoading, setIsLoading } = useLoaderActions();

  useAsyncQueryStatesObserver({
    setIsLoading,
  });
  useAsyncMutationStatesObserver({
    ...rest,
    invalidationConfig,
    setIsLoading,
  });

  return <>{isLoading && <LoaderLinear />}</>;
};
