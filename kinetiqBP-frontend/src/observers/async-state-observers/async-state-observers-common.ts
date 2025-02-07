import { type InvalidationConfig, type mutationKeys } from '@/services';
import { type MutationCacheNotifyEvent, type QueryCacheNotifyEvent, type QueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

export type AsyncStateObserversCommonParams = {
  cacheType?: 'query' | 'mutation';
  setIsLoading: (isLoading: boolean) => void;
};

export const asyncStateObserversCommon = ({ cacheType = 'query', setIsLoading }: AsyncStateObserversCommonParams) => {
  const handleEventAction = (event: QueryCacheNotifyEvent | MutationCacheNotifyEvent) => {
    if (event.type !== 'updated') {
      return;
    }

    /**
     * action that starts the query fetching (query only)
     */
    if (event.action.type === 'fetch') {
      setIsLoading(true);
      // toast.loading('Fetching...');
      return;
    }

    /**
     * action that starts the mutation pending (mutation only)
     */
    if (event.action.type === 'pending') {
      setIsLoading(true);
      // toast.loading('Pending...');
      return;
    }

    /**
     * final result after retires if any result in success
     */
    if (event.action.type === 'success') {
      setIsLoading(false);
      if (cacheType === 'mutation') {
        toast.success('Action successful');
      }
      return;
    }

    /**
     * final result after retries if any result in failure
     */
    if (event.action.type === 'error') {
      setIsLoading(false);
      toast.error(event.action.error.content?.message ?? event.action.error.message ?? 'Error');
      return;
    }

    /**
     * when errors occur and retry is enabled and is not the last retry
     */
    if (event.action.type === 'failed') {
      setIsLoading(false);
      toast.error('Something went wrong retrying');
      return;
    }

    /**
     * when there is no internet connection or for some other reason
     */
    if (event.action.type === 'pause') {
      setIsLoading(false);
      toast.error('No Internet Connection');
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
