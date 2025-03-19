import { type InvalidationConfig, type mutationKeys } from '@/services';
import { type MutationCacheNotifyEvent, type QueryCacheNotifyEvent, type QueryClient } from '@tanstack/react-query';
import { useNotifications } from '@toolpad/core';
import { useAuth } from 'react-oidc-context';

export type AsyncStateObserversCommonParams = {
  cacheType?: 'query' | 'mutation';
  setIsLoading: (isLoading: boolean) => void;
};

export const useAsyncStateObserversCommon = ({ setIsLoading, cacheType }: AsyncStateObserversCommonParams) => {
  const notifications = useNotifications();

  const { removeUser } = useAuth();

  const handleEventAction = (event: QueryCacheNotifyEvent | MutationCacheNotifyEvent) => {
    if (event.type !== 'updated') {
      return;
    }

    /**
     * action that starts the query fetching (query only)
     */
    if (event.action.type === 'fetch') {
      setIsLoading(true);
      // notifications.loading('Fetching...');
      return;
    }

    /**
     * action that starts the mutation pending (mutation only)
     */
    if (event.action.type === 'pending') {
      setIsLoading(true);
      // notifications.loading('Pending...');
      return;
    }

    /**
     * final result after retires if any result in success
     */
    if (event.action.type === 'success') {
      setIsLoading(false);
      if (cacheType === 'mutation') {
        notifications.show('Action successful');
      }
      return;
    }

    /**
     * final result after retries if any result in failure
     */
    if (event.action.type === 'error') {
      setIsLoading(false);
      notifications.show(event.action.error.statusText ?? 'Error');

      if (event.action.error.status === 401) {
        console.error('Unauthorized');
        void removeUser();
      }

      return;
    }

    /**
     * when errors occur and retry is enabled and is not the last retry
     */
    if (event.action.type === 'failed') {
      setIsLoading(false);
      notifications.show('Something went wrong retrying', {
        severity: 'error',
      });
      return;
    }

    /**
     * when there is no internet connection or for some other reason
     */
    if (event.action.type === 'pause') {
      setIsLoading(false);
      notifications.show('No Internet Connection', {
        severity: 'warning',
      });
      return;
    }

    /**
     * after connection is restored
     */
    if (event.action.type === 'continue') {
      setIsLoading(true);
      return;
    }

    /**
     * when invalidate action is called
     */
    if (event.action.type === 'invalidate') {
      setIsLoading(true);
      return;
    }

    /**
     * wasn't able to find (query only)
     */
    if (event.action.type === 'setState') {
      return;
    }
  };

  const handleQueryInvalidation = (event: MutationCacheNotifyEvent, queryClient: QueryClient, invalidationConfig: InvalidationConfig) => {
    if (event.type !== 'updated') {
      return;
    }

    if (event.action.type === 'success') {
      const mutationKeyElement = event.mutation.options.mutationKey?.[0] as keyof typeof mutationKeys | undefined;
      if (!mutationKeyElement) {
        return;
      }
      invalidationConfig[mutationKeyElement]?.forEach((queryKey) => {
        void queryClient.invalidateQueries({
          queryKey: queryKey,
        });
      });
    }
  };

  return {
    handleEventAction,
    handleQueryInvalidation,
  };
};
