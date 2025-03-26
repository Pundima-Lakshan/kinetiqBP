import { TasksGrid } from '@/components';
import { useGetTaskInstances } from '@/services';
import { useSession } from '@toolpad/core';

export const Tasks = () => {
  const session = useSession();
  const { data: taskInstances, isLoading: isLoadingTaskInstances } = useGetTaskInstances(session?.user?.id ?? undefined);

  return <TasksGrid data={taskInstances?.data ?? []} loading={isLoadingTaskInstances} />;
};
