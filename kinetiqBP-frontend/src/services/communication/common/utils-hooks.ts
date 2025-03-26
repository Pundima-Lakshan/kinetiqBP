import { useQueryClient, type DefaultError, type MutationStatus } from '@tanstack/react-query';
import { useNotifications } from '@toolpad/core';
import { useEffect } from 'react';

interface MutationSuccessErrorCallback<T = unknown> {
  onSuccess?: (data?: T) => void;
  onError?: () => void;
  mutationStatus: MutationStatus;
  successMessage?: string;
  errorMessage?: string;
  error: DefaultError | null;
  data?: T;
}

export const useMutationSuccessErrorCallback = <T = unknown>({
  onSuccess,
  onError,
  mutationStatus,
  errorMessage,
  successMessage,
  error,
  data,
}: MutationSuccessErrorCallback<T>) => {
  const notification = useNotifications();

  useEffect(() => {
    if (mutationStatus === 'success') {
      if (successMessage) {
        notification.show(successMessage, {
          severity: 'success',
        });
      }
      onSuccess?.(data);
      return;
    }

    if (mutationStatus === 'error') {
      if (errorMessage) {
        notification.show(errorMessage, {
          severity: 'error',
        });
      }
      console.error(error);
      onError?.();
      return;
    }
  }, [mutationStatus, error]);
};

export const useHandleQueriesRefresh = () => {
  const queryClient = useQueryClient();

  const handleQueriesRefresh = () => {
    queryClient.invalidateQueries();
  };

  return {
    handleQueriesRefresh,
  };
};
