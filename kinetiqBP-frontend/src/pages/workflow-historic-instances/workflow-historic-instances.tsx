import { WorkflowHistoricInstancesGrid, type WorkflowHistoricInstancesRowModel } from '@/components/templates/workflow-historic-instances';
import { useGetUiServiceUsers, useGetWorkflowHistoricInstances } from '@/services';
import { useSession } from '@toolpad/core';
import { useEffect, useState } from 'react';

export const WorkflowHistoricInstances = () => {
  const session = useSession();

  const { data: workflowHistoricInstances, isLoading: isLoadingWorkflowHistoricInstances } = useGetWorkflowHistoricInstances(
    session?.user?.id ?? undefined,
  );
  const { data: uiServiceUsers, isLoading: isLoadingUiServiceUsers } = useGetUiServiceUsers();

  const [workflowHistoricInstanceData, setWorkflowHistoricInstanceData] = useState<Array<WorkflowHistoricInstancesRowModel>>([]);

  useEffect(() => {
    if (!workflowHistoricInstances?.data || !uiServiceUsers) return;

    const usersMap = new Map(
      uiServiceUsers.map((user) => {
        return [user.id, user];
      }),
    );

    const usersAddedData = workflowHistoricInstances.data.map((instance) => {
      const startedUser = usersMap.get(instance.startUserId);
      return {
        ...instance,
        startedUser,
      };
    });

    setWorkflowHistoricInstanceData(usersAddedData);
  }, [workflowHistoricInstances, uiServiceUsers]);

  const isLoading = isLoadingWorkflowHistoricInstances || isLoadingUiServiceUsers;

  return <WorkflowHistoricInstancesGrid data={workflowHistoricInstanceData} isLoading={isLoading} />;
};
