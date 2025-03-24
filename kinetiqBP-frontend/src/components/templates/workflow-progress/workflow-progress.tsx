import { KBPStepper, type KbpStep } from '@/components/atoms';
import { bpmnActivityTypes, type KBPFormViewerRefObj } from '@/components/organisms';
import { getFormData } from '@/logic';
import {
  PdfTemplateEntry,
  useGetHistoricActivity,
  useGetWorkflowDefinitionModel,
  useMutationSuccessErrorCallback,
  usePostPdfTemplates,
  usePostTaskAction,
} from '@/services';
import { useDialogs, useSession } from '@toolpad/core';
import { useEffect, useRef, useState } from 'react';
import { BpmnProgressButton, type BpmnProgressButtonProps } from './bpmn-progress-button';
import { WorkflowActivity } from './workflow-activity';

type WorkflowProgressProps = Omit<BpmnProgressButtonProps, 'activityInstances'>;

export const WorkFlowProgress = ({ workflowDefinitionId, workflowInstanceId }: WorkflowProgressProps) => {
  const { data: historicActivityInstances, isLoading: isLoadingHistoricActivityInstances } = useGetHistoricActivity(workflowInstanceId);
  const { data: workflowDefinitionModel, isLoading: isLoadingWorkflowDefinitionModel } = useGetWorkflowDefinitionModel(workflowDefinitionId);

  const { mutate: postTaskAction, isPending: isPendingPostTaskAction } = usePostTaskAction();

  const { mutate: postPdfTemplates, isPending: isPendingPostPdfTemplate } = usePostPdfTemplates();

  const session = useSession();
  const loggedInUserId = session?.user?.id;

  const dialogs = useDialogs();

  const [steps, setSteps] = useState<Array<KbpStep>>([]);

  const kbpFormViewerRef = useRef<KBPFormViewerRefObj>(null);

  const onComplete = async (taskId: string) => {
    if (!loggedInUserId) return false;

    const filesData = getFormData({
      kbpFormViewerRef,
      dialogs,
      isFiles: true,
    });

    const data = getFormData({
      dialogs,
      kbpFormViewerRef,
    });

    if (!data) return false;

    if (filesData && filesData.length > 0) {
      filesData.forEach((fd) => {
        const dataMap = new Map(
          data.map((d, i) => {
            return [d.name, { data: d, index: i }];
          }),
        );
        const correspondingData = dataMap.get(fd.formKey);
        if (!correspondingData) {
          console.error('Not found corresponding form data item');
          return;
        }
        data[correspondingData.index].value = fd.file.name;
      });

      const files = filesData.map((f) => f.file);
      const pdfTemplateEntries: PdfTemplateEntry[] = filesData.map((f) => ({
        id: f.file.name,
        createdBy: loggedInUserId,
        lastModifiedBy: loggedInUserId,
        createdDate: new Date(),
        modifiedDate: new Date(),
      }));

      postPdfTemplates({
        files,
        pdfTemplateEntries,
      });
    }

    postTaskAction({
      taskId,
      variables: data,
    });

    return false;
  };

  useEffect(() => {
    if (!historicActivityInstances?.data || !workflowDefinitionModel) return;

    const _steps: Array<KbpStep> = historicActivityInstances.data
      .map((instance) => {
        if (!bpmnActivityTypes.eventsType.includes(instance.activityType) && !bpmnActivityTypes.taskType.includes(instance.activityType)) return;
        const formDefinitionId = workflowDefinitionModel.mainProcess.flowElementMap[instance.activityId]?.attributes.form?.[0]?.value;
        const dynamicVariables = workflowDefinitionModel.mainProcess.flowElementMap[instance.activityId]?.attributes.dynamicVariable;
        const isLoggedInUserAssignee = session?.user?.id === instance.assignee;
        return {
          component: (
            <WorkflowActivity
              key={instance.activityId}
              activityInstance={instance}
              formDefinitionId={formDefinitionId ? Number(formDefinitionId) : undefined}
              dynamicVariables={dynamicVariables}
              kbpFormViewerRef={kbpFormViewerRef}
            />
          ),
          onComplete: isLoggedInUserAssignee ? async () => await onComplete(instance.taskId) : undefined,
          labels: [instance.activityName, instance.activityType, instance.activityId, instance.taskId],
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

  const isLoading = isLoadingHistoricActivityInstances || isLoadingWorkflowDefinitionModel || isPendingPostTaskAction || isPendingPostPdfTemplate;

  return (
    <KBPStepper
      steps={steps}
      stepperHeaders={[`Completed steps of`, workflowDefinitionModel?.mainProcess.name ?? '']}
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
