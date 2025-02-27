import { WorkflowInstancesGrid, type WorkflowInstancesRowModel } from '@/components';
import { useGetUiServiceUsers, useGetWorkflowInstances } from '@/services';
import { useEffect, useState } from 'react';

export const WorkflowInstances = () => {
  const { data: workflowInstances, isLoading: isLoadingWorkflowInstances } = useGetWorkflowInstances();
  const { data: uiServiceUsers, isLoading: isLoadingUiServiceUsers } = useGetUiServiceUsers();

  const [workflowInstanceData, setWorkflowInstanceData] = useState<Array<WorkflowInstancesRowModel>>([]);

  useEffect(() => {
    if (!workflowInstances?.data || !uiServiceUsers) return;

    const usersMap = new Map(
      uiServiceUsers.map((user) => {
        return [user.id, user];
      }),
    );

    const usersAddedData = workflowInstances.data.map((instance) => {
      const startedUser = usersMap.get(instance.startUserId);
      return {
        ...instance,
        startedUser,
      };
    });

    setWorkflowInstanceData(usersAddedData);
  }, [workflowInstances, uiServiceUsers]);

  const isLoading = isLoadingWorkflowInstances || isLoadingUiServiceUsers;

  return <WorkflowInstancesGrid data={workflowInstanceData} isLoading={isLoading} />;
};
