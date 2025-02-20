'use client';

import {
  useAsyncMutationStatesObserver,
  useAsyncQueryStatesObserver,
  type AsyncMutationStatesObserverParams,
  type AsyncStateObserversCommonParams,
} from '@/observers';
import { invalidationConfig } from '@/services';
import { Box, LinearProgress } from '@mui/material';
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

  return (
    <>
      {isLoading && (
        <Box sx={{ width: '100%', position: 'absolute', top: 0, left: 0, zIndex: 9999 }}>
          <LinearProgress />
        </Box>
      )}
    </>
  );
};
