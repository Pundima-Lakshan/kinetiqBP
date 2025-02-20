import { useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';

export const useLoaderActions = () => {
  const queryClient = useQueryClient();

  const [isLoading, _setIsLoading] = useState(false);

  const setIsLoading = (state: boolean) => {
    const fetchingCount = queryClient.isFetching();
    const mutatingCount = queryClient.isMutating();
    _setIsLoading(fetchingCount > 0 || mutatingCount > 0 || state);
  };

  return {
    isLoading,
    setIsLoading,
  };
};
