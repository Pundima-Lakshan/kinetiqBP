import { NewFormDefinitionDialog, NewWorkflowDefinitionDialog, useNewAnalysisChart } from '@/components';
import { browserRoutesCollection } from '@/configs';
import { useDialogs } from '@toolpad/core';
import { useActivePage } from '@toolpad/core/useActivePage';

export const usePageHeaderActionsHandler = () => {
  const activePage = useActivePage();
  const dialogs = useDialogs();

  const { handleNewAnalysisChart } = useNewAnalysisChart();

  const handleClick = async () => {
    if (!activePage) {
      return;
    }
    switch (activePage.title) {
      case browserRoutesCollection.FormDefinitions.title:
        await dialogs.open(NewFormDefinitionDialog);
        break;
      case browserRoutesCollection.WorkflowDefinitions.title:
        await dialogs.open(NewWorkflowDefinitionDialog);
        break;
      case browserRoutesCollection.Dashboard.title:
        handleNewAnalysisChart();
        break;
      default:
        break;
    }
  };

  return {
    handleClick,
  };
};
