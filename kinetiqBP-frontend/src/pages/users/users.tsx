import { UsersGrid } from '@/components';
import { useGetFlowableUsers } from '@/services';

export const Users = () => {
  const { data: flowableUsers, isLoading: isLoadingFlowableUsers } = useGetFlowableUsers();

  return <UsersGrid data={flowableUsers?.data ?? []} loading={isLoadingFlowableUsers} />;
};
