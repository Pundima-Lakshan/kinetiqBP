import { browserRoutesCollection, getPath } from '@/configs';
import { useGetTaskInstances } from '@/services';
import { useSession } from '@toolpad/core';
import { useNavigate } from 'react-router';

export const useTaskCountAction = () => {
  const session = useSession();
  const { data: taskInstances, isLoading: isLoadingTaskInstances } = useGetTaskInstances(session?.user?.id ?? undefined);
  const tasksCount = taskInstances?.total;

  const navigate = useNavigate();

  const handleNavigateTasks = () => {
    navigate(getPath(browserRoutesCollection.Tasks.segment));
  };

  return {
    tasksCount,
    isLoadingTaskInstances,
    handleNavigateTasks,
  };
};
