import { type MutationOptions, useMutation } from "@tanstack/react-query";
import {
  type BaseRestResponse,
  type BaseRestResponseDefaultError,
} from "@/services";

type ModifiedMutationOptions<T, R> = MutationOptions<
  BaseRestResponse<T>,
  BaseRestResponseDefaultError<T>,
  R
>;

interface MutationBuilderProps<T, R> {
  mutationKey: ModifiedMutationOptions<T, R>["mutationKey"];
  mutationFn: ModifiedMutationOptions<T, R>["mutationFn"];
  onSuccess?: ModifiedMutationOptions<T, R>["onSuccess"];
  onError?: ModifiedMutationOptions<T, R>["onError"];
}

export const useMutationBuilder = <T, R>({
  mutationKey,
  mutationFn,
  onSuccess,
  onError,
}: MutationBuilderProps<T, R>) => {
  return useMutation<BaseRestResponse<T>, BaseRestResponseDefaultError<T>, R>({
    mutationKey,
    mutationFn,
    onSuccess,
    onError,
  });
};
