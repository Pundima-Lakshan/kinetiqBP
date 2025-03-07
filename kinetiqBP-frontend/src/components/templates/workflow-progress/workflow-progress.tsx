import { KBPStepper, type KbpStep } from '@/components/atoms';
import { bpmnActivityTypes } from '@/components/organisms';
import { useGetHistoricActivity, useGetWorkflowDefinitionModel } from '@/services';
import { useEffect, useState } from 'react';
import { BpmnProgressButton, type BpmnProgressButtonProps } from './bpmn-progress-button';
import { WorkflowActivity } from './workflow-activity';

type WorkflowProgressProps = Omit<BpmnProgressButtonProps, 'activityInstances'>;

export const WorkFlowProgress = ({ workflowDefinitionId, workflowInstanceId }: WorkflowProgressProps) => {
  const { data: historicActivityInstances, isLoading: isLoadingHistoricActivityInstances } = useGetHistoricActivity(workflowInstanceId);
  const { data: workflowDefinitionModel, isLoading: isLoadingWorkflowDefinitionModel } = useGetWorkflowDefinitionModel(workflowDefinitionId);

  const [steps, setSteps] = useState<Array<KbpStep>>([]);

  useEffect(() => {
    if (!historicActivityInstances?.data || !workflowDefinitionModel) return;

    const _steps: Array<KbpStep> = historicActivityInstances.data
      .map((instance) => {
        if (!bpmnActivityTypes.eventsType.includes(instance.activityType) && !bpmnActivityTypes.taskType.includes(instance.activityType)) return;
        const formDefinitionId = workflowDefinitionModel.mainProcess.flowElementMap[instance.activityId]?.attributes.form?.[0]?.value;
        return {
          component: (
            <WorkflowActivity
              key={instance.activityId}
              activityInstance={instance}
              formDefinitionId={formDefinitionId ? Number(formDefinitionId) : undefined}
            />
          ),
          labels: [instance.activityName, instance.activityId],
          onComplete: () => {},
          completed: !!instance.endTime,
        };
      })
      .filter((i) => !!i)
      .map((instance, index) => ({
        ...instance,
        index,
      }));

    setSteps(_steps);
  }, [historicActivityInstances, workflowDefinitionModel]);

  const isLoading = isLoadingHistoricActivityInstances || isLoadingWorkflowDefinitionModel;

  return (
    <KBPStepper
      steps={steps}
      stepperHeader="Completed steps"
      additionalActions={[
        <BpmnProgressButton
          workflowDefinitionId={workflowDefinitionId}
          workflowInstanceId={workflowInstanceId}
          activityInstances={historicActivityInstances?.data ?? []}
        />,
      ]}
      isLoading={isLoading}
    />
  );
};
