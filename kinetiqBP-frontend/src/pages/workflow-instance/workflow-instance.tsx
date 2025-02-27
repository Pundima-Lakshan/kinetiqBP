import { WorkFlowProgress } from '@/components';
import { PAGE_NOT_FOUND_PATH } from '@/configs';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router';

export const WorkFlowInstance = () => {
  const { workflowDefinitionId, workflowInstanceId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (!workflowDefinitionId || !workflowDefinitionId) {
      navigate(PAGE_NOT_FOUND_PATH);
    }
  }, [workflowDefinitionId, workflowInstanceId]);

  return (
    <>
      {workflowDefinitionId && workflowInstanceId && (
        <WorkFlowProgress workflowDefinitionId={workflowDefinitionId} workflowInstanceId={workflowInstanceId} />
      )}
    </>
  );
};
