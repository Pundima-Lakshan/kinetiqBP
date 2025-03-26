import { usePageHeaderActionsHandler } from '@/components';
import { browserRoutesCollection } from '@/configs';
import { useSyncedState } from '@/utils';
import { Button } from '@mui/material';
import { useActivePage } from '@toolpad/core/useActivePage';

export const PageHeaderAction = () => {
  const activePage = useActivePage();
  const { handleClick } = usePageHeaderActionsHandler();

  const getActionLabel = () => {
    switch (activePage?.title) {
      case browserRoutesCollection.Dashboard.title: {
        return 'New Analysis Chart';
      }
      default: {
        return `Create ${activePage?.title}`.trim().slice(0, -1);
      }
    }
  };

  const { state: actionLabel } = useSyncedState({ getter: getActionLabel, deps: [activePage] });

  const actionablePages = [browserRoutesCollection.FormDefinitions, browserRoutesCollection.WorkflowDefinitions, browserRoutesCollection.Dashboard];

  const hidden = !activePage || !actionablePages.some((page) => page.title === activePage.title);

  return (
    <Button variant="contained" color="primary" style={{ display: hidden ? 'none' : '' }} onClick={handleClick}>
      {actionLabel}
    </Button>
  );
};
