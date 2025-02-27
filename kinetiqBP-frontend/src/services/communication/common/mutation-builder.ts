import { type BaseRestResponse, type BaseRestResponseDefaultError } from '@/services';
import { type MutationOptions, useMutation } from '@tanstack/react-query';

type ModifiedMutationOptions<T, R> = MutationOptions<BaseRestResponse<T>, BaseRestResponseDefaultError<T>, R>;

interface MutationBuilderProps<T, R> {
  mutationKey: ModifiedMutationOptions<T, R>['mutationKey'];
  mutationFn: ModifiedMutationOptions<T, R>['mutationFn'];
}

export const useMutationBuilder = <T, R>({ mutationKey, mutationFn }: MutationBuilderProps<T, R>) => {
  return useMutation<BaseRestResponse<T>, BaseRestResponseDefaultError<T>, R>({
    mutationKey,
    mutationFn,
  });
};
