import { WorkflowDefinitionsGrid } from '@/components';
import { useGetWorkflowDefinitions } from '@/services';

export const WorkflowDefinitions = () => {
  const { data: workflowDefinitions, isLoading: isLoadingWorkflowDefinitions } = useGetWorkflowDefinitions();

  return <WorkflowDefinitionsGrid data={workflowDefinitions?.data ?? []} loading={isLoadingWorkflowDefinitions} />;
};
