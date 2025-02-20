import type { DefaultError, MutationStatus } from '@tanstack/react-query';
import { useNotifications } from '@toolpad/core';
import { useEffect } from 'react';

interface MutationSuccessErrorCallback {
  onSuccess?: () => void;
  onError?: () => void;
  mutationStatus: MutationStatus;
  successMessage?: string;
  errorMessage?: string;
  error: DefaultError | null;
}

export const useMutationSuccessErrorCallback = ({
  onSuccess,
  onError,
  mutationStatus,
  errorMessage,
  successMessage,
  error,
}: MutationSuccessErrorCallback) => {
  const notification = useNotifications();

  useEffect(() => {
    if (mutationStatus === 'success') {
      notification.show(successMessage ?? 'Success', {
        severity: 'success',
      });
      onSuccess?.();
      return;
    }

    if (mutationStatus === 'error') {
      notification.show(errorMessage ?? 'Failed', {
        severity: 'error',
      });
      console.error(error);
      onError?.();
      return;
    }
  }, [mutationStatus, error]);
};
