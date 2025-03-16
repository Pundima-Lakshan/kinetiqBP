import type { DefaultError, MutationStatus } from '@tanstack/react-query';
import { useNotifications } from '@toolpad/core';
import { useEffect } from 'react';

interface MutationSuccessErrorCallback<T = unknown> {
  onSuccess?: (data?: T) => void;
  onError?: () => void;
  mutationStatus: MutationStatus;
  successMessage?: string;
  errorMessage?: string;
  error: DefaultError | null;
  explicit?: boolean;
  data?: T;
}

export const useMutationSuccessErrorCallback = <T = unknown>({
  onSuccess,
  onError,
  mutationStatus,
  errorMessage,
  successMessage,
  error,
  explicit,
  data,
}: MutationSuccessErrorCallback<T>) => {
  const notification = useNotifications();

  useEffect(() => {
    return; // TODO rmove this

    if (mutationStatus === 'success') {
      if (explicit ? !!successMessage : true) {
        notification.show(successMessage ?? 'Success', {
          severity: 'success',
        });
      }
      onSuccess?.(data);
      return;
    }

    if (mutationStatus === 'error') {
      if (explicit ? !!errorMessage : true) {
        notification.show(errorMessage ?? 'Failed', {
          severity: 'error',
        });
      }
      console.error(error);
      onError?.();
      return;
    }
  }, [mutationStatus, error]);
};
