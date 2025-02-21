import { WorkflowDefinitionsGrid } from '@/components';
import { useGetWorkflowDefinitions } from '@/services';

export const WorkflowDefinitions = () => {
  const { data: workflowDefinitions, isLoading: isLoadingWorkFlowDefinitions } = useGetWorkflowDefinitions();

  return <WorkflowDefinitionsGrid data={workflowDefinitions?.data ?? []} loading={isLoadingWorkFlowDefinitions} />;
};
