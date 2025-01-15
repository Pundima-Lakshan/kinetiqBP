import { useActivePage } from '@toolpad/core/useActivePage';
import { useDialogs } from '@toolpad/core';
import { browserRoutesCollection } from '@/configs';
import { NewFormDefinitionDialog, NewWorkflowDefinitionDialog } from '@/components';

export const usePageHeaderActionsHandler = () => {
  const activePage = useActivePage();
  const dialogs = useDialogs();

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
      default:
        break;
    }
  };

  return {
    handleClick,
  };
};
